import { PoiItem, PoiSide, PoiType } from "@/model/Itinerary";
import { HiBuildingOffice2, HiDocument, HiMiniCamera, HiMiniVideoCamera } from "react-icons/hi2";
import { LuArrowLeftToLine, LuArrowRightToLine } from "react-icons/lu";
import ItemContainer from "./item-container";

const poiTypeIcons = {
    [PoiType.Viewpoint]: <HiMiniVideoCamera />,
    [PoiType.Photo]: <HiMiniCamera />,
    [PoiType.Place]: <HiBuildingOffice2 />,
    [PoiType.Details]: <HiDocument />
};

const poiSideIcons = {
    [PoiSide.Left]: <LuArrowLeftToLine />,
    [PoiSide.Right]: <LuArrowRightToLine />
}

const PoiItemComponent = ({ item }: { item: PoiItem }) => {
    return (
        <ItemContainer>
            <div className="flex gap-2 flex-1 items-center">
                <span className="text-gray-600 dark:text-gray-100">{poiTypeIcons[item.poiType]}</span>
                {item.poiType === PoiType.Viewpoint && <span className="font-semibold">Viewpoint</span>}
                {item.poiType === PoiType.Photo && <span className="font-semibold">Photo</span>}
                {item.poiType === PoiType.Place && <span className="font-semibold">{item.poiText}</span>}
                {item.poiType === PoiType.Details && <span>{item.poiText}</span>}
            </div>
            {item.poiType !== PoiType.Details &&
                <span className="text-2xl">{poiSideIcons[item.poiSide]}</span>
            }
        </ItemContainer>
    );
}

export default PoiItemComponent;