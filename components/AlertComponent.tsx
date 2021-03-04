import React from "react";
import { Alert } from "@material-ui/lab";
import { Box, makeStyles, Theme, createStyles } from "@material-ui/core";

type TAlertComponentProps = {
  message: string;
  severity?: "error" | "warning" | "info" | "success";
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    alertComponent: {
      maxWidth: "60%",
    },
  }),
);

function AlertComponent(props: TAlertComponentProps) {
  const { message, severity } = props;
  const classes = useStyles();

  return (
    <Box m="auto" pt={1} pb={2} className={classes.alertComponent}>
      <Alert severity={severity || "info"}>{message}</Alert>
    </Box>
  );
}

export default AlertComponent;
