import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router";
import Layout from "../Layout";
import {Subject} from "../../backend/entities/Subject.entity";
import {ActionIcon, Button, Flex, Loader, Text, Title, Tooltip} from "@mantine/core";
import MainSpinner from "../MainSpinner";
import {useUserStore} from "../../stores/userStore";
import {shallow} from "zustand/shallow";
import Controls from "../Controls";
import {useDisclosure} from "@mantine/hooks";
import TaskForm from "./Forms/TaskForm";
import {SaveEditCallback} from "../../types";
import {BaseSubject} from "../../backend/types";
import {BaseTask} from "../../backend/types/BaseTask";
import DataTable from "../DataTable";
import {Task} from "../../backend/entities/Task.entity";
import {FaArrowRight, FaPen} from "react-icons/fa";
import {IdRouteParam} from "../../types/IdRouteParam";

const SubjectPage = () => {
  const navigate = useNavigate();
  const params = useParams<IdRouteParam>();
  const subjectId = Number(params.id);

  const [subject, setSubject] = useState<Subject>(null);
  const [formTitle, setFormTitle] = useState<string>("");
  const [taskFormOpened, { open: openTaskForm, close: closeTaskForm }] = useDisclosure(false);
  const [onSaveCallback, setOnSaveCallback] = useState<SaveEditCallback<BaseTask>>();
  const [currentTask, setCurrentTask] = useState<Task>();

  const [user] = useUserStore(
    (state) => [state.user],
    shallow
  );

  const getSubject = async () => {
    const subject = await window.API.subjectService.getById(subjectId);
    setSubject(subject);
  };

  useEffect(() => {
    getSubject();
  }, []);

  const openAddForm = () => {
    const callback: SaveEditCallback<BaseSubject> = async (subjectData) => {
      await window.API.taskService.create(subjectId, subjectData);
      getSubject();
    };

    setCurrentTask(undefined);
    setOnSaveCallback(() => callback);
    setFormTitle("Создать задачу");
    openTaskForm();
  };

  const openEditForm = (task: Task) => {
    const callback: SaveEditCallback<BaseSubject> = async (subjectData) => {
      await window.API.taskService.update(task.id, subjectData);
      getSubject();
    };

    setCurrentTask(task);
    setOnSaveCallback(() => callback);
    setFormTitle("Редактировать задачу");
    openTaskForm();
  };

  const navigateToTask = (taskId: number) => {
    navigate(`/task/${taskId}`);
  };

  const renderTasks = useCallback(() => subject?.tasks.map((t) => (
    <tr>
      <td>{t.id}</td>
      <td>{t.title}</td>
      <td>
        <Flex justify={"flex-end"} gap={"sm"}>
          {user.role === "teacher" && (
            <>
              <Tooltip
                label={"Редактировать группу"}
                withArrow={true}
              >
                <ActionIcon
                  variant={"filled"}
                  color={"orange.5"}
                  onClick={() => openEditForm(t)}
                >
                  <FaPen/>
                </ActionIcon>
              </Tooltip>
            </>
          )}
          <Flex justify={"flex-end"} gap={"sm"}>
            <Tooltip
              label={"Перейти"}
              withArrow={true}
            >
              <ActionIcon
                variant={"filled"}
                color={"orange.5"}
                onClick={() => navigateToTask(t.id)}
              >
                <FaArrowRight />
              </ActionIcon>
            </Tooltip>
          </Flex>
        </Flex>
      </td>
    </tr>
  )), [subject]);

  return (
    <>
      <Layout renderBackBtn={true}>
        {subject ? (
          <Flex direction={"column"} gap={"sm"} style={{ flex: 1 }}>
            <Title order={1}>{subject.title}</Title>
            <Title order={4}>Описание</Title>
            <Text>{subject.description}</Text>
            <Title order={4}>Преподаватели</Title>
            <Text>{subject.teachers.map((t) => `${t.lastName} ${t.firstName}`).join(", ")}</Text>
            <Title order={4}>Список заданий</Title>
            <DataTable renderFunction={renderTasks}>
              <tr>
                <th>#</th>
                <th>Название</th>
                <th></th>
              </tr>
            </DataTable>
          </Flex>
        ) : <Loader />}
        {user.role === "teacher" && (
          <Controls>
            <Button onClick={openAddForm}>Создать задание</Button>
          </Controls>
        )}
      </Layout>
      <TaskForm
        title={formTitle}
        opened={taskFormOpened}
        data={currentTask}
        close={closeTaskForm}
        onSave={onSaveCallback}
      />
    </>

  );
};

export default SubjectPage;
