import React from 'react';
import {Loader} from "@mantine/core";
import styles from "./index.module.scss";

const MainSpinner = () => {

  return (
    <div className={styles.spinner}>
      <Loader />
    </div>
  );
};

export default MainSpinner;
