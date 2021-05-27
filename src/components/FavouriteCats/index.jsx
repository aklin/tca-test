import { actionLoadFavourites } from '../../hooks/thecatapi';
import CatGrid from '../CatGrid';
import { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../hooks/store';

export default function FavouriteCats() {
	const { state, dispatch } = useContext(StoreContext);
	const [total, setTotal] = useState(0);
	const ids = Object.keys(state)
		.map((id) => ({ id, favourite: state[id].favourite }))
		.filter(({ favourite }) => favourite)
		.map(({ id }) => id);

	useEffect(() => {
		actionLoadFavourites(dispatch).then((t) => setTotal(t));
	}, []);

	return <CatGrid image_ids={ids} total={total} />;
}
