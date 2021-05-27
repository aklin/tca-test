import { actionLoadVotes } from '../../hooks/thecatapi';
import CatGrid from '../CatGrid';
import { useContext, useEffect } from 'react';
import { StoreContext } from '../../hooks/store';

export default function Votes() {
	const { state, dispatch } = useContext(StoreContext);
	const ids = Object.keys(state)
		.map((id) => ({ id, score: state[id].score }))
		.filter(({ score }) => score !== undefined)
		.map(({ id }) => id);

	useEffect(() => {
		actionLoadVotes(dispatch);
	}, []);

	return <CatGrid image_ids={ids} total={ids.length} />;
}
