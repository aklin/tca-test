import GridContainer from '../Grid/GridContainer';
import { useEffect, useState } from 'react';
import { getCatPics } from '../../hooks/thecatapi';
import Card from '../Card/Card';
import { CardMedia, Typography } from '@material-ui/core';
import GridItem from '../Grid/GridItem';

const dimensions={
	xs:12,
	sm:6,
	md:3,
}

export default function CatGrid({title}){
	const [items,setItems]=useState([]);
	const [totalItems, setTotalItems]=useState(0);

	useEffect(()=> {
		const get = async () => {
			const response = await getCatPics();

			if (!response.ok) {
				console.error(response);
				return;
			}
			setItems(await response.json());
		};


		get();

	}, [])

	return(
		<>
			<GridContainer>
				<GridItem {...dimensions}>
					<Typography variant={'h4'} >{title}</Typography>
				</GridItem>
			</GridContainer>
			<GridContainer>
				{items.map(({id, url, original_filename})=><Card key={id}>
					<CardMedia image={url} title={original_filename} />
				</Card>)}
				<GridItem {...dimensions}>
					<Typography variant={'caption'} >Total entries: {totalItems}</Typography>
				</GridItem>
			</GridContainer>
		</>
	)
}
