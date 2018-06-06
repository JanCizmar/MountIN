import React from 'react';
import StarRatingComponent from 'react-star-rating-component';

export default function Rating(props) {
    return <StarRatingComponent
        {...props}
        name="rating"
        starCount={5}
        starColor="#158a00"
    />
}