import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { MainLayout } from "@/widgets/layout";
import { Auth } from "@/pages/auth";
import { Home } from "@/pages/home";
import { Favourites } from "@/pages/favorites";
import { Error404 } from "@/pages/error";
import { MyPosts } from "@/pages/my-posts";
import { CreatePost } from "@/pages/create-post";
import { Profile } from "@/pages/profile";

export const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      { path: "/auth", element: <Auth /> },
      {
        element: <MainLayout />,
        children: [
          { path: "/", element: <Home /> },
          { path: "/favourites", element: <Favourites /> },
          { path: "/my-posts", element: <MyPosts /> },
          { path: "/profile", element: <Profile /> },
          { path: "/my-posts/create-post", element: <CreatePost /> },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Error404 />,
  },
]);
