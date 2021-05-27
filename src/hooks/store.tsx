import { createContext, useContext, useReducer } from 'react';
import { CatBreed, getCatById, getFavouriteCatPics, getMyVotes, getSearchCatPics } from './thecatapi';
import deepmerge from 'deepmerge';
import { Interface } from 'readline';

const initialState = {};

export const 	StoreContext = createContext({ state:{}, dispatch:()=>{} });

type ReducerActionName = string;

export const Actions = {
	FETCH_BREEDS: 'FETCH_BREEDS',
	FETCH_FAVOURITES:'FETCH_FAVOURITES',
	FETCH_VOTES:'FETCH_VOTES',
	FETCH_CATS:'FETCH_CATS',
	FETCH_CAT:'FETCH_CAT',
};

interface State{
	[index:string]:object
}

interface CategoryI{
	id:number
	name:string
}

export interface MergedCatI extends CatI{
	favourite?:boolean
	score?:number
}

interface CatI {
id:string
	url:URL
	width:number
	height:number
	categories?:CategoryI[]
}

interface VoteI{
	value:number
	image_id:string
}

interface FavouriteI{
	image_id:string
}

export interface ReducerAction {
	type: ReducerActionName;
	data: any | undefined;
}

/**
 * For /images endpoints
 * @param items
 */
const indexCats = (items:any[]):object =>
	items.map(({ id, ...rest }: CatBreed) => ({id: { id, ...rest }}))
	.reduce((res: any, cur: any) => ({ ...res, ...cur }), {})

/**
 * For all other endpoints
 * @param items
 */
const indexOther = (items:any) =>
	items.map(({ image_id, ...rest }: VoteI | FavouriteI) => ({id: { id: image_id, ...rest }}))
		.reduce((res: any, cur: any) => ({ ...res, ...cur }), {})


const calcVotes = (items:any[]):object =>
	items.map(({image_id, value}) => ({image_id, value: value !==1 ? -1 : 1}))


/**
 * Update any existing Cat states with incoming data
 * @param state
 * @param data
 */
const consolidateCats=(state:State, data:any[]):object =>
	data.map(({image_id, ...cat}) => ({...state[`cat_${image_id}`], ...cat}))

const reducer = async (state: State = {}, { type , data}: ReducerAction) => {
	let request;
	let newState = state;
	switch (type) {
		case Actions.FETCH_CAT:
			const {id} = data
			request = await getCatById(id);
			if (!request.ok) {
				console.error(`Request failed ${type}`);
			}

			newState = deepmerge(state, indexCats((await request.json())))

			break;
		case Actions.FETCH_CATS:
			request = await getSearchCatPics();
			if (!request.ok) {
				console.error(`Request failed ${type}`);
			}

			newState = deepmerge(state, indexCats((await request.json())))
			break;
		case Actions.FETCH_VOTES:
			request = await getMyVotes();
			if (!request.ok) {
				console.error(`Request failed ${type}`);
			}

			newState=deepmerge(state, indexOther((await request.json())))
			break;
		case Actions.FETCH_FAVOURITES:
			request = await getFavouriteCatPics();
			if (!request.ok) {
				console.error(`Request failed ${type}`);
			}

			newState=deepmerge(state, indexOther((await request.json())))
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
