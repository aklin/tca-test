import GridContainer from '../Grid/GridContainer';
import Card from '../Card/Card';
import { CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';
import GridItem from '../Grid/GridItem';
import { Dimensions } from '../../util';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 345,
	},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	},
}));


export default function CatGrid({ total = 0, items = [] }) {
const classes=useStyles();
	console.log(items)

	return (
		<GridContainer>
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
						<CardActions>
							actions
						</CardActions>
					</Card>
				</GridItem>
			))}
			<GridItem {...Dimensions}>
				<Typography variant={'caption'}>Total entries: {total}</Typography>
			</GridItem>
		</GridContainer>
	);
}
