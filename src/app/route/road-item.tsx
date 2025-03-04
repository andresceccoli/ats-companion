import { CardinalDirection, RoadItem, RoadType } from "@/model/Itinerary";
import ItemContainer from "./item-container";
import { roadTypeIcons, turnIcons } from "./icons";



const getRoadPrefix = (roadItem: RoadItem) => {
    const { roadType, stateCode } = roadItem;
    if (roadType === RoadType.Interstate) {
        return "I-";
    }
    if (roadType === RoadType.US) {
        return "US "
    }
    if (roadType === RoadType.State) {
        return `${stateCode} `;
    }
    return "";
};

const RoadItemComponent = ({ item }: { item: RoadItem }) => {
    return (
        <ItemContainer>
            <span>{turnIcons[item.turnDirection]}</span>
            {(item.roadType === RoadType.Interstate || item.roadType === RoadType.US) &&
                <span>{roadTypeIcons[item.roadType]}</span>
            }
            <span className="font-bold">{getRoadPrefix(item)}{item.roadName}</span>
            <div className="flex gap-1">{item.cardinalDirections.map((d, i) => <CardinalSign key={i} cardinalDirection={d} />)}</div>
            {item.exitCode && <ExitSign exitCode={item.exitCode} />}
        </ItemContainer>
    );
};

const CardinalSign = ({ cardinalDirection } : {
    cardinalDirection: CardinalDirection
}) => {
    return (
        <div className="flex py-0 items-center">
            <span className="font-semibold text-emerald-600 uppercase"
                style={{ lineHeight: "16px" }}>{getCardinalLabel(cardinalDirection)}</span>
        </div>
    );
};

const ExitSign = ({ exitCode }: { exitCode: string }) => {
    return (
        <div className="flex bg-emerald-700 px-1 py-0 items-center rounded-md">
            <span className="font-semibold text-xs text-white uppercase"
                style={{ lineHeight: "16px" }}>{exitCode}</span>
        </div>
    );
};

const getCardinalLabel = (cardinalDirection: CardinalDirection) => {
    switch (cardinalDirection) {
        case CardinalDirection.East: return "East";
        case CardinalDirection.West: return "West";
        case CardinalDirection.North: return "North";
        case CardinalDirection.South: return "South";
        default:
            break;
    }
}

export default RoadItemComponent;