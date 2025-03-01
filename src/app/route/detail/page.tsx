'use client'

import { PoiItem, RoadItem } from "@/model/Itinerary";
import React, { useEffect, useState } from "react";
import RoadItemComponent from "../road-item";
import PoiItemComponent from "../poi-item";
import useItineraryStore from "../itinerary-store";
import { useShallow } from "zustand/shallow";
import ItineraryHeader from "../ItineraryHeader";
import { useSearchParams } from "next/navigation";
import { getApi } from "@/api";

const RouteDetails = () => {
    const searchParams = useSearchParams();

    const routeId = searchParams.get('id');

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
            getApi().getItinerary(routeId).then(it => {
                if (it) {
                    load(it);
                    setLoaded(true);
                } else {
                    setError("Route not found");
                }
            }).catch(e => {
                setError((e as Error).message);
            });
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