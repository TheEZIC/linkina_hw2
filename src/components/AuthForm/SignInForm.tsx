import React, {FC} from 'react';
import {Button, Card, Flex, Input, PasswordInput, Title} from "@mantine/core";
import {useForm} from "@mantine/form";
import {shallow} from "zustand/shallow";

type SignInFormType = {
  login: string;
  password: string;
};

export type SignInFormProps = {
  toggle: () => void;
};

const SignInForm: FC<SignInFormProps> = ({toggle}) => {
  const form = useForm<SignInFormType>({
    initialValues: {
      login: "",
      password: "",
    },
  });

  const signIn = async (e: any) => {
    e.preventDefault();
    const { login, password } = form.values;

    if (!login || !password) {
      return;
    }

    // here is login
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder style={{ width: "400px" }}>
      <form>
        <Flex direction={"column"} gap={"sm"}>
          <Title order={3}>Авторизация</Title>
          <Input.Wrapper
            label={"Логин"}
            withAsterisk={true}
            required={true}
          >
            <Input placeholder={"Введите логин"} {...form.getInputProps("login")}/>
          </Input.Wrapper>
          <Input.Wrapper
            label={"Пароль"}
            withAsterisk={true}
            required={true}
          >
            <PasswordInput placeholder={"Введите пароль"} {...form.getInputProps("password")}/>
          </Input.Wrapper>
          <Flex justify={"space-between"}>
            <Button color="green" onClick={signIn} type={"submit"}>Войти</Button>
            <Button color="yellow" onClick={toggle}>Регистрация</Button>
          </Flex>
        </Flex>
      </form>
    </Card>
  );
};

export default SignInForm;
