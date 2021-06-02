import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Admin from './layouts/Admin';
import React from 'react';
import { StoreContext, useInitialiseStore } from './hooks/store';

export default function App({ hist }: any) {
	const { state, dispatch } = useInitialiseStore();

	return (
		<StoreContext.Provider value={{ state, dispatch }}>
			<BrowserRouter>
				<Switch>
					<Route path="/admin" component={Admin} />
					<Redirect from="/" to="/admin/dashboard" />
				</Switch>
			</BrowserRouter>
		</StoreContext.Provider>
	);
}
