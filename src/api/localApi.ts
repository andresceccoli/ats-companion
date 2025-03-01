import { Itinerary } from "@/model/Itinerary";
import { Api } from "./api";

const LocalApi: Api = {
    getItinerary: async (id:string) => {
        console.log('fetching', id);
        const it = localStorage.getItem(`itinerary-${id}`);
        if (it) {
            const itObject = JSON.parse(it);
            return Promise.resolve(itObject);
        }
        return Promise.reject(new Error("Itinerary not found"));
    },
    createItinerary: async (itinerary: Itinerary) => {
        console.log('creating it', itinerary);
        const { id, startCity, endCity, endPlace, items } = itinerary;
        const it = { id, startCity, endCity, endPlace, items };

        localStorage.setItem(`itinerary-${id}`, JSON.stringify(it));
    }
}

export default LocalApi;