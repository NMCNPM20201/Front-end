import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    cssOutlinedInput: {
      '&$cssFocused $notchedOutline': {
        //borderColor: '#e3e8eb !important'
      }
    },
    notchedOutline: {
      // height:'50px',
      borderWidth: '0.25px',
      //borderColor: '#e3e8eb !important'
    },
    multilineColor:{
      color:'white'
    },
    imageList: {
      minWidth: 300, 
      width: '100%',
      flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
    },
}));

