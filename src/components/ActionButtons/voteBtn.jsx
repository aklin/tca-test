import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import IconButton from '@material-ui/core/IconButton';
import { postVote } from '../../hooks/thecatapi';
import { ThumbDown } from '@material-ui/icons';
import { useState } from 'react';

export default function CatVoteButton({
	image_id,
	isActive=false,
	voteDown = false,
	...props
}) {
	const [toggled, setToggled]=useState(isActive)
	const castVote = async (voteUp) => {
		try {
			const response = await postVote(image_id, voteUp);
			response.ok && setToggled(!toggled)

		} finally {
			// setLoading(false);
		}
	};

	return (
		<IconButton
			aria-label={voteDown ? 'vote down' : 'vote up'}
			onClick={() => castVote(true)}
			{...props}
		>{
			voteDown ? (
				<ThumbDown color={toggled && !voteDown ? 'primary' : undefined} />
			) : (
				<ThumbUpIcon color={toggled && voteDown ? 'secondary' : undefined} />
			)}</IconButton>
	);
}
