import CatGrid from '../CatGrid';
import { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../hooks/store';
import { actionLoadOwnUploads } from '../../hooks/thecatapi';
import { CircularProgress } from '@material-ui/core';

export default function MyCats() {
	const { state, dispatch } = useContext(StoreContext);
	const [total, setTotal] = useState(0);
	const ids = Object.keys(state)
		.map((id) => ({ id, ownUpload: state[id].ownUpload }))
		.filter(({ ownUpload }) => ownUpload)
		.map(({ id }) => id);

	useEffect(() => {
		actionLoadOwnUploads(dispatch).then((t) => setTotal(t));
	}, []);

	console.log();

	return !ids.length ? (
		<CircularProgress size={64} />
	) : (
		<CatGrid image_ids={ids} total={total} />
	);
}
