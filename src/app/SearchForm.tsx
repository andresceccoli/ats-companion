'use client'

import { Button, TextInput } from "flowbite-react";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";

const SearchForm = () => {
    const router = useRouter();

    const [routeId, setRouteId] = useState("");
    const onRouteIdChanged = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setRouteId(e.target.value);
    }, []);
    const onSearch = useCallback(() => {
        router.push(`/route/${routeId}`);
    }, [router, routeId]);

    return (
        <div className="flex flex-col sm:flex-row gap-4">
            <TextInput type="text" placeholder="Enter Route ID" value={routeId} onChange={onRouteIdChanged} />
            <Button type="button" onClick={onSearch}>Go</Button>
        </div>
    );
};

export default SearchForm;