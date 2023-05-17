import React, {useCallback, useEffect, useState} from 'react';
import Layout from "../Layout";
import {useParams} from "react-router";
import {IdRouteParam} from "../../types/IdRouteParam";
import {Task} from "../../backend/entities/Task.entity";
import {Loader, Title, Text, Flex, ActionIcon} from "@mantine/core";
import DataTable from "../DataTable";
import {useUserStore} from "../../stores/userStore";
import {shallow} from "zustand/shallow";
import {FaPen} from "react-icons/fa";
import {useDisclosure} from "@mantine/hooks";
import {TaskResult} from "../../backend/entities/TaskResult.entity";
import SetMarkForm from "./Forms/SetMarkForm";

const TaskPage = () => {
  const params = useParams<IdRouteParam>();
  const taskId = Number(params.id);

  const [markFormOpened, { open: openMarkForm, close: closeMarkForm }] = useDisclosure(false);

  const [task, setTask] = useState<Task>();
  const [currentTaskResult, setCurrentTaskResult] = useState<TaskResult>();

  const [user] = useUserStore(
    (state) => [state.user], shallow
  );

  const getTask = useCallback(async () => {
    const task = user.role === "teacher"
      ? await window.API.taskService.getForTeacher(taskId, user.id)
      : await window.API.taskService.getForStudent(taskId, user.id);

    setTask(task);
  }, [taskId]);

  useEffect(() => {
    getTask();
  }, []);

  const openSetMark = (taskResult: TaskResult) => {
    setCurrentTaskResult(taskResult);
    openMarkForm();
  };

  const renderTasksResults = useCallback(() => task?.results.map((r) => (
    <tr>
      <td>{r.id}</td>
      <td>{r.mark}</td>
      <td>
        {user.role === "teacher"
          ? `${r.student.firstName} ${r.student.lastName}`
          : `${r.teacher.firstName} ${r.teacher.lastName}`
        }
      </td>
      <td>
        {user.role === "teacher" && (
          <Flex gap={"sm"} justify={"flex-end"}>
            <ActionIcon
              variant={"filled"}
              color={"purple.5"}
              onClick={() => openSetMark(r)}
            >
              <FaPen/>
            </ActionIcon>
          </Flex>
        )}
      </td>
    </tr>
  )), [task]);

  return (
    <>
      <Layout renderBackBtn={true}>
        {task ? (
          <>
            <Title order={2}>{task.title}</Title>
            <Text>{task.description}</Text>
            <Title order={4}>Результат</Title>
            <DataTable renderFunction={renderTasksResults}>
              <tr>
                <th>#</th>
                <th>Оценка</th>
                <th>{user.role === "teacher" ? "Имя студента" : "Имя преподавателя"}</th>
              </tr>
            </DataTable>
          </>
        ) : <Loader />}
      </Layout>
      <SetMarkForm
        opened={markFormOpened}
        close={closeMarkForm}
        data={currentTaskResult}
        getTask={getTask}
      />
    </>
  );
};

export default TaskPage;
