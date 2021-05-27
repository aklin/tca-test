import Secrets from '../secrets';
import { Dispatch } from 'react';
import { Actions } from './store';

const { secret: apiKey } =
	Secrets.find(({ name }) => name === 'thecatapi.com') || {};
const url = 'https://api.thecatapi.com/v1';

if (!apiKey) {
	throw new Error(
		'Missing: apiKey. Make sure the secrets are injected correctly.'
	);
}

const commonHeaders: HeadersInit = new Headers();

commonHeaders.set('Content-Type', 'application/json');
commonHeaders.set('X-Api-Key', apiKey || '');

const GET = {
	method: 'GET',
	headers: commonHeaders,
};

const POST = {
	method: 'POST',
	headers: commonHeaders,
};

const DELETE = {
	method: 'DELETE',
	headers: commonHeaders,
};

export interface AppSecret {
	name: string;
	secret: string;
}

interface IUploadPicture {
	name?: string;
	file: File;
}

export interface CategoryI {
	id: number;
	name: string;
}

export interface MergedCatI extends CatI {
	favourite?: boolean;
	score?: number;
}

export interface CatI {
	id: string;
	url: URL;
	width: number;
	height: number;
	categories?: CategoryI[];
}

export interface VoteI {
	value: number;
	image_id: string;
}

export interface FavouriteI {
	image_id: string;
}

export const actionLoadCatPics = async (
	dispatch: Dispatch<any>,
	limit = 16
) => {
	const request = await getSearchCatPics(limit);
	if (!request.ok) {
		console.error(`Request failed actionLoadCatPics`);
		return;
	}

	dispatch({ type: Actions.SAVE_CATS, data: await request.json() });

	return request.headers.get('Pagination-Count');
};

export const actionLoadCatPic = async (dispatch: Dispatch<any>, id: string) => {
	const request = await getCatById(id);
	if (!request.ok) {
		console.error(`Request failed actionLoadCatPic`);
		return;
	}

	dispatch({ type: Actions.SAVE_CATS, data: [await request.json()] });
	return request.headers.get('Pagination-Count');
};

export const actionLoadFavourites = async (dispatch: Dispatch<any>) => {
	const request = await getFavouriteCatPics();
	if (!request.ok) {
		console.error(`Request failed actionLoadFavourites`);
		return;
	}

	dispatch({ type: Actions.SAVE_FAVOURITES, data: await request.json() });
	return request.headers.get('Pagination-Count');
};

export const actionToggleFavourite = async (
	dispatch: Dispatch<any>,
	id: string,
	set = false
) => {
	const request = await (set ? setFavourite(id) : unsetFavourite(id));
	if (!request.ok) {
		console.error(`Request failed actionSetFavourite`);
		return;
	}

	dispatch({ type: Actions.SET_FAVOURITE, data: { id, favourite: set } });
};

export const actionLoadOwnUploads = async (dispatch: Dispatch<any>) => {
	const request = await getMyCatPics();
	if (!request.ok) {
		console.error(`Request failed actionLoadOwnUploads`);
		return;
	}

	dispatch({ type: Actions.SAVE_UPLOADS, data: await request.json() });
	return request.headers.get('Pagination-Count');
};

export const actionSetVote = async (
	dispatch: Dispatch<any>,
	image_id: string,
	positiveVote: boolean
) => {
	const request = await postVote(image_id, positiveVote);
	if (!request.ok) {
		console.error(`Request failed actionSetVote`);
		return;
	}

	dispatch({
		type: Actions.SAVE_VOTES,
		data: [{ image_id, value: positiveVote ? 1 : 0 }],
	});
};

export const actionLoadVotes = async (dispatch: Dispatch<any>) => {
	const request = await getMyVotes();
	if (!request.ok) {
		console.error(`Request failed loadSearchCatPic`);
		return;
	}

	dispatch({ type: Actions.SAVE_VOTES, data: await request.json() });

	return request.headers.get('Pagination-Count');
};

export const getMyCatPics = async (page = 0, limit = 16) =>
	await fetch(`${url}/images?page=${page}&limit=${limit}`, GET);

export const getCatById = async (image_id: string) =>
	await fetch(`${url}/images/${image_id}`, GET);

export const postPicture = async (form: IUploadPicture) => {
	const headers: HeadersInit = new Headers();
	const formData: FormData = new FormData();

	headers.set('X-Api-Key', apiKey || '');

	form.name && formData.append('name', form.name);
	formData.append('file', form.file, form.file.name);

	await fetch(`${url}/images/upload`, {
		headers,
		method: 'POST',
		body: formData,
	});
};

export const postVote = async (image_id: string, vote: boolean) =>
	await fetch(`${url}/votes/`, {
		...POST,
		body: JSON.stringify({ image_id, value: vote }),
	});

export const getMyVotes = async () => await fetch(`${url}/votes`, GET);

const getSearchCatPics = async (limit = 16) =>
	await fetch(`${url}/images/search?limit=${limit}`, GET);

export const getFavouriteCatPics = async () =>
	await fetch(`${url}/favourites`, GET);

export const unsetFavourite = async (id: string) =>
	await fetch(`${url}/favourites/${id}`, DELETE);

export const setFavourite = async (id: string) =>
	await fetch(`${url}/favourites/`, {
		...POST,
		body: JSON.stringify({ image_id: id }),
	});
