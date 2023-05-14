export type BaseStore = {
  getAll: () => Promise<void>;
  clean: () => void;
};
