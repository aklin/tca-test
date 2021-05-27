import GridContainer from '../Grid/GridContainer';
import { CircularProgress, Typography } from '@material-ui/core';
import GridItem from '../Grid/GridItem';
import { Dimensions } from '../../util';
import CatItem from '../CatItem';
import { useContext, useEffect, useState } from 'react';
import { Actions, StoreContext } from '../../hooks/store';
/*

const calcVotes = (image_id_param, state) => {
	const activeVotes = Object.keys(state)
		.filter((key) => key.indexOf('vote_') > -1)
		.map((key) => state[key][key])
		.filter(({ image_id, value }) => image_id === image_id_param);
};
*/

export default function CatGrid({
	total = 0,
	items = [],
	image_ids = [],
	loading = true,
	itemProps,
}) {
	const { store = {}, dispatch } = useContext(StoreContext);
	const [reload, setReload] = useState(true);
	const [fav_ids, setFavIds] = useState([]);

	/*	useEffect(() => {
		if(!reload){
			return
		}
		dispatch({ type: Actions.FETCH_FAVS_AND_VOTES });
		setReload(false)
		// dispatch({type: Actions.FETCH_VOTES})
	}, [reload])*/ useEffect(() => {
		setFavIds(
			Object.keys(store)
				.filter((key) => key.indexOf('fav_') > -1)
				.map((key) => key.substr('fav_'.length))
		);
	}, [reload]);
	console.log(fav_ids);

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
								<CatItem
									image_id={image_id}
									isFavourite={fav_ids[image_id]}
									{...itemProps}
								/>
							</GridItem>
					  ))
					: items.map((item) => (
							<GridItem key={item.image_id} {...Dimensions}>
								<CatItem
									item={item}
									isFavourite={fav_ids[item.image_id]}
									{...itemProps}
								/>
							</GridItem>
					  ))}
			</GridContainer>
		</>
	);
}
