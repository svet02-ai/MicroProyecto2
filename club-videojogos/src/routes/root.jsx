import { 
    Outlet, 
    NavLink,
    Link, 
    useLoaderData, 
    Form, 
    redirect,
    useNavigation,
    useSubmit,
} from "react-router-dom";
import { 
    getgroups, 
    creategroup 
} from "../groups";
import { 
    getgames, 
    creategame 
} from "../games";
import { 
    useEffect,
    useState,
} from "react";

export async function loaderGroup({ request }) {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");
    
    const groups = await getgroups(q);
    return { groups, q };
}

export async function actionGroup() {
  const group = await creategroup();
  return redirect(`/groups/${group.id}/edit`);
}

export async function loaderGame({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  
  const games = await getgames(q);
  return { games, q };
}

export async function actionGame() {
  const game = await creategame();
  return redirect(`/game/${game.id}/edit`);
}

export default function Root() {
    const {fetchedData = {} } = useLoaderData(); 
    const groups = fetchedData.groups || []; 
    const q = fetchedData.q || "";
    const navigation = useNavigation();
        useEffect(() => {
        document.getElementById("q").value = q;
        }, [q]);
    
    const submit = useSubmit((data) => {
      if (data.action === "create") {
        return isChecked ? actionGame() : actionGroup();
      } else {
        return data;
      }
    });
    
    const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has(
      "q"
    );

    const [isChecked, setIsChecked] = useState(false);
    const handleToggle = (event) => {
      setIsChecked(event.target.checked);
    };

    return (
      <>
        <div id="sidebar">
          <h1 style={{ display: "flex", justifyContent: "space-between" }}>
            Game/Groups
            <label class="switch">
              <input type="checkbox" id="selector" onChange={handleToggle} />
              <span class="slider round"></span>
            </label>
          </h1>
          <div>
            <Form id="search-form" role="search">
              <input
                id="q"
                className={searching ? "loading" : ""}
                aria-label={isChecked ? "Search games" : "Search groups"}
                placeholder={isChecked ? "Search games" : "Search groups"}
                type="search"
                name="q"
                defaultValue={q}
                onChange={(event) => {
                    const isFirstSearch = q == null;
                        submit(event.currentTarget.form, {
                        replace: !isFirstSearch,
                    });
                  }}
              />
              <div
                id="search-spinner"
                aria-hidden
                hidden={!searching}
              />
              <div
                className="sr-only"
                aria-live="polite"
              ></div>
            </Form>
            <Form method="post" action="create">
              <button type="submit">New</button>
            </Form>
          </div>
            <nav>
              {groups.length ? (
                  <ul>
                  {groups.map((group) => (
                      <li key={group.id}>
                          <NavLink
                          to={`${isChecked ? 'games': 'groups'}/${group.id}`}
                          className={({ isActive, isPending }) =>
                          isActive
                              ? "active"
                              : isPending
                              ? "pending"
                              : ""
                          }
                          >
                          <Link to={`${isChecked ? 'games': 'groups'}/${group.id}`}>
                              {group.name ? (
                              <>
                                  {group.name} 
                              </>
                              ) : (
                              <i>No Name</i>
                              )}{" "}
                              {group.favorite && <span>★</span>}
                          </Link>
                      </NavLink>
                      </li>
                  ))}
                  </ul>
              ) : (
                  <p>
                  <i>{isChecked ? "No games" : "No groups"}</i>
                  </p>
              )}
            </nav>
          </div>
          <div 
              id="detail"
              className={
                  navigation.state === "loading" ? "loading" : ""
                }
          >
              <Outlet />
          </div>
        </>
      );
    }