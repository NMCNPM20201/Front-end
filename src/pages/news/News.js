import { useEffect, useState } from "react";
import axios from "axios";

export default function News() {
    const [color, setColor] = useState("black");
    const [speed, setSpeed] = useState(20);
    const [year, setYear] = useState(2021);
    const [text, setText] = useState("");

    useEffect(() => {
        axios.get(`https://web-donate.herokuapp.com/donate/total_donate_by_year?year=${year}`)
        .then(response => {
            if (response.status == "200") {
                let donateInfo = "Thống kê số tiền donate đã nhận được trong năm " + year + ": ";
                response.data.map((item, id) => {
                    donateInfo += "tháng " + item.month + " - " + item.total_donate + " đồng";
                    if (id != 11) donateInfo += " | ";
                    return item;
                });
                setText(donateInfo);
            }
        })
        .catch(error => console.log(error));
    }, []);

    return (
        <>
            <marquee
                style={{
                    background: "linear-gradient(#E89B00, #FFBC00, #FFDE5D)",
                    color: color,
                    fontSize: "3vh",
                    borderStyle: "double",
                    border: "2px solid gray",
                    fontWeight: "bold",
                    fontStyle: "italic",
                }}
                scrolldelay={speed}
            >
                {text}
            </marquee>
        </>
    )
}