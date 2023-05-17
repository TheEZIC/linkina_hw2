import React, {FC, useEffect} from 'react';
import {Button, Flex, Modal, NumberInput, TextInput} from "@mantine/core";
import {useForm} from "@mantine/form";
import {FormBaseProps} from "../../../types";
import {TaskResult} from "../../../backend/entities/TaskResult.entity";

type SetMarkFormType = {
  mark: number;
};

export type SetMarkFormProps = {
  data: TaskResult;
  getTask: () => Promise<void>;
} & FormBaseProps;

const SetMarkForm: FC<SetMarkFormProps> = ({
  opened,
  close,
  data,
  getTask,
}) => {
  if (!data) {
    return null;
  }

  const form = useForm<SetMarkFormType>();

  useEffect(() => {
    form.setValues({
      mark: data.mark ?? 3,
    });
  }, [opened, data])

  const onSubmit = async () => {
    await window.API.taskService.setMark(data.id, form.values.mark);
    getTask();
    close();
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      title={"Поставить оценку"}
      centered={true}
      overlayProps={{
        blur: 4
      }}
    >
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Flex direction={"column"} gap={"sm"}>
          <NumberInput
            label={"Оценка"}
            placeholder={"Введите оценку"}
            withAsterisk={true}
            required={true}
            min={3}
            max={5}
            {...form.getInputProps("mark")}
          />
          <Flex gap={"sm"}>
            <Button color={"green"} type={"submit"}>Сохранить</Button>
          </Flex>
        </Flex>
      </form>
    </Modal>
  );
};

export default SetMarkForm;
