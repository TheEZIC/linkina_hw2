// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import "reflect-metadata";
import {contextBridge, ipcRenderer} from "electron";
import {backend} from "./backend/backend";

const API: any = {};

const initBackend = (obj: object, prevKey?: string) => {
  for (const [key, value] of Object.entries(obj)) {
    const handleKey = prevKey ? `${prevKey}.${key}` : key;
    let currentObj = API;

    if (prevKey) {
      const keys = handleKey.split(".");

      for (let i = 0; i < keys.length - 1; i++) {
        currentObj = currentObj[keys[i]];
      }
    }

    if (typeof value === "function") {
      currentObj[key] = (...args: any[]) => ipcRenderer.invoke(handleKey, ...args);
    } else {
      currentObj[key] = {};
      initBackend(value, handleKey);
    }
  }
};

initBackend(backend);

contextBridge.exposeInMainWorld("API", API);
