import React, {useEffect} from 'react';
import {Tabs} from "@mantine/core";
import AdminGroupsTab from "./Tabs/AdminGroupsTab";
import {useTabsStyles} from "../../styles/tabs.styles";
import AdminStudentsTab from "./Tabs/AdminStudentsTab";
import {useGroupsStore} from "../../stores/groupsStore";
import {shallow} from "zustand/shallow";
import {useStudentsStore} from "../../stores/studentsStore";
import {BiGroup} from "react-icons/bi";
import {MdBackpack} from "react-icons/md";
import {FaBook, FaGraduationCap} from "react-icons/fa";
import {useSubjectsStore} from "../../stores/subjectsStore";
import AdminSubjectsTab from "./Tabs/AdminSubjectsTab";
import TabBadge from "../TabBadge";
import {useTeachersStore} from "../../stores/teachersStore";

const AdminInterface = () => {
  const { classes } = useTabsStyles();

  const [groups, getAllGroups] = useGroupsStore(
    (state) => [state.groups, state.getAll],
    shallow,
  );

  const [students, getAllStudents] = useStudentsStore(
    (state) => [state.students, state.getAll],
    shallow
  );

  const [subjects, getAllSubjects] = useSubjectsStore(
    (state) => [state.subjects, state.getAll],
    shallow
  );

  const [teachers, getAllTeachers] = useTeachersStore(
    (state) => [state.teachers, state.getAll],
    shallow
  );

  useEffect(() => {
    getAllGroups();
    getAllStudents();
    getAllSubjects();
    getAllTeachers();
  }, []);

  return (
    <Tabs defaultValue={"groups"} classNames={{
      root: classes.root,
      panel: classes.panel,
    }}>
      <Tabs.List>
        <Tabs.Tab
          value={"groups"}
          icon={<BiGroup />}
          rightSection={<TabBadge data={groups} />}
        >
          Группы
        </Tabs.Tab>
        <Tabs.Tab
          value={"subjects"}
          icon={<FaBook />}
          rightSection={<TabBadge data={subjects} />}
        >
          Предметы
        </Tabs.Tab>
        <Tabs.Tab
          value={"students"}
          icon={<MdBackpack />}
          rightSection={<TabBadge data={students} />}
        >
          Студенты
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value={"groups"} pt="xs">
        <AdminGroupsTab />
      </Tabs.Panel>

      <Tabs.Panel value={"subjects"} pt="xs">
        <AdminSubjectsTab />
      </Tabs.Panel>

      <Tabs.Panel value={"students"} pt="xs">
        <AdminStudentsTab />
      </Tabs.Panel>
    </Tabs>
  );
};

export default AdminInterface;
