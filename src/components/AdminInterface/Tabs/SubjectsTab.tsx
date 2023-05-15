import React, {useCallback, useState} from 'react';
import DataTable from "../../DataTable";
import {useSubjectsStore} from "../../../stores/subjectsStore";
import {shallow} from "zustand/shallow";
import {ActionIcon, Button, Flex, Tooltip} from "@mantine/core";
import {FaPen, FaPlus, FaTimes} from "react-icons/fa";
import Controls from "../../Controls";
import SubjectForm from "../Forms/SubjectForm";
import {useDisclosure} from "@mantine/hooks";
import {SaveEditCallback} from "../../../types";
import {BaseSubject} from "../../../backend/types";
import {Subject} from "../../../backend/entities/Subject.entity";
import AssignToSubjectForm from "../Forms/AssignToSubjectForm";

const SubjectsTab = () => {
  const [subjectFormOpened, { open: openSubjectForm, close: closeSubjectForm }] = useDisclosure(false);
  const [assignOpened, { open: openAssign, close: closeAssign }] = useDisclosure(false);

  const [currentSubject, setCurrentSubject] = useState<Subject>();

  const [formTitle, setFormTitle] = useState<string>("");
  const [onSaveCallback, setOnSaveCallback] = useState<SaveEditCallback<BaseSubject>>();

  const [subjects, getAllSubjects] = useSubjectsStore(
    (state) => [state.subjects, state.getAll],
    shallow
  );

  const openAddForm = () => {
    const callback: SaveEditCallback<BaseSubject> = async (subjectData) => {
      await window.API.subjectService.create(subjectData);
    };

    setCurrentSubject(undefined);
    setFormTitle("Создать предмет");
    setOnSaveCallback(() => callback);
    openSubjectForm();
  };

  const openEditForm = (subject: Subject) => {
    const callback: SaveEditCallback<BaseSubject> = async (subjectData) => {
      await window.API.subjectService.update(subject.id, subjectData);
    };

    setCurrentSubject(subject);
    setFormTitle("Редактирование предмета");
    setOnSaveCallback(() => callback);
    openSubjectForm();
  };

  const openAssignForm = (subject: Subject) => {
    console.log("openAssignForm")
    setCurrentSubject(subject);
    openAssign();
  };

  const removeSubject = async (subjectId: number) => {
    console.log(subjectId, "subject id")
    await window.API.subjectService.delete(subjectId);
    getAllSubjects();
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
              label={"Добавить группы/преподавателей"}
              withArrow={true}
            >
              <ActionIcon
                variant={"filled"}
                color={"green.5"}
                onClick={() => openAssignForm(s)}
              >
                <FaPlus/>
              </ActionIcon>
            </Tooltip>
            <Tooltip
              label={"Редактировать группу"}
              withArrow={true}
            >
              <ActionIcon
                variant={"filled"}
                color={"orange.5"}
                onClick={() => openEditForm(s)}
              >
                <FaPen/>
              </ActionIcon>
            </Tooltip>
            <Tooltip
              label={"Удалить студента"}
              withArrow={true}
            >
              <ActionIcon
                variant={"filled"}
                color={"red.5"}
                onClick={() => removeSubject(s.id)}
              >
                <FaTimes/>
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
      <Controls>
        <Button onClick={openAddForm}>Добавить предмет</Button>
      </Controls>
      <SubjectForm
        opened={subjectFormOpened}
        close={closeSubjectForm}
        data={currentSubject}
        title={formTitle}
        onSave={onSaveCallback}
      />
      <AssignToSubjectForm
        opened={assignOpened}
        close={closeAssign}
        subject={currentSubject}
      />
    </>
  );
};

export default SubjectsTab;
