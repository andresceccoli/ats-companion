import { Itinerary } from "@/model/Itinerary";

export interface Api {
    getItinerary: (id:string) => Promise<Itinerary>;
    createItinerary: (itinerary: Itinerary) => Promise<void>;
}