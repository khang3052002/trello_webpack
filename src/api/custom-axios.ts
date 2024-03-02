import axios from "axios";

export const customAxios = axios.create({
  baseURL: "https://api.trello.com/1",
  headers: {
    "Content-Type": "application/json",
  },
});
