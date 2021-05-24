import { Router, Redirect, Route, Switch } from 'react-router-dom';
import Admin from './layouts/Admin';
import React from 'react';
import AppState from 'hooks/store';


export default function App({hist}:any) {
	console.log('app')
	return (
		<Router history={hist}>
			<Switch>
				<Route path="/admin" component={Admin} />
				<Redirect from="/" to="/admin/dashboard" />
			</Switch>
		</Router>
	)
}
