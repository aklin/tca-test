import GridContainer from '../Grid/GridContainer';
import { CircularProgress, Typography } from '@material-ui/core';
import GridItem from '../Grid/GridItem';
import { Dimensions } from '../../util';
import CatItem from '../CatItem';

export default function CatGrid({ total = 0, image_ids = [] }) {
	/*
	console.group(`CatGrid`);
	console.log(image_ids);
	console.groupEnd();
*/

	return (
		<>
			{total && (
				<Typography variant={'caption'}>Total entries: {total}</Typography>
			)}
			<GridContainer>
				{image_ids.map((image_id) => (
					<GridItem key={image_id} {...Dimensions}>
						<CatItem image_id={image_id} />
					</GridItem>
				))}
			</GridContainer>
		</>
	);
}
