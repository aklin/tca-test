import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import IconButton from '@material-ui/core/IconButton';
import { postVote } from '../../hooks/thecatapi';
import { ThumbDown } from '@material-ui/icons';

export default function CatVotePanel({ image_id, score = 0, ...props }) {
	return (
		<>
			<IconButton
				color={score > 0 ? 'secondary' : undefined}
				aria-label={'vote up'}
				onClick={async () => await postVote(image_id, true)}
				{...props}
			>
				<ThumbUpIcon />
			</IconButton>
			<IconButton
				color={score < 0 ? 'error' : undefined}
				aria-label={'vote down'}
				onClick={async () => await postVote(image_id, false)}
				{...props}
			>
				<ThumbDown />
			</IconButton>
		</>
	);
}
