import axios from "axios";

export default axios.create({
  baseURL: "https://web-donate.herokuapp.com/file",
  headers: {
    "Content-type": "application/json"
  }
});