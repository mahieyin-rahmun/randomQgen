import { Box, Card, CardContent, createStyles, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Theme, Typography } from "@material-ui/core";
import React from "react";
import { IQuestionHolder, IQuestionHolderProps } from "../../../utils/types";

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    cardtitle: {
      fontSize: 20
    },
    cardbody: {
      textAlign: "left",
      caption: {
        textWeight: "bold"
      }
    }
  })
)

function Finalize(props: IQuestionHolderProps) {
  const {
    formValues: {
      isMultiPage,
      numberOfStudents,
      questionHolder,
      studentIdTextFile,
    },
  } = props;

  const classes = useStyles();

  const getQuestionFileNames = (questionHolder: IQuestionHolder, fileIndex?: number) => {
    let fileName: string = "";

    if (questionHolder.file) {
      if (questionHolder.file instanceof File) {
        fileName = `${fileIndex + 1}. ${questionHolder.file.name}`;
      } else {
        let fileList: FileList = questionHolder.file as FileList;
        let fileNames: string[] = [];

        for (let index = 0; index < fileList.length; index++) {
          fileNames.push(`${index + 1}. ${fileList[index].name}`);
        }

        fileName = fileNames.join("\n");
      }
    }

    return fileName;
  }

  return (
    <React.Fragment>
      <Typography variant="h6">Review and Finalize</Typography>

      <Box pt={4} pb={4} display="flex" justifyContent="center">
        <Card style={{ width: "50%" }} variant="outlined">
          <CardContent>
            <Typography variant="button" className={classes.cardtitle}>
              Here are the settings that you specified:
            </Typography>

            <Box pt={3} pl={5.5} pr={5.5}>
              <Typography variant="body1" component="p" className={classes.cardbody}>
                {`Multi Page Questions: ${isMultiPage.toUpperCase()}`}
              </Typography>
              <Typography variant="body1" component="p" className={classes.cardbody}>
                {`Number of students: ${numberOfStudents}`}
              </Typography>
              <Typography variant="body1" component="p" className={classes.cardbody}>
                {`Student ID Text File: ${studentIdTextFile ? studentIdTextFile.name : "None"}`}
              </Typography>
              <Typography variant="body1" component="p" className={classes.cardbody}>
                {`Question PDFs seleted: `}
              </Typography> <br/>

              <TableContainer component={Paper} elevation={5}>
                <Table size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Question</TableCell>
                      <TableCell align="center">Files</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {questionHolder.map((question, index) => (
                      <TableRow key={index}>
                        <TableCell align="center" component="th" scope="row">
                          {question.title}
                        </TableCell>
                        <TableCell align="center">
                          <div style={{ whiteSpace: "pre-wrap" }}>{getQuestionFileNames(question, index)}</div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </React.Fragment>
  );
}

export default Finalize;
