import React, {FC, useEffect} from 'react';
import {Button, Flex, Modal, TextInput} from "@mantine/core";
import {FormBaseProps} from "../../../types/FormBaseProps";
import {useForm} from "@mantine/form";
import {SaveEditFormProps} from "../../../types/SaveEditFormProps";
import {BaseSubject} from "../../../backend/types";
import {useSubjectsStore} from "../../../stores/subjectsStore";
import {shallow} from "zustand/shallow";

type SubjectFormType = {
  title: string;
  description: string;
  semester: number;
};

export type SubjectFormProps = FormBaseProps & SaveEditFormProps<BaseSubject>;

const SubjectForm: FC<SubjectFormProps> = ({
  title,
  data,
  opened,
  close,
  onSave,
}) => {
  const form = useForm<SubjectFormType>();

  const [getAll] = useSubjectsStore(
    (state) => [state.getAll],
    shallow
  );

  useEffect(() => {
    form.setValues({
      title: data?.title ?? "",
      description: data?.description ?? "",
      semester: data?.semester ?? 0,
    });
  }, [opened, data]);

  const onSubmit = async () => {
    const { title, semester } = form.values;

    console.log(form.values, onSave, "form values");

    if (!title || !semester) {
      return;
    }

    await onSave?.(form.values);
    getAll();
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
            label={"Название предмета"}
            placeholder={"Введите название группы"}
            withAsterisk={true}
            required={true}
            {...form.getInputProps("title")}
          />
          <TextInput
            label={"Описание предмета"}
            placeholder={"Введите описание предмета"}
            withAsterisk={true}
            required={true}
            {...form.getInputProps("description")}
          />
          <TextInput
            label={"Введите семестр предмета"}
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
};

export default SubjectForm;
