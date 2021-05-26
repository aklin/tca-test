import { createContext, useContext, useReducer } from 'react';
import { CatBreed, getFavouriteCatPics, getMyVotes } from './thecatapi';

const initialState = {};

export const 	StoreContext = createContext({ state:{}, dispatch:()=>{} });

type ReducerActionName = string;

export const Actions = {
	FETCH_BREEDS: 'FETCH_BREEDS',
	FETCH_FAVOURITES:'FETCH_FAVOURITES',
	FETCH_VOTES:'FETCH_VOTES',
	FETCH_FAVS_AND_VOTES:'FETCH_VOTES',
	FETCH_CATS:'FETCH_CATS',
};

export interface ReducerAction {
	type: ReducerActionName;
	data: any | undefined;
}

const consolidate = (items:any[], prefix:string):object =>
	items.map(({ id, ...rest }: CatBreed) => ({[`${prefix}_${id}`]: { id, ...rest }}))
	.reduce((res: any, cur: any) => ({ ...res, ...cur }), {})


const calcVotes = (items:any[]):object =>
	items.map(({image_id, value}) => ({image_id, value: value !==1 ? -1 : 1}))


const reducer = async (state: any, { type, data }: ReducerAction) => {
	let request;
	let newState = state;
	switch (type) {
		case Actions.FETCH_CATS:
			request = await getFavouriteCatPics();
			if (!request.ok) {
				console.error(`Request failed ${type}`);
			}
			break;
		case Actions.FETCH_FAVS_AND_VOTES:
			const r1=await (await getMyVotes()).json()
			const r2=await (await getFavouriteCatPics()).json()

			newState={
				...state,
				...consolidate(r1, 'vote'),
				...consolidate(r2, 'fav')
			}

			break;
		case Actions.FETCH_VOTES:
			request = await getMyVotes();
			if (!request.ok) {
				console.error(`Request failed ${type}`);
			}

			newState={
				...state,
				...consolidate(await request.json(), 'vote'),
			}

			break;
		case Actions.FETCH_FAVOURITES:
			request = await getFavouriteCatPics();
			if (!request.ok) {
				console.error(`Request failed ${type}`);
			}

			newState={
				...state,
				...consolidate(await request.json(), 'fav'),
			}

			break;
	}

	console.group(`-> Dispatch ${type}`);
	console.log(state);
	console.log(newState);
	console.groupEnd();

	return { ...newState };
};


export const useInitialiseStore = () => {
	// @ts-ignore
	const [state, dispatch] = useReducer(reducer, initialState);

	return { state, dispatch };
};

export const useStore = () => {
	const { state, dispatch } = useContext(StoreContext);

	return { state, dispatch };
};
/*

export default function AppState({ ...props }: any) {
	// @ts-ignore
	const [state, dispatch] = useReducer(reducer, initialState);

	return <StoreContext.Provider {...props} value={{ state, dispatch }} />;
}
*/
