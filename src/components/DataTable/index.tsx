import React, {FC, PropsWithChildren, ReactNode} from 'react';
import {useTabsStyles} from "../../styles/tabs.styles";
import {Flex, Table} from "@mantine/core";

export type DataTableProps = {
  renderFunction: () => ReactNode;
} & PropsWithChildren;

const DataTable: FC<DataTableProps> = ({ children, renderFunction }) => {
  const { classes: tabContentClasses } = useTabsStyles();

  return (
    <Flex className={tabContentClasses.tabContent}>
      <Table striped={true}>
        <thead>
        {children}
        </thead>
        <tbody>{renderFunction()}</tbody>
      </Table>
    </Flex>
  );
};

export default DataTable;
