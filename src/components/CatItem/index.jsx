import {
	CardActions,
	CardContent,
	CardMedia,
	Chip,
	CircularProgress,
} from '@material-ui/core';
import Card from '../Card/Card';
import { makeStyles } from '@material-ui/core/styles';
import { actionLoadCatPic, actionToggleFavourite } from '../../hooks/thecatapi';
import GridContainer from '../Grid/GridContainer';
import GridItem from '../Grid/GridItem';
import CatVotePanel from '../ActionButtons/voteBtn';
import { useContext } from 'react';
import { StoreContext } from '../../hooks/store';
import SpinningArrows from 'assets/img/Spinning_arrows.gif';
import FavouriteBtn from '../ActionButtons/favouriteBtn';

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

export default function CatItem({ image_id }) {
	const classes = useStyles();
	const { state, dispatch } = useContext(StoreContext);
	const item = (state || {})[image_id];

	!image_id && new Error('Missing image_id');

	console.group(`CatItem ${image_id}`);
	console.log(state);
	console.log(item);
	console.groupEnd();

	const {
		name,
		id,
		url,
		height,
		width,
		categories = [],
		breeds = [],
		favourite = false,
		score = 0,
	} = item || {};

	!url && actionLoadCatPic(dispatch, image_id);

	return (
		<Card>
			{url ? (
				<CardMedia
					className={classes.media}
					height={url ? `${height}px` : '48px'}
					width={url ? `${width}px` : '48px'}
					image={url || SpinningArrows}
					title={id}
				/>
			) : (
				<CircularProgress />
			)}
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
				<FavouriteBtn
					image_id={id}
					set={favourite}
					onClick={(newState) =>
						actionToggleFavourite(dispatch, image_id, newState)
					}
				/>
				<span />
				<CatVotePanel score={score} image_id={id} dispatch={dispatch} />
			</CardActions>
		</Card>
	);
}
