import IconButton from '@material-ui/core/IconButton';
import { actionToggleFavourite } from '../../hooks/thecatapi';
import FavoriteIcon from '@material-ui/icons/Favorite';

export default function FavouriteBtn({
	image_id,
	onClick,
	set = false,
	...props
}) {
	return (
		<IconButton
			color={set ? 'rose' : undefined}
			aria-label={'Set/unset favourite'}
			onClick={() => onClick(!set)}
			{...props}
		>
			<FavoriteIcon />
		</IconButton>
	);
}
