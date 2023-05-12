import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { APP_TITLE } from "./constants/AppTitle";
import {MantineProvider} from '@mantine/core';
import "./index.scss";
import {useEffect} from "react";

const initDatabase = async () => {
  console.log(window.API);
  await window.API.start();
  await window.API.authService.signIn("123", "321");
  console.log("success")
}

const Providers = () => {
  useEffect(() => {
    initDatabase();
  });

  return (
    <MantineProvider
      theme={{ colorScheme: "dark" }}
      withGlobalStyles
      withNormalizeCSS
    >
    </MantineProvider>
  );
};

const setAppTitle = () => {
  document.querySelector("head title")!.innerHTML = APP_TITLE;
};

const initAppInterface = () => {
  const container = document.querySelector<HTMLDivElement>("body")!
  ReactDOM.createRoot(container).render(<Providers />);
};

const bootstrap = () => {
  setAppTitle();
  initAppInterface();
};

bootstrap();
