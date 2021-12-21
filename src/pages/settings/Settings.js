import * as React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import './Settings.css';
import TextField from '@material-ui/core/TextField';
import NumberFormat from 'react-number-format';
import Slider from "@mui/material/Slider";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import  Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';
import classNames from 'classnames';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import ArrowDropDownCircleTwoToneIcon from '@mui/icons-material/ArrowDropDownCircleTwoTone';
import { SnackbarProvider, useSnackbar } from 'notistack';
import Tooltip from '@mui/material/Tooltip';
import HelpIcon from '@material-ui/icons/Help';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';
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

//-------SaveSettings---------
function NodeSave({Datasave}) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const handleClickVariant = (variant) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar('Successfully saved!', { variant });
    SaveData();
  };
  function SaveData(){
    axios.put(`${settingsAPI}/${Datasave.IdData+""}`, {
        MinAmount: Datasave.values1 ,
        ShowTopDonation: Datasave.values2,
        MessageTemplate: Datasave.values3,
        AlertDuration: Datasave.values4, 
        AlertTextDelay :Datasave.values5
      });
  }
  return (
    <React.Fragment>
          <Button
            onClick={handleClickVariant('success')}
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

function SaveSettings({DataSave}) {
  return (
    <SnackbarProvider maxSnack={3}>
      <NodeSave  Datasave={DataSave} />
    </SnackbarProvider>
  );
}

//--------FormRow---------------------------------
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
      values1: data.MinAmount  ,
      values2: data.ShowTopDonation,
      values3: data.MessageTemplate,
      values4: data.AlertDuration, 
      values5 :data.AlertTextDelay,
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
        <Grid item xs={3}>
          <Paper elevation={0} className={classes.paper}>Min Amount</Paper>
        </Grid>
        <Grid item xs={3}>
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
        </Grid>
        <Grid item xs={1}>
        <Tooltip
          title="The smallest a donation can be for the donation alert to be displayed. This is useful if you only want the donation alert to be displayed for larger amounts. Remember, this is the amount donated in the amount donated in the currency you have selected in the donation settings section. Setting this to 0 will make every donation alert be displayed."
          arrow>
          <HelpIcon color="action" />
        </Tooltip>
        </Grid>
      </React.Fragment>
        </Grid>
        <Grid container item xs={12} spacing={3}>
        <React.Fragment>
        <Grid item xs={3}>
          <Paper elevation={0} className={classes.paper}>Show Top Donation</Paper>
        </Grid>
        <Grid item xs={2}>
        <FormControl component="fieldset">
      <RadioGroup
        aria-label="gender"
        name="controlled-radio-buttons-group"
        value={values.values2}
        onChange={handleChange('values2')}
      >
        <FormControlLabel value="disabled" control={<Radio />} label="  Disabled" />
        <FormControlLabel value="enabled" control={<Radio />} label="  Enabled" />
      </RadioGroup>
    </FormControl>
        </Grid>
        <Grid item xs={1}>
        <Tooltip title="Add" arrow>
        <HelpIcon color="action" />
        </Tooltip>
        </Grid>
      </React.Fragment>
        </Grid>
        <Grid container item xs={12} spacing={3}>
        <React.Fragment>
        <Grid item xs={3}>
          <Paper elevation={0} className={classes.paper}>Message Template</Paper>
        </Grid>
        <Grid item xs={7}>
        <TextField 
        className="borderText"
        variant="outlined" 
        type="text" id="MessageTemplate"
        name="MessageTemplate" 
        // defaultValue = "{name} donated {amount}!" 
        // defaultValue = {data.MessageTemplate}
        value={values.values3}
        onChange={handleChange('values3')}
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
        </Grid>
        <Grid container item xs={12} spacing={3}>
        <React.Fragment>
        <Grid item xs={3}>
          <Paper elevation={0} className={classes.paper}>Alert Duration</Paper>
        </Grid>
        <Grid className="SliderAlert" item xs={7}>
            <Slider 
              max="30"
              // defaultValue={data.AlertDuration}
              value={values.values4}
              onChange={handleChange('values4')}
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
        </Grid>
        <Grid container item xs={12} spacing={3}>
        <React.Fragment>
        <Grid item xs={3}>
          <Paper elevation={0} className={classes.paper}>Alert Text Delay</Paper>
        </Grid>
        <Grid className="SliderAlert" item xs={7}>
          <Slider
            max="30"
            size="big"
            defaultValue={data.AlertTextDelay}
            value={values.values5}
            onChange={handleChange('values5')}
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
        </Grid>
      </Grid>
    </div>
  );
}
//-----Ghep API--------
var settingsAPI ="http://localhost:3000/setting"

function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
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

    axios.post(settingsAPI, {
      MinAmount: "0" ,
      ShowTopDonation: 'disabled',
      MessageTemplate: "{name} donated {amount}!",
      AlertDuration: 0, 
      AlertTextDelay :0
    })
    .then(function(){GetDataSettings();});
  };
  function deletePost() {
    if(DataSettings.length!=1){
    axios.delete(`${settingsAPI}/${DataSettings.length-1+""}`)
    .then(function(){GetDataSettings();});
    };
  };
  return (
    <div className={classes.root} >
      <AppBar className={classes.Bar} position="static">
        <Tabs id="html1" value={value} onChange={handleChange} aria-label="simple tabs example">
          {DataSettings.map(DataSetting=>(
          <Tab
          onClick={GetDataSettings}
           label="Donation Level " {...a11yProps(DataSetting.id)} />
          ))
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
      <TabPanel value={value} index={DataSetting.id}>
      <NestedGrid data={DataSetting} onClick={GetDataSettings} />
      </TabPanel>))
    }
    </div>
  );
}


export default function Settings(){
  return(
    <div id="Body">
      <h1>DONATION SETTING</h1>
      <SimpleTabs />
    </div>
  );
}
