import React, {FC} from 'react';
import {Button, Card, Flex, Input, PasswordInput, Title} from "@mantine/core";
import {useForm} from "@mantine/form";

type SignUpFormType = {
  login: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type SignUpFormProps = {
  toggle: () => void;
};

const SignUpForm: FC<SignUpFormProps> = ({ toggle }) => {
  const form = useForm<SignUpFormType>({
    initialValues: {
      login: "",
      password: "",
      firstName: "",
      lastName: "",
    },
  });

  const signUp = async (e: any) => {
    e.preventDefault();
    const { login, password, firstName, lastName } = form.values;

    if (!login || !password || !firstName || !lastName) {
      return;
    }

    // here is register
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder style={{ width: "400px" }}>
      <form>
        <Flex direction={"column"} gap={"sm"}>
          <Title order={3}>Регистрация</Title>
          <Input.Wrapper
            label={"Логин"}
            withAsterisk={true}
            required={true}
          >
            <Input placeholder={"Введите логин"} {...form.getInputProps("login")}/>
          </Input.Wrapper>
          <Input.Wrapper
            label={"Имя"}
            withAsterisk={true}
            required={true}
          >
            <Input placeholder={"Введите имя"} {...form.getInputProps("firstName")}/>
          </Input.Wrapper>
          <Input.Wrapper
            label={"Фамилия"}
            withAsterisk={true}
            required={true}
          >
            <Input placeholder={"Введите фамилию"} {...form.getInputProps("lastName")}/>
          </Input.Wrapper>
          <Input.Wrapper
            label={"Пароль"}
            withAsterisk={true}
            required={true}
          >
            <PasswordInput placeholder={"Введите пароль"} {...form.getInputProps("password")}/>
          </Input.Wrapper>
          <Flex justify={"space-between"}>
            <Button color="green" onClick={signUp} type={"submit"}>Зарегистрироваться</Button>
            <Button color="yellow" onClick={toggle}>Авторизация</Button>
          </Flex>
        </Flex>
      </form>
    </Card>
  );
};

export default SignUpForm;
