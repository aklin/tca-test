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

/*
const DELETE={
	method: 'DELETE',
	headers: commonHeaders,
}
*/

export interface AppSecret {
	name: string;
	secret: string;
}

export interface CatBreed {
	id: string;
	name: string;
	origin: string;
	life_span: string;
	alt_names?: string;
	temperament: string;
	reference_image_id: string | null;
	weight_imperial: string;
	wikipedia_url: string;
	experimental?: boolean;
	hairless: boolean;
	hypoallergenic: boolean;
	rex: boolean;
	short_legs: boolean;
	suppressed_tail: boolean;
	natural: boolean;
	rare: boolean;
}

interface IUploadPicture {
	name?: string;
	file: File;
}

export const actionLoadCatPics = async (dispatch:Dispatch<any>, limit=16) =>{
	const request = await getSearchCatPics(limit);
	if (!request.ok) {
		console.error(`Request failed loadSearchCatPics`);
	}

	dispatch({type:Actions.SAVE_CATS, data: (await request.json())})

	return request.headers.get("Pagination-Count")
}

export const actionLoadCatPic = async (dispatch:Dispatch<any>, id:string)=>{
	const request = await getCatById(id);
	if (!request.ok) {
		console.error(`Request failed loadSearchCatPic`);
	}

	dispatch({type: Actions.SAVE_CATS, data: [(await request.json)]})

	return request.headers.get("Pagination-Count")
}


export const actionLoadVotes = async(dispatch:Dispatch<any>) => {
	const request = await getFavouriteCatPics();
	if (!request.ok) {
		console.error(`Request failed loadSearchCatPic`);
	}

	dispatch({type: Actions.SAVE_VOTES, data: await request.json()})

	return request.headers.get("Pagination-Count")
}


export const getBreeds = async (page = 0, limit = 10) =>
	await fetch(`${url}/breeds?page=${page}&limit=${limit}`, GET);

export const searchBreedsByName = async (name: string) =>
	await fetch(`${url}/breeds/search?q=${name}`, GET);

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
		body: JSON.stringify({ image_id, value:vote }),
	});

export const getMyVotes = async (page = 0, limit = 16) =>
	await fetch(`${url}/votes?page=${page}&limit=${limit}`, GET);

const getSearchCatPics = async (limit = 16) =>
	await fetch(`${url}/images/search?limit=${limit}`, GET);

export const getFavouriteCatPics = async (limit = 16) =>
	await fetch(`${url}/favourites`, GET);

export const setFavourite = async (id: string, favourite: boolean) => {
	// const method = favourite ? 'POST' : 'DELETE';

	return await fetch(`${url}/favourites/`, {
		...POST,
		body: JSON.stringify({ image_id:	id }),
	});
};
