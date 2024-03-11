import { 
    Form, 
    useLoaderData,
    redirect,
    useNavigate,
} from "react-router-dom";
import { updategame } from "../games";

export async function action({ request, params }) {
    const formData = await request.formData();
    const name = formData.get("name");
    const updates = Object.fromEntries(formData);
    updates.name;
    await updategame(params.gameId, updates);
    return redirect(`/games/${params.gameId}`);
}

export default function Editgame() {
  const { game } = useLoaderData();
  const navigate = useNavigate();

  return (
    <Form method="post" id="game-form">
      <p>
        <span>Name</span>
        <input
          placeholder="Name of the game"
          aria-label="Name"
          type="text"
          name="name"
          defaultValue={game.name}
        />
      </p>
      <label>
        <span>Genre</span>
        <input
          type="text"
          name="genre"
          placeholder="This is the genre of the game"
          defaultValue={game.genre}
        />
      </label>
      <label>
        <span>Description</span>
        <input
          type="text"
          name="description"
          placeholder="This is the description of the game"
          defaultValue={game.description}
        />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue={game.avatar}
        />
      </label>
      <p>
        <button type="submit">Save</button>
        <button 
            type="button" 
            onClick={() => { navigate(-1);}}
        >Cancel</button>
      </p>
    </Form>
  );
}