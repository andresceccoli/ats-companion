import { Itinerary, ItineraryItem, newItineraryId } from "@/model/Itinerary";
import { create } from "zustand";

interface ItineraryStoreFunctions {
    updateHeader: (startCity?: string, endCity?: string, endPlace?: string) => void;
    addItem: <I extends ItineraryItem>(item: I) => void;
    updateItem: <I extends ItineraryItem>(index: number, item: I) => void;
    removeItem: (index: number) => void;
    clear: () => void;
    save: () => void;
    load: (it: Itinerary) => void;
}

type ItineraryStore = Itinerary & ItineraryStoreFunctions;

const useItineraryStore = create<ItineraryStore>((set,get) => ({
    id: newItineraryId(),
    items: [],

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
            startCity: '',
            endCity: '',
            endPlace: '',
            items: [],
        })
    },
    async save() {
        const { id, startCity, endCity, endPlace, items } = get();
        const it = { id, startCity, endCity, endPlace, items };

        localStorage.setItem(`itinerary-${id}`, JSON.stringify(it));

        console.log('saved', );
    },
    load(it) {
        set({ ...it });
    },
}));

export default useItineraryStore;