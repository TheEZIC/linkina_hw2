import React, {useEffect} from "react";
import * as ReactDOM from "react-dom/client";
import {MantineProvider} from '@mantine/core';
import {createHashRouter} from "react-router-dom";
import {RouterProvider, useNavigate} from "react-router";
import { APP_TITLE } from "./constants/AppTitle";
import AuthForm from "./components/AuthForm";
import MainSpinner from "./components/MainSpinner";
import "./index.scss";
import {useUserStore} from "./stores/userStore";
import {shallow} from "zustand/shallow";
import MainApp from "./components/MainApp";
import SubjectPage from "./components/SubjectPage";

const router = createHashRouter([
  {
    path: "/auth",
    element: <AuthForm/>
  },
  {
    path: "/app",
    element: <MainApp />
  },
  {
    path: "/subject/:id",
    element: <SubjectPage />
  },
  {
    path: "/task/:id",
    element: <span>task</span>
  },
  {
    path: "/",
    element: <MainSpinner />
  },
  {
    path: "*",
    element: <></>,
  },
]);

const Providers = () => {
  const [user] = useUserStore(
    (state) => [state.user],
    shallow
  );

  useEffect(() => {
    if (user) {
      window.location.href = "main_window#/app";
    } else {
      window.location.href = "main_window#/auth";
    }
  }, [user]);

  return (
    <MantineProvider
      theme={{
        colorScheme: "light",
        // fontFamily: "Comic Sans MS, sans-serif",
      }}
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
  const container = document.querySelector<HTMLDivElement>("#app")!;
  ReactDOM.createRoot(container).render(<Providers />);
};

const bootstrap = async () => {
  setAppTitle();
  await initDatabase();
  initAppInterface();
};

bootstrap();
