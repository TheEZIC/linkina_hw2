import React from 'react';
import {Loader} from "@mantine/core";
import styles from "./index.module.scss";

const MainSpinner = () => {
  console.log("main spinner")

  return (
    <div className={styles.spinner}>
      <Loader />
    </div>
  );
};

export default MainSpinner;
