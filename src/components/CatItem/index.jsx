import {
	CardActions,
	CardContent,
	CardMedia, Chip,
	CircularProgress,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import Card from '../Card/Card';
import { makeStyles } from '@material-ui/core/styles';
import useCats from '../../hooks/cathook';
import { getCatById, getMyCatPics } from '../../hooks/thecatapi';
import GridContainer from '../Grid/GridContainer';
import GridItem from '../Grid/GridItem';

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 345,
	},
	categories:{
		margin:"10px 0"
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
		image_id ? await getCatById(image_id) : await ({ items: item, loading: false })
	);
	const { name, id, url, height, width, categories=[], breeds=[] } = item || items;

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
			<CardContent>{name}
				<GridContainer className={classes.categories}>
					{breeds.length === 0 && <GridItem><Chip label={'No breed info'} /></GridItem>}
					{breeds.map(({name}) => <GridItem><Chip color={"primary"} label={name} key={id+name}/></GridItem>)}
				</GridContainer>
				<GridContainer className={classes.categories}>
					{categories.length === 0 && <GridItem><Chip label={'Uncategorised'} /></GridItem>}
					{categories.map(({name}) => <GridItem><Chip color={"secondary"} label={name} key={id+name}/></GridItem>)}
				</GridContainer>
			</CardContent>
			<CardActions disableSpacing>
				<IconButton aria-label="add to favorites">
					<FavoriteIcon />
				</IconButton>
				<IconButton aria-label="share">
					<ShareIcon />
				</IconButton>
			</CardActions>
		</Card>
	);
}
