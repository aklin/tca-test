import { getMyCatPics } from '../../hooks/thecatapi';
import CatGrid from '../CatGrid';
import useCats from '../../hooks/cathook';

export default function MyCats() {
	const { items, totalItems, loading } = useCats(getMyCatPics);

	return <CatGrid items={items} total={totalItems} loading={loading} />;
}
