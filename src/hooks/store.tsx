import { createContext, Dispatch, useReducer } from 'react';
import { CatI, FavouriteI, MergedCatI, VoteI } from './thecatapi';
import deepmerge from 'deepmerge';

const initialState = {};

interface ContextI {
	state: any;
	dispatch: Dispatch<any>;
}

export interface UIError {
	id?: string;
	title?: string;
	message: string;
	severity?: UIErrorSeverity;
}

export enum UIErrorSeverity {
	info = 'info',
	success = 'success',
	warning = 'warning',
	error = 'danger',
}

// @ts-ignore
export const StoreContext = createContext<ContextI>();

type ReducerActionName = string;

export const Actions = {
	//cat actions
	SAVE_CATS: 'SAVE_CATS',
	SAVE_VOTES: 'SAVE_VOTES',
	SAVE_FAVOURITES: 'SAVE_FAVOURITES',
	SAVE_UPLOADS: 'SAVE_UPLOADS',
	SET_FAVOURITE: 'SET_FAVOURITE',
	//error actions
	PUSH_ERROR: 'PUSH_ERROR',
	CLEAR_ERROR: 'CLEAR_ERROR',
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
	let newState = {};

	console.group(`-> Dispatch ${type}`);
	console.log(data);

	switch (type) {
		case Actions.PUSH_ERROR:
			let errid = `\terror_${Date.now()}`;
			newState = {
				...state,
				[errid]: {
					id: errid,
					title: data.title,
					message: data.message,
					severity: data.severity || UIErrorSeverity.error,
				},
			};
			break;

		case Actions.CLEAR_ERROR:
			delete state[data.id];
			newState = { ...state };
			break;

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
