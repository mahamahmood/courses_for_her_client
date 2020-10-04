import React from 'react';
import { Link } from 'react-router-dom';
import './category.css';

function CategoryCard(props) {
    const category = props.category;

    return (
        <div className="cateogry collection">
            <Link style={{ textDecoration: 'none' }} from={'*'} to={`/categories/${category.id}`}>
                <p className="collection-item pink-text text-darken-2" key={category.id}>{category.name}</p>
            </Link>
        </div>
    );
};

export default CategoryCard;