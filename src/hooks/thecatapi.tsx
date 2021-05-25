import Secrets from '../secrets';

const { secret: apiKey } =
	Secrets.find(({ name }) => name === 'thecatapi.com') || {};
const url = 'https://api.thecatapi.com/v1';

if (!apiKey) {
	throw new Error(
		'Missing: apiKey. Make sure the secrets are injected correctly.'
	);
}

const commonHeaders: HeadersInit = new Headers();

commonHeaders.set('Content-Type', 'application.json');
commonHeaders.set('X-Api-Key', apiKey || '');

const GET = {
	method: 'GET',
	headers: commonHeaders,
};
/*
const POST={
	method: 'POST',
	headers: commonHeaders,
}

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

export const getBreeds = async (page = 0, limit = 10) =>
	await fetch(`${url}/breeds?page=${page}&limit=${limit}`, GET);

export const searchBreedsByName = async (name: string) =>
	await fetch(`${url}/breeds/search?q=${name}`, GET);


export const getMyCatPics=async (page=1, limit=16) =>
	await fetch(`${url}/images?page=${page}&limit=${limit}`, GET)

export const getSearchCatPics=async(limit=16) =>
	await fetch(`${url}/images/search?limit=${limit}`, GET)

export const getFavouriteCatPics=async(limit=16) =>
	await fetch(`${url}/favourites`, GET)

export const setFavourite = async (id: string, favourite: boolean) => {
	const method = favourite ? 'POST' : 'DELETE';

	return await fetch(`${url}/`, { headers: commonHeaders, method, body: JSON.stringify({ id }) });
};
