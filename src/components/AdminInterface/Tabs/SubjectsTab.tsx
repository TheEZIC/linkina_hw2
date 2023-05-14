import React, {useCallback} from 'react';
import DataTable from "../../DataTable";
import {useSubjectsStore} from "../../../stores/subjectsStore";
import {shallow} from "zustand/shallow";
import {ActionIcon, Button, Flex, Tooltip} from "@mantine/core";
import {AiOutlineUsergroupAdd} from "react-icons/ai";
import {FaTimes} from "react-icons/fa";
import Controls from "../../Controls";

const SubjectsTab = () => {
  const [subjects, getAllSubjects] = useSubjectsStore(
    (state) => [state.subjects, state.getAll],
    shallow
  );

  const renderSubjects = useCallback(() => subjects.map((s) => {
    const studentsCount = s.studentGroups.reduce((a, g) => a + g.students.length, 0);

    return (
      <tr key={`student-${s.id}`}>
        <td>{s.id}</td>
        <td>{s.title}</td>
        <td>{s.description}</td>
        <td>{s.teachers.length}</td>
        <td>{s.studentGroups.length}</td>
        <td>{studentsCount}</td>
        <td>
        </td>
      </tr>
    );
  }), []);

  return (
    <>
      <DataTable renderFunction={renderSubjects}>
        <tr>
          <th>#</th>
          <th>Название</th>
          <th>Описание</th>
          <th>Семестр</th>
          <th>Кол-во преподавателей</th>
          <th>Кол-во групп</th>
          <th>Кол-во студентов</th>
          <th></th>
        </tr>
      </DataTable>
      <Controls>
        <Button>Добавить предмет</Button>
      </Controls>
    </>
  );
};

export default SubjectsTab;
