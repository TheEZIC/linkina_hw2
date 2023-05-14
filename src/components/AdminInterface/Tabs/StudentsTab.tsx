import React, {useCallback, useState} from 'react';
import {ActionIcon, Flex, Table, Tooltip} from "@mantine/core";
import {useStudentsStore} from "../../../stores/studentsStore";
import {shallow} from "zustand/shallow";
import {AiOutlineUsergroupAdd} from "react-icons/ai";
import AssignGroupForm from "../Forms/AssignGroupForm";
import {useDisclosure} from "@mantine/hooks";
import {BaseUser} from "../../../backend/types/BaseUser";
import {FaTimes} from "react-icons/fa";
import DataTable from "../../DataTable";

const StudentsTab = () => {
  const [assignGroupOpened, { open: openAssignGroup, close: closeAssignGroup }] = useDisclosure(false);
  const [currentStudent, setCurrentStudent] = useState<BaseUser>();

  const [students, getAll] = useStudentsStore(
    (state) => [state.students, state.getAll],
    shallow
  );

  const openAssignGroupForm = (student: BaseUser) => {
    setCurrentStudent(student);
    openAssignGroup();
  };

  const removeStudent = async (studentId: number) => {
    await window.API.userService.delete(studentId);
    getAll();
  };

  const renderStudents = useCallback(() => students.map((s) => (
    <tr key={`student-${s.id}`}>
      <td>{s.id}</td>
      <td>{s.firstName}</td>
      <td>{s.lastName}</td>
      <td>{s.group ? s.group.title : "Нету"}</td>
      <td>
        <Flex justify={"flex-end"} gap={"sm"}>
          <Tooltip
            label={"Добавить студента в группу"}
            withArrow={true}
          >
            <ActionIcon
              variant={"filled"}
              color={"green.7"}
              onClick={() => openAssignGroupForm(s)}
            >
              <AiOutlineUsergroupAdd/>
            </ActionIcon>
          </Tooltip>
          <Tooltip
            label={"Удалить студента"}
            withArrow={true}
          >
            <ActionIcon
              variant={"filled"}
              color={"red.5"}
              onClick={() => removeStudent(s.id)}
            >
              <FaTimes/>
            </ActionIcon>
          </Tooltip>
        </Flex>
      </td>
    </tr>
  )), [students]);

  return (
    <>
      <DataTable renderFunction={renderStudents}>
        <tr>
          <th>#</th>
          <th>Имя</th>
          <th>Фамилия</th>
          <th>Группа</th>
          <th></th>
        </tr>
      </DataTable>
      <AssignGroupForm
        opened={assignGroupOpened}
        close={closeAssignGroup}
        student={currentStudent}
      />
    </>
  );
};

export default StudentsTab;
