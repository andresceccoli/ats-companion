import { CardinalDirection, createPoiItem, createRoadItem, Itinerary, PoiSide, PoiType, RoadType, TurnDirection } from "./model/Itinerary"


const mockItinerary: Itinerary = {
    id: "234234",
    startCity: "Colorado",
    endCity: "Los Angeles",
    endPlace: "Railroad Express",
    items: [
        createRoadItem("I-5", TurnDirection.Left, RoadType.I, [CardinalDirection.South]),
        createRoadItem("US42", TurnDirection.Right, RoadType.US, [CardinalDirection.West]),
        createPoiItem(PoiType.Place, PoiSide.Right, "Railroad Express")
    ]
};

const MockApi = {
    getItinerary: async (id:string) => {
        console.log('fetching', id, mockItinerary);
        return Promise.resolve(mockItinerary);
    }
}

export default MockApi;