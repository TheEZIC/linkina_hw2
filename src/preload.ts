// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { ipcRenderer, contextBridge } from "electron";
import "reflect-metadata";
import {Database} from "./backend/Database";
import {AuthService} from "./backend/Services/AuthService";

const keys = (x: any) => Object.getOwnPropertyNames(x).concat(Object.getOwnPropertyNames(x?.__proto__));
const isObject = (v: any) => Object.prototype.toString.call(v) === '[object Object]'
const classToObject = (clss: any) => keys(clss ?? {}).reduce((object, key) => {
  const [val, arr, obj] = [clss[key], Array.isArray(clss[key]), isObject(clss[key])];
  //@ts-ignore
  object[key] = arr ? val.map(classToObject) : obj ? classToObject(val) : val;

  return object;
}, {});

contextBridge.exposeInMainWorld("db", Database.instance);
contextBridge.exposeInMainWorld("authService", new AuthService());
