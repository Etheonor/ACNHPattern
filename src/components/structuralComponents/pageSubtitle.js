import React from "react";
import styles from "./pageSubtitle.module.scss";
import Paper from '@material-ui/core/Paper';

const pageSubtitle = (props) => {
  return (
    <Paper className={styles.paper}>
      <h2>{props.title}</h2>
    </Paper>
  );
};

export default pageSubtitle;
