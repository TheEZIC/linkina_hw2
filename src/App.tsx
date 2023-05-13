import React, {useEffect} from "react";
import * as ReactDOM from "react-dom/client";
import { APP_TITLE } from "./constants/AppTitle";
import {MantineProvider} from '@mantine/core';
import "./index.scss";
import {RouterProvider} from "react-router";
import {createBrowserRouter} from "react-router-dom";
import {useUserStore} from "./stores/userStore";
import {shallow} from "zustand/shallow";
import AuthForm from "./components/AuthForm";

const Providers = () => {
  const [user] = useUserStore(
    (state) => [state.user],
    shallow
  );

  useEffect(() => {

  }, [user])

  const router = createBrowserRouter([
    {
      path: "/main_window/auth",
      index: !user ? true : undefined,
      element: <AuthForm/>
    },
    {
      path: "/main_window/app",
      index: user ? true : undefined,
      element: <span>{user.firstName} {user.lastName}</span>
    },
    {
      path: "*",
      element: <></>,
    }
  ]);

  return (
    <MantineProvider
      theme={{ colorScheme: "light" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <RouterProvider router={router} />
    </MantineProvider>
  );
};

const setAppTitle = () => {
  document.querySelector("head title")!.innerHTML = APP_TITLE;
};

const initDatabase = async () => {
  await window.API.db.start();
};

const initAppInterface = () => {
  const container = document.querySelector<HTMLDivElement>("#app")!
  ReactDOM.createRoot(container).render(<Providers />);
};

const bootstrap = async () => {
  setAppTitle();
  await initDatabase();
  initAppInterface();
};

bootstrap();
