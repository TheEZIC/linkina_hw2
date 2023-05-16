import React, {FC, useEffect, useState} from 'react';
import {Button, Flex, Modal, TextInput} from "@mantine/core";
import {FormBaseProps, SaveEditFormProps} from "../../../types";
import {BaseTask} from "../../../backend/types/BaseTask";
import {useForm} from "@mantine/form";

type TaskFormType = {
  title: string;
  description: string;
};

export type TaskFormProps = FormBaseProps & SaveEditFormProps<BaseTask>;

const TaskForm: FC<TaskFormProps> = ({
  title,
  data,
  opened,
  close,
  onSave,
}) => {
  const form = useForm<TaskFormType>();

  useEffect(() => {
    form.setValues({
      title: data?.title ?? "",
      description: data?.description ?? "",
    });
  }, [opened, data]);

  const onSubmit = async () => {
    const { title } = form.values;

    if (!title) {
      return;
    }

    await onSave?.(form.values);
    close();
  };

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
            label={"Название задания"}
            placeholder={"Введите название задания"}
            withAsterisk={true}
            required={true}
            {...form.getInputProps("title")}
          />
          <TextInput
            label={"Описание задания"}
            placeholder={"Введите описание задания"}
            withAsterisk={true}
            required={true}
            {...form.getInputProps("description")}
          />
          <Flex gap={"sm"}>
            <Button color={"green"} type={"submit"}>Сохранить</Button>
          </Flex>
        </Flex>
      </form>
    </Modal>
  );
};

export default TaskForm;
