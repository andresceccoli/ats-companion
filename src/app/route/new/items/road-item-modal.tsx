import { RoadItem, TurnDirection } from "@/model/Itinerary";
import { Button, Label, Select } from "flowbite-react";
import { SubmitHandler, useForm } from "react-hook-form";

const turnOptions = Object.values(TurnDirection).map((d, i) => {
    const k = Object.keys(TurnDirection)[i];
    return ({
        label: k,
        value: d
    })
});

const RoadItemModal = ({ item, onAccept, onCancel }: {
    item: RoadItem,
    onAccept: (item: RoadItem) => void,
    onCancel: () => void
}) => {
    const {
        register,
        handleSubmit,
        // watch,
        // formState: { errors }
    } = useForm<RoadItem>({
        defaultValues: item
    });

    const onSubmit: SubmitHandler<RoadItem> = (data) => {
        console.log('data', data);
        onAccept(data);
    };

    return (
        <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-2 block">
                <Label htmlFor="turn-direction" value="Turn" />
            </div>
            <Select id="turn-direction" required {...register("turnDirection")}>
                {turnOptions.map((o) => (<option key={o.value} value={o.value}>{o.label}</option>))}
            </Select>

            <Button type="submit">OK</Button>
            <Button type="button" onClick={onCancel}>Cancel</Button>
        </form>
    );
};

export default RoadItemModal;