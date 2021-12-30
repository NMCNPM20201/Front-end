import { GiphyFetch } from "@giphy/js-fetch-api";
import { useRef, useState, useEffect } from "react";
import Zoom from '@material-ui/core/Zoom/Zoom';
import {
    StompSessionProvider,
    useSubscription,
} from "react-stomp-hooks";

<<<<<<< HEAD
import { getSharingGif, getSharingTextStyleId, getSharingSound } from "../../helpers";
import axios from "axios";
import "./styles.css";

const SubscribingComponent = (props) => {
    const gf = new GiphyFetch("vmqVD48zw7QGC3hKatE5bUSA0cZdXhyM");
    const [gifTexts, setGifTexts] = useState([]);
    const [waiting, setWaiting] = useState(true);
    const [savedGif, setSavedGif] = useState("");
    const [savedTextStyleId, setSavedTextStyleId] = useState(0);
    const [savedSound, setSavedSound] = useState("");
    const [content, setContent] = useState("");
    const [text, setText] = useState("");
    const [messageQueue, setMessageQueue] = useState([]);
    const [showAnimation, setShowAnimation] = useState(false);
    const [countMessage, setCountMessage] = useState(0);
    const [currentMessage, setCurrentMessage] = useState(0);
    const [name, setName] = useState("");
    const [money, setMoney] = useState(0);
    
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

    const AnimatedText = () => {
        return ( 
            <div class="content">
                <h1 class="text_shadows" style={{ color: "white", fontWeight: "bold"}}>
                    {/*text*/}
                    Cảm ơn <mark style={{ background: "none", color: "red"}}>{name}</mark> đã donate <mark style={{ background: "none", color: "red"}}>{money}</mark> đồng!                
                </h1>
                <h1 class="text_shadows" style={{ textShadow: "none", color: "red", fontWeight: "bold", fontSize: "0.9rem"}}>{content}</h1>
            </div>
        );
    }

    const onMessage = (msg) => {
        setCountMessage(values => values + 1);
        setMessageQueue(values => {
            const obj = JSON.parse(msg.body);
            const text = "Cảm ơn " + obj.name + " đã donate " + obj.money + " đồng";
            const content = '" ' + obj.content + ' "';
            return [...values, {
                id: countMessage,
                content: content,
                text: text,
                name: obj.name,
                money: obj.money
            }];
        });
        //await getGifTexts(text);
    }

    useSubscription("/topic/message", (message) => onMessage(message));

    useEffect(() => {
        if (!showAnimation) return;
        audio.current = new Audio(sharingSound ? sharingSound : savedSound);
        speaking.current = new Audio(`https://web-donate.herokuapp.com/text_to_speech?text=${content}`);
        setTimeout(() => audio.current.play(), 1000);
        setTimeout(() => audio.current.pause(), 4000);
        setTimeout(() => speaking.current.play(), 4100);
        setTimeout(() => setWaiting(false), 1000);
        setTimeout(() => setWaiting(true), 11000);
        setTimeout(() => setCurrentMessage(values => values + 1), 11000);
        setTimeout(() => setShowAnimation(false), 11000);
    }, [showAnimation]);

    useEffect(() => {
        //alert(currentMessage + " " + messageQueue.length);
        if (currentMessage >= messageQueue.length) return;
        if (showAnimation) return;
        const message = messageQueue[currentMessage];
        setContent(values => message.content);
        setText(values => message.text);
        setName(values => message.name);
        setMoney(values => message.money);
        setShowAnimation(true);
    }, [currentMessage, messageQueue, showAnimation]);

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
                });
            }
        })
        .catch(error => console.log(error));
    }, []);

    return (
        <> 
            <div style={{
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
                        <img src={sharingGif ? sharingGif : savedGif} /*width="300" height="300"*//>
                    </div>
                </Zoom>
                <Zoom 
                    in={!waiting}
                    timeout={{enter: 1500, exit: 200}}
                >
                    <div>
                        <AnimatedText />
                        {/*<TextList gifs={gifTexts} />*/}
                    </div>
                </Zoom>
            </div>
        </>
    );
}

export default function Genurl() {
=======
import { getSharingGif, getSharingTextStyleId } from "../../helpers";
import axios from "axios";

export default function Genurl() {
    const SubscribingComponent = () => {
        const gf = new GiphyFetch("vmqVD48zw7QGC3hKatE5bUSA0cZdXhyM");
        const [gifTexts, setGifTexts] = useState([]);
        const [waiting, setWaiting] = useState(true);
        const [savedGif, setSavedGif] = useState("");
        const [savedTextStyleId, setSavedTextStyleId] = useState(0);
        
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
                if (index == (sharingTextStyleId ? sharingTextStyleId : savedTextStyleId))
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

        useEffect(() => {
            axios.get("https://web-donate.herokuapp.com/setting")
            .then(response => {
                if (response.status == "200") {
                    response.data.map(item => {
                        if (item.id == 1) {
                            setSavedGif(values => item.gifUrl);
                            setSavedTextStyleId(values => item.textStyleId);
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
>>>>>>> Hiep

    return (
        <>
            <StompSessionProvider
<<<<<<< HEAD
                url={"https://web-donate.herokuapp.com/gs-guide-websocket"}
=======
                url={"http://localhost:8080/gs-guide-websocket"}
>>>>>>> Hiep
                debug={(str) => {
                    console.log(str);
                }}
            >
                <SubscribingComponent />
            </StompSessionProvider>
        </>
    );
<<<<<<< HEAD
}
=======
}
>>>>>>> Hiep
