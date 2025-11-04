import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export interface Ingredient {
    id: string;
    name: string;
    image: string;
    prompt?: string;
    hideInIngredientsTab?: boolean;
}

interface IngredientLibraryContextType {
    libraryIngredients: Ingredient[];
    addIngredient: (ingredient: Ingredient) => void;
    removeIngredient: (id: string) => void;
}

const IngredientLibraryContext = createContext<IngredientLibraryContextType | undefined>(undefined);

const initialLibraryIngredients: Ingredient[] = [
    { id: '1', name: 'Dogos', image: '/Ingredients/dogos.png', prompt: 'cute cartoon dog character' },
    { id: '2', name: 'Autumn Leaf', image: '/Ingredients/LeafAutum.png', prompt: 'autumn leaf, orange and red colors' },
    { id: '3', name: 'Winter Leaf', image: '/Ingredients/LeafWinter.png', prompt: 'winter leaf, frost covered' },
    { id: 'hardcoded-prediction-4', name: 'Prediction 4', image: '/IngredientGenerationCandidates/4.jpg', prompt: 'hardcoded prediction 4', hideInIngredientsTab: true }
];

export const IngredientLibraryProvider = ({ children }: { children: ReactNode }) => {
    const [libraryIngredients, setLibraryIngredients] = useState<Ingredient[]>(initialLibraryIngredients);

    const addIngredient = (ingredient: Ingredient) => {
        setLibraryIngredients(prev => [...prev, ingredient]);
    };

    const removeIngredient = (id: string) => {
        setLibraryIngredients(prev => prev.filter(ing => ing.id !== id));
    };

    return (
        <IngredientLibraryContext.Provider value={{ libraryIngredients, addIngredient, removeIngredient }}>
            {children}
        </IngredientLibraryContext.Provider>
    );
};

export const useIngredientLibrary = () => {
    const context = useContext(IngredientLibraryContext);
    if (!context) {
        throw new Error("useIngredientLibrary must be used within IngredientLibraryProvider");
    }
    return context;
};
