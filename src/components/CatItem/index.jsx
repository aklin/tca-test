import { CardActions, CardContent, CardMedia, Chip } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Card from '../Card/Card';
import { makeStyles } from '@material-ui/core/styles';
import useCats from '../../hooks/cathook';
import { getCatById, setFavourite } from '../../hooks/thecatapi';
import GridContainer from '../Grid/GridContainer';
import GridItem from '../Grid/GridItem';
import CatVotePanel from '../ActionButtons/voteBtn';
import { useEffect, useState } from 'react';

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 345,
	},
	categories: {
		margin: '10px 0',
	},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	},
}));

export default function CatItem({
	item = {},
	image_id,
	isFavourite = false,
	score = 0,
}) {
	const classes = useStyles();
	const [needLoad, setNeedLoad] = useState(!image_id);
	// const [items,setItems]=useState()

	useEffect(() => {
		if (!needLoad) {
			return;
		}

		setNeedLoad(false);
	}, [needLoad]);

	const { items } = useCats(async () =>
		needLoad ? await getCatById(image_id) : { items: item, loading: false }
	);
	const { name, id, url, height, width, categories = [], breeds = [] } =
		(item.url ? item : item.image) || items;

	const toggleFavourite = async () => {
		await setFavourite(id, true);
	};

	return (
		<Card>
			<CardMedia
				className={classes.media}
				height={`${height}px`}
				width={`${width}px`}
				image={url}
				title={name}
			/>{' '}
			<CardContent>
				{name}
				<GridContainer className={classes.categories}>
					{breeds.length === 0 && (
						<GridItem>
							<Chip label={'No breed info'} />
						</GridItem>
					)}
					{breeds.map(({ name }) => (
						<GridItem>
							<Chip color={'primary'} label={name} key={id + name} />
						</GridItem>
					))}
				</GridContainer>
				<GridContainer className={classes.categories}>
					{categories.length === 0 && (
						<GridItem>
							<Chip label={'Uncategorised'} />
						</GridItem>
					)}
					{categories.map(({ name }) => (
						<GridItem>
							<Chip color={'secondary'} label={name} key={id + name} />
						</GridItem>
					))}
				</GridContainer>
			</CardContent>
			<CardActions>
				<IconButton
					disabled={!id}
					color={isFavourite ? 'primary' : undefined}
					aria-label="add to favorites"
					onClick={() => toggleFavourite()}
				>
					<FavoriteIcon />
				</IconButton>
				<span />
				<CatVotePanel score={score} image_id={id} />
			</CardActions>
		</Card>
	);
}
