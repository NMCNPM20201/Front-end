import { GiphyFetch } from "@giphy/js-fetch-api";
import { useRef, useState, useEffect } from "react";
import Zoom from '@material-ui/core/Zoom/Zoom';
import {
    StompSessionProvider,
    useSubscription,
} from "react-stomp-hooks";

import { getSharingGif, getSharingTextStyleId } from "../../helpers";

export default function Genurl() {
    const SubscribingComponent = () => {
        const gf = new GiphyFetch("vmqVD48zw7QGC3hKatE5bUSA0cZdXhyM");
        const [gifTexts, setGifTexts] = useState([]);
        const [waiting, setWaiting] = useState(true);
        
        const ws = useRef(null);

        const sharingGif = getSharingGif();
        const sharingTextStyleId = getSharingTextStyleId();

        const getGifTexts = async (text) => {
            const res = await gf.animate(text, { limit: 16 })
            setGifTexts(values => res.data);
            setWaiting(values => false);
            setTimeout(() => setWaiting(values => true), 5000);
        }

        const Item = (props) => {
            return (
                <div className="gif-item">
                    <img src={props.url} width="600" height="300"/>
                </div>
            );
        }

        const TextList = (props) => {
            const items = props.gifs.map((itemData, index) => {
                if (index == sharingTextStyleId)
                    return <Item url={itemData.url} />;
                return <div></div>
            });
            return <div className="text-container">{items}</div>;
        };

        const onMessage = async (msg) => {
            setWaiting(values => true);
            await getGifTexts(msg.body);
        }

        useSubscription("/topic/message", async (message) => await onMessage(message));
        /*useEffect(() => {
            getGifTexts("Cam on ban A da donate 100000 dong");
            setTimeout(() => getGifTexts("Cam on ban B da donate 700000 dong"), 9000);
        }, []);*/

        return (
            <> 
                <div style={{
                    height: "500px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    alignItems: "center",
                }}>
                    <Zoom 
                        in={!waiting}
                        timeout={{enter: 1500, exit: 200}}
                    >
                        <div>
                            <img src={sharingGif} width="300" height="200"/>
                        </div>
                    </Zoom>
                    <Zoom 
                        in={!waiting}
                        timeout={{enter: 1500, exit: 200}}
                    >
                        <div style={{
                            position: "absolute",
                            top: "48%",
                        }}>
                            <TextList gifs={gifTexts} />
                        </div>
                    </Zoom>
                </div>
            </>
        );
    }

    return (
        <>
            <StompSessionProvider
                url={"http://localhost:8080/gs-guide-websocket"}
                debug={(str) => {
                    console.log(str);
                }}
            >
                <SubscribingComponent />
            </StompSessionProvider>
        </>
    );
}
