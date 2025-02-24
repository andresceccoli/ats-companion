import { PoiItem } from "@/model/Itinerary";

const PoiItemComponent = ({ item }: { item: PoiItem }) => {
    return (
        <div>
            <span>{item.poiType}</span>
            <span>{item.poiText}</span>
            <span>{item.poiSide}</span>
        </div>
    );
}

export default PoiItemComponent;