import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import './Settings.css';
import TextField from '@material-ui/core/TextField';
import NumberFormat from 'react-number-format';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
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
        }
      }
      />
    </div>
  );
}


function NestedGrid() {
  const classes = useStyles();
  
  function FormRow1() {
    return (
      <React.Fragment>
        <Grid item xs={3}>
          <Paper elevation={0} className={classes.paper}>Mức tiền   </Paper>
        </Grid>
        <Grid item xs={9}>
        <FormattedInputs/>
        </Grid>
      </React.Fragment>
    );
  }
  function FormRow2() {
    return (
      <React.Fragment>
        <Grid item xs={3}>
          <Paper elevation={0} className={classes.paper}>Layout</Paper>
        </Grid>
        <Grid className={classes.imgLayout} item xs={2}>
        <img src="https://streamlabs.com/imgs/layouts/layout-above.png" alt="Cinque Terre" width="160" height="140"/>
        </Grid>
        <Grid className={classes.imgLayout} item xs={2}>
        <img src="https://streamlabs.com/imgs/layouts/layout-banner.png" alt="Cinque Terre" width="160" height="140"/>
        </Grid>
        <Grid className={classes.imgLayout} item xs={2}>
        <img src="https://streamlabs.com/imgs/layouts/layout-side.png" alt="Cinque Terre" width="160" height="140"/>
        </Grid>
      </React.Fragment>
    );
  }
  function FormRow3() {
    return (
      <React.Fragment>
        <Grid item xs={3}>
          <Paper elevation={0} className={classes.paper}>Message Template</Paper>
        </Grid>
        <Grid item xs={9}>
        <TextField 
        className="borderText"
        variant="outlined" 
        type="text" id="MessageTemplate"
        name="MessageTemplate" 
        defaultValue = "{name} donated {amount}!" 
        />
        </Grid>
      </React.Fragment>
    );
  }
  function FormRow4() {
    return (
      <React.Fragment>
        <Grid item xs={3}>
          <Paper elevation={0} className={classes.paper}>Text Animation</Paper>
        </Grid>
        <Grid item xs={9}>
          <CustomizedSelects/>
        </Grid>
      </React.Fragment>
    );
  }
  function FormRow5() {
    return (
      <React.Fragment>
        <Grid item xs={3}>
          <Paper elevation={0} className={classes.paper}>Image</Paper>
        </Grid>
        <Grid item xs={9}>
    
        </Grid>
      </React.Fragment>
    );
  }
  function FormRow6() {
    return (
      <React.Fragment>
        <Grid item xs={3}>
          <Paper elevation={0} className={classes.paper}>Sound</Paper>
        </Grid>
        <Grid item xs={9}>
        
        </Grid>
      </React.Fragment>
    );
  }
  function FormRow7() {
    return (
      <React.Fragment>
        <Grid item xs={3}>
          <Paper elevation={0} className={classes.paper}>Sound Volume</Paper>
        </Grid>
        <Grid item xs={9}>

        </Grid>
      </React.Fragment>
    );
  }
  function FormRow8() {
    return (
      <React.Fragment>
        <Grid item xs={3}>
          <Paper elevation={0} className={classes.paper}>Alert Duration</Paper>
        </Grid>
        <Grid item xs={9}>
          
        </Grid>
      </React.Fragment>
    );
  }
  function FormRow9() {
    return (
      <React.Fragment>
        <Grid item xs={3}>
          <Paper elevation={0} className={classes.paper}>Alert Text Delay</Paper>
        </Grid>
        <Grid item xs={9}>
        
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
        <Grid container item xs={12} spacing={3}>
          <FormRow7 />
        </Grid>
        <Grid container item xs={12} spacing={3}>
          <FormRow8 />
        </Grid>
        <Grid container item xs={12} spacing={3}>
          <FormRow9 />
        </Grid>
      </Grid>
    </div>
  );
}

const BootstrapInput = withStyles((theme) => ({
  root4: {
    'label + &': {
      marginTop: theme.spacing(4),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
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
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);


function CustomizedSelects() {
  const classes = useStyles();
  const [TextAnimation, setTextAnimation] = React.useState("");
  const handleChange = (event) => {
    setTextAnimation(event.target.value);
  };
  return (
      <FormControl className={classes.margin}>
        <Select
          labelId="TextAnimation"
          id="TextAnimation"
          value={TextAnimation}
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="Bounce">Bounce</MenuItem>
          <MenuItem value="Pulse">Pulse</MenuItem>
          <MenuItem value="RubberBand">Rubber Band</MenuItem>
          <MenuItem value="Tada">Tada</MenuItem>
          <MenuItem value="Wave">Wave</MenuItem>
          <MenuItem value="Wiggle">Wiggle</MenuItem>
          <MenuItem value="Wobble">Wobble</MenuItem>
        </Select>
      </FormControl>
  );
} 

const useStyles = makeStyles((theme) => ({
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

}));

function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

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
export default function Settings(){
  return(
    <div id="Body">
      <h1>SETTING ANIMATION</h1>
      <SimpleTabs/>
    </div>
  );
}
