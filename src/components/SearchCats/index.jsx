import { actionLoadCatPics, getSearchCatPics } from '../../hooks/thecatapi';
import CatGrid from '../CatGrid';
import { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../hooks/store';
import { CircularProgress } from '@material-ui/core';

export default function SearchCats() {
	// const { items, totalItems, loading } = useCats(getSearchCatPics);
	const { state, dispatch } = useContext(StoreContext);
	const [total, setTotal] = useState(0);
	const ids = Object.keys(state);

	useEffect(() => {
		actionLoadCatPics(dispatch).then((t) => setTotal(t));
	}, []);

	return !ids.length ? (
		<CircularProgress size={64} />
	) : (
		<CatGrid image_ids={ids} total={total} />
	);
}
