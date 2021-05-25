import { useEffect, useState } from 'react';
import { getMyCatPics } from '../../hooks/thecatapi';
import GridContainer from '../Grid/GridContainer';
import GridItem from '../Grid/GridItem';
import { Typography } from '@material-ui/core';
import CatGrid from '../CatGrid';
import { Dimensions } from '../../util';

export default function MyCats() {
	const [loading, setLoading]=useState(true);
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

		try{
			setLoading(true)
			get();
		}catch (e){
			console.error(e)
		}finally {
			setLoading(false)
		}
	}, []);

	return (
		<>
			<GridContainer>
				<GridItem {...Dimensions}>
					<Typography variant={'h4'}>My Cats</Typography>
				</GridItem>
			</GridContainer>
			<CatGrid items={items} total={totalItems} loading={loading}/>
		</>
	);
}
