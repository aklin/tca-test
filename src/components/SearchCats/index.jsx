import { useEffect, useState } from 'react';
import { getMyCatPics, getSearchCatPics } from '../../hooks/thecatapi';
import GridContainer from '../Grid/GridContainer';
import GridItem from '../Grid/GridItem';
import { CardMedia, Typography } from '@material-ui/core';
import Card from '../Card/Card';
import CatGrid from '../CatGrid';
import { Dimensions } from '../../util';

export default function SearchCats() {
	const [loading, setLoading]=useState(true);
	const [items, setItems] = useState([]);
	const [totalItems, setTotalItems] = useState(0);

	useEffect(() => {
		const get = async () => {
			const response = await getSearchCatPics();

			if (!response.ok) {
				console.error(response);
				return;
			}
			setTotalItems(Number(response.headers.get('Pagination-Count')));
			setItems(await response.json());
		};

		try{
			setLoading(true)
			get();
		}finally {
			setLoading(false)
		}
	}, []);

	return (
		<CatGrid items={items} total={totalItems} loading={loading} />
	);
}
