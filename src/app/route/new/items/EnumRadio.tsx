import { Label } from "flowbite-react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { IconType } from "react-icons";

interface EnumRadioProps<T extends FieldValues> {
    idPrefix: string;
    enumType: object;
    fieldName: Path<T>;
    register: UseFormRegister<T>;
    icons?: object;
}

interface CustomRadioProps<T extends FieldValues> {
    id: string;
    label: string;
    value: Path<T> | Path<T>[] | undefined;
    icon?: IconType;
}

const CustomRadio = <T extends FieldValues>({ id, value, label, icon, ...otherProps }: CustomRadioProps<T>) => {
    const Icon = icon || null;

    return (
        <div className="flex flex-1 justify-center items-center relative p-3 group" style={{ height: "4rem" }}>
            <input type="radio" id={id} value={value} {...otherProps}
                className="appearance-none absolute w-full h-full rounded bg-transparent
                    checked:bg-none checked:bg-cyan-400/10 checked:border-cyan-400 checked:border-2
                    dark:checked:bg-none dark:checked:bg-cyan-400/10 dark:checked:border-cyan-400 dark:checked:border-2
                    focus:ring-offset-0 focus:ring-0
                    cursor-pointer" />
            <Label htmlFor={id} className="absolute cursor-pointer flex flex-col items-center gap-2 group-has-[:checked]:text-cyan-500">
                {Icon && <Icon className={`h-6 w-6`} />}
                {label}
            </Label>
        </div>
    );
};

const EnumRadio = <T extends FieldValues>({ idPrefix, enumType, fieldName, icons, register }: EnumRadioProps<T>) => {
    return (
        <div className="flex gap-4">
        {enumToObjects(enumType).map(e => {
            const key = e.value as keyof object;
            return (
                <CustomRadio key={e.value} id={`${idPrefix}-${e.value}`} icon={icons && icons[key]} value={e.value} label={e.label} {...register(fieldName)}/>
            );
        })}
        </div>
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