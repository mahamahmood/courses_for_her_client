import React from 'react';
import { Link } from 'react-router-dom';

function CategoryCard(props) {
    const category = props.category;

    return (
        <div>
            <Link style={{ textDecoration: 'none' }} from={'*'} to={`/categories/${category.id}`}>
                <div key={category.id}>{category.name}</div>
            </Link>
        </div>
    );
};

export default CategoryCard;