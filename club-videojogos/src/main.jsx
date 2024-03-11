import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Root, { 
  loaderGroup as rootLoaderGroup, 
  actionGroup as rootActionGroup, 
  loaderGame as rootLoaderGame, 
  actionGame as rootActionGame, 
} from "./routes/root";
import ErrorPage from "./error-page";
import Group, {
  loader as groupLoader,
  action as groupAction,
} from "./routes/group";
import Editgroup, {
  action as editAction,
} from "./routes/edit";
import { 
  action as destroyAction 
} from "./routes/destroy";
import Game, {
  loader as gameLoader,
  action as gameAction,
} from "./routes/game";
import Editgame, {
  action as editGameAction,
} from "./routes/game-edit";
import { 
  action as destroyGameAction 
} from "./routes/game-destroy";
import Index from "./routes/index";

const isChecked = localStorage.getItem('isChecked') || false;
const router = createBrowserRouter([
  {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      loader: ({ isChecked }) => (isChecked ? rootLoaderGame : rootLoaderGroup),
      action: ({ isChecked }) => (isChecked ? rootActionGame : rootActionGroup),
      children: [
        {
          errorElement: <ErrorPage />,
          children: [
            { index: true, element: <Index /> },
            {
              path: "groups/:groupId",
              element: <Group />,
              loader: groupLoader,
              action: groupAction,
            },
            {
              path: "game/:gameId",
              element: <Game />,
              loader: gameLoader,
              action: gameAction,
            },
          ],
        },
      ],
    },
    {
      path: "groups/:groupId",
      element: <Group />,
      loader: groupLoader,
      action: groupAction,
    },
    {
      path: "groups/:groupId/edit",
      element: <Editgroup />,
      loader: groupLoader,
      action: editAction,
    },
    {
      path: "groups/:groupId/destroy",
      action: destroyAction,
      errorElement: <div>Oops! There was an error.</div>,
    },
    {
      path: "game/:gameId",
      element: <Game />,
      loader: gameLoader,
      action: gameAction,
    },
    {
      path: "game/:gameId/game-edit",
      element: <Editgame />,
      loader: gameLoader,
      action: editGameAction,
    },
    {
      path: "game/:gameId/game-destroy",
      action: destroyGameAction,
      errorElement: <div>Oops! There was an error.</div>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} isChecked={isChecked}/>
  </React.StrictMode>,
)
