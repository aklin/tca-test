import { useContext } from 'react';
import { Actions, StoreContext, UIError } from './store';

export interface useErrorHook {
	setError: (errInfo: UIError) => void;
	clearError: (errId: string) => void;
	errors: UIError[];
}

export default function useError(): useErrorHook {
	const { state, dispatch } = useContext(StoreContext);

	const setError = (errInfo: UIError) =>
		dispatch({ type: Actions.PUSH_ERROR, data: errInfo });

	const clearError = (errId: string) =>
		dispatch({ type: Actions.CLEAR_ERROR, data: { id: errId } });

	const errors = Object.keys(state)
		.filter((key) => key.indexOf('\terror_') > -1)
		.map((errId) => state[errId]);

	return {
		setError,
		clearError,
		errors,
	};
}
