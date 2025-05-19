import { ipcMain } from "electron";
import { store } from "../../infrastructure/storage/electronStore";

export const registerStoreHandlers = () => {
  // 모든 태스크 가져오기
  ipcMain.handle("store:getTasks", () => {
    return store.get("tasks");
  });

  // 태스크 저장하기
  ipcMain.handle("store:setTasks", (_, tasks: Record<string, any>) => {
    store.set("tasks", tasks);
    return true;
  });

  // 개별 태스크 가져오기
  ipcMain.handle("store:getTask", (_, id: string) => {
    const tasks = store.get("tasks");
    return tasks[id];
  });

  // 개별 태스크 저장하기
  ipcMain.handle("store:setTask", (_, id: string, task: any) => {
    const tasks = store.get("tasks");
    tasks[id] = task;
    store.set("tasks", tasks);
    return true;
  });

  // 태스크 삭제하기
  ipcMain.handle("store:deleteTask", (_, id: string) => {
    const tasks = store.get("tasks");
    delete tasks[id];
    store.set("tasks", tasks);
    return true;
  });

  // 특정 키에 대한 데이터 가져오기 (확장성)
  ipcMain.handle("store:get", (_, key: string) => {
    return store.get(key);
  });

  // 특정 키에 데이터 저장하기 (확장성)
  ipcMain.handle("store:set", (_, key: string, value: any) => {
    store.set(key, value);
    return true;
  });
};
