import { getSearchCatPics } from '../../hooks/thecatapi';
import CatGrid from '../CatGrid';
import useCats from '../../hooks/cathook';
import { useContext, useEffect } from 'react';
import { Actions, StoreContext } from '../../hooks/store';

export default function SearchCats() {
	const { items, totalItems, loading } = useCats(getSearchCatPics);
	const { dispatch } = useContext(StoreContext);

	useEffect(() => {
		// cache results
		!loading && dispatch({ type: Actions.SAVE_CATS, data: items });
	}, [items.length, loading]);

	return <CatGrid items={items} total={totalItems} loading={loading} />;
}
