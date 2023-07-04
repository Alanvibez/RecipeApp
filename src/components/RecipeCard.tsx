import { FC, useState } from 'react';

import { Card } from 'antd';
import Meta from 'antd/es/card/Meta';
import { recipesProps } from '../models/recipeProps';
import { Link } from 'react-router-dom';

interface RecipeCardProps {
  recipe: recipesProps;
}

export const RecipeCard: FC<RecipeCardProps> = ({ recipe }) => {
  const { idMeal, strMeal, strMealThumb, strCategory } = recipe;

  return (
    <Link to={`/recipe/${recipe.idMeal}`}>
      <Card
        key={idMeal}
        hoverable
        style={{ width: 'auto', height: '100%', textAlign: 'left' }}
        cover={
          <img
            alt="example"
            style={{
              height: 200,
              objectFit: 'cover',
              objectPosition: 'center',
            }}
            src={strMealThumb}
          />
        }
      >
        <Meta title={strMeal} />
        <div>{strCategory}</div>
        {/* <Paragraph
        ellipsis={
          ellipsis ? { rows: 5, expandable: true, symbol: 'more' } : false
        }
      >
        {strCategory}
      </Paragraph> */}
      </Card>
    </Link>
  );
};

export default RecipeCard;
