import { 
    Form, 
    useLoaderData,
    useFetcher,
} from "react-router-dom";
import { 
    getgame, 
    updategame 
} from "../games";

export async function action({ request, params }) {
    let formData = await request.formData();
    return updategame(params.gameId, {
      favorite: formData.get("favorite") === "true",
    });
}

export async function loader({ params }) {
    const game = await getgame(params.gameId);
    if (!game) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return { game };
}

export default function game() {
    const { game } = useLoaderData();
  return (
    <div id="game">
      <div>
        <img
          key={game.avatar}
          src={game.avatar || null}
        />
      </div>

      <div>
        <h1>
          {game.name ? (
            <>
              {game.name}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite game={game} />
        </h1>

        {game.genre && <p>{game.genre}</p>}

        {game.description && <p>{game.description}</p>}

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
                  "Please confirm you want to delete this game."
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

function Favorite({ game }) {
    const fetcher = useFetcher();
  let favorite = game.favorite;
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