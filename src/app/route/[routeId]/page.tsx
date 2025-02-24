'use client'

import { PoiItem, RoadItem } from "@/model/Itinerary";
import React, { use, useEffect, useState } from "react";
import RoadItemComponent from "../road-item";
import PoiItemComponent from "../poi-item";
import useItineraryStore from "../itinerary-store";
import { useShallow } from "zustand/shallow";
import { HiLocationMarker, HiOutlineLocationMarker } from "react-icons/hi";
import { HiMiniBuildingOffice, HiMiniLink, HiOutlineClipboard } from "react-icons/hi2";
import { Button, HR } from "flowbite-react";

const RouteDetails = ({ params }: { params: Promise<{ routeId: string }>}) => {
    const { routeId } = use(params);

    const {
        load, loaded,
        ...itinerary
    } = useItineraryStore(useShallow(state => ({
        id: state.id,
        startCity: state.startCity,
        endCity: state.endCity,
        endPlace: state.endPlace,
        items: state.items,
        load: state.load,
        loaded: state.loaded
    })));

    const [error, setError] = useState<string | undefined>();
    useEffect(() => {
        if (routeId && !loaded) {
            load(routeId).then(result => {
                if (!result) {
                    setError('Could not load itinerary');
                }
            })
        }
    }, [routeId, loaded, load]);

    console.log(itinerary && itinerary.items);

    return (
        <div>
            {!loaded && !error && <p>Loading...</p>}
            {!loaded && error && <p>{error}</p>}
            {loaded &&
            <div className="flex flex-col p-5 gap-3 max-w-screen-md">
                <div className="flex items-center justify-start gap-10">
                    <h3 className="text-2xl">Route ID</h3>
                    <Button.Group>
                        <Button color="light" size="lg">
                            <span className="text-xl">{itinerary.id}</span>
                            <HiOutlineClipboard className="ml-3 pt-1 h-6 w-6" />
                        </Button>
                        <Button color="light">
                            <HiMiniLink className="pt-1 h-6 w-6" />
                        </Button>
                    </Button.Group>
                </div>
                <div className="flex items-center">
                    <div className="flex items-center gap-2 pr-2">
                        <HiOutlineLocationMarker />{itinerary.startCity}
                    </div>
                    <HR className="flex-1 bg-blue-700 dark:bg-blue-500 my-0" style={{ height: "2px" }} />
                    <div className="flex items-center gap-2 pl-2">
                        <HiLocationMarker /> {itinerary.endCity}
                    </div>
                </div>
                <div className="flex items-center justify-end">
                    <HiMiniBuildingOffice /> {itinerary.endPlace}
                </div>
                <div className="flex flex-col mt-4">
                {itinerary.items.map(i => {
                    switch (i.itemType) {
                        case "road":
                            return <RoadItemComponent key={i.id} item={i as RoadItem} />
                        case "poi":
                            return <PoiItemComponent key={i.id} item={i as PoiItem} />
                        default:
                            return null;
                    }
                })}
                </div>
            </div>
            }
        </div>
    );
};

export default RouteDetails;