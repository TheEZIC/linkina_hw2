import React, {FC, useEffect} from 'react';
import {Button, Flex, Modal, MultiSelect} from "@mantine/core";
import {useGroupsOptions} from "../../../hooks/useGroupsOptions";
import {FormBaseProps} from "../../../types";
import {useForm} from "@mantine/form";
import {Subject} from "../../../backend/entities/Subject.entity";
import {useTeachersOptions} from "../../../hooks/useTeachersOptions";
import {useGroupsStore} from "../../../stores/groupsStore";
import {useTeachersStore} from "../../../stores/teachersStore";
import {shallow} from "zustand/shallow";
import {useSubjectsStore} from "../../../stores/subjectsStore";

type AssignToSubjectFormType = {
  teachersIds: string[];
  groupsIds: string[];
};

export type AssignToSubjectFormProps = {
  subject?: Subject;
} & FormBaseProps;

type AssignFunction = (ids: number[], subjectId: number, remove: boolean) => Promise<unknown>;

const assignToSubject = async (currentIds: number[], ids: number[], subjectId: number, assignFunction: AssignFunction) => {
  const idsToAdd = ids.filter((id) => !currentIds.includes(id));
  const idsToRemove = ids.filter((id) => currentIds.includes(id));

  console.table({currentIds, ids, idsToAdd, idsToRemove});

  if (idsToAdd.length) {
    await assignFunction(idsToAdd, subjectId, false);
  }

  if (idsToRemove.length) {
    await assignFunction(idsToAdd, subjectId, true);
  }
};

const AssignToSubjectForm: FC<AssignToSubjectFormProps> = ({
  opened,
  close,
  subject,
}) => {
  if (!subject) {
    return null;
  }

  const [getAllGroups] = useGroupsStore(
    (state) => [state.getAll],
    shallow
  );

  const [getAllTeachers] = useTeachersStore(
    (state) => [state.getAll],
    shallow
  );

  const [getAllSubjects] = useSubjectsStore(
    (state) => [state.getAll],
    shallow
  );

  const form = useForm<AssignToSubjectFormType>();

  const groupsOptions = useGroupsOptions(subject.semester);
  const teachersOptions = useTeachersOptions();

  useEffect(() => {
    const groupsIds = subject.groups.map((g) => String(g.id));
    const teachersIds = subject.teachers.map((t) => String(t.id));

    form.setValues({
      groupsIds,
      teachersIds,
    });
  }, [opened, subject]);

  const onSubmit = async () => {
    const { teachersIds, groupsIds } = form.values;

    const teachersIdsNumber = teachersIds.map((id) => Number(id));
    const groupsIdsNumber = groupsIds.map((id) => Number(id));

    await window.API.subjectService.assignTeachers(teachersIdsNumber, subject.id);
    await window.API.subjectService.assignGroups(groupsIdsNumber, subject.id);

    // await assignToSubject(
    //   subject.teachers.map((t) => t.id),
    //   teachersIdsNumber,
    //   subject.id,
    //   window.API.subjectService.assignTeachers,
    // );
    //
    // await assignToSubject(
    //   subject.groups.map((g) => g.id),
    //   groupsIdsNumber,
    //   subject.id,
    //   window.API.subjectService.assignGroups,
    // );

    getAllSubjects();
    getAllTeachers();
    getAllGroups();

    close();
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      title={"Назначить предмету"}
      centered={true}
      overlayProps={{
        blur: 4
      }}
    >
      <form onSubmit={form.onSubmit(onSubmit)} style={{ height: "400px" }}>
        <Flex direction={"column"} gap={"sm"} pos={"relative"} h={"100%"}>
          <MultiSelect
            data={groupsOptions}
            label={"Группы"}
            placeholder={"Выберите группы"}
            searchable={true}
            maxDropdownHeight={300}
            {...form.getInputProps("groupsIds")}
          />
          <MultiSelect
            data={teachersOptions}
            label={"Преподаватели"}
            placeholder={"Выберите преподавателей"}
            searchable={true}
            maxDropdownHeight={300}
            {...form.getInputProps("teachersIds")}
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
};

export default AssignToSubjectForm;
