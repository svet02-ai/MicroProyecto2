import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

export async function getgroups(query) {
  await fakeNetwork(`getgroups:${query}`);
  let groups = await localforage.getItem("groups");
  if (!groups) groups = [];
  if (query) {
    groups = matchSorter(groups, query, { keys: ["first", "last"] });
  }
  return groups.sort(sortBy("last", "createdAt"));
}

export async function creategroup() {
  await fakeNetwork();
  let id = Math.random().toString(36).substring(2, 9);
  let group = { id, createdAt: Date.now() };
  let groups = await getgroups();
  groups.unshift(group);
  await set(groups);
  return group;
}

export async function getgroup(id) {
  await fakeNetwork(`group:${id}`);
  let groups = await localforage.getItem("groups");
  let group = groups.find(group => group.id === id);
  return group ?? null;
}

export async function updategroup(id, updates) {
  await fakeNetwork();
  let groups = await localforage.getItem("groups");
  let group = groups.find(group => group.id === id);
  if (!group) throw new Error("No group found for", id);
  Object.assign(group, updates);
  await set(groups);
  return group;
}

export async function deletegroup(id) {
  let groups = await localforage.getItem("groups");
  let index = groups.findIndex(group => group.id === id);
  if (index > -1) {
    groups.splice(index, 1);
    await set(groups);
    return true;
  }
  return false;
}

function set(groups) {
  return localforage.setItem("groups", groups);
}

let fakeCache = {};

async function fakeNetwork(key) {
  if (!key) {
    fakeCache = {};
  }

  if (fakeCache[key]) {
    return;
  }

  fakeCache[key] = true;
  return new Promise(res => {
    setTimeout(res, Math.random() * 800);
  });
}