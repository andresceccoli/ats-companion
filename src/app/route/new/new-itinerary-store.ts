import { Itinerary, ItineraryItem, newItineraryId } from "@/model/Itinerary";
import { create } from "zustand";

type Stage = "header" | "items";

interface ItineraryCreationStage {
    stage: Stage;
    setStage: (s: Stage) => void;
}

interface ItineraryStoreFunctions {
    updateHeader: (startCity?: string, endCity?: string, endPlace?: string) => void;
    addItem: <I extends ItineraryItem>(item: I) => void;
    updateItem: <I extends ItineraryItem>(index: number, item: I) => void;
    removeItem: (index: number) => void;
    clear: () => void;
}

type ItineraryStore = Itinerary & ItineraryStoreFunctions & ItineraryCreationStage;

const useNewItineraryStore = create<ItineraryStore>((set) => ({
    id: newItineraryId(),
    items: [],
    stage: "header",

    updateHeader(startCity, endCity, endPlace) {
        set(() => ({ startCity, endCity, endPlace }));
    },
    addItem(item) {
        set((state) => ({ items: [...state.items, item] }))
    },
    updateItem(index, item) {
        set((state) => {
            const newItems = [...state.items];
            newItems[index] = item;
            return { items:  newItems };
        })
    },
    removeItem(index) {
        set((state) => ({ items: [...state.items].splice(index, 1)}))
    },
    clear() {
        set({
            id: newItineraryId(),
            items: [],
            stage: "header"
        })
    },

    setStage(s) {
        set(() => ({ stage: s }))
    }
}));

export default useNewItineraryStore;