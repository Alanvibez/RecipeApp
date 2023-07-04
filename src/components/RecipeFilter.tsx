import { AutoComplete, Input, Radio, Switch, Typography } from 'antd';
import axios from 'axios';
import { FC, useEffect, useState } from 'react';

const { Text } = Typography;

interface RecipeFilterProps {
  onChangeCategory?: (category: string) => void;
  onSelectIngredient?: (ingredient: string) => void;
  onSelectCountry?: (country: string) => void;
}

interface MealOption {
  value: string;
  label: string;
}

export const RecipeFilter: FC<RecipeFilterProps> = ({
  onChangeCategory,
  onSelectIngredient,
  onSelectCountry,
}) => {
  const [options, setOptions] = useState<MealOption[]>([]);
  const [countryOptions, setCountryOptions] = useState<MealOption[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  const getCategories = async () => {
    try {
      const response = await axios.get(
        'https://www.themealdb.com/api/json/v1/1/list.php?c=list'
      );
      const categoryData = response.data.meals;
      const categoryNames = categoryData.map(
        (category: any) => category.strCategory
      );
      setCategories(categoryNames);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const handleSearchIngredients = async (value: string) => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`
      );
      const meals = response.data.meals;
      const mealOptions = meals.map((meal: any) => ({
        value: meal.strMeal,
        label: meal.strMeal,
      }));
      setOptions(mealOptions);
    } catch (error) {
      console.error('Failed to fetch meals:', error);
    }
  };

  const handleSearchCountry = async (value: string) => {
    if (value.length > 2) {
      try {
        const response = await axios.get(
          `https://restcountries.com/v3.1/name/${value.trim()}`
        );
        const countries = response.data;
        const countryOptions = countries
          .filter((country: any) => country.name?.common)
          .map((country: any) => ({
            value: country.name.common,
            label: country.name.common,
          }));
        setCountryOptions(countryOptions);
      } catch (error) {
        console.error('Failed to fetch countries:', error);
      }
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <div className="mb-3">
        <Text type="secondary">Categories</Text>

        <Radio.Group
          onChange={(e) => onChangeCategory && onChangeCategory(e.target.value)}
          className="grid grid-cols-4 gap-y-3 gap-x-5 mt-2"
        >
          {categories.map((category, index) => (
            <div className="flex items-center gap-1" key={index}>
              <Radio value={category}>{category}</Radio>
            </div>
          ))}
        </Radio.Group>
      </div>
      <div className="mb-3">
        <Text type="secondary">Ingredients</Text>
        <AutoComplete
          className="w-full mt-2"
          options={options}
          onSelect={(value) =>
            onSelectIngredient && onSelectIngredient(value.toString())
          }
          onSearch={handleSearchIngredients}
        >
          <Input placeholder="Search meals" />
        </AutoComplete>
      </div>
      <div className="mb-3">
        <Text type="secondary">Country</Text>
        <AutoComplete
          className="w-full mt-2"
          options={countryOptions}
          onSelect={(value) =>
            onSelectCountry && onSelectCountry(value.toString())
          }
          onSearch={handleSearchCountry}
        >
          <Input placeholder="Search country" />
        </AutoComplete>
      </div>
    </>
  );
};

export default RecipeFilter;
