import { GiphyFetch } from "@giphy/js-fetch-api";
import { useRef, useState, useEffect } from "react";
import Zoom from '@material-ui/core/Zoom/Zoom';
import {
    StompSessionProvider,
    useSubscription,
} from "react-stomp-hooks";

import { getSharingGif, getSharingTextStyleId, getSharingSound } from "../../helpers";
import axios from "axios";

export default function Genurl() {
    const SubscribingComponent = () => {
        const gf = new GiphyFetch("vmqVD48zw7QGC3hKatE5bUSA0cZdXhyM");
        const [gifTexts, setGifTexts] = useState([]);
        const [waiting, setWaiting] = useState(true);
        const [savedGif, setSavedGif] = useState("");
        const [savedTextStyleId, setSavedTextStyleId] = useState(0);
        const [savedSound, setSavedSound] = useState("");
        const [content, setContent] = useState("");
        
        const audio = useRef(null);
        const speaking = useRef(null);

        const sharingGif = getSharingGif();
        const sharingTextStyleId = getSharingTextStyleId();
        const sharingSound = getSharingSound();

        const getGifTexts = async (text) => {
            const res = await gf.animate(text, { limit: 16 })
            setGifTexts(values => res.data);
        }

        const Item = (props) => {
            return (
                <div className="gif-item">
                    <img src={props.url} />
                </div>
            );
        }

        const TextList = (props) => {
            const items = props.gifs.map((itemData, index) => {
                if (index == (sharingTextStyleId ? sharingTextStyleId : savedTextStyleId))
                    return <Item url={itemData.url} />;
                return <div></div>
            });
            return <div className="text-container">{items}</div>;
        };

        const onMessage = async (msg) => {
            setWaiting(values => true);
            const obj = JSON.parse(msg.body);
            const text = "Cảm ơn " + obj.name + " đã donate " + obj.money + "\n" + obj.content; 
            setContent(values => obj.content);
            await getGifTexts(text);
        }

        useSubscription("/topic/message", async (message) => await onMessage(message));
        /*useEffect(() => {
<<<<<<< HEAD
            const msg = '{ "name": "A", "money": "1000000đ", "content": "Chúc anh livestream vui vẻ, không feed mạng nào !!!" }';
            const obj = JSON.parse(msg);
            const text = "Cảm ơn " + obj.name + " đã donate " + obj.money + "\n" + obj.content; 
            setContent(values => obj.content);
            getGifTexts(text);
            setTimeout(() => getGifTexts("Cam on ban B da donate 700000 dong"), 17500);
=======
            getGifTexts("Cam on ban A da donate 100000 dong");
            setTimeout(() => getGifTexts("Cam on ban B da donate 700000 dong"), 15000);
>>>>>>> 91887115748eb59aca0f95ae57fc1a910f599afe
        }, []);*/

        useEffect(() => {
            audio.current = new Audio(sharingSound ? sharingSound : savedSound);
            speaking.current = new Audio(`https://web-donate.herokuapp.com/text_to_speech?text=${content}`);
            setTimeout(() => audio.current.play(), 5000);
            setTimeout(() => audio.current.pause(), 12500);
            setTimeout(() => speaking.current.play(), 12600);
            setTimeout(() => setWaiting(values => false), 5000);
            setTimeout(() => setWaiting(values => true), 16500);
        }, [gifTexts]);

        useEffect(() => {
            axios.get("https://web-donate.herokuapp.com/setting")
            .then(response => {
                if (response.status == "200") {
                    response.data.map(item => {
                        if (item.id == 1) {
                            setSavedGif(values => item.gifUrl);
                            setSavedTextStyleId(values => item.textStyleId);
                            setSavedSound(values => item.soundUrl);
                        }
                    })
                }
            })
            .catch(error => console.log(error));
        }, []);

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
                            <img src={sharingGif ? sharingGif : savedGif} width="300" height="200"/>
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
                url={"https://web-donate.herokuapp.com/gs-guide-websocket"}
                debug={(str) => {
                    console.log(str);
                }}
            >
                <SubscribingComponent />
            </StompSessionProvider>
        </>
    );
}