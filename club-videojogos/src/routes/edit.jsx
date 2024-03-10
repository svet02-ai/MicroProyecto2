import { 
    Form, 
    useLoaderData,
    redirect,
    useNavigate,
} from "react-router-dom";
import { updategroup } from "../groups";

export async function action({ request, params }) {
    const formData = await request.formData();
    const firstName = formData.get("first");
    const lastName = formData.get("last");
    const updates = Object.fromEntries(formData);
    updates.first;
    updates.last;
    await updategroup(params.groupId, updates);
    return redirect(`/groups/${params.groupId}`);
}

export default function Editgroup() {
  const { group } = useLoaderData();
  const navigate = useNavigate();

  return (
    <Form method="post" id="group-form">
      <p>
        <span>Name</span>
        <input
          placeholder="Name of the group"
          aria-label="Name"
          type="text"
          name="name"
          defaultValue={group.name}
        />
      </p>
      <label>
        <span>Description</span>
        <input
          type="text"
          name="Description"
          placeholder="This is the description of the group"
          defaultValue={group.description}
        />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue={group.avatar}
        />
      </label>
      <label>
        <span>Games</span>
        <textarea
          placeholder=""
          name="games"
          defaultValue={group.games}
          rows={1}
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