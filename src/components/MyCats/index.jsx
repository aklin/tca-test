import { useEffect, useState } from 'react';
import { getMyCatPics } from '../../hooks/thecatapi';
import GridContainer from '../Grid/GridContainer';
import GridItem from '../Grid/GridItem';
import { CardMedia, Typography } from '@material-ui/core';
import Card from '../Card/Card';
import CatGrid from '../CatGrid';
import { Dimensions } from '../../util';

export default function MyCats() {
	const [items, setItems] = useState([]);
	const [totalItems, setTotalItems] = useState(0);

	useEffect(() => {
		const get = async () => {
			const response = await getMyCatPics();

			if (!response.ok) {
				console.error(response);
				return;
			}
			setTotalItems(Number(response.headers.get('Pagination-Count')));
			setItems(await response.json());
		};

		get();
	}, []);

	return (
		<>
			<GridContainer>
				<GridItem {...Dimensions}>
					<Typography variant={'h4'}>My Cats</Typography>
				</GridItem>
			</GridContainer>
			<CatGrid items={items} total={totalItems} />
		</>
	);
}
