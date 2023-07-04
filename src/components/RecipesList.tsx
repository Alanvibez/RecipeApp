import { FC } from 'react';
import { recipesProps } from '../models/recipeProps';
import RecipeCard from './RecipeCard';
import { Col, Row } from 'antd';

interface RecipesListProps {
  recipes: recipesProps[];
}

export const RecipesList: FC<RecipesListProps> = ({ recipes }) => {

  if(!recipes){
    return <>Не найдено</>
  }

  return (
    <Row gutter={[16, 16]}>
      {recipes.map((recipe) => (
        <Col key={recipe.idMeal} xs={16} lg={4} md={8}>
          <RecipeCard recipe={recipe} />
        </Col>
      ))}
    </Row>
  );
};

export default RecipesList;
