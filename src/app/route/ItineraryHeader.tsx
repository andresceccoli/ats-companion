import React from "react";

import { Itinerary } from "@/model/Itinerary";
import { Button, HR } from "flowbite-react";
import { HiLocationMarker, HiOutlineLocationMarker } from "react-icons/hi";
import { HiMiniBuildingOffice, HiMiniLink, HiOutlineClipboard } from "react-icons/hi2";

interface ItineraryHeaderProps {
    itinerary: Itinerary;
}

const ItineraryHeader = ({ itinerary }: ItineraryHeaderProps) => {
    return (
        <>
            <div className="flex items-center justify-between gap-10 pb-3">
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
            <div className="flex items-center gap-2 justify-end">
                <HiMiniBuildingOffice /> {itinerary.endPlace}
            </div>
        </>
    );
};

export default ItineraryHeader;
