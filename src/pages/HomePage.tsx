import { Button, Input, Modal } from 'antd';
import { FC, useEffect, useState } from 'react';
import RecipesList from '../components/RecipesList';
import { recipesProps } from '../models/recipeProps';
import { fetchRecipes } from '../api/recipesService';
import { FilterOutlined } from '@ant-design/icons';
import RecipeFilter from '../components/RecipeFilter';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RecipeDetailsPage from '../pages/RecipeDetailsPage';

export const HomePage: FC = ({}) => {
  const [recipes, setRecipes] = useState<recipesProps[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoryQuery, setCategoryQuery] = useState<string>('');
  const [countryQuery, setCountryQuery] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    localStorage.setItem('searchQuery', JSON.stringify(e.target.value));
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSearchRecipes = async () => {
    if (searchQuery.trim()) {
      try {
        const recipes = await fetchRecipes(
          searchQuery,
          categoryQuery,
          countryQuery
        );
        setRecipes(recipes);
        localStorage.setItem('recipes', JSON.stringify(recipes));
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleCategoryChange = (category: string) => {
    setCategoryQuery(category);
  };

  const handleIngredientSelect = (ingredient: string) => {
    // Обработка выбранного ингредиента
  };

  const handleCountrySelect = (country: string) => {
    setCountryQuery(country);
  };

  useEffect(() => {
    setSearchQuery(JSON.parse(localStorage.getItem('searchQuery') || ''));
    const storage = localStorage.getItem('recipes');

    if (storage) {
      setRecipes(JSON.parse(storage));
    }
  }, []);

  return (
    <div className="w-full text-center">
      <h1 className="text-lg mb-2">Recipe Finder App</h1>
      <div className="flex gap-2">
        <Input
          onChange={handleSearch}
          onPressEnter={handleSearchRecipes}
          value={searchQuery}
          placeholder={'Назвние блюда или ингредиента...'}
        />
        <Button disabled={!searchQuery.trim()} onClick={handleSearchRecipes}>
          Найти
        </Button>
        <>
          <Button
            onClick={showModal}
            className="flex items-center justify-center"
            icon={<FilterOutlined />}
          />

          <Modal
            title="Meal filter"
            open={isModalOpen}
            footer={null}
            onCancel={handleCancel}
          >
            <RecipeFilter
              onChangeCategory={handleCategoryChange}
              onSelectIngredient={handleIngredientSelect}
              onSelectCountry={handleCountrySelect}
            />
          </Modal>
        </>
      </div>

      <div className="my-12 w-full">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<RecipesList recipes={recipes} />} />
            <Route path="/recipe/:id" element={<RecipeDetailsPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default HomePage;
