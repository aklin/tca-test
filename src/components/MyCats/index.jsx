import { getMyCatPics } from '../../hooks/thecatapi';
import GridContainer from '../Grid/GridContainer';
import GridItem from '../Grid/GridItem';
import { Typography } from '@material-ui/core';
import CatGrid from '../CatGrid';
import { Dimensions } from '../../util';
import useCats from '../../hooks/cathook';

export default function MyCats() {
	const { items, totalItems, loading } = useCats(getMyCatPics);

	return (
		<>
			<GridContainer>
				<GridItem {...Dimensions}>
					<Typography variant={'h4'}>My Cats</Typography>
				</GridItem>
			</GridContainer>
			<CatGrid items={items} total={totalItems} loading={loading} />
		</>
	);
}
