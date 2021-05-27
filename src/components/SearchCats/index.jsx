import { getSearchCatPics } from '../../hooks/thecatapi';
import CatGrid from '../CatGrid';
import useCats from '../../hooks/cathook';
import { useContext, useEffect } from 'react';
import { Actions, StoreContext } from '../../hooks/store';
import { CircularProgress } from '@material-ui/core';

export default function SearchCats() {
	const { items, totalItems, loading } = useCats(getSearchCatPics);
	const { dispatch } = useContext(StoreContext);

	console.log('Items')
	console.log(items)

	useEffect(() => {
		// cache results
		!items.length
		&& !loading
		&& dispatch({ type: Actions.SAVE_CATS, data: items });
	}, [items.length]);

	return loading ? <CircularProgress/> : <CatGrid image_ids={items.map(({id}) => id)} total={totalItems} loading={loading} />;
}
