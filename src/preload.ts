// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import "reflect-metadata";
import {contextBridge} from "electron";
import {database} from "./backend/Database";
import {authService} from "./backend/Services/AuthService";

contextBridge.exposeInMainWorld("db", database);
contextBridge.exposeInMainWorld("authService", authService);
