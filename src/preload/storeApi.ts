import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("storeApi", {
  // 태스크 관련 API
  getTasks: () => ipcRenderer.invoke("store:getTasks"),
  setTasks: (tasks: Record<string, any>) =>
    ipcRenderer.invoke("store:setTasks", tasks),
  getTask: (id: string) => ipcRenderer.invoke("store:getTask", id),
  setTask: (id: string, task: any) =>
    ipcRenderer.invoke("store:setTask", id, task),
  deleteTask: (id: string) => ipcRenderer.invoke("store:deleteTask", id),

  // 일반 저장소 API
  get: (key: string) => ipcRenderer.invoke("store:get", key),
  set: (key: string, value: any) => ipcRenderer.invoke("store:set", key, value),
});
