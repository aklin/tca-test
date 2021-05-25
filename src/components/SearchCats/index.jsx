import { getSearchCatPics } from '../../hooks/thecatapi';
import CatGrid from '../CatGrid';
import useCats from '../../hooks/cathook';

export default function SearchCats() {
	const { items, totalItems, loading } = useCats(getSearchCatPics);

	return <CatGrid items={items} total={totalItems} loading={loading} />;
}
