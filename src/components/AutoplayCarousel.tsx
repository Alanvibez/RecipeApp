import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import { FC } from 'react';
import { Skeleton } from 'antd';
import { useEffect, useState } from 'react';

interface AutoplayCarouselProps {
  reverse?: boolean;
}
export const AutoplayCarousel: FC<AutoplayCarouselProps> = ({ reverse = false }) => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 5000, // Adjust the speed of scrolling
    slidesToShow: 5, // Number of slides to show at a time
    slidesToScroll: 1,
    rtl: reverse,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 0, // Set the autoplay speed to 0 to disable the delay between slides
    cssEase: 'linear', // Use linear transition for smooth continuous scrolling
    swipeToSlide: true, // Enable swiping to navigate between slides
    pauseOnHover: false, // Disable pausing on hover
  };
  interface mealProps {
    strMealThumb: string;
  }
  const [meal, setMeal] = useState<mealProps[]>([]);

  const getRandomMealImage = async () => {
    try {
      const response = await axios.get(
        'https://www.themealdb.com/api/json/v1/1/search.php?f=f?'
      );
      const meal = response.data.meals;
      localStorage.setItem('mealImg', JSON.stringify(meal));
      
      setMeal(meal);
    } catch (error) {
      console.error('Failed to fetch random meal image:', error);
      return null;
    }
  };

  useEffect(() => {
    const storedMeal = localStorage.getItem('mealImg');
    if (storedMeal) {
      const storageMeal = JSON.parse(storedMeal);
      return setMeal(storageMeal);
    }
    getRandomMealImage();
  }, []);

  return (
    <div className="my-4 -mx-[24px]">
      {meal.length > settings.slidesToShow ? (
        <Slider {...settings}>
          {meal.map((meal) => (
            <div className="w-full h-[200px]">
              <img
                className="h-full w-full object-center object-cover"
                src={meal.strMealThumb}
                alt="Slide 1"
              />
            </div>
          ))}
        </Slider>
      ) : (
        <Skeleton.Input
          block={true}
          active={true}
          style={{ width: '100%', height: '200px' }}
        />
      )}
    </div>
  );
};
