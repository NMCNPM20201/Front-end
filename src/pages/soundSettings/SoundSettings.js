import React from 'react';
import './SoundSettings.css';
import  Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';
import TextField from '@material-ui/core/TextField';

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
        Save
      </Button>
      <Button variant="contained" component="label">
        Upload File
       <input type="file" hidden/>
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
        label="Type to test Voice" 
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
          helperText="Please select your perference voice"
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
function SoundSettings() {
  return (
    <div className="App">
      <header className="App-header">
        Speak setting
        <BasicTextFields />
        <ContinuousSlider />
        <ContainedButtons />
        <MultilineTextFields />
      </header>
    </div>
  );
}

export default SoundSettings;