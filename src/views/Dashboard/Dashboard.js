import React from 'react';
// react plugin for creating charts
// @material-ui/core
import { makeStyles } from '@material-ui/core/styles';
// @material-ui/icons
// core components
import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';
import MyCats from '../../components/MyCats';
import SearchCats from '../../components/SearchCats';

const useStyles = makeStyles(styles);

export default function Dashboard() {
	return (
		<div>
			<MyCats />
			<SearchCats />
		</div>
	);
}
