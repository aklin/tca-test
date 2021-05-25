import { getFavouriteCatPics } from '../../hooks/thecatapi';
import CatGrid from '../CatGrid';
import useCats from '../../hooks/cathook';

export default function FavouriteCats() {
	const { items, totalItems, loading } = useCats(getFavouriteCatPics);

	return <CatGrid items={items} total={totalItems} loading={loading} />;
}
