import React from 'react';
import { makeStyles } from '@material-ui/core';
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";

const useStyles = makeStyles(() => ({
  errorHelper: {
    marginBottom: '0.25rem'
  },
  input: {
    marginBottom: '1.5rem'
  }
}));

const KrispyInput = ({ error, describedBy, ...props }) => {
  const classes = useStyles();
  return <>
    <Input
      className={!error? classes.input : ''}
      aria-describedby={describedBy}
      { ...props }
    />
    {error && (
      <FormHelperText id={describedBy} className={classes.errorHelper}>
        { error.text }
      </FormHelperText>
    )}
  </>
}

export { KrispyInput };