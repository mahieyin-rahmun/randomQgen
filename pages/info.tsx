import {
  Box,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import React from "react";
import MuiPaperWithStyle from "../components/custom/MuiPaperWithStyle";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    body: {
      fontSize: 20,
    },
  }),
);

function Info() {
  const classes = useStyles();

  return (
    <MuiPaperWithStyle>
      <Typography variant="h4">Why does this exist?</Typography>
      <Box ml={15} mr={15} mt={5} mb={5}>
        <Box>
          <Typography variant="body1" align="justify" className={classes.body}>
            Even though COVID-19 pandemic has stopped us in our tracks, we have
            tried our best to remain functional and productive by adopting work
            from home norm as the "new normal". Schools, colleges and
            universities have their classes going on online via Google Meet and
            Zoom, and workloads have been reduced keeping the situation in mind.
          </Typography>
        </Box>
        <Box mt={4}>
          <Typography variant="body1" align="justify" className={classes.body}>
            However, this also has made the reliance of students on online
            platforms such as Chegg and CourseHero kind of unavoidable. We
            understand that there might be little to no interest in studying in
            these trying times, but that doesn't mean that these platforms are
            good for education. This was especially apparent in the Fall 2020
            semester with rampant usage of online platforms in Take Home
            Assignments, and the irrevocable cancellation of scripts thereafter.
          </Typography>
        </Box>
        <Box mt={4}>
          <Typography variant="body1" align="justify" className={classes.body}>
            randomQgen aims to somewhat mitigate this issue by offering a way to
            generate question PDFs for each individual student from a specified
            selection of problems. It is not groundbreaking or anything, it is
            just a glorified random number generator, in layman terms. Turns
            out, randomness is quite powerful!
          </Typography>
        </Box>
      </Box>
    </MuiPaperWithStyle>
  );
}

export default Info;
