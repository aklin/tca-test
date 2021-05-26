import { getMyCatPics, getMyVotes } from '../../hooks/thecatapi';
import CatGrid from '../CatGrid';
import useCats from '../../hooks/cathook';

export default function Votes() {
	const { items, totalItems, loading } = useCats(getMyVotes);

	console.log(items);
	console.log(totalItems);

	return <CatGrid items={items} total={totalItems} loading={loading} />;
}
