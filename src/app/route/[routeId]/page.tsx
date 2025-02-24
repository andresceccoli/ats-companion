'use client'

import { getApi } from "@/api";
import { Itinerary, PoiItem, RoadItem } from "@/model/Itinerary";
import React, { use, useEffect, useState } from "react";
import RoadItemComponent from "../road-item";
import PoiItemComponent from "../poi-item";

const RouteDetails = ({ params }: { params: Promise<{ routeId: string }>}) => {
    const { routeId } = use(params);
    const [itinerary, setItinerary] = useState({} as Itinerary);
    useEffect(() => {
        getApi().getItinerary(routeId).then(i => {
            console.log('got itinerary', i);
            setItinerary(i);
        })
    }, [routeId]);

    console.log(itinerary && itinerary.items);

    return (
        <div>
            {!itinerary.id && <p>Loading...</p>}
            {itinerary.id &&
            <>
                <div>{routeId}</div>
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