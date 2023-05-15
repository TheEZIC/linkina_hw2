export type SaveEditCallback<T extends object> = (obj: T) => unknown | Promise<unknown>;

export type SaveEditFormProps<T extends object> = {
  title: string;
  data?: T;
  onSave: SaveEditCallback<T>;
};
