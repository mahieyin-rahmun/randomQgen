import React from "react";
import { IQuestionHolder } from "../utils/types";
import {
  Button,
  createStyles,
  makeStyles,
  Theme,
  Typography,
  TextField,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formcontrol: {
      padding: theme.spacing(1, 0, 1, 0),
      flexDirection: "row",
    },
    inputlabel: {
      marginRight: theme.spacing(2),
      marginTop: theme.spacing(2),
      display: "inline-block",
    },
    button: {
      margin: theme.spacing(0, 5, 0),
    },
  }),
);

interface Props {
  index: number;
  questionHolder: IQuestionHolder;
  multiple: boolean;
  handleFileUpload: (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  handleRemoveFileClick: (
    index: number,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
}

export default function AddQuestionPdf(props: Props) {
  const {
    index,
    questionHolder,
    multiple,
    handleFileUpload,
    handleRemoveFileClick,
  } = props;

  const classes = useStyles();

  let fileName: string = "";

  if (questionHolder.file) {
    if (questionHolder.file instanceof File) {
      fileName = questionHolder.file.name;
    } else {
      let fileList: FileList = questionHolder.file as FileList;
      let fileNames: string[] = [];

      for (let index = 0; index < fileList.length; index++) {
        fileNames.push(fileList[index].name);
      }

      fileName = fileNames.join(", ");
    }
  }

  return (
    <React.Fragment>
      <Typography variant="button" className={classes.inputlabel}>
        {questionHolder.title}
      </Typography>
      {multiple ? (
        <>
          <TextField
            type="file"
            InputProps={{
              inputProps: {
                accept: ".pdf",
                multiple: true,
              },
            }}
            variant="outlined"
            name={questionHolder.name}
            onChange={handleFileUpload.bind(this, index)}
            style={{ width: "40rem" }}
          />
        </>
      ) : (
        <>
          <TextField
            type="file"
            variant="outlined"
            InputProps={{
              inputProps: {
                accept: ".pdf",
              },
            }}
            name={questionHolder.name}
            style={{ width: "40rem" }}
            onChange={handleFileUpload.bind(this, index)}
          />
        </>
      )}
      <Button
        color="secondary"
        variant="contained"
        className={classes.button}
        onClick={handleRemoveFileClick.bind(this, index)}
      >
        Remove
      </Button>
      <br />
      <Typography variant="caption">{fileName}</Typography>
    </React.Fragment>
  );
}
