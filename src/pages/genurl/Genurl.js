import { GiphyFetch } from "@giphy/js-fetch-api";
import { useRef, useState, useEffect } from "react";
import Zoom from '@material-ui/core/Zoom/Zoom';
import {
    StompSessionProvider,
    useSubscription,
} from "react-stomp-hooks";

export default function Genurl() {
    const SubscribingComponent = () => {
        const gf = new GiphyFetch("vmqVD48zw7QGC3hKatE5bUSA0cZdXhyM");
        const [gifTexts, setGifTexts] = useState([]);
        const [waiting, setWaiting] = useState(true);

        const ws = useRef(null);

        const getGifTexts = async (text) => {
            const res = await gf.animate(text, { limit: 1 })
            setGifTexts(values => res.data);
            setWaiting(values => false);
            setTimeout(() => setWaiting(values => true), 7000);
        }

        const Item = (props) => {
            return (
                <div className="gif-item">
                    <img src={props.url} width="350"/>
                </div>
            );
        }

        const TextList = (props) => {
            const items = props.gifs.map((itemData) => {
                return <Item url={itemData.url} />;
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
            setTimeout(() => getGifTexts("Cam on ban B da donate 700000 dong"), 8000);
        }, []);*/

        return (
            <> 
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                }}>
                    <Zoom 
                        in={!waiting}
                        timeout={{enter: 1500, exit: 0}}
                    >
                        <div>
                            <img src="http://i.stack.imgur.com/SBv4T.gif" width="400" />
                        </div>
                    </Zoom>
                    <Zoom 
                        in={!waiting}
                        timeout={{enter: 1500, exit: 0}}
                    >
                        <div style={{
                            position: "absolute",
                            bottom: "47%",
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
