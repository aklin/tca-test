import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import IconButton from '@material-ui/core/IconButton';
import { actionSetVote, postVote } from '../../hooks/thecatapi';
import { ThumbDown } from '@material-ui/icons';

export default function CatVotePanel({
	image_id,
	score = 0,
	dispatch,
	...props
}) {
	console.log(`${image_id}: ${score}`);

	return (
		<>
			<IconButton
				color={score > 0 ? 'secondary' : undefined}
				aria-label={'vote up'}
				onClick={() => actionSetVote(dispatch, image_id, true)}
				{...props}
			>
				<ThumbUpIcon />
			</IconButton>
			<IconButton
				color={score < 0 ? 'error' : undefined}
				aria-label={'vote down'}
				onClick={() => actionSetVote(dispatch, image_id, false)}
				{...props}
			>
				<ThumbDown />
			</IconButton>
		</>
	);
}
