import { Label, Radio } from "flowbite-react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

interface EnumRadioProps<T extends FieldValues> {
    enumType: object;
    fieldName: Path<T>;
    register: UseFormRegister<T>;
}

const EnumRadio = <T extends FieldValues>({ enumType, fieldName, register }: EnumRadioProps<T>) => {
    return (
        <>
        {enumToObjects(enumType).map(e => (
            <div key={e.value} className="flex gap-2">
                <Radio id={`turn-${e.value}`} value={e.value} {...register(fieldName)} />
                <Label htmlFor={`turn-${e.value}`}>{e.label}</Label>
            </div>
        ))}
        </>
    );
};

export const enumToObjects = (enumType: object) => Object.values(enumType).map((d, i) => {
    const k = Object.keys(enumType)[i];
    return ({
        label: k,
        value: d
    });
});


export const objectsToOptions = (objects: { label: string, value: string }[]) => 
    objects.map((o) => (<option key={o.value} value={o.value}>{o.label}</option>));

export default EnumRadio;