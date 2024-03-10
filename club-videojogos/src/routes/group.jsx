import { 
    Form, 
    useLoaderData,
    useFetcher,
} from "react-router-dom";
import { 
    getgroup, 
    updategroup 
} from "../groups";

export async function action({ request, params }) {
    let formData = await request.formData();
    return updategroup(params.groupId, {
      favorite: formData.get("favorite") === "true",
    });
}

export async function loader({ params }) {
    const group = await getgroup(params.groupId);
    if (!group) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return { group };
}

export default function group() {
    const { group } = useLoaderData();
  return (
    <div id="group">
      <div>
        <img
          key={group.avatar}
          src={group.avatar || null}
        />
      </div>

      <div>
        <h1>
          {group.name ? (
            <>
              {group.name}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite group={group} />
        </h1>

        {group.description && (
          <p>
            <a
              target="_blank"
            >
              {group.description}
            </a>
          </p>
        )}

        {group.games && <p>{group.games}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (
                !confirm(
                  "Please confirm you want to delete this group."
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

function Favorite({ group }) {
    const fetcher = useFetcher();
  let favorite = group.favorite;
  if (fetcher.formData) {
    favorite = fetcher.formData.get("favorite") === "true";
  }

  return (
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={
          favorite
            ? "Remove from favorites"
            : "Add to favorites"
        }
      >
        {favorite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  );
}