import React, {useCallback, useState} from 'react';
import {ActionIcon, Button, Flex, Table, Tooltip} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import Controls from "../../Controls";
import {useGroupsStore} from "../../../stores/groupsStore";
import {shallow} from "zustand/shallow";
import GroupForm from "../Forms/GroupForm";
import {StudentGroup} from "../../../backend/entities/StudentGroup.entity";
import {FaPen, FaTimes} from "react-icons/fa";
import DataTable from "../../DataTable";
import {SaveEditCallback} from "../../../types/SaveEditFormProps";
import {BaseStudentGroup} from "../../../backend/types";

const AdminGroupsTab = () => {
  const [groupFormOpened, { open: openGroupForm, close: closeGroupForm }] = useDisclosure(false);
  const [formTitle, setFormTitle] = useState<string>("");
  const [onSaveCallback, setOnSaveCallback] = useState<SaveEditCallback<BaseStudentGroup>>();
  const [currentGroup, setCurrentGroup] = useState<StudentGroup>();

  const [groups, getAll] = useGroupsStore(
    (state) => [state.groups, state.getAll],
    shallow,
  );

  const openAddForm = () => {
    const callback: SaveEditCallback<BaseStudentGroup> = async (groupData) => {
      await window.API.studentGroupService.create(groupData);
    };

    setCurrentGroup(undefined);
    setFormTitle("Создание группы");
    setOnSaveCallback(() => callback);
    openGroupForm();
  };

  const openEditForm = (group: StudentGroup) => {
    const callback: SaveEditCallback<BaseStudentGroup> = async (groupData) => {
      await window.API.studentGroupService.update(group.id, groupData);
    };

    setCurrentGroup(group);
    setFormTitle("Редактирование группы");
    setOnSaveCallback(() => callback);
    openGroupForm();
  };

  const removeGroup = async (orderId: number) => {
    await window.API.studentGroupService.delete(orderId);
    getAll();
  };

  const renderGroups = useCallback(() => groups.map((g) => (
    <tr key={`group-${g.id}`}>
      <td>{g.id}</td>
      <td>{g.title}</td>
      <td>{g.semester}</td>
      <td>{g.students.length}</td>
      <td>
        <Flex justify={"flex-end"} gap={"sm"}>
          <Tooltip
            label={"Редактировать группу"}
            withArrow={true}
          >
            <ActionIcon
              variant={"filled"}
              color={"orange.5"}
              onClick={() => openEditForm(g)}
            >
              <FaPen/>
            </ActionIcon>
          </Tooltip>
          <Tooltip
            label={"Удалить группы"}
            withArrow={true}
          >
            <ActionIcon
              variant={"filled"}
              color={"red.5"}
              onClick={() => removeGroup(g.id)}
            >
              <FaTimes/>
            </ActionIcon>
          </Tooltip>
        </Flex>
      </td>
    </tr>
  )), [groups]);

  return (
    <>
      <DataTable renderFunction={renderGroups}>
        <tr>
          <th>#</th>
          <th>Название</th>
          <th>Семестр</th>
          <th>Кол-во студентов</th>
          <th></th>
        </tr>
      </DataTable>
      <Controls>
        <Button onClick={openAddForm}>Добавить группу</Button>
      </Controls>
      <GroupForm
        title={formTitle}
        opened={groupFormOpened}
        close={closeGroupForm}
        data={currentGroup}
        onSave={onSaveCallback}
      />
    </>
  );
};

export default AdminGroupsTab;
