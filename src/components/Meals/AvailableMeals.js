import classes from './AvailableMeals.module.css'
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import {useEffect, useState} from "react";


export default function AvailableMeals() {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState();

    useEffect(() => {
        const fetchMeals = async () => {
            const response = await fetch(
                'https://reat-http-e327e-default-rtdb.firebaseio.com/meals.json', {method:'GET', mode: 'cors'}
            );


            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseData = await response.json();

            const loadedMeals = [];

            for (const key in responseData) {
                if (responseData[key].price) {
                    loadedMeals.push({
                        id: key,
                        name: responseData[key].name,
                        description: responseData[key].description,
                        price: responseData[key].price,
                    });
                }

            }

            setMeals(loadedMeals);
            setIsLoading(false);
        };

        fetchMeals().catch((error) => {
            setIsLoading(false);
            setHttpError(error.message);
        });
    }, []);

    if (isLoading) {
        return (
            <section className={classes.MealsLoading}>
                <p>Loading...</p>
            </section>
        );
    }

    if (httpError) {
        return (
            <section className={classes.MealsError}>
                <p>{httpError}</p>
            </section>
        );
    }

    const mealsList = meals.map((meal) => (
        <MealItem
            key={meal.id}
            id={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
        />
    ));

    return (
        <section className={classes.meals}>
            <Card>
                <ul>{mealsList}</ul>
            </Card>
        </section>
    );
};


// Dummy meals is no longer needed as we added the meals to firebase and are now getting them through
// the Firebase API initially DummyMeals was used as a placeholder as you might use during set up/mock up
// before the database or backend is running for real production
// const DUMMY_MEALS = [
// {
//         id: 'm1',
//         name: 'Sushi',
//         description: 'Finest, fresh fish and gourmet veggies served with rice and soup.',
//         price: 22.99,
//     },
//     {
//         id: 'm2',
//         name: 'Schnitzel',
//         description: 'A german specialty served with the finest lager! (Lager only for those over 18 years old.)',
//         price: 16.5,
//     },
//     {
//         id: 'm3',
//         name: 'Barbeque Burger',
//         description: 'American quarter pound burger cooked to perfection, anyway you like it!',
//         price: 12.99,
//     },
//     {
//         id: 'm4',
//         name: 'Green Bowl',
//         description: 'Healthy...and green... OR you can make it less healthy by adding toppings of your choice!',
//         price: 18.99,
//     },
// ];
