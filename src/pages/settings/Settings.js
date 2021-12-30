import * as React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
<<<<<<< HEAD
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
=======
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
>>>>>>> Hiep
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import './Settings.css';
import TextField from '@material-ui/core/TextField';
import NumberFormat from 'react-number-format';
import Slider from "@mui/material/Slider";
<<<<<<< HEAD
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import  Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';
=======
import Typography from '@mui/material/Typography';
import  Button from '@material-ui/core/Button';
>>>>>>> Hiep
import classNames from 'classnames';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
<<<<<<< HEAD
import ArrowDropDownCircleTwoToneIcon from '@mui/icons-material/ArrowDropDownCircleTwoTone';
import { SnackbarProvider, useSnackbar } from 'notistack';
import Tooltip from '@mui/material/Tooltip';
import HelpIcon from '@material-ui/icons/Help';

=======
import { SnackbarProvider, useSnackbar } from 'notistack';
import Tooltip from '@mui/material/Tooltip';
import HelpIcon from '@material-ui/icons/Help';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';
>>>>>>> Hiep
const useStyles = makeStyles((theme) => ({
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: '#e3e8eb !important'
    }
  },
  notchedOutline: {
    // height:'50px',
    borderWidth: '0.25px',
    borderColor: '#e3e8eb !important'
  },
  multilineColor:{
    color:'white'
  },
  root: {
    flexGrow: 1,
    backgroundColor: "#17242d" ,
  },
  root1: {
    flexGrow: 1,
    backgroundColor: "#17242d" ,
  },
  paper: {
    padding: theme.spacing(1.5),
    color: 'white',
    backgroundColor: "#17242d" ,
  },
  Bar: {
    backgroundColor: "#17242d" ,
  },
  root2: {
    '& > *': {
      width: '25ch',
    },
  },
  margin: {
    margin: theme.spacing(1),
  },

  bootstrapRoot: {
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: '#007bff',
    borderColor: '#007bff',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      backgroundColor: '#0069d9',
      borderColor: '#0062cc',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#0062cc',
      borderColor: '#005cbf',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
  },

}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
<<<<<<< HEAD
//---Min Amount-FormRow1---//
function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="$"
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

function FormattedInputs() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    numberformat: '',
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className={classes.root2}>
      
      <TextField 
       className="borderText"
        variant="outlined"
        value={values.numberformat}
        onChange={handleChange}
        name="numberformat"
        id="formatted-numberformat-input"
        InputProps={{
          inputComponent: NumberFormatCustom,
          classes: {
            root: classes.cssOutlinedInput,
            notchedOutline: classes.notchedOutline,
            input: classes.multilineColor
          },
        }
      }
      />
    </div>
  );
}

//-----Show Top Donation-FormRow2-------//

function ControlledRadioButtonsGroup() {
  const [value, setValue] = React.useState('disabled');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl component="fieldset">
      <RadioGroup
        aria-label="gender"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel value="disabled" control={<Radio />} label="  Disabled" />
        <FormControlLabel value="enabled" control={<Radio />} label="  Enabled" />
      </RadioGroup>
    </FormControl>
  );
}

//----Setting Soundtrack-FormRow6----//
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
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: '#e3e8eb !important'
    }
  },
  notchedOutline: {
    // height:'50px',
    borderWidth: '0.25px',
    borderColor: '#e3e8eb !important'
  },
  multilineColor:{
    color:'white'
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
        color = "primary"
        InputProps={{
          classes: {
            root: classes.cssOutlinedInput,
            notchedOutline: classes.notchedOutline,
            input: classes.multilineColor
          },
        }}
         />
        
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
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: '#e3e8eb !important'
    }
  },
  notchedOutline: {
    // height:'50px',
    borderWidth: '0.25px',
    borderColor: '#e3e8eb !important'
  },
  multilineColor:{
    color:'white'
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
          InputProps={{
            classes: {
              root: classes.cssOutlinedInput,
              notchedOutline: classes.notchedOutline,
              input: classes.multilineColor
            },
          }}
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
function SettingSound() {
  return (
    <div className="SettingSound">
      <header className="SettingSound-header">
        Speak setting
        <BasicTextFields />
        <ContinuousSlider />
        <ContainedButtons />
        <MultilineTextFields />
      </header>
    </div>
  );
}

//-------SaveSettings---------
function NodeSave() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const handleClickVariant = (variant) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar('Successfully saved!', { variant });
  };

  return (
    <React.Fragment>
          <Button
            onClick={handleClickVariant('success')}
=======

//-------SaveSettings---------
function NodeSave({dataSave}) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [min, setMin] = React.useState(1000);
  const [max, setMax] = React.useState(1000);
  React.useEffect(() => {
    axios.get(settingsAPI)
      .then(res => {
        if(dataSave.IdData==1){ setMin(0);}
        else {setMin(res.data[dataSave.IdData-2].money);};
        if(dataSave.IdData==res.data.length) setMax(100000000000000000000000000000);
        else setMax(res.data[dataSave.IdData].money);
      });
  }, []);
  const handleClickVariant = (variant) => () => {
        if(dataSave.values1>min){
          enqueueSnackbar('Successfully saved!', { variant });
          SaveData();
          }
          else{
            enqueueSnackbar('Illegal Min Amount!', { variant });
          }
  };
  function SaveData(){
    axios.put(`${settingsAPI}`, {
        id: dataSave.IdData,
        money: dataSave.values1 ,
        shopTopDonation: dataSave.values2,
        template: dataSave.values3,
        alertDuration: dataSave.values4, 
        alertTextDelay :dataSave.values5
      });
  }
  return (
    <React.Fragment>
          <Button
            onClick={dataSave.values1>min&&dataSave.values1<max?handleClickVariant('success'):handleClickVariant('error')}
>>>>>>> Hiep
            variant="contained"
            color="primary"
            disableRipple
            className={classNames(classes.margin, classes.bootstrapRoot)}
            >
            Save Settings
          </Button>
    </React.Fragment>
  );
}

