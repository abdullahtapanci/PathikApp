import React from 'react';
import { View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

type StarRatingProps = {
	rating: number; // e.g., 4.3
  	maxStars?: number; // default: 5
 	starSize?: number;
  	starColor?: string;
};

export default function stars({
	rating,
  	maxStars = 5,
  	starSize = 20,
  	starColor = '#FFD700',
	}: StarRatingProps) {
  		const stars = [];
		const fullStars = Math.floor(rating); // e.g., 4 for rating 4.7
		const halfStar = Math.ceil(rating % 1); // 1 if rating has any decimal (i.e. 0.7)

  		for (let i = 1; i <= maxStars; i++) {
			if (i <= fullStars) {
				stars.push(<FontAwesome key={i} name="star" size={starSize} color={starColor} />);
    			} else if (i === fullStars + 1 && halfStar) {
      				stars.push(<FontAwesome key={i} name="star-half-full" size={starSize} color={starColor} />);
    			} else {
      				stars.push(<FontAwesome key={i} name="star-o" size={starSize} color={starColor} />);
    			}
		}

  	return <View style={{ flexDirection: 'row' }}>{stars}</View>;
}
