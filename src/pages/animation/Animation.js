import { GiphyFetch } from "@giphy/js-fetch-api";
import PageTitle from "../../components/PageTitle";
import {
    Grid,
    TextField,
    ImageList,
    ImageListItem,
    LinearProgress,
    Typography,
    Button,
} from "@material-ui/core";
import { useEffect, useState } from "react";

import UploadGif from "./components/UploadGif";

import useStyles from "./styles";

export default function Animation() {
    const gf = new GiphyFetch("vmqVD48zw7QGC3hKatE5bUSA0cZdXhyM");
    const [gifs, setGifs] = useState([]);
    const [gifTexts, setGifTexts] = useState([]);
    const [keyword, setKeyword] = useState("donate");
    const [loadingGifs, setLoadingGifs] = useState(false);
    const [loadingGifTexts, setLoadingGifTexts] = useState(false);

    const classes = useStyles();

    const GifsList = (props) => {
        return (
            <div className={classes.root}>
            <ImageList className={classes.imageList} cols={4}>
                {props.gifs.map((item) => {
                    const id = item.url.split('-').pop();
                    const url = "https://media.giphy.com/media/" + id + "/giphy.gif";
                    return (
                        <ImageListItem key={url}>
                            <img src={url} />
                        </ImageListItem>
                    );
                })}
            </ImageList>
          </div>
        );
    };

    const GifTextsList = (props) => {
        return (
            <div className={classes.root}>
            <ImageList className={classes.imageList} cols={4}>
                {props.gifs.map((item) => {
                    return (
                        <ImageListItem key={item.url}>
                            <img src={item.url} />
                        </ImageListItem>
                    );
                })}
            </ImageList>
          </div>
        );
    };

    const getGifs = async (keyword) => {
        const res = await gf.search(keyword, { limit: 20 });
        setGifs(values => res.data);
        setTimeout(() => setLoadingGifs(false), 5000);
    }

    const getGifTexts = async (text) => {
        const res = await gf.animate(text, { limit: 20 })
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
        </>
    );
}