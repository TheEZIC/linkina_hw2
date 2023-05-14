import React, {FC, PropsWithChildren} from 'react';
import {Container, createStyles, Flex} from "@mantine/core";
import Header from "../Header";

export type LayoutProps = PropsWithChildren;

const useStyles = createStyles((theme) => ({
  layout: {
    height: "100%",
    flex: 1,
    flexDirection: "column",
  },
  container: {
    width: "100%",
    flexDirection: "column",
    flexGrow: 1,
  },
}));

const Layout: FC<LayoutProps> = ({ children }) => {
  const {classes} = useStyles();

  return (
    <Flex className={classes.layout}>
      <Header/>
      <Flex className={classes.container} px={"sm"}>
        {children}
      </Flex>
    </Flex>
  );
};

export default Layout;
