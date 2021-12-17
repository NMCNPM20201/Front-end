import { useState, useEffect } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Grid, Box, Typography, Button, withStyles } from '@material-ui/core';

import UploadService from "../services/UploadService";

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 15,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: "#EEEEEE",
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
  },
}))(LinearProgress);

export default function UploadGif() {
  const [state, setState] = useState({
    currentFile: undefined,
    previewGif: undefined,
    progress: 0,
    message: "",
    isError: false,
  });

  const onSelectFile = (event) => {
    setState(values => ({
      ...values,
      currentFile: event.target.files[0],
      previewGif: URL.createObjectURL(event.target.files[0]),
      progress: 0,
      message: "",
    }));
  };

  const onUpload = () => {
    setState(values => ({
      ...values,
      progress: 0,
    }));

    UploadService.upload(state.currentFile, (event) => {
      setState(values => ({
        ...values,
        progress: Math.round((100 * event.loaded) / event.total),
      }));
    })
      .then((response) => {
        setState(values => ({
          ...values,
          message: response.data.message + ". Reload the page to see the result!",
          isError: false,
        }));
      })
      .catch((error) => {
        setState(values => ({
          ...values,
          progress: 0,
          message: "Could not upload the gif!",
          currentFile: undefined,
          isError: true
        }));
      });
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <label htmlFor="btn-upload">
            <input
              id="btn-upload"
              name="btn-upload"
              style={{ display: 'none' }}
              type="file"
              accept="image/*"
              onChange={onSelectFile} />
            <Button
              className="btn-choose"
              variant="outlined"
              component="span" >
                Choose your Gif
            </Button>
          </label>
        </Grid>
        <Grid item xs={12}>
          <div className="file-name">
            {state.currentFile ? state.currentFile.name : null}
          </div>
        </Grid>
        <Grid item xs={12}>
          <Button
            className="btn-upload"
            color="primary"
            variant="contained"
            component="span"
            disabled={!state.currentFile}
            onClick={onUpload}>
            Upload
          </Button>
        </Grid>
        {state.message && (
          <Grid item xs={12}>
            <Typography variant="subtitle2" className={`upload-message ${state.isError ? "error" : ""}`}>
              {state.message}
            </Typography>
          </Grid>
        )}
        <Grid item xs={12}>
          {state.currentFile && (
            <Box className="my20" display="flex" alignItems="center">
              <Box width="100%" mr={1}>
                <BorderLinearProgress variant="determinate" value={state.progress} />
              </Box>
              <Box minWidth={35}>
                <Typography variant="body2" color="textSecondary">{`${state.progress}%`}</Typography>
              </Box>
            </Box>)
          }
        </Grid>
        {state.previewGif && (
          <Grid item container xs={12} spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" color="textSecondary" noWrap>
                Preview Gif
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <div style={{display: "flex", justifyContent: "center"}}>
                <img className="preview my20" src={state.previewGif} alt="" width="350"/>
              </div>
            </Grid>
          </Grid>
        )}
      </Grid>
    </>
  );
}