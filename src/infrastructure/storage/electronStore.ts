import Store from "electron-store";
import { Task } from "../../domain/task/entities";

interface StoreSchema {
  tasks: Record<string, Task>;
  [key: string]: any; // 추가적인 키 허용
}

export const store = new Store<StoreSchema>({
  name: "matrix-os-data",
  defaults: {
    tasks: {},
  },
}) as Store<StoreSchema> & {
  get<K extends keyof StoreSchema>(key: K): StoreSchema[K];
  set<K extends keyof StoreSchema>(key: K, value: StoreSchema[K]): void;
};
