import { createContext, Dispatch, useContext, useReducer } from 'react';
import { CatI, FavouriteI, MergedCatI, VoteI } from './thecatapi';
import deepmerge from 'deepmerge';

const initialState = {};

interface ContextI {
	state?: any;
	dispatch?: Dispatch<any>;
}

export const StoreContext = createContext<ContextI>({});

type ReducerActionName = string;

export const Actions = {
	/*	FETCH_BREEDS: 'FETCH_BREEDS',
	FETCH_FAVOURITES: 'FETCH_FAVOURITES',
	FETCH_VOTES: 'FETCH_VOTES',
	FETCH_CATS: 'FETCH_CATS',
	FETCH_CAT: 'FETCH_CAT',*/
	SAVE_CATS: 'SAVE_CATS',
	SAVE_VOTES: 'SAVE_VOTES',
	SAVE_FAVOURITES: 'SAVE_FAVOURITES',
	SAVE_UPLOADS: 'SAVE_UPLOADS',
	SET_FAVOURITE: 'SET_FAVOURITE',
};

interface State {
	[index: string]: object;
}

export interface ReducerAction {
	type: ReducerActionName;
	data: any | undefined;
}

/**
 * For /images endpoints
 * @param items
 */
const indexCats = (items: any[]): object =>
	items
		.map(({ id, ...rest }: CatI) => ({ [id]: { id, ...rest } }))
		.reduce((res: any, cur: any) => ({ ...res, ...cur }), {});

/**
 * For all other endpoints
 * @param items
 */
/*const indexOther = (items: any) =>
	items
		.map(({ image_id, ...rest }: VoteI | FavouriteI) => ({
			[image_id]: { id: image_id, ...rest },
		}))
		.reduce((res: any, cur: any) => ({ ...res, ...cur }), {})*/ const reducer = (
	state: State,
	{ type, data }: ReducerAction
) => {
	let request;
	let newState = state;

	console.group(`-> Dispatch ${type}`);
	console.log(data);

	switch (type) {
		case Actions.SAVE_CATS:
			console.log('indexCats');
			console.log(indexCats(data));

			newState = deepmerge(state, indexCats(data));
			break;
		case Actions.SAVE_VOTES:
			//tally up votes

			newState = deepmerge(
				state,
				indexCats(
					data.map(({ value, image_id }: VoteI) => {
						const old = state[image_id] as MergedCatI;
						return {
							id: image_id,
							score: (old?.score || 0) + value ? 1 : -1,
						};
					})
				)
			);
			break;
		case Actions.SAVE_FAVOURITES:
			newState = deepmerge(
				state,
				indexCats(
					data.map(({ image_id }: FavouriteI) => ({
						id: image_id,
						favourite: true,
					}))
				)
			);
			break;
		case Actions.SAVE_UPLOADS:
			newState = deepmerge(
				state,
				indexCats(data.map((cat: CatI) => ({ ...cat, ownUpload: true })))
			);
			break;
		case Actions.SET_FAVOURITE:
			let { id, favourite } = data;
			newState = { ...state, [id]: { ...(state[id] || {}), favourite } };
			break;
		default:
			console.error(new Error().stack);
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
