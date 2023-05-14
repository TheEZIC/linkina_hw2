import React, {FC, PropsWithChildren} from 'react';
import {createStyles, Flex} from "@mantine/core";

export type ControlsProps = PropsWithChildren;

const useStyles = createStyles({
  controls: {
    width: "100%",
  },
});

const Controls: FC<ControlsProps> = ({ children }) => {
  const { classes } = useStyles();

  return (
    <Flex className={classes.controls} py={"sm"}>
      {children}
    </Flex>
  );
};

export default Controls;
