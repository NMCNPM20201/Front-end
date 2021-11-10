import { GiphyFetch } from "@giphy/js-fetch-api";
import { useEffect, useRef, useState } from "react";

export default function Genurl() {
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

    const onMessage = async (event) => {
        setWaiting(values => true);
        await getGifTexts(JSON.parse(event.data).accuracy);
    }

    useEffect(async () => {
        ws.current = new WebSocket("ws://localhost:3000/ws");
        ws.current.onmessage = await onMessage;
        ws.current.onopen = () => ws.current.send("echo");
        const interval = setInterval(() => {
            setWaiting(values => true);
            ws.current.send("echo");
        }, 20000);
        return () => {
            ws.current.close();
            clearInterval(interval);
        }
    }, []);

    return (
        <>
            {!waiting && (
                <TextList gifs={gifTexts} />
            )}
        </>
    );
}