<<<<<<< HEAD
function SaveSettings() {
  return (
    <SnackbarProvider maxSnack={3}>
      <NodeSave />
=======
function SaveSettings({DataSave}) {
  return (
    <SnackbarProvider maxSnack={3}>
      <NodeSave  dataSave={DataSave} />
>>>>>>> Hiep
    </SnackbarProvider>
  );
}

//--------FormRow---------------------------------
<<<<<<< HEAD

function NestedGrid() {
  const classes = useStyles();
  
  function FormRow1() {
    return (
      <React.Fragment>
=======
  const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
    const { onChange, ...other } = props;
  
    return (
      <NumberFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        isNumericString
        prefix="$"
      />
    );
  });
  
  NumberFormatCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };
function NestedGrid({data}) {
  const classes = useStyles();
  // const [values, setValues] = React.useState('1320');
  // const [values1, setValues1] = React.useState('100');
  var [values, setValues] = React.useState({
      values1: data.money  ,
      values2: data.shopTopDonation,
      values3: data.template,
      values4: data.alertDuration, 
      values5 :data.alertTextDelay,
      IdData :data.id
  });
  var handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  return (
    <div className={classes.root1}>
      <Grid container spacing={5}>
        <Grid container item xs={12} spacing={3}>
        <React.Fragment>
>>>>>>> Hiep
        <Grid item xs={3}>
          <Paper elevation={0} className={classes.paper}>Min Amount</Paper>
        </Grid>
        <Grid item xs={3}>
<<<<<<< HEAD
        <FormattedInputs/>
=======
        <div className={classes.root2}>
        <Box
        sx={{
          '& > :not(style)': {
            m: 1,
          },
        }}
      >
        <TextField
          className="borderText"
          variant="outlined"
          value={values.values1}
          // onChange={(event) =>setValuess(event.target.value)}
          onChange={handleChange('values1')}
          name="numberformat"
          id="formatted-numberformat-input"
          InputProps={{
            inputComponent: NumberFormatCustom,
            classes: {
              root: classes.cssOutlinedInput,
              notchedOutline: classes.notchedOutline,
              input: classes.multilineColor
            },
          }
        }
        />
        </Box>
        </div>
>>>>>>> Hiep
        </Grid>
        <Grid item xs={1}>
        <Tooltip
          title="The smallest a donation can be for the donation alert to be displayed. This is useful if you only want the donation alert to be displayed for larger amounts. Remember, this is the amount donated in the amount donated in the currency you have selected in the donation settings section. Setting this to 0 will make every donation alert be displayed."
          arrow>
          <HelpIcon color="action" />
        </Tooltip>
        </Grid>
      </React.Fragment>
<<<<<<< HEAD
    );
  }
  function FormRow2() {
    return (
      <React.Fragment>
        <Grid item xs={3}>
          <Paper elevation={0} className={classes.paper}>Show Top Donation</Paper>
        </Grid>
        <Grid item xs={2}>
          <ControlledRadioButtonsGroup/>
        </Grid>
        <Grid item xs={1}>
        <Tooltip title="Add" arrow>
=======
        </Grid>
        <Grid container item xs={12} spacing={3}>
        <React.Fragment>
        <Grid item xs={3}>
          <Paper elevation={0} className={classes.paper}>Show Donation</Paper>
        </Grid>
        <Grid item xs={2}>
        <FormControl component="fieldset">
      <RadioGroup
        aria-label="gender"
        name="controlled-radio-buttons-group"
        value={values.values2}
        onChange={handleChange('values2')}
      >
        <FormControlLabel value='false' control={<Radio />} label="  Disabled" />
        <FormControlLabel value='true' control={<Radio />} label="  Enabled" />
      </RadioGroup>
    </FormControl>
        </Grid>
        <Grid item xs={1}>
        <Tooltip title="Is it possible to show notifications on the screen?" arrow>
>>>>>>> Hiep
        <HelpIcon color="action" />
        </Tooltip>
        </Grid>
      </React.Fragment>
<<<<<<< HEAD
    );
  }
  function FormRow3() {
    return (
      <React.Fragment>
=======
        </Grid>
        <Grid container item xs={12} spacing={3}>
        <React.Fragment>
>>>>>>> Hiep
        <Grid item xs={3}>
          <Paper elevation={0} className={classes.paper}>Message Template</Paper>
        </Grid>
        <Grid item xs={7}>
        <TextField 
        className="borderText"
        variant="outlined" 
        type="text" id="MessageTemplate"
        name="MessageTemplate" 
<<<<<<< HEAD
        defaultValue = "{name} donated {amount}!" 
=======
        // defaultValue = "{name} donated {amount}!" 
        // defaultValue = {data.MessageTemplate}
        value={values.values3}
        onChange={handleChange('values3')}
>>>>>>> Hiep
        InputProps={{
          classes: {
            root: classes.cssOutlinedInput,
            notchedOutline: classes.notchedOutline,
            input: classes.multilineColor
          },
        }}
        />
        </Grid>
        <Grid item xs={1}>
        <Tooltip 
        title="When a donation alert shows up, this will be the format of the message. Available Tokens, {name} The name of the donator, {amount} The amount that was donated" 
        arrow>
        <HelpIcon color="action" />
        </Tooltip>
        </Grid>
      </React.Fragment>
<<<<<<< HEAD
    );
  }

  function FormRow4() {
    return (
      <React.Fragment>
=======
        </Grid>
        <Grid container item xs={12} spacing={3}>
        <React.Fragment>
>>>>>>> Hiep
        <Grid item xs={3}>
          <Paper elevation={0} className={classes.paper}>Alert Duration</Paper>
        </Grid>
        <Grid className="SliderAlert" item xs={7}>
            <Slider 
              max="30"
<<<<<<< HEAD
              defaultValue={0}
=======
              // defaultValue={data.AlertDuration}
              value={values.values4}
              onChange={handleChange('values4')}
>>>>>>> Hiep
              aria-label="Default" 
              valueLabelDisplay="on" 
            />
        </Grid>
        <Grid item xs={1}>
        <Tooltip title="How many seconds to show this alert before hiding it." arrow>
        <HelpIcon color="action" />
        </Tooltip>
        </Grid>
      </React.Fragment>
<<<<<<< HEAD
    );
  }
  function FormRow5() {
    return (
      <React.Fragment>
=======
        </Grid>
        <Grid container item xs={12} spacing={3}>
        <React.Fragment>
>>>>>>> Hiep
        <Grid item xs={3}>
          <Paper elevation={0} className={classes.paper}>Alert Text Delay</Paper>
        </Grid>
        <Grid className="SliderAlert" item xs={7}>
          <Slider
            max="30"
            size="big"
<<<<<<< HEAD
            defaultValue={0}
=======
            defaultValue={data.AlertTextDelay}
            value={values.values5}
            onChange={handleChange('values5')}
>>>>>>> Hiep
            aria-label="Default" 
            valueLabelDisplay="on" 
          />
        </Grid>
        <Grid item xs={1}>
        <Tooltip title="How many seconds after your image/video/audios to show the alert text. This is useful if you want to wait a few seconds for an animation to finish before your alert text appears." arrow>
        <HelpIcon color="action" />
        </Tooltip>
        </Grid>
      </React.Fragment>
<<<<<<< HEAD
    );
  }
  function FormRow6() {
    return (
      <React.Fragment  >
        <Grid item xs={11}>
        <Accordion className="Form-Row" elevation={0} >
        <AccordionSummary
          className="TypeSetting"
          expandIcon={<ArrowDropDownCircleTwoToneIcon color="primary" />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Setting Soundtrack</Typography>
        </AccordionSummary>
        <AccordionDetails className="TypeSetting" >
        <SettingSound/>
        </AccordionDetails>
      </Accordion>
        </Grid>
      </React.Fragment>
    );
  }
  // function FormRow7() {
  //   return (
  //     <React.Fragment>
  //       <Grid item xs={11}>
  //       <Accordion className="Form-Row" elevation={0} >
  //       <AccordionSummary
  //         className="TypeSetting"
  //         expandIcon={<ExpandMoreIcon />}
  //         aria-controls="panel2a-content"
  //         id="panel2a-header"
  //       >
  //         <Typography>Setting anh Demo Animation</Typography>
  //       </AccordionSummary>
  //       <AccordionDetails className="TypeSetting">
  //         <Typography>
  //           anh Vinh
  //         </Typography>
  //       </AccordionDetails>
  //     </Accordion>
  //       </Grid>
  //     </React.Fragment>
  //   );
  // }

  function FormRow8() {
    return (
      <React.Fragment>
        <Grid 
          className="ButtonSave"
          item xs={11} >
          <SaveSettings/>
        </Grid>
      </React.Fragment>
    );
  }
  
  return (
    <div className={classes.root1}>
      <Grid container spacing={5}>
        <Grid container item xs={12} spacing={3}>
          <FormRow1 />
        </Grid>
        <Grid container item xs={12} spacing={3}>
          <FormRow2 />
        </Grid>
        <Grid container item xs={12} spacing={3}>
          <FormRow3 />
        </Grid>
        <Grid container item xs={12} spacing={3}>
          <FormRow4 />
        </Grid>
        <Grid container item xs={12} spacing={3}>
          <FormRow5 />
        </Grid>
        <Grid container item xs={12} spacing={3}>
          <FormRow6 />
        </Grid>
        {/* <Grid container item xs={12} spacing={3}>
          <FormRow7 />
        </Grid> */}
        <Grid container item xs={12} spacing={3}>
          <FormRow8 />
=======
        </Grid>
        <Grid container item xs={12} spacing={3}>
        <React.Fragment >
        
        <Grid 
          className="ButtonSave"
          item xs={11} >
          <SaveSettings
          DataSave={values}
          />
        </Grid>
      </React.Fragment>
>>>>>>> Hiep
        </Grid>
      </Grid>
    </div>
  );
}
<<<<<<< HEAD


=======
//-----Ghep API--------
var settingsAPI ="https://web-donate.herokuapp.com/setting"
>>>>>>> Hiep

function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
<<<<<<< HEAD

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.Bar} position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Donation Level 1" {...a11yProps(0)} />
          <Tab label="Donation Level 2" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
      <NestedGrid/>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <NestedGrid/>
      </TabPanel>
    </div>
  );
}


