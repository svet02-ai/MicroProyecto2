import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Root, { 
  loader as rootLoader, 
  action as rootAction, 
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
import Index from "./routes/index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
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
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
