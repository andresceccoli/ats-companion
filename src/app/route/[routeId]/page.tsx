'use client'

import { PoiItem, RoadItem } from "@/model/Itinerary";
import React, { use, useEffect, useState } from "react";
import RoadItemComponent from "../road-item";
import PoiItemComponent from "../poi-item";
import useItineraryStore from "../itinerary-store";
import { useShallow } from "zustand/shallow";
import ItineraryHeader from "../ItineraryHeader";

const RouteDetails = ({ params }: { params: Promise<{ routeId: string }>}) => {
    const { routeId } = use(params);

    const {
        load, clear,
        ...itinerary
    } = useItineraryStore(useShallow(state => ({
        id: state.id,
        startCity: state.startCity,
        endCity: state.endCity,
        endPlace: state.endPlace,
        items: state.items,
        load: state.load,
        clear: state.clear
    })));

    const [loaded, setLoaded] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>();
    useEffect(() => {
        if (routeId && !loaded) {
            try {
                const it = localStorage.getItem(`itinerary-${routeId}`);
                if (it) {
                    const itObject = JSON.parse(it);
                    load(itObject);
                    setLoaded(true);
                }
            } catch (e: unknown) {
                setError((e as Error).message);
            }
        }
    }, [routeId, loaded, load, clear]);

    return (
        <div>
            {!loaded && !error && <p>Loading...</p>}
            {!loaded && error && <p>{error}</p>}
            {loaded &&
            <div className="flex flex-col gap-3">
                <ItineraryHeader itinerary={itinerary} />
                <div className="flex flex-col">
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