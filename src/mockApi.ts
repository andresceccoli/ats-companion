import { createPoiItem, createRoadItem, Itinerary } from "./model/Itinerary"


const mockItinerary: Itinerary = {
    id: "234234",
    startCity: "Colorado",
    endCity: "Los Angeles",
    endPlace: "Railroad Express",
    items: [
        createRoadItem("1", "I-5", "left", "interstate", ["s"]),
        createRoadItem("2", "US42", "right", "us", ["w"]),
        createPoiItem("3", "place", "right", "Railroad Express")
    ]
};

const MockApi = {
    getItinerary: async (id:string) => {
        console.log('fetching', id, mockItinerary);
        return Promise.resolve(mockItinerary);
    }
}

export default MockApi;