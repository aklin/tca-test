import GridContainer from '../Grid/GridContainer';
import { CircularProgress, Typography } from '@material-ui/core';
import GridItem from '../Grid/GridItem';
import { Dimensions } from '../../util';
import CatItem from '../CatItem';

export default function CatGrid({
	total = 0,
	items = [],
	image_ids = [],
	loading = true,
}) {
	return (
		<>
			<Typography variant={'muted'}>Total entries: {total}</Typography>
			<GridContainer>
				{loading && (
					<GridItem {...Dimensions}>
						<CircularProgress size={120} />
					</GridItem>
				)}
				{image_ids.length
					? image_ids.map((image_id) => (
							<GridItem key={image_id} {...Dimensions}>
								<CatItem image_id={image_id} />
							</GridItem>
					  ))
					: items.map((item) => (
							<GridItem key={item.id} {...Dimensions}>
								<CatItem item={item} />
							</GridItem>
					  ))}
			</GridContainer>
		</>
	);
}
