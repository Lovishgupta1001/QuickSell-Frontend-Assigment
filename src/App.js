import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Display from './Screen/Display';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Display />
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
