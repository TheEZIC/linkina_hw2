import React, {useEffect} from 'react';
import {Badge, Tabs} from "@mantine/core";
import GroupsTab from "./Tabs/GroupsTab";
import {useTabsStyles} from "../../styles/tabs.styles";
import StudentsTab from "./Tabs/StudentsTab";
import {useGroupsStore} from "../../stores/groupsStore";
import {shallow} from "zustand/shallow";
import {useStudentsStore} from "../../stores/studentsStore";
import {BiGroup} from "react-icons/bi";
import {MdBackpack} from "react-icons/md";
import {FaBook, FaGraduationCap} from "react-icons/fa";
import {useSubjectsStore} from "../../stores/subjectsStore";
import SubjectsTab from "./Tabs/SubjectsTab";

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

  useEffect(() => {
    getAllGroups();
    getAllStudents();
    getAllSubjects();
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
          rightSection={groups.length && <Badge variant={"filled"} size={"xs"}>{groups.length}</Badge>}
        >
          Группы
        </Tabs.Tab>
        <Tabs.Tab
          value={"subjects"}
          icon={<FaBook />}
        >
          Предметы
        </Tabs.Tab>
        <Tabs.Tab
          value={"teachers"}
          icon={<FaGraduationCap/>}
        >
          Учителя
        </Tabs.Tab>
        <Tabs.Tab
          value={"students"}
          icon={<MdBackpack />}
          rightSection={students.length && <Badge variant={"filled"} size={"xs"}>{students.length}</Badge>}
        >
          Студенты
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value={"groups"} pt="xs">
        <GroupsTab />
      </Tabs.Panel>

      <Tabs.Panel value={"subjects"} pt="xs">
        <SubjectsTab />
      </Tabs.Panel>

      <Tabs.Panel value={"teachers"} pt="xs">
        Учителя
      </Tabs.Panel>

      <Tabs.Panel value={"students"} pt="xs">
        <StudentsTab />
      </Tabs.Panel>
    </Tabs>
  );
};

export default AdminInterface;
