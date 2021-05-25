import React from 'react';
// react plugin for creating charts
// @material-ui/core
import PetsIcon from '@material-ui/icons/Pets';
import PublishIcon from '@material-ui/icons/Publish';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import FavoriteIcon from '@material-ui/icons/Favorite';
// @material-ui/icons
// core components
import MyCats from '../../components/MyCats';
import Tabs from '../../components/CustomTabs/CustomTabs.js';
import SearchCats from '../../components/SearchCats';


export default function Dashboard() {
	return (
		<div>
			<Tabs title={'Cats and Kittens'}
						headerColor={'info'}
						tabs={[
							{
								tabName: 'Browse',
								tabIcon:PetsIcon,
								tabContent: <SearchCats />,
							},
							{
								tabName: 'My uploads',
								tabIcon: PublishIcon,
								tabContent: <MyCats />,
							},
							{
								tabName: 'My favourites',
								tabIcon:FavoriteIcon,
								tabContent: <div />,
							},
							{
								tabName: 'My votes',
								tabIcon:ThumbUpIcon,
								tabContent: <div />,
							},
						]}
			/>
		</div>
	);
}
