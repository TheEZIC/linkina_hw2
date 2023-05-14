import {createStyles} from "@mantine/core";

export const useTabsStyles = createStyles({
  root: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  panel: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  tabContent: {
    width: "100%",
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
    overflowX: "auto",
  },
});
