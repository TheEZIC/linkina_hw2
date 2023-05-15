type CreateAssignLabel<T extends { id: number }> = (item: T) => string;

export const createAssignOptions = <T extends { id: number }>(data: T[], createLabel: CreateAssignLabel<T>, addEmpty = true) => {
  let options = [];

  if (addEmpty) {
    options.push({ label: "Не установлено", value: "0" });
  }

  const createdOptions = data.map((g) => ({
    label: createLabel(g),
    value: String(g.id),
  }));

  options = [...options, ...createdOptions];

  return options;
};
