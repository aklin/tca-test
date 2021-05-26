/*!

=========================================================
* Material Dashboard React - v1.10.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import PetsIcon from '@material-ui/icons/Pets';
import PublishIcon from '@material-ui/icons/Publish';
// core components/views for Admin layout
import DashboardPage from 'views/Dashboard/Dashboard.js';
import UploadView from './views/Upload/UploadView';
// core components/views for RTL layout

const dashboardRoutes = [
	{
		path: '/dashboard',
		name: 'Dashboard',
		icon: PetsIcon,
		component: DashboardPage,
		layout: '/admin',
	},
	{
		path: '/upload',
		name: 'Upload',
		icon: PublishIcon,
		component: UploadView,
		layout: '/admin',
	},
];

export default dashboardRoutes;
