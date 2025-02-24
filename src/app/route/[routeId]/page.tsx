'use client'

import { getApi } from "@/api";
import { Itinerary, PoiItem, RoadItem } from "@/model/Itinerary";
import React, { use, useEffect, useState } from "react";
import RoadItemComponent from "../road-item";
import PoiItemComponent from "../poi-item";
import useItineraryStore from "../itinerary-store";
import { useShallow } from "zustand/shallow";

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
    // const [itinerary, setItinerary] = useState({} as Itinerary);
    useEffect(() => {
        if (routeId && !loaded) {
            load(routeId).then(result => {
                if (!result) {
                    setError('Could not load itinerary');
                }
            })
        }
        // getApi().getItinerary(routeId).then(i => {
        //     console.log('got itinerary', i);
        //     setItinerary(i);
        // })
    }, [routeId, loaded, load]);

    console.log(itinerary && itinerary.items);

    return (
        <div>
            {!loaded && !error && <p>Loading...</p>}
            {!loaded && error && <p>{error}</p>}
            {loaded &&
            <>
                <div>{itinerary.id}</div>
                <div>
                    From: {itinerary.startCity}<br/>
                    To: {itinerary.endCity}<br/>
                    Company: {itinerary.endPlace}
                </div>
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
            </>
            }
        </div>
    );
};

export default RouteDetails;