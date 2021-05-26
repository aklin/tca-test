import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Admin from './layouts/Admin';
import React from 'react';

export default function App({ hist }: any) {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/admin" component={Admin} />
				<Redirect from="/" to="/admin/dashboard" />
			</Switch>
		</BrowserRouter>
	);
}
