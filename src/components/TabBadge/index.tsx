import React, {FC} from 'react';
import {Badge, BadgeProps} from "@mantine/core";

export type TabBadgeProps = {
  data: unknown[];
} & Omit<BadgeProps, "children">;

const TabBadge: FC<TabBadgeProps> = ({ data, ...rest }) => data.length
  ? <Badge variant={"filled"} size={"xs"} {...rest}>{data.length}</Badge>
  : null;

export default TabBadge;
