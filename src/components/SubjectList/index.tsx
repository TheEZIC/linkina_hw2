import React, {useCallback, useEffect} from 'react';
import DataTable from "../DataTable";
import {useSubjectsStore} from "../../stores/subjectsStore";
import {shallow} from "zustand/shallow";
import {ActionIcon, Flex, Tooltip} from "@mantine/core";
import {FaArrowRight, FaPen, FaPlus, FaTimes} from "react-icons/fa";
import {useNavigate} from "react-router";

const SubjectList = () => {
  const navigate = useNavigate();

  const [subjects, getAllSubjects] = useSubjectsStore(
    (state) => [state.subjects, state.getAll],
    shallow
  );

  useEffect(() => {
    getAllSubjects();
  }, []);

  const navigateToSubject = (subjectId: number) => {
    navigate(`/subject/${subjectId}`);
  };

  const renderSubjects = useCallback(() => subjects.map((s) => {
    const studentsCount = s.groups.reduce((a, g) => a + g.students.length, 0);

    return (
      <tr key={`student-${s.id}`}>
        <td>{s.id}</td>
        <td>{s.title}</td>
        <td>{s.description}</td>
        <td>{s.semester}</td>
        <td>{s.teachers.length}</td>
        <td>{s.groups.length}</td>
        <td>{studentsCount}</td>
        <td>
          <Flex justify={"flex-end"} gap={"sm"}>
            <Tooltip
              label={"Перейти"}
              withArrow={true}
            >
              <ActionIcon
                variant={"filled"}
                color={"orange.5"}
                onClick={() => navigateToSubject(s.id)}
              >
                <FaArrowRight />
              </ActionIcon>
            </Tooltip>
          </Flex>
        </td>
      </tr>
    );
  }), [subjects]);

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
    </>
  );
};

export default SubjectList;
