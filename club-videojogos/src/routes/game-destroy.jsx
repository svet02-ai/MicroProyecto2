import { redirect } from "react-router-dom";
import { deletegame } from "../games";

export async function action({ params }) {
  await deletegame(params.gameId);
  return redirect("/");
}