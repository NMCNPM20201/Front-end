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
                    <img src={props.url} width="600" height="300"/>
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
                            <img src="https://i.pinimg.com/originals/18/55/9c/18559ccfe163425e8328d4255049b817.gif" width="300" height="200"/>
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
