import React, { useState, useEffect } from 'react';
import { server } from '../../setting.js';
import CategoryCard from './CategoryCard.js';

function Categories(props) {
    const [categories, setCategories] = useState([]);

    const getCategories = async () => {
        try {
            const response = fetch(`${server}/categories`);
            const categories = await (await response).json();
            console.log(categories);
            setCategories(categories);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const callCategories = async () => {
            await getCategories();
        }
        callCategories();
    }, []);

    return (
        <div className="App">
            <h2>List Of All Categories</h2>
            {categories.length > 0 && categories.map((category, idx)=> {
                return <CategoryCard key={idx} category={category} />
            })}
        </div>
    )
};

export default Categories;
