import GridContainer from '../Grid/GridContainer';
import { CircularProgress, Typography } from '@material-ui/core';
import GridItem from '../Grid/GridItem';
import { Dimensions } from '../../util';
import CatItem from '../CatItem';
/*

const calcVotes = (image_id_param, state) => {
	const activeVotes = Object.keys(state)
		.filter((key) => key.indexOf('vote_') > -1)
		.map((key) => state[key][key])
		.filter(({ image_id, value }) => image_id === image_id_param);
};
*/

export default function CatGrid({ total = 0, image_ids = [], loading = true }) {

	console.group(`CatGrid`)
	console.log(image_ids)
	console.groupEnd()

	return (
		<>
			<Typography variant={'muted'}>Total entries: {total}</Typography>
			<GridContainer>
				{loading ? (
					<GridItem {...Dimensions}>
						<CircularProgress size={120} />
					</GridItem>
				) : image_ids.map((image_id) => (
					<GridItem key={image_id} {...Dimensions}>
						<CatItem image_id={image_id} />
					</GridItem>
				))}
			</GridContainer>
		</>
	);
}
