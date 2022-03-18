import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams, Link } from 'react-router-dom';

const CATEGORY = gql`
	query GetCategory($id: ID!) {
		categorie(id: $id) {
			data {
				id
				attributes {
					name
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
			}
		}
	}
`;

export default function Category() {
	const { id } = useParams();

	const { loading, error, data } = useQuery(CATEGORY, {
		variables: { id: id },
	});

	if (loading) return <p> Loading...</p>;
	if (error) return <p> error...</p>;

	console.log('DATA', data);
	return (
		<div>
			<h2>{data.categorie.data.attributes.name}</h2>
			{data &&
				data.categorie.data.attributes.reviews.data.map((item) => (
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
