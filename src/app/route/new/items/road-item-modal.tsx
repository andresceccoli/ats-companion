import { CardinalDirection, RoadItem, RoadType, TurnDirection } from "@/model/Itinerary";
import { StateCode } from "@/model/StateCode";
import { Button, Checkbox, Label, Modal, Select, TextInput } from "flowbite-react";
import { useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import EnumRadio, { enumToObjects, objectsToOptions } from "./EnumRadio";

const roadTypeOptions = objectsToOptions(enumToObjects(RoadType));
const stateCodeOptions = objectsToOptions(enumToObjects(StateCode));

interface RoadItemExtraFormFields {
    cardinalW: boolean;
    cardinalN: boolean;
    cardinalE: boolean;
    cardinalS: boolean;
}

type RoadItemForm = RoadItem & RoadItemExtraFormFields;

const RoadItemModal = ({ item, onAccept, onCancel }: {
    item: RoadItem,
    onAccept: (item: RoadItem) => void,
    onCancel: () => void
}) => {
    const {
        register,
        handleSubmit,
        watch,
        // formState: { errors }
    } = useForm<RoadItemForm>({
        defaultValues: item
    });

    const roadTypeValue = watch("roadType");

    const roadPlaceholder = useMemo(() => {
        switch (roadTypeValue) {
            case RoadType.Rd:
                return "Baker St"
            case RoadType.US:
            case RoadType.St:
                return "82";
            default:
                return "40";
        }
    }, [roadTypeValue]);

    const onSubmit: SubmitHandler<RoadItemForm> = (data) => {
        console.log('data', data);
        const cardinalDirections = [];
        if (data.cardinalW) cardinalDirections.push(CardinalDirection.West);
        if (data.cardinalN) cardinalDirections.push(CardinalDirection.North);
        if (data.cardinalE) cardinalDirections.push(CardinalDirection.East);
        if (data.cardinalS) cardinalDirections.push(CardinalDirection.South);
        data.cardinalDirections = cardinalDirections;
        onAccept(data);
    };

    return (
        <Modal show={true} size="md" onClose={onCancel}>
            <Modal.Body>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-row gap-1">
                        <Select id="road-type" className="flex-1" required {...register("roadType")}>
                            {roadTypeOptions}
                        </Select>
                        <div className="flex flex-row gap-1" style={{ flex: 3 }}>
                            {roadTypeValue === RoadType.St &&
                                <Select id="state-code" {...register("stateCode")} style={{ paddingRight: "1.5rem", backgroundPosition: "right .5rem center" }}>
                                    {stateCodeOptions}
                                </Select>
                            }
                            <TextInput id="road-name" type="text" className="flex-1" placeholder={`e.g. ${roadPlaceholder}`} {...register("roadName")} />
                        </div>
                        <TextInput id="exit-code" type="text" className="flex-1" placeholder="Exit" {...register("exitCode")} />
                    </div>
                    {roadTypeValue !== RoadType.Rd &&
                    <div className="flex items-center gap-4">
                        <Label>Lane</Label>
                        <div className="flex gap-1">
                            <Checkbox id="cardinal-w" {...register("cardinalW")} />
                            <Label htmlFor="cardinal-w">West</Label>
                        </div>
                        <div className="flex gap-1">
                            <Checkbox id="cardinal-n" {...register("cardinalN")} />
                            <Label htmlFor="cardinal-n">North</Label>
                        </div>
                        <div className="flex gap-1">
                            <Checkbox id="cardinal-e" {...register("cardinalE")} />
                            <Label htmlFor="cardinal-e">East</Label>
                        </div>
                        <div className="flex gap-1">
                            <Checkbox id="cardinal-s" {...register("cardinalS")} />
                            <Label htmlFor="cardinal-s">South</Label>
                        </div>
                    </div>
                    }
                    <div className="flex gap-4">
                        <Label>Turn</Label>
                        <EnumRadio enumType={TurnDirection} fieldName="turnDirection" register={register} />
                    </div>
                    

                    <div className="flex justify-end gap-3">
                        <Button type="button" color="light" onClick={onCancel}>Cancel</Button>
                        <Button type="submit">OK</Button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default RoadItemModal;