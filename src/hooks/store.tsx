import { createContext, Dispatch, useContext, useReducer } from 'react';
import { CatBreed, getFavouriteCatPics, getMyVotes } from './thecatapi';
import deepmerge from 'deepmerge';

const initialState = {};

interface ContextI {
	state?:any
	dispatch?:Dispatch<any>
}

export const StoreContext = createContext<ContextI>({});

type ReducerActionName = string;

export const Actions = {
	FETCH_BREEDS: 'FETCH_BREEDS',
	FETCH_FAVOURITES:'FETCH_FAVOURITES',
	FETCH_VOTES:'FETCH_VOTES',
	FETCH_CATS:'FETCH_CATS',
	FETCH_CAT:'FETCH_CAT',
	SAVE_CATS:'SAVE_CATS',
	SAVE_VOTES:'SAVE_VOTES',
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

const reducer = (state: State, { type , data}: ReducerAction) => {
	let request;
	let newState = state;

	console.group(`-> Dispatch ${type}`);
	console.log(data)

	switch (type) {
		case Actions.SAVE_CATS:
			console.log('indexCats')
			console.log(indexCats(data))

			newState = deepmerge(state, indexCats(data))
			break;
		case Actions.SAVE_VOTES:
			console.log(data)
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
