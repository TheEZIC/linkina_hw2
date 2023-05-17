import React, {FC, PropsWithChildren} from 'react';
import {Container, createStyles, Flex} from "@mantine/core";
import Header from "../Header";

export type LayoutProps = {
  renderBackBtn?: boolean;
} & PropsWithChildren;

const useStyles = createStyles((theme) => ({
  layout: {
    height: "100%",
    flex: 1,
    flexDirection: "column",
    overflow: "hidden",
  },
  container: {
    width: "100%",
    flexDirection: "column",
    flexGrow: 1,
    overflowY: "auto",
    overflowX: "hidden",
  },
}));

const Layout: FC<LayoutProps> = ({ children, renderBackBtn }) => {
  const {classes} = useStyles();

  return (
    <Flex className={classes.layout}>
      <Header renderBackBtn={renderBackBtn}/>
      <Flex className={classes.container} px={"sm"}>
        {children}
      </Flex>
    </Flex>
  );
};

export default Layout;
