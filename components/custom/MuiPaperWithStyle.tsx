import React from 'react';
import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

interface Props {
  children?: any
}

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      alignContent: "center",
      marginTop: "3vh",
      textAlign: "center",
      minHeight: "80vh",
      paddingTop: "1.75rem",
      paddingBottom: "1rem"
    }
  })
);

function MuiPaperWithStyle(props: Props) {
  const classes = useStyles();

  return (
    <Paper elevation={5} className={classes.root}>
      {props.children}
    </Paper>
  )
}

export default MuiPaperWithStyle;
