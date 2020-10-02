import React, { useState, useEffect } from 'react';
import { server } from '../../setting.js';
import CategoryCard from './CategoryCard.js';
import './category.css';

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
        <div className="container">
            <h2 className="cateogry-main">Explore Courses by Category</h2>
            {categories.length > 0 && categories.map((category, idx)=> {
                return <CategoryCard key={idx} category={category} />
            })}
        </div>
    )
};

export default Categories;