=======
  const [functionIsRunning,setFunctionIsRunning]=React.useState(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
 const [DataSettings, setDataSettings] = React.useState([]);
 function GetDataSettings() {
    axios.get(settingsAPI)
      .then(res => {
        setDataSettings(res.data);
      })
  };
  React.useEffect(() => {
    axios.get(settingsAPI)
      .then(res => {
        setDataSettings(res.data);
      });
  }, []);
  function handleAddLevel() {
    if (!functionIsRunning) {
      setFunctionIsRunning(true);
      axios.post(settingsAPI, {
        id:DataSettings.length+1,
        template:"{name} donated {amount}!",
        alertDuration: 3, 
        alertTextDelay :1
    })
    .then(function(){GetDataSettings();})
    .then(function(){setTimeout(() => setFunctionIsRunning(false), 900);});
    
    }
  };
  function deletePost() {
    if (!functionIsRunning) {
      setFunctionIsRunning(true);
    if(DataSettings.length!=1){
    axios({ method: 'delete', url: `${settingsAPI}`, data:DataSettings.length, headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }})
    .then(function(){GetDataSettings();})
    .then(function(){setTimeout(() => setFunctionIsRunning(false), 900);});
    };
    };
  };
  return (
    <div className={classes.root} >
      <AppBar className={classes.Bar} position="static">
        <Tabs aria-label="simple tabs example"
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        textColor='inherit'
        >
          {DataSettings.map(function(DataSetting){
            const Label= "Donation Level "+(DataSetting.id);
            return(
            <Tab
            onClick={GetDataSettings}
            label={Label} {...a11yProps(DataSetting.id-1)} />
          );})
          }
          <IconButton color="primary"
          onClick={deletePost}
          >
            <ClearIcon />
          </IconButton>
          <IconButton color="primary"
          onClick={handleAddLevel}
          >
            <AddOutlinedIcon />
          </IconButton>
        </Tabs>
      </AppBar>
      {DataSettings.map(DataSetting=>(
      <TabPanel value={value} index={DataSetting.id-1}>
      <NestedGrid data={DataSetting} onClick={GetDataSettings} />
      </TabPanel>))
    }
    </div>
  );
}
>>>>>>> Hiep
export default function Settings(){
  return(
    <div id="Body">
      <h1>DONATION SETTING</h1>
<<<<<<< HEAD
      <SimpleTabs/>
=======
      <SimpleTabs />
>>>>>>> Hiep
    </div>
  );
}
