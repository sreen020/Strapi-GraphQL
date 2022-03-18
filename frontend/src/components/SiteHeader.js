import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

const CATEGORIES = gql`
	query getCategories {
		categories {
			data {
				id
				attributes {
					name
				}
			}
		}
	}
`;

export default function SiteHeader() {
	const { loading, error, data } = useQuery(CATEGORIES);

	return (
		<div className="site-header">
			{loading && <p>Loading...</p>}
			{error && <p>error...</p>}

			<Link to="/">
				<h1>Test reviews</h1>
			</Link>

			<nav className="categories">
				<span>Filter reviews by category:</span>

				{data &&
					data.categories.data.map((item) => (
						<Link key={item.id} to={`/category/${item.id}`}>
							{item.attributes.name}
						</Link>
					))}
			</nav>
		</div>
	);
}
