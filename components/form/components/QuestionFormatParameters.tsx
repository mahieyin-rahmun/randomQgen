import React from 'react';
import { TFormModel } from '../../../utils/types';

import { createStyles, Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import { Field } from 'formik';
import { Select, TextField, SimpleFileUpload } from 'formik-material-ui';


const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    formcontrol: {
      margin: theme.spacing(2),
      minWidth: "75%",
      padding: theme.spacing(2, 0, 2, 0)
    },
    inputlabel: {
      fontSize: "1rem",
      padding: theme.spacing(0, 0, 5, 0)
    },
    selectfield: {
      textAlign: "left"
    }
  })
)
function QuestionFormatParameters(props: TFormModel) {
  const { 
    formField: { 
      isMultiPage, 
      numberOfStudents, 
      studentIdTextFile 
    } 
  } = props;

  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h6">
        Question Format Parameters
      </Typography>

      <Grid container spacing={2} direction="column">
        <Grid item md={12}>
          <FormControl className={classes.formcontrol}>
            <InputLabel htmlFor={isMultiPage.name} className={classes.inputlabel}>
              {isMultiPage.label}
            </InputLabel>
            <Field
              component={Select}
              name={isMultiPage.name}    
              className={classes.selectfield}        
            >
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </Field>
          </FormControl>

          <FormControl className={classes.formcontrol}>
            <Field
              component={TextField}
              label={numberOfStudents.label}
              type="number"
              name={numberOfStudents.name}
            />
          </FormControl>

          <FormControl className={classes.formcontrol}>
            <Field
              component={SimpleFileUpload}
              label={studentIdTextFile.label}
              name={studentIdTextFile.name}
            />
            <Typography variant="caption" style={{ flexDirection: "row", display: "flex" }}>
              This will be used to set unique footers in each generated PDF.
            </Typography>
          </FormControl>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default QuestionFormatParameters
