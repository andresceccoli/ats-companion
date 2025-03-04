import { CardinalDirection, RoadItem, RoadType, TurnDirection } from "@/model/Itinerary";
import { StateCode } from "@/model/StateCode";
import { Button, Label, Modal, Select, TextInput } from "flowbite-react";
import { useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import EnumRadio, { enumToObjects, objectsToOptions } from "./EnumRadio";
import { roadTypeIconsIndexed, turnIconsIndexed } from "../../icons";
import SelectMany, { CustomCheckboxOption } from "./SelectMany";

const stateCodeOptions = objectsToOptions(enumToObjects(StateCode));

interface RoadItemExtraFormFields {
    cardinalW: boolean;
    cardinalN: boolean;
    cardinalE: boolean;
    cardinalS: boolean;
}

type RoadItemForm = RoadItem & RoadItemExtraFormFields;

const cardinalOptions: CustomCheckboxOption<RoadItemForm>[] = [
    { label: "WEST", property: "cardinalW" },
    { label: "NORTH", property: "cardinalN" },
    { label: "EAST", property: "cardinalE" },
    { label: "SOUTH", property: "cardinalS" },
];

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
            case RoadType.Street:
                return "Baker St"
            case RoadType.US:
            case RoadType.State:
                return "82";
            default:
                return "40";
        }
    }, [roadTypeValue]);

    const onSubmit: SubmitHandler<RoadItemForm> = (data) => {
        const cardinalDirections = [];
        console.log('data', data)
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
                <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
                    <Label>Turn Direction</Label>
                    <EnumRadio idPrefix="turn" enumType={TurnDirection} icons={turnIconsIndexed} fieldName="turnDirection" register={register} />
                    <Label className="mt-4">Road</Label>
                    <EnumRadio idPrefix="type" enumType={RoadType} icons={roadTypeIconsIndexed} fieldName="roadType" register={register} />
                    <div className="flex flex-row gap-1">
                        <div className="flex flex-row gap-1" style={{ flex: 3 }}>
                            {roadTypeValue === RoadType.State &&
                                <Select id="state-code" {...register("stateCode")} style={{ paddingRight: "1.5rem", backgroundPosition: "right .5rem center" }}>
                                    {stateCodeOptions}
                                </Select>
                            }
                            <TextInput id="road-name" type="text" className="flex-1" placeholder={`e.g. ${roadPlaceholder}`} {...register("roadName")} />
                        </div>
                        <TextInput id="exit-code" type="text" className="flex-1" placeholder="Exit" {...register("exitCode")} />
                    </div>
                    <div className={`flex flex-col gap-4 mt-4 ${roadTypeValue === RoadType.Street ? 'invisible' : ''}`}>
                        <Label>Lane</Label>
                        <SelectMany options={cardinalOptions} register={register} />
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