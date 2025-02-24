import { customAlphabet } from "nanoid";
import { StateCode } from "./StateCode";

export interface ItineraryItem {
    id: string;
    itemType: ("road" | "poi")
}

export interface Itinerary {
    id: string;
    startCity?: string;
    endCity?: string;
    endPlace?: string;
    items: ItineraryItem[];
}

export enum TurnDirection { Left = "left", Right = "right", Ahead = "ahead" };
export enum RoadType { Interstate = "interstate", US = "us", State = "state", Street = "street" };
export enum CardinalDirection { West = "w", North = "n", East = "e", South = "s" };

export interface RoadItem extends ItineraryItem {
    itemType: "road";
    roadName: string;
    turnDirection: TurnDirection;
    roadType: RoadType;
    stateCode?: StateCode;
    cardinalDirections: CardinalDirection[];
    exitCode?: string;
}

export enum PoiType { Viewpoint = "viewpoint", Photo = "photo", Place = "place", Details = "details" };
export enum PoiSide { Left = "left", Right = "right" };

export interface PoiItem extends ItineraryItem {
    itemType: "poi";
    poiType: PoiType;
    poiSide: PoiSide;
    poiText: string;
}

export const newItineraryId = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 6);
const newItemId = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 10);

export const createRoadItem = (roadName: string,
    turnDirection: TurnDirection, roadType: RoadType,
    cardinalDirections: CardinalDirection[],
    exitCode?: string,
    stateCode?: StateCode
): RoadItem => ({
    id: newItemId(),
    itemType: "road",
    roadName, turnDirection, roadType,
    cardinalDirections,
    exitCode,
    stateCode
});

export const createDefaultRoadItem = () => createRoadItem("", TurnDirection.Ahead,
    RoadType.Interstate, []);

export const createPoiItem = (poiType: PoiType,
    poiSide: PoiSide, poiText: string
): PoiItem => ({
    id: newItemId(),
    itemType: "poi",
    poiType, poiSide, poiText
});

export const createDefaultPoiItem = (type: PoiType) => createPoiItem(type, PoiSide.Right, "");