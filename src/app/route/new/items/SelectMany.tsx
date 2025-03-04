import { Label } from "flowbite-react";
import { Path, UseFormRegister } from "react-hook-form";
import { IconType } from "react-icons";

export interface CustomCheckboxOption<T extends object> {
    label?: string;
    property: Path<T>;
    icon?: IconType;
}

interface CustomCheckboxProps<T extends object> {
    option: CustomCheckboxOption<T>;
}

interface SelectManyProps<T extends object> {
    options: CustomCheckboxOption<T>[];
    register: UseFormRegister<T>;
}

const CustomCheckbox = <T extends object>({ option, ...otherProps }: CustomCheckboxProps<T>) => {
    const { icon: Icon } = option;
    return (
        <div className="flex flex-1 justify-center items-center relative p-3 group" style={{ height: "4rem" }}>
            <input type="checkbox" id={option.property.toString()} {...otherProps}
                className="appearance-none absolute w-full h-full rounded bg-transparent
                    checked:bg-none checked:bg-cyan-400/10 checked:border-cyan-400 checked:border-2
                    dark:checked:bg-none dark:checked:bg-cyan-400/10 dark:checked:border-cyan-400 dark:checked:border-2
                    focus:ring-offset-0 focus:ring-0
                    cursor-pointer" />
            <Label htmlFor={option.property.toString()} className="absolute cursor-pointer flex flex-col items-center gap-2 group-has-[:checked]:text-cyan-500">
                {Icon && <Icon className="h-6 w-6" />}
                {option.label}
            </Label>
        </div>
    );
};

const SelectMany = <T extends object>({ options, register }: SelectManyProps<T>) => {
    return (
        <div className="flex gap-4">
            {options.map(option => (
                <CustomCheckbox key={option.property} option={option} {...register(option.property)} />
            ))}
        </div>
    );
};

export default SelectMany;