import { PoiSide, RoadType, TurnDirection } from "@/model/Itinerary";
import Image from "next/image";
import interstate from "../icons/interstate.svg";
import usroute from "../icons/usroute.svg";
import { IconType } from "react-icons";
import { HiMiniArrowLongUp, HiMiniArrowTurnUpLeft, HiMiniArrowTurnUpRight } from "react-icons/hi2";
import { LuArrowLeftToLine, LuArrowRightToLine } from "react-icons/lu";
import { FaRoad } from "react-icons/fa6";
import { PiTrafficSignalFill } from "react-icons/pi";
import { BsFillSignMergeRightFill, BsFillSignTurnLeftFill, BsFillSignTurnRightFill } from "react-icons/bs";


export const turnIcons = {
    [TurnDirection.Left]: <HiMiniArrowTurnUpLeft />,
    [TurnDirection.Right]: <HiMiniArrowTurnUpRight />,
    [TurnDirection.Ahead]: <HiMiniArrowLongUp />
};

export const turnIconsIndexed = {
    [TurnDirection.Left]: BsFillSignTurnLeftFill,
    [TurnDirection.Right]: BsFillSignTurnRightFill,
    [TurnDirection.Ahead]: BsFillSignMergeRightFill
} as unknown as { string: IconType };

export const poiSideIcons = {
    [PoiSide.Left]: <LuArrowLeftToLine />,
    [PoiSide.Right]: <LuArrowRightToLine />
};

export const poiSideIconsIndexed = {
    [PoiSide.Left]: LuArrowLeftToLine,
    [PoiSide.Right]: LuArrowRightToLine
} as unknown as { string: IconType };

const InterstateIcon = () => <Image src={interstate} alt="Interstate" width={20} />;
const USIcon = () => <Image src={usroute} alt="Interstate" width={20} />;

export const roadTypeIcons = {
    [RoadType.Interstate]: <InterstateIcon />,
    [RoadType.US]: <USIcon />,
};

export const roadTypeIconsIndexed = {
    [RoadType.Interstate]: InterstateIcon,
    [RoadType.US]: USIcon,
    [RoadType.State]: FaRoad,
    [RoadType.Street]: PiTrafficSignalFill
} as unknown as { string: React.FunctionComponent };