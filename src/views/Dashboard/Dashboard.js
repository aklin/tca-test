import React from 'react';
// react plugin for creating charts
// @material-ui/core
import { makeStyles } from '@material-ui/core/styles';
// @material-ui/icons
// core components

import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';
import CatGrid from '../../components/CatGrid';

const useStyles = makeStyles(styles);

export default function Dashboard() {
	const classes = useStyles();
	return (
		<div>
			<CatGrid title={"Your images"} />
		</div>
	);
}
