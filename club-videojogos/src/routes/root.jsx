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
    useEffect 
} from "react";

export async function loader({ request }) {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");
    
    const groups = await getgroups(q);
    return { groups, q };
  }

export async function action() {
  const group = await creategroup();
  return redirect(`/groups/${group.id}/edit`);
}

export default function Root() {
    const { groups, q } = useLoaderData();
    const navigation = useNavigation();
        useEffect(() => {
        document.getElementById("q").value = q;
        }, [q]);
    
    const submit = useSubmit();
    const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has(
      "q"
    );

    return (
      <>
        <div id="sidebar">
          <h1>Group Page</h1>
          <div>
            <Form id="search-form" role="search">
              <input
                id="q"
                className={searching ? "loading" : ""}
                aria-label="Search groups"
                placeholder="Search"
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
            <Form method="post">
                <button type="submit">New</button>
            </Form>
          </div>
          <nav>
            {groups.length ? (
                <ul>
                {groups.map((group) => (
                    <li key={group.id}>
                        <NavLink
                        to={`groups/${group.id}`}
                        className={({ isActive, isPending }) =>
                        isActive
                            ? "active"
                            : isPending
                            ? "pending"
                            : ""
                        }
                        >
                        <Link to={`groups/${group.id}`}>
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
                <i>No groups</i>
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