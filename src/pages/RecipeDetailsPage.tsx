import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { recipesProps } from '../models/recipeProps';
import { Button, Col, Radio, Row, Tabs } from 'antd';
import { Typography } from 'antd';
const { Text } = Typography;
const { TabPane } = Tabs;

export const RecipeDetailsPage: FC = ({}) => {
  const [recipeDetail, setRecipeDetail] = useState<recipesProps>();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const getRecipe = async (id: string) => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      const {
        idMeal,
        strMeal,
        strMealThumb,
        strCategory,
        strYoutube,
        strInstructions,
      } = response.data.meals[0];

      const strIngredients: { ingredient: string; measure: string }[] = [];
      for (let i = 1; i <= 20; i++) {
        const ingredient = response.data.meals[0][`strIngredient${i}`];
        const measure = response.data.meals[0][`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== '') {
          strIngredients.push({ ingredient, measure });
        } else {
          break;
        }
      }

      const videoId =
        strYoutube && strYoutube.includes('v=')
          ? strYoutube.split('v=')[1]
          : '';

      const recipe = {
        idMeal,
        strMeal,
        strMealThumb,
        strCategory,
        strYoutube: videoId,
        strInstructions,
        strIngredients,
      };

      setRecipeDetail(recipe);
    } catch (error) {
      console.log(error);
    }
  };
  // Вызываем функцию обработки ссылки на видео
  useEffect(() => {
    if (id) {
      getRecipe(id);
    }
  }, []);
  return (
    <div className="max-w-[800px] m-auto border p-4 rounded text-left">
      <div className="rounded overflow-hidden relative max-w-[400px] m-auto">
        <img src={recipeDetail?.strMealThumb} alt="" />
        <p className="bg-white absolute px-4 bottom-3 left-1/2 -translate-x-1/2 rounded font-bold text-lg">
          {recipeDetail?.strMeal}
        </p>
      </div>

      <Tabs defaultActiveKey="1" className="mb-4">
        <TabPane tab="Ingredients" key="1">
          <div className="flex justify-between">
            <ul className="flex flex-col gap-2">
              {recipeDetail?.strIngredients.map((el, index) => (
                <li className="text-xs" key={index}>
                  {el.ingredient}
                </li>
              ))}
            </ul>

            <ul className="flex flex-col gap-2">
              {recipeDetail?.strIngredients.map((el, index) => (
                <li className="text-xs" key={index}>
                  {el.measure}
                </li>
              ))}
            </ul>
          </div>
        </TabPane>
        <TabPane tab="Instructions" key="2">
          <p>{recipeDetail?.strInstructions}</p>
        </TabPane>
        {recipeDetail?.strYoutube && (
          <TabPane tab="Video" key="3">
            <iframe
              width="100%"
              height="400"
              allowFullScreen
              src={`https://www.youtube.com/embed/${recipeDetail?.strYoutube}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </TabPane>
        )}
      </Tabs>

      <div className="flex justify-between">
        <Button danger={true} onClick={() => navigate(-1)}>
          Назад
        </Button>
        <Button>Сохранить</Button>
      </div>
    </div>
  );
};

export default RecipeDetailsPage;
