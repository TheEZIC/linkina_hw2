import React, {FC, memo, useCallback, useEffect} from 'react';
import {FormBaseProps} from "../../../types/FormBaseProps";
import {useForm} from "@mantine/form";
import {useGroupsStore} from "../../../stores/groupsStore";
import {shallow} from "zustand/shallow";
import {Button, Flex, Modal, TextInput} from "@mantine/core";
import {StudentGroup} from "../../../backend/entities/StudentGroup.entity";

type GroupFormType = {
  title: string;
  semester: number;
};

export type GroupSaveData = Omit<StudentGroup, "id" | "students">;
export type OnGroupSaveCallback = (groupData?: GroupSaveData) => void | Promise<void>;

export type GroupFormProps = {
  title: string;
  initialValues?: Partial<GroupFormType>;
  onSave?: OnGroupSaveCallback;
} & FormBaseProps;

const GroupForm: FC<GroupFormProps> = memo(({
  title,
  initialValues,
  opened,
  close,
  onSave,
}) => {
  const form = useForm<GroupFormType>();
  const [getAll] = useGroupsStore(
    (state) => [state.getAll],
    shallow
  );

  useEffect(() => {
    form.setValues({
      title: initialValues?.title ?? "",
      semester: initialValues?.semester ?? 0,
    });
  }, [initialValues, opened]);

  const onSubmit = useCallback(async () => {
    const { title, semester } = form.values;

    console.log(title, semester, onSave, "w")

    if (!title || !semester) {
      return;
    }

    await onSave?.(form.values);
    getAll();
    close();
  }, [form]);

  return (
    <Modal
      opened={opened}
      onClose={close}
      title={title}
      centered={true}
      overlayProps={{
        blur: 4
      }}
    >
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Flex direction={"column"} gap={"sm"}>
          <TextInput
            label={"Название группы"}
            placeholder={"Введите название группы"}
            withAsterisk={true}
            required={true}
            {...form.getInputProps("title")}
          />
          <TextInput
            label={"Введите семестр группы"}
            placeholder={"Введите семестр группы"}
            withAsterisk={true}
            required={true}
            {...form.getInputProps("semester")}
          />
          <Flex gap={"sm"}>
            <Button color={"green"} type={"submit"}>Сохранить</Button>
          </Flex>
        </Flex>
      </form>
    </Modal>
  );
});

export default GroupForm;
