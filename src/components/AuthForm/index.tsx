import React from "react";
import styles from "./index.module.scss";
import {Button, Card, Divider, Flex, Input, PasswordInput, Title} from "@mantine/core";
import {useUserStore} from "../../stores/userStore";
import {shallow} from "zustand/shallow";
import {useForm} from "@mantine/form";
import {notifications} from "@mantine/notifications";

type SignInFormType = {
  login: string;
  password: string;
};

type SignUpFormType = {
  login: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

const AuthForm = () => {
  const [setUser] = useUserStore(
    (state) => [state.setUser],
    shallow
  );

  const signInForm = useForm<SignInFormType>({
    initialValues: {
      login: "",
      password: "",
    },
  });

  const signUpForm = useForm<SignUpFormType>({
    initialValues: {
      login: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
  });

  const signIn = async () => {
    const { login, password } = signInForm.values;

    console.log("login", login, password)

    if (!login || !password) {
      return;
    }

    // here is login
    const userData = await window.API.authService.signIn(login, password);

    if (userData) {
      console.log(userData, "login data")
      setUser(userData);
    } else {
      console.log("wtf login")
      notifications.show({
        title: "Ошибка авторизации",
        message: "Нет пользователя с такими данными",
        color: "red",
      });
    }
  };

  const signUp = async (e: any) => {
    e.preventDefault();
    const { login, password, firstName, lastName, email } = signUpForm.values;

    if (!login || !password || !firstName || !lastName) {
      return;
    }

    const userData = await window.API.authService.signUp(
      {
        lastName,
        firstName,
      },
      {
        login,
        password,
      },
      email,
    );

    if (userData) {
      console.log(userData, "userData");
      setUser(userData);
    } else {
      notifications.show({
        title: "Ошибка регистрации",
        message: "Ошибка регистрации",
        color: "red",
      });
    }
  };

  return (
    <div className={styles.wrapper}>
      <Card shadow="sm" padding="lg" radius="md" withBorder style={{ width: "700px" }}>
        <Flex style={{ width: "100%" }}>
          <form onSubmit={signInForm.onSubmit(signIn)} style={{ flex: 1 }}>
            <Flex direction={"column"} gap={"sm"}>
              <Title order={3}>Авторизация</Title>
              <Input.Wrapper
                label={"Логин"}
                withAsterisk={true}
                required={true}
              >
                <Input placeholder={"Введите логин"} {...signInForm.getInputProps("login")}/>
              </Input.Wrapper>
              <Input.Wrapper
                label={"Пароль"}
                withAsterisk={true}
                required={true}
              >
                <PasswordInput placeholder={"Введите пароль"} {...signInForm.getInputProps("password")}/>
              </Input.Wrapper>
              <Flex justify={"space-between"}>
                <Button color="green" onClick={signIn} type={"submit"}>Войти</Button>
              </Flex>
            </Flex>
          </form>

          <Divider orientation={"vertical"} mx={"md"}/>

          <form onSubmit={signInForm.onSubmit(signUp)} style={{ flex: 1 }}>
            <Flex direction={"column"} gap={"sm"}>
              <Title order={3}>Регистрация</Title>
              <Input.Wrapper
                label={"Логин"}
                withAsterisk={true}
                required={true}
              >
                <Input placeholder={"Введите логин"} {...signUpForm.getInputProps("login")}/>
              </Input.Wrapper>
              <Input.Wrapper
                label={"Почта"}
                withAsterisk={true}
                required={true}
              >
                <Input placeholder={"Введите почту"} {...signUpForm.getInputProps("email")}/>
              </Input.Wrapper>
              <Input.Wrapper
                label={"Имя"}
                withAsterisk={true}
                required={true}
              >
                <Input placeholder={"Введите имя"} {...signUpForm.getInputProps("firstName")}/>
              </Input.Wrapper>
              <Input.Wrapper
                label={"Фамилия"}
                withAsterisk={true}
                required={true}
              >
                <Input placeholder={"Введите фамилию"} {...signUpForm.getInputProps("lastName")}/>
              </Input.Wrapper>
              <Input.Wrapper
                label={"Пароль"}
                withAsterisk={true}
                required={true}
              >
                <PasswordInput placeholder={"Введите пароль"} {...signUpForm.getInputProps("password")}/>
              </Input.Wrapper>
              <Flex justify={"space-between"}>
                <Button color="green" onClick={signUp} type={"submit"}>Зарегистрироваться</Button>
              </Flex>
            </Flex>
          </form>
        </Flex>
      </Card>
    </div>
  );
};

export default AuthForm;
