import React from 'react';
import useFetch from '../hooks/useFetch';
import { Link } from 'react-router-dom';

export default function Homepage() {
	const { loading, error, data } = useFetch(
		'http://localhost:1337/api/reviews'
	);

	console.log(data);
	return (
		<div>
			{loading && <p>Loading...</p>}
			{error && <p>error...</p>}

			{data &&
				data.data.map((item) => (
					<div key={item.id} className="review-card">
						<div className="rating">{item.attributes.rating}</div>
						<h2>{item.attributes.title}</h2>

						<small>console list</small>

						<p>{item.attributes.body.substring(0, 200)}...</p>

						<Link to={`/details/${item.id}`}>Read more</Link>
					</div>
				))}
		</div>
	);
}
