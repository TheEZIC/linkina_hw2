import React from "react";
import {ActionIcon, createStyles, Flex, Text} from "@mantine/core";
import {useUserStore} from "../../stores/userStore";
import {shallow} from "zustand/shallow";
import {BiLogOut} from "react-icons/bi";

const useStyles = createStyles((theme) => ({
  header: {
    backgroundColor: theme.colors.gray[3],
    height: 40,
    justifyContent: "space-between",
    alignItems: "center",
    userSelect: "none"
  },
}));

const Header = () => {
  const { classes } = useStyles();
  const [user, removeUser] = useUserStore(
    (state) => [state.user, state.removeUser],
    shallow
  );

  return (
    <Flex className={classes.header} px={"sm"}>
      <Text>{user.role}</Text>
      <Flex>
        <Text>{user.firstName} {user.lastName}</Text>
        <ActionIcon
          variant={"filled"}
          color={"blue.8"}
          ml={"sm"}
          onClick={() => removeUser()}
        >
          <BiLogOut/>
        </ActionIcon>
      </Flex>
    </Flex>
  );
};

export default Header;
