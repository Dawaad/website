"use client";

import React, { createContext, useContext, useState } from "react";

interface CursorContextType {
    isLiquidCursorVisible: boolean;
    setLiquidCursorVisible: (visible: boolean) => void;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export const CURSOR_HANDLER = (setLiquidCursorVisible: (visible: boolean) => void) => {
    return {
        onMouseEnter: () => setLiquidCursorVisible(false),
        onMouseLeave: () => setLiquidCursorVisible(true),
    };
};

export function CursorProvider({ children }: { children: React.ReactNode }) {
    const [isLiquidCursorVisible, setLiquidCursorVisible] = useState(true);

    return (
        <CursorContext.Provider value={{ isLiquidCursorVisible, setLiquidCursorVisible }}>
            {children}
        </CursorContext.Provider>
    );
}

export function useCursor() {
    const context = useContext(CursorContext);
    if (context === undefined) {
        throw new Error("useCursor must be used within a CursorProvider");
    }
    return context;
}
