import { CardinalDirection, RoadItem, RoadType, TurnDirection } from "@/model/Itinerary";
import { HiMiniArrowLongUp, HiMiniArrowTurnUpLeft, HiMiniArrowTurnUpRight } from "react-icons/hi2";
import interstate from "../icons/interstate.svg";
import usroute from "../icons/usroute.svg";
import Image from "next/image";

const turnIcons = {
    [TurnDirection.Left]: <HiMiniArrowTurnUpLeft />,
    [TurnDirection.Right]: <HiMiniArrowTurnUpRight />,
    [TurnDirection.Ahead]: <HiMiniArrowLongUp />
};

const roadTypeIcons = {
    [RoadType.I]: <Image src={interstate} alt="Interstate" width={20} />,
    [RoadType.US]: <Image src={usroute} alt="Interstate" width={20} />,
};

const getRoadPrefix = (roadItem: RoadItem) => {
    const { roadType, stateCode } = roadItem;
    if (roadType === RoadType.I) {
        return "I-";
    }
    if (roadType === RoadType.US) {
        return "US "
    }
    if (roadType === RoadType.St) {
        return `${stateCode} `;
    }
    return "";
};

const RoadItemComponent = ({ item }: { item: RoadItem }) => {
    return (
        <div className="flex gap-2 pb-2">
            <span>{turnIcons[item.turnDirection]}</span>
            {(item.roadType === RoadType.I || item.roadType === RoadType.US) &&
                <span>{roadTypeIcons[item.roadType]}</span>
            }
            <span className="font-bold">{getRoadPrefix(item)}{item.roadName}</span>
            <div className="flex gap-1">{item.cardinalDirections.map((d, i) => <CardinalSign key={i} cardinalDirection={d} />)}</div>
            {item.exitCode && <ExitSign exitCode={item.exitCode} />}
        </div>
    );
};

const CardinalSign = ({ cardinalDirection } : {
    cardinalDirection: CardinalDirection
}) => {
    return (
        <div className="flex px-1 py-0 items-center">
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