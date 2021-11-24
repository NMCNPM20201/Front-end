import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { GiphyFetch } from "@giphy/js-fetch-api";
import PageTitle from "../../components/PageTitle";
import ButtonBase from '@mui/material/ButtonBase';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import {
    Grid,
    TextField,
    LinearProgress,
    Typography,
    ImageList,
    ImageListItem,
    Button,
} from "@material-ui/core";
import { useEffect, useState } from "react";

import UploadGif from "./components/UploadGif";

import useStyles from "./styles";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
}));
  
const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
            <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
            }}
            >
            <CloseIcon />
            </IconButton>
        ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('sm')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &.Mui-focusVisible': {
      zIndex: 1,
      '& .MuiImageBackdrop-root': {
        opacity: 0.15,
      },
      '& .MuiImageMarked-root': {
        opacity: 0,
      },
      '& .MuiTypography-root': {
        border: '4px solid currentColor',
      },
    },
}));

const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  });
  
const Image = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
}));
  
const ImageBackdrop = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
}));

export default function Animation() {
    const gf = new GiphyFetch("vmqVD48zw7QGC3hKatE5bUSA0cZdXhyM");
    const [gifs, setGifs] = useState([]);
    const [gifTexts, setGifTexts] = useState([]);
    const [keyword, setKeyword] = useState("anime");
    const [loadingGifs, setLoadingGifs] = useState(false);
    const [loadingGifTexts, setLoadingGifTexts] = useState(false);
    const [openGifDialog, setOpenGifDialog] = useState(false);
    const [openTextStyleDialog, setOpenTextStyleDialog] = useState(false);
    const [focusGif, setFocusGif] = useState("");
    const [focusTextStyle, setFocusTextStyle] = useState("");
    const [choosingGif, setChoosingGif] = useState("");
    const [choosingTextStyle, setChoosingTextStyle] = useState("");

    const classes = useStyles();

    const handleOpenGifDialog = (url) => {
        setFocusGif(url);
        setOpenGifDialog(true);
    };

    const handleOpenTextStyleDialog = (url) => {
        setFocusTextStyle(url);
        setOpenTextStyleDialog(true);
    };
      
    const handleCloseGifDialog = () => {
        setOpenGifDialog(false);
    };

    const handleCloseTextStyleDialog = () => {
        setOpenTextStyleDialog(false);
    };

    const handleChooseGif = () => {
        setChoosingGif(focusGif);
    }

    const handleChooseTextStyle = () => {
        setChoosingTextStyle(focusTextStyle);
    }

    const GifsList = (props) => {
        return (
            <div className={classes.root}>
                <Box className={classes.imageList}>
                    {props.gifs.map((item) => {
                        const id = item.url.split('-').pop();
                        const url = "https://media.giphy.com/media/" + id + "/giphy.gif";
                        return (
                            <ImageButton
                                focusRipple
                                key={url}
                                style={{
                                    width: "25%"
                                }}
                                onClick={() => handleOpenGifDialog(url)}
                            >
                                <ImageSrc style={{ backgroundImage: `url(${url})` }} />
                                <ImageBackdrop className="MuiImageBackdrop-root" />
                                <Image>
                                    <Typography
                                    component="span"
                                    variant="subtitle1"
                                    color="inherit"
                                    sx={{
                                        position: 'relative',
                                        p: 4,
                                        pt: 2,
                                        pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                                    }}
                                    >
                                        Click to choose
                                        <ImageMarked className="MuiImageMarked-root" />
                                    </Typography>
                                </Image>
                            </ImageButton>
                        );
                    })}
                </Box>
          </div>
        );
    };

    const GifTextsList = (props) => {
        return (
            <div className={classes.root}>
                <Box className={classes.imageList}>
                    {props.gifs.map((item) => {
                        const url = item.url;
                        return (
                            <ImageButton
                                focusRipple
                                key={url}
                                style={{
                                    width: "25%"
                                }}
                                onClick={() => handleOpenTextStyleDialog(url)}
                            >
                                <ImageSrc style={{ backgroundImage: `url(${url})` }} />
                                <ImageBackdrop className="MuiImageBackdrop-root" />
                                <Image>
                                    <Typography
                                    component="span"
                                    variant="subtitle1"
                                    color="inherit"
                                    sx={{
                                        position: 'relative',
                                        p: 4,
                                        pt: 2,
                                        pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                                    }}
                                    >
                                        Click to choose
                                        <ImageMarked className="MuiImageMarked-root" />
                                    </Typography>
                                </Image>
                            </ImageButton>
                        );
                    })}
                </Box>
          </div>
        );
    };

    const getGifs = async (keyword) => {
        const res = await gf.search(keyword, { limit: 16 });
        setGifs(values => res.data);
        setTimeout(() => setLoadingGifs(false), 5000);
    }

    const getGifTexts = async (text) => {
        const res = await gf.animate(text, { limit: 16 })
        setGifTexts(values => res.data);
        setTimeout(() => setLoadingGifTexts(false), 5000);
    }

    const handleInputChange = (event) => {
        setKeyword(event.target.value);
    };

    useEffect(() => {
        setLoadingGifs(values => true);
        getGifs(keyword);
        setLoadingGifTexts(values => true);
        getGifTexts(keyword);
    }, [keyword]);

    return (
        <>
            <PageTitle title="Animation Settings"/>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <div style={{width: "50%"}}>
                        <TextField 
                            label="Search by keyword" 
                            color="primary" 
                            variant="outlined" 
                            size="small" 
                            fullWidth 
                            focused 
                            value={keyword}
                            onChange={handleInputChange}
                            spellCheck="false"
                        />
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5" color="textSecondary" noWrap>
                        Choose Your Favorite Gif
                    </Typography>
                    {!loadingGifs && (<GifsList gifs={gifs} />)}
                    {!!loadingGifs && (<LinearProgress />)}
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5" color="textSecondary" noWrap>
                        Choose Your Favorite Text Style
                    </Typography>
                    {!loadingGifTexts && (<GifTextsList gifs={gifTexts} />)}
                    {!!loadingGifTexts && (<LinearProgress />)}
                </Grid>
                <Grid item container xs={12} spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h5" color="textSecondary" noWrap>
                            Upload your Gif
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <UploadGif />
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <div 
                        style={{
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <Button variant="contained" color="primary" size="large">
                            Save settings
                        </Button>
                    </div>
                </Grid>
            </Grid>
            <BootstrapDialog
                onClose={handleCloseGifDialog}
                aria-labelledby="customized-dialog-title"
                open={openGifDialog}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseGifDialog}>
                    Preview gif
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <img src={focusGif} width="350"></img>
                </DialogContent>
                <DialogActions>
                <Button autoFocus onClick={() => {handleChooseGif(); handleCloseGifDialog(); }}>
                    Choose this gif
                </Button>
                </DialogActions>
            </BootstrapDialog>
            <BootstrapDialog
                onClose={handleCloseTextStyleDialog}
                aria-labelledby="customized-dialog-title"
                open={openTextStyleDialog}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseTextStyleDialog}>
                    Preview text style
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <img src={focusTextStyle} width="350"></img>
                </DialogContent>
                <DialogActions>
                <Button autoFocus onClick={() => {handleChooseTextStyle(); handleCloseTextStyleDialog(); }}>
                    Choose this text style
                </Button>
                </DialogActions>
            </BootstrapDialog>
        </>
    );
}