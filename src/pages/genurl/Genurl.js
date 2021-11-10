import { GiphyFetch } from "@giphy/js-fetch-api";
import { useEffect, useRef, useState } from "react";
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
        }

        const Item = (props) => {
            return (
                <div className="gif-item">
                    <img src={props.url} />
                </div>
            );
        }

        const TextList = (props) => {
            const items = props.gifs.map((itemData) => {
                return <Item url={itemData.url} />;
            });
            return <div className="text-container">{items}</div>;
        };

<<<<<<< HEAD
        const onMessage = async (msg) => {
=======
    const onMessage = async (event) => {
        setWaiting(values => true);
        await getGifTexts(JSON.parse(event.data).accuracy);
    }

    useEffect(async () => {
        ws.current = new WebSocket("ws://localhost:8080/gs-guide-websocket");
        ws.current.onmessage = await onMessage;
        ws.current.onopen = () => ws.current.send("echo");
        const interval = setInterval(() => {
>>>>>>> 94adb67b6e2aa0b043de4ed2ce4de0eb2e4b50db
            setWaiting(values => true);
            await getGifTexts(msg.body);
        }

        useSubscription("/topic/test", async (message) => await onMessage(message));

        return (
            <>
                {!waiting && (
                    <TextList gifs={gifTexts} />
                )}
            </>
        );
    }

    return (
        <>
            <StompSessionProvider
                url={"https://stream.elite12.de/api/sock"}
                debug={(str) => {
                    console.log(str);
                }}
            >
                <SubscribingComponent />
            </StompSessionProvider>
        </>
    );
}
