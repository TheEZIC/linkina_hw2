import React, {FC, memo, useEffect} from 'react';
import {Button, Flex, Modal, Select, TextInput} from "@mantine/core";
import {FormBaseProps} from "../../../types/FormBaseProps";
import {useForm} from "@mantine/form";
import {BaseUser} from "../../../backend/types/BaseUser";
import {useStudentsStore} from "../../../stores/studentsStore";
import {shallow} from "zustand/shallow";
import {useGroupsStore} from "../../../stores/groupsStore";
import {useGroupsOptions} from "../../../hooks/useGroupsOptions";

type AssignGroupFormType = {
  groupId: string;
};

export type AssignGroupFormProps = {
  student?: BaseUser;
} & FormBaseProps;

const AssignGroupForm: FC<AssignGroupFormProps> = memo(({ opened, close, student }) => {
  if (!student) {
    return null;
  }

  const form = useForm<AssignGroupFormType>();

  const [groups, getAllGroups] = useGroupsStore(
    (state) => [state.groups, state.getAll],
    shallow,
  );

  const [getAllStudents] = useStudentsStore(
    (state) => [state.getAll],
    shallow
  );

  useEffect(() => {
    const groupId = String(student?.group?.id ?? "")

    form.setValues({
      groupId,
    });
  }, [opened, student]);

  const onSubmit = async () => {
    let { groupId } = form.values;

    if (groupId === "0") {
      groupId = undefined;
    }

    await window.API.studentService.setGroup(
      [student.id],
      groupId ? Number(groupId) : undefined
    );

    getAllGroups();
    getAllStudents();
    close();
  };

  const options = useGroupsOptions();

  return (
    <Modal
      opened={opened}
      onClose={close}
      title={"Назначить группу"}
      centered={true}
      overlayProps={{
        blur: 4
      }}
    >
      <form onSubmit={form.onSubmit(onSubmit)} style={{ height: "400px" }}>
        <Flex direction={"column"} gap={"sm"} pos={"relative"} h={"100%"}>
          <Select
            data={options}
            label={"Выберите группу студента"}
            placeholder={"Выберите группу студента"}
            searchable={true}
            maxDropdownHeight={300}
            {...form.getInputProps("groupId")}
          />
          <Flex direction={"column"} gap={"sm"} pos={"absolute"} bottom={0}>
            <Flex gap={"sm"}>
              <Button color={"green"} type={"submit"}>Сохранить</Button>
            </Flex>
          </Flex>
        </Flex>
      </form>
    </Modal>
  );
});

export default AssignGroupForm;
