import {
	CardActions,
	CardContent,
	CardMedia,
	Chip,
	CircularProgress,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Card from '../Card/Card';
import { makeStyles } from '@material-ui/core/styles';
import useCats from '../../hooks/cathook';
import { getCatById, postVote, setFavourite } from '../../hooks/thecatapi';
import GridContainer from '../Grid/GridContainer';
import GridItem from '../Grid/GridItem';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import { ThumbDown } from '@material-ui/icons';

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

export default function CatItem({ item, image_id }) {
	const classes = useStyles();

	/*
		console.group("CatItem")
		console.log(item)
		console.log(image_id)
		console.groupEnd()
	*/

	const { items, loading } = useCats(async () =>
		image_id
			? await getCatById(image_id)
			: await { items: item, loading: false }
	);
	const { name, id, url, height, width, categories = [], breeds = [] } =
		item || items;

	const castVote = async (voteUp) => {
		await postVote(id, voteUp);
	};

	const toggleFavourite = async () => {
		await setFavourite(id, true);
	};

	return (
		<Card>
			{loading ? (
				<CircularProgress />
			) : (
				<CardMedia
					className={classes.media}
					height={`${height}px`}
					width={`${width}px`}
					image={url}
					title={name}
				/>
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
				<IconButton
					disabled={!id}
					aria-label="add to favorites"
					onClick={() => toggleFavourite()}
				>
					<FavoriteIcon />
				</IconButton>
				<span />
				<IconButton
					disabled={!id}
					aria-label="vote up"
					onClick={() => castVote(true)}
				>
					<ThumbUpIcon />
				</IconButton>
				<IconButton
					disabled={!id}
					aria-label="vote down"
					onClick={() => castVote(false)}
				>
					<ThumbDown />
				</IconButton>
			</CardActions>
		</Card>
	);
}
