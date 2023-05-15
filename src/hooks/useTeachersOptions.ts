import {useTeachersStore} from "../stores/teachersStore";
import {shallow} from "zustand/shallow";
import {BaseUser} from "../backend/types";
import {createAssignOptions} from "../utils/createAssignOptions";

const createLabel = (teacher: BaseUser) => `${teacher.firstName} ${teacher.lastName}`;

export const useTeachersOptions = () => {
  const [teachers] = useTeachersStore(
    (state) => [state.teachers, state.getAll],
    shallow
  );

  return createAssignOptions<BaseUser>(teachers, createLabel);
};
