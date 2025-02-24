'use client'

import { Itinerary } from "@/model/Itinerary";
import { Button, Label, TextInput } from "flowbite-react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import useItineraryStore from "../itinerary-store";
import { useShallow } from "zustand/shallow";

const NewItinerary = () => {
    const { updateHeader, startCity, endCity, endPlace } =
        useItineraryStore(useShallow(state => ({
            updateHeader: state.updateHeader,
            startCity: state.startCity,
            endCity: state.endCity,
            endPlace: state.endPlace
        })));

    const {
        register,
        handleSubmit,
        // watch,
        // formState: { errors }
    } = useForm<Itinerary>({
        defaultValues: {
            startCity, endCity, endPlace
        }
    });

    const router = useRouter();

    const onSubmit: SubmitHandler<Itinerary> = (data) => {
        updateHeader(data.startCity, data.endCity, data.endPlace);
        router.push("/route/new/items");
    };

    return (
        <div>
            <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="start-city" value="Start City" />
                    </div>
                    <TextInput id="start-city" type="text" placeholder="Denver, CO"
                        {...register("startCity")} />
                    
                    <div className="mb-2 block">
                        <Label htmlFor="end-city" value="End City" />
                    </div>
                    <TextInput id="end-city" type="text" placeholder="Los Angeles, CA"
                        {...register("endCity")} />

                    <div className="mb-2 block">
                        <Label htmlFor="end-place" value="Company" />
                    </div>
                    <TextInput id="end-place" type="text" placeholder="Railroad Express"
                        {...register("endPlace")} />
                    
                    <Button type="submit">Next</Button>
                </div>
            </form>
        </div>
    );
};

export default NewItinerary;