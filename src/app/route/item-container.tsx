'use client'

import React from "react";

const ItemContainer = ({ children }: {
    children: React.ReactNode
}) => {
    return (
        <div className="flex gap-2 py-3 items-center border-b border-gray-200 dark:border-gray-700">
            {children}
        </div>
    );
};

export default ItemContainer;