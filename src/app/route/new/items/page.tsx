'use client'

import { useShallow } from "zustand/shallow";
import useItineraryStore from "../../itinerary-store";
import RoadItemComponent from "../../road-item";
import PoiItemComponent from "../../poi-item";
import { createDefaultPoiItem, createDefaultRoadItem, PoiItem, PoiType, RoadItem } from "@/model/Itinerary";
import { Button } from "flowbite-react";
import { useCallback, useMemo, useState } from "react";
import RoadItemModal from "./road-item-modal";
import PoiItemModal from "./poi-item-modal";
import ItineraryHeader from "../../ItineraryHeader";
import { HiMiniArrowTurnUpLeft } from "react-icons/hi2";
import { HiLocationMarker } from "react-icons/hi";
import { useRouter } from "next/navigation";

const ItemsPage = () => {
    const {
        id,
        startCity,
        endCity,
        endPlace,
        items,
        addItem,
        save,
    } = useItineraryStore(useShallow(state => ({
        id: state.id,
        startCity: state.startCity,
        endCity: state.endCity,
        endPlace: state.endPlace,
        items: state.items,
        addItem: state.addItem,
        save: state.save
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

    const itObject = useMemo(() => ({
        id, startCity, endCity, endPlace, items
    }), [id, startCity, endCity, endPlace, items]);

    const router = useRouter();
    const onSave = useCallback(() => {
        save();
        router.push(`/route/detail?id=${id}`);
    }, [id, router, save]);

    return (
        <div className="flex flex-col gap-3">
            <ItineraryHeader itinerary={itObject} />

            {items.length === 0 &&
                <div className="flex flex-col items-center py-5">
                    <span className="py-3">No route instructions yet</span>
                    <div className="flex gap-4 items-center">
                        <Button type="button" color="gray" onClick={onAddRoad}>
                            <HiMiniArrowTurnUpLeft className="mr-2 h-5 w-5" /> Add Road</Button>
                        <span>or</span>
                        <Button type="button" color="gray" onClick={onAddPlace}>
                            <HiLocationMarker className="mr-2 h-5 w-5" /> Add Point</Button>
                    </div>
                </div>
            }
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

            <div className="flex justify-between mt-3">
                <Button type="button" color="light" onClick={() => history.go(-1)}>Back</Button>
                {items.length > 0 &&
                    <div className="flex gap-2 items-center">
                        <Button type="button" color="gray" onClick={onAddRoad}>
                            <HiMiniArrowTurnUpLeft className="mr-2 h-5 w-5" /> Add Road</Button>
                        <Button type="button" color="gray" onClick={onAddPlace}>
                            <HiLocationMarker className="mr-2 h-5 w-5" /> Add Point</Button>
                    </div>
                }

                <Button type="button" onClick={onSave} disabled={items.length === 0}>Create</Button>
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