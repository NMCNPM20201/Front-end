import React, { useState, useEffect } from 'react';
import './styles.css';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';
import TextField from '@material-ui/core/TextField';
import PageTitle from "../../components/PageTitle";

import UploadMp3 from "./components/UploadMp3";
import UploadService from '../../services/UploadService';
import { setSharingSound } from '../../helpers';

import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import AudioPlayer from 'material-ui-audio-player';

import axios from "axios";

const muiTheme = createMuiTheme({});

//-----------------------------------------
const useStyles0 = makeStyles({
  root: {
    width: 500,
  },
});

function ContinuousSlider() {
  const classes = useStyles0();
  const [value, setValue] = React.useState(30);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Typography id="continuous-slider" gutterBottom>
        Volume
      </Typography>
      <Grid container spacing={2}>
        <Grid item>
          <VolumeDown />
        </Grid>
        <Grid item xs>
          <Slider value={value} onChange={handleChange} aria-labelledby="continuous-slider" />
        </Grid>
        <Grid item>
          <VolumeUp />
        </Grid>
      </Grid>
      
    </div>
  );
}
//-----------------------------------------
const useStyles1 = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function ContainedButtons() {
  const classes = useStyles1();

  return (
    <div className={classes.root}>
      <Button variant="contained">Speak</Button>
      <Button variant="contained" startIcon = {<SaveIcon />}>
        Save settings
      </Button>
    </div>
  );
}
//-----------------------------------------
const useStyles2 = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '50ch',
      
    },
  },
}));

function BasicTextFields() {
  const classes = useStyles2();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField 
        id="outlined-basic" 
        label="Type something to test speaking voice" 
        variant="outlined" 
        color = "primary" />
    </form>
  );
}

//-----------------------------------------
const voices = [
  {
    value: 'VNFMV',
    label: 'Vietnamese Female Voice',
  },
  {
    value: 'VNMV',
    label: 'Vietnamese Male Voice',
  },
];
const useStyles3 = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));
function MultilineTextFields() {
  const classes = useStyles3();
  const [voice, setVoice] = React.useState('VNFMV');

  const handleChange = (event) => {
    setVoice(event.target.value);
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
      <TextField
          id="outlined-select-currency-native"
          select
          label="Choose Voice"
          value={voice}
          onChange={handleChange}
          SelectProps={{
            native: true,
          }}
          helperText="Please select your preference voice"
          variant="outlined"
        >
          {voices.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
      </div>
    </form>
    );
  }

//-----------------------------------------
function Sound() {
  const [uploadedFiles, setUploadedFiles] = useState(undefined);
  const [choosingSound, setChoosingSound] = useState("");
  const [savedGif, setSavedGif] = useState("");
  const [savedTextStyleId, setSavedTextStyleId] = useState(0); 

  const handleClick = (url) => {
    alert("Chọn thành công!");
    setChoosingSound(values => url);
  }

  const handleSave = () => {
    alert("Lưu thành công!");
    setSharingSound(choosingSound);

    axios.post("https://web-donate.herokuapp.com/setting", {
        id: 1,
        gifUrl: savedGif,
        textStyleId: savedTextStyleId,
        soundUrl: choosingSound,
    })
    .catch(error => console.log(error));
  }

  const UploadedFilesList = (props) => {
    const items = props.files.map(item => (
      <Grid container item xs={12}>
        <Grid item xs={10}>
          <div style={{display: "flex", justifyContent: "center"}}>
            <ThemeProvider theme={muiTheme}>
              <AudioPlayer width="90%" src={item.url} />
            </ThemeProvider>
          </div>
        </Grid>
        <Grid item xs={2}>
          <Button onClick={() => handleClick(item.url)} variant="contained">
            Choose
          </Button>
        </Grid>
      </Grid>
    ));
    return (
      <Grid container spacing={5}>{items}</Grid>
    );
  }

  useEffect(() => {
    UploadService.getMp3Files()
      .then((response) => {
        setUploadedFiles((values) => response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios.get("https://web-donate.herokuapp.com/setting")
    .then(response => {
        if (response.status == "200") {
            response.data.map(item => {
                if (item.id == 1) {
                    setSavedGif(values => item.gifUrl);
                    setSavedTextStyleId(values => item.textStyleId);
                }
            })
        }
    })
    .catch(error => console.log(error));
}, []);

  return (
    <>
      <PageTitle title="Sound Settings"/>
      <Grid container spacing={4}>
        <Grid container item spacing={4} xs={12}>
          <Grid item xs={12}>
            <Typography variant="h5" color="textSecondary" noWrap>
                Speaking Voice Settings
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <div className="App">
              <header className="App-header">
                Test your speaking voice
                <BasicTextFields />
                <ContinuousSlider />
                <ContainedButtons />
                <MultilineTextFields />
              </header>
            </div>
          </Grid>
        </Grid>
        {uploadedFiles && (
          <Grid container item xs={12} spacing={4}>
              <Grid item xs={12}>
                <Typography variant="h5" color="textSecondary" noWrap>
                  Choose Your Uploaded Alert Sound
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <UploadedFilesList files={uploadedFiles}/>
              </Grid>
          </Grid>
        )}
        <Grid container item spacing={4} xs={12}>
          <Grid item xs={12}>
            <Typography variant="h5" color="textSecondary" noWrap>
              Upload Your Alert Sound
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <UploadMp3 />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <div 
            style={{
                display: "flex",
                justifyContent: "center",
            }}
        >
            <Button variant="contained" color="primary" size="large" onClick={handleSave}>
                Save settings
            </Button>
        </div>
      </Grid>
    </>
  );
}

export default Sound;