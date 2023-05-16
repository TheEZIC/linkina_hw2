import React, {FC} from "react";
import {ActionIcon, createStyles, Flex, Text, Tooltip} from "@mantine/core";
import {useUserStore} from "../../stores/userStore";
import {shallow} from "zustand/shallow";
import {BiLogOut} from "react-icons/bi";
import {useNavigate} from "react-router";
import {FaArrowLeft} from "react-icons/fa";

export type HeaderProps = {
  renderBackBtn?: boolean;
};

const useStyles = createStyles((theme) => ({
  header: {
    backgroundColor: theme.colors.gray[3],
    height: 40,
    justifyContent: "space-between",
    alignItems: "center",
    userSelect: "none"
  },
}));

const Header: FC<HeaderProps> = ({ renderBackBtn = false }) => {
  const navigate = useNavigate();
  const { classes } = useStyles();
  const [user, removeUser] = useUserStore(
    (state) => [state.user, state.removeUser],
    shallow
  );

  return (
    <Flex className={classes.header} px={"sm"}>
      <Flex gap={"sm"}>
        {renderBackBtn && <Tooltip label={"Назад"}>
          <ActionIcon
            variant={"filled"}
            color={"purple.5"}
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft/>
          </ActionIcon>
        </Tooltip>}
        <Text>{user.role}</Text>
      </Flex>
      <Flex gap={"sm"}>
        <Text>{user.firstName} {user.lastName}</Text>
        <Tooltip label={"Выйти с аккаунта"}>
          <ActionIcon
            variant={"filled"}
            color={"blue.8"}
            onClick={() => removeUser()}
          >
            <BiLogOut />
          </ActionIcon>
        </Tooltip>
      </Flex>
    </Flex>
  );
};

export default Header;
