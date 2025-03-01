import { Itinerary } from "@/model/Itinerary";
import { Api } from "./api";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

console.log('connection to backend at', API_URL);

const RemoteApi: Api = {
    getItinerary: async (id: string) => {
        return axios.get(`${API_URL}/itinerary/${id}`).then(res => res.data);
    },
    createItinerary: async (itinerary: Itinerary) => {
        return axios.post(`${API_URL}/itinerary`, itinerary);
    }
};

export default RemoteApi;