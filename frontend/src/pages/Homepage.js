import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

const REVIEWS = gql`
	query GetReviews {
		reviews {
			data {
				id
				attributes {
					title
					body
					rating
					categories {
						data {
							id
							attributes {
								name
							}
						}
					}
				}
			}
		}
	}
`;

export default function Homepage() {
	const { loading, error, data } = useQuery(REVIEWS);
	console.log(data);
	return (
		<div>
			{loading && <p>Loading...</p>}
			{error && <p>error...</p>}

			{data &&
				data.reviews.data.map((item) => (
					<div key={item.id} className="review-card">
						<div className="rating">{item.attributes.rating}</div>
						<h2>{item.attributes.title}</h2>

						{item.attributes.categories.data.map((categorie) => (
							<small key={categorie.id}>{categorie.attributes.name}</small>
						))}

						<p>{item.attributes.body.substring(0, 200)}...</p>

						<Link to={`/details/${item.id}`}>Read more</Link>
					</div>
				))}
		</div>
	);
}
