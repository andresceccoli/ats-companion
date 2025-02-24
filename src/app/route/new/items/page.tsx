'use client'

import { useShallow } from "zustand/shallow";
import useNewItineraryStore from "../new-itinerary-store";
import RoadItemComponent from "../../road-item";
import PoiItemComponent from "../../poi-item";
import { createDefaultPoiItem, createDefaultRoadItem, PoiItem, PoiType, RoadItem } from "@/model/Itinerary";
import { Button } from "flowbite-react";
import { useCallback, useState } from "react";
import RoadItemModal from "./road-item-modal";
import PoiItemModal from "./poi-item-modal";

const ItemsPage = () => {
    const {
        startCity,
        endCity,
        endPlace,
        items,
        addItem,
    } = useNewItineraryStore(useShallow(state => ({
        startCity: state.startCity,
        endCity: state.endCity,
        endPlace: state.endPlace,
        items: state.items,
        addItem: state.addItem
    })));

    const [currentRoadItem, setCurrentRoadItem] = useState<RoadItem | undefined>();
    const onAddRoad = useCallback(() => {
        setCurrentRoadItem(createDefaultRoadItem());
    }, []);
    const [currentPoiItem, setCurrentPoiItem] = useState<PoiItem | undefined>();
    const onAddPlace = useCallback(() => {
        setCurrentPoiItem(createDefaultPoiItem(PoiType.Place))
    }, []);

    const onRoadItemAccept = useCallback((item: RoadItem) => {
        addItem(item);
        setCurrentRoadItem(undefined);
    }, [addItem]);
    const onRoadItemCancel = useCallback(() => setCurrentRoadItem(undefined), []);
    
    const onPoiItemAccept = useCallback((item: PoiItem) => {
        addItem(item);
        setCurrentPoiItem(undefined);
    }, [addItem]);
    const onPoiItemCancel = useCallback(() => setCurrentPoiItem(undefined), []);

    return (
        <div>
            <div>
                From: {startCity}<br/>
                To: {endCity}<br/>
                Company: {endPlace}
            </div>
            {items.map(i => {
                switch (i.itemType) {
                    case "road":
                        return <RoadItemComponent key={i.id} item={i as RoadItem} />
                    case "poi":
                        return <PoiItemComponent key={i.id} item={i as PoiItem} />
                    default:
                        return null;
                }
            })}

            <Button type="button" onClick={onAddRoad}>Add Road</Button>
            <Button type="button" onClick={onAddPlace}>Add Point</Button>

            <div>
                <Button type="button" onClick={() => history.go(-1)}>Back</Button>
                <Button type="button">Create</Button>
            </div>

            {currentRoadItem &&
                <RoadItemModal item={currentRoadItem}
                    onAccept={onRoadItemAccept}
                    onCancel={onRoadItemCancel} />}
            {currentPoiItem &&
                <PoiItemModal item={currentPoiItem}
                    onAccept={onPoiItemAccept}
                    onCancel={onPoiItemCancel} />}
        </div>
    );
};

export default ItemsPage;