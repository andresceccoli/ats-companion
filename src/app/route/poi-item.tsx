import { PoiItem, PoiType } from "@/model/Itinerary";
import { HiBuildingOffice2, HiDocument, HiMiniCamera, HiMiniVideoCamera } from "react-icons/hi2";
import ItemContainer from "./item-container";
import { HiLocationMarker } from "react-icons/hi";
import { poiSideIcons } from "./icons";

const poiTypeIcons = {
    [PoiType.Viewpoint]: <HiMiniVideoCamera />,
    [PoiType.Photo]: <HiMiniCamera />,
    [PoiType.Place]: <HiLocationMarker />,
    [PoiType.City]: <HiBuildingOffice2 />,
    [PoiType.Details]: <HiDocument />
};

const PoiItemComponent = ({ item }: { item: PoiItem }) => {
    return (
        <ItemContainer>
            <span className="text-gray-600 dark:text-gray-100">{poiTypeIcons[item.poiType]}</span>
            {item.poiType === PoiType.Viewpoint && <span className="font-semibold">Viewpoint</span>}
            {item.poiType === PoiType.Photo && <span className="font-semibold">Photo</span>}
            {(item.poiType === PoiType.Place || item.poiType === PoiType.City) && <span className="font-semibold">{item.poiText}</span>}
            {item.poiType === PoiType.Details && <span className="font-light">{item.poiText}</span>}
            {item.poiType !== PoiType.Details && item.poiType !== PoiType.City && 
                <span className="text-2xl">{poiSideIcons[item.poiSide]}</span>
            }
        </ItemContainer>
    );
}

export default PoiItemComponent;