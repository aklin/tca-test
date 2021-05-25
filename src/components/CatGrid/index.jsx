import GridContainer from '../Grid/GridContainer';
import Card from '../Card/Card';
import { CardActions, CardContent, CardMedia, CircularProgress, Typography } from '@material-ui/core';
import GridItem from '../Grid/GridItem';
import { Dimensions } from '../../util';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 345,
	},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	},
}));


export default function CatGrid({ total = 0, items = [], loading=true }) {
const classes=useStyles();
	console.log(items)

	return (
<>
	<Typography variant={'muted'}>Total entries: {total}</Typography>
	<GridContainer>
		{loading && <GridItem {...Dimensions}><CircularProgress size={120} /></GridItem>}
		{items.map(({ id, url, name, height, width }) => (
			<GridItem {...Dimensions}>
				<Card key={id}>
					<CardMedia
						className={classes.media}
						height={`${height}px`}
						width={`${width}px`}
						image={url}
						title={name}
					/>
					<CardContent>
						{name}
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
			</GridItem>
		))}
	</GridContainer>
</>
	);
}
