import { RoadItem } from "@/model/Itinerary";

const RoadItemComponent = ({ item }: { item: RoadItem }) => {
    return (
        <div>
            <span>{item.turnDirection}</span>
            <span>{item.roadType}</span>
            <span>{item.roadName}</span>
            <div>{item.cardinalDirections.map((d, i) => <span key={i}>{d}</span>)}</div>
            {item.exitCode && <span>{item.exitCode}</span>}
        </div>
    );
};

export default RoadItemComponent;