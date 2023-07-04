import axios, { AxiosRequestConfig } from 'axios';
import { recipesProps } from '../models/recipeProps';

export async function fetchRecipes(
  search: string,
  category:string,
  country:string
): Promise<recipesProps[]> {

  // const storedRecipes = localStorage.getItem('recipes');
  // if (storedRecipes) {
  //   return JSON.parse(storedRecipes);
  // }

  const options: AxiosRequestConfig = {
    method: 'GET',
    url: 'https://www.themealdb.com/api/json/v1/1/search.php',
    params: {
      s: search,
      c: category || ''
    }
  };

  try {
    const response = await axios.request(options);
    console.log(response)
    // localStorage.setItem('recipes', JSON.stringify(response.data.results));
    return response.data.meals;
  } catch (error) {
    throw new Error('Failed to fetch recipes');
  }
}
