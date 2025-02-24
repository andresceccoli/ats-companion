import MockApi from "@/mockApi";
import { Itinerary } from "@/model/Itinerary";

export interface Api {
    getItinerary: (id:string) => Promise<Itinerary>;
}

export const getApi = (): Api => {
    return MockApi;
};