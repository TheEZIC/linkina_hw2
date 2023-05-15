type CreateAssignLabel<T extends { id: number }> = (item: T) => string;

export const createAssignOptions = <T extends { id: number }>(data: T[], createLabel: CreateAssignLabel<T>) => {
  return [
    { label: "Не установлено", value: "0" },
    ...data.map((g) => ({
      label: createLabel(g),
      value: String(g.id),
    })),
  ];
};
