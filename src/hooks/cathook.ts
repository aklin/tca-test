import { useEffect, useState } from 'react';


export default function useCats(fn:CallableFunction){
	const [loading, setLoading]=useState(true);
	const [items, setItems] = useState([]);
	const [totalItems, setTotalItems] = useState(0);
	const [ok, setOk]=useState(false)

	useEffect(() => {
		const get = async () => {
			const response = await fn();

			if (!response.ok) {
				setOk(false)
				console.error(response);
				return;
			}

			setOk(true)
			setTotalItems(Number(response.headers.get('Pagination-Count')));
			setItems(await response.json());
		};

		try{
			setLoading(true)
			get();
		}finally {
			setLoading(false)
		}
		//eslint-ignore react-hooks/exhaustive-deps
	}, [fn])


	return {
		ok,
		loading,
		items,
		totalItems,
	}
}
