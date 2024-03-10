import { redirect } from "react-router-dom";
import { deletegroup } from "../groups";

export async function action({ params }) {
  await deletegroup(params.groupId);
  return redirect("/");
}