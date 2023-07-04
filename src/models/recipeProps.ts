export interface recipesProps {
    idMeal: number;
    strMeal: string;
    strMealThumb: string;
    strCategory: string;
    strYoutube:string;
    strInstructions:string;
    strIngredients:{ingredient: string; measure: string }[];
}

