'use client'

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
            <input type="text" value={routeId} onChange={onRouteIdChanged} />
            <button type="button" onClick={onSearch}>Go</button>
        </div>
    );
};

export default SearchForm;