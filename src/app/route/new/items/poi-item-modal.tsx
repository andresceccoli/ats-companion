import { PoiItem, PoiSide, PoiType } from "@/model/Itinerary";
import { Button, Label, Modal, Select, Textarea, TextInput } from "flowbite-react";
import { SubmitHandler, useForm } from "react-hook-form";
import EnumRadio, { enumToObjects, objectsToOptions } from "./EnumRadio";

const poiTypeOptions = objectsToOptions(enumToObjects(PoiType));

const PoiItemModal = ({ item, onAccept, onCancel }: {
    item: PoiItem,
    onAccept: (item: PoiItem) => void,
    onCancel: () => void
}) => {
    const {
        register,
        handleSubmit,
        watch
    } = useForm<PoiItem>({
        defaultValues: item
    });

    const onSubmit: SubmitHandler<PoiItem> = (data) => {
        console.log('data', data);
        onAccept(data);
    };

    const poiType = watch("poiType");

    return (
        <Modal show size="md" onClose={onCancel}>
            <Modal.Body>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                    <Label htmlFor="poi-type">Type</Label>
                    <Select id="poi-type" required {...register("poiType")}>
                        {poiTypeOptions}
                    </Select>
                    {poiType !== PoiType.Details && poiType !== PoiType.City &&
                        <div className="flex gap-4">
                            <Label>Side</Label>
                            <EnumRadio register={register} enumType={PoiSide} fieldName="poiSide" />
                        </div>
                    }
                    {poiType === PoiType.Details &&
                    <>
                        <Label htmlFor="poi-text">Text</Label>
                        <Textarea id="poi-text" rows={4} {...register("poiText")} />
                    </>
                    }
                    {(poiType === PoiType.Place || poiType === PoiType.City) &&
                    <>
                        <Label htmlFor="poi-text">Name</Label>
                        <TextInput id="poi-text" {...register("poiText")} />
                    </>
                    }

                    <div className="flex justify-end gap-3">
                        <Button type="button" color="light" onClick={onCancel}>Cancel</Button>
                        <Button type="submit">OK</Button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default PoiItemModal;