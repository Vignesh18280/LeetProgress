import axios from "axios";

const httpAxios = axios.create({
  baseURL: "https://leet-progress.vercel.app/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default httpAxios;
