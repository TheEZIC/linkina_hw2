import {useGroupsStore} from "../stores/groupsStore";
import {shallow} from "zustand/shallow";
import {createAssignOptions} from "../utils/createAssignOptions";
import {StudentGroup} from "../backend/entities/StudentGroup.entity";

const createLabel = (g: StudentGroup) => `${g.title} (${g.semester} семестр)`;

export const useGroupsOptions = (semester?: number, addEmpty = true) => {
  let [groups] = useGroupsStore(
    (state) => [state.groups],
    shallow,
  );

  if (semester) {
    groups = groups.filter((g) => g.semester === semester);
  }

  return createAssignOptions<StudentGroup>(groups, createLabel, addEmpty);
};
