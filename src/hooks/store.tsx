import { createContext, useContext, useReducer } from 'react';
import { CatBreed, getCatById, getFavouriteCatPics, getMyVotes, getSearchCatPics } from './thecatapi';
import deepmerge from 'deepmerge';

const initialState = {};

export const 	StoreContext = createContext({ state:{}, dispatch:()=>{} });

type ReducerActionName = string;

export const Actions = {
	FETCH_BREEDS: 'FETCH_BREEDS',
	FETCH_FAVOURITES:'FETCH_FAVOURITES',
	FETCH_VOTES:'FETCH_VOTES',
	FETCH_CATS:'FETCH_CATS',
	FETCH_CAT:'FETCH_CAT',
	SAVE_CATS:'SAVE_CATS',
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
	items.map(({ id, ...rest }: CatBreed) => ({[id]: { id, ...rest }}))
	.reduce((res: any, cur: any) => ({ ...res, ...cur }), {})

/**
 * For all other endpoints
 * @param items
 */
const indexOther = (items:any) =>
	items.map(({ image_id, ...rest }: VoteI | FavouriteI) => ({[image_id]: { id: image_id, ...rest }}))
		.reduce((res: any, cur: any) => ({ ...res, ...cur }), {})

const reducer = async (state: State, { type , data}: ReducerAction) => {
	let request;
	let newState = state;

	console.group(`-> Dispatch ${type}`);
	console.log(data)

	switch (type) {
		case Actions.FETCH_CAT:
			const {id} = data
			request = await getCatById(id);
			if (!request.ok) {
				console.error(`Request failed ${type}`);
			}

			newState = deepmerge(state, indexCats([(await request.json())]))

			break;
		case Actions.SAVE_CATS:
			console.log('indexCats')
			console.log(indexCats(data))

			newState = deepmerge(state, indexCats(data))
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
		default:
			console.error(new Error().stack)
	}

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