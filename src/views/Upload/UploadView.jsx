import Card from '../../components/Card/Card';
import CardHeader from '../../components/Card/CardHeader';
import CardBody from '../../components/Card/CardBody';
import CardFooter from '../../components/Card/CardFooter';
import Button from '../../components/CustomButtons/Button';
import { makeStyles } from '@material-ui/core/styles';
import PublishIcon from '@material-ui/icons/Publish';
import { useState } from 'react';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import CustomInput from '../../components/CustomInput/CustomInput';
import { InputAdornment } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import { postPicture } from '../../hooks/thecatapi';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	input: {
		display: 'none',
	},
}));

const dim = {
	xs: 12,
	sm: 12,
	md: 4,
};

export default function UploadView() {
	const history = useHistory();
	const classes = useStyles();
	const [form, setForm] = useState({});

	const handleUpload = async () => {
		/*
		approved: 1
height: 720
id: "rYjZNfyyI"
original_filename: "download.jpg"
pending: 0
url: "https://cdn2.thecatapi.com/images/rYjZNfyyI.jpg"
width: 1280
		 */
		try {
			await postPicture(form);
			history.push('/');
		} finally {
			// setBlocked(false);
		}
	};

	return (
		<div>
			<Card>
				<CardHeader color={'rose'}>
					<h4>Upload a picture</h4>
					<p>
						Your picture will be visible in the <i>My Uploads</i> tab
					</p>
				</CardHeader>
				<CardBody>
					<GridContainer>
						<GridItem {...dim}>
							<CustomInput
								labelText={'Name (optional)'}
								id={'name'}
								inputProps={{
									onChange: ({ target }) =>
										setForm({ ...form, name: target.value }),
								}}
							/>
						</GridItem>
						<GridItem {...dim}>
							<input
								accept="image/*"
								className={classes.input}
								id="contained-button-file"
								type="file"
								onChange={({ target }) =>
									setForm({ ...form, file: target.files[0] })
								}
							/>
							<CustomInput
								labelText={'Selected file'}
								labelProps={{ shrink: !!form.file }}
								value={(form.file || {}).name}
								inputProps={{
									disabled: true,
									value: (form.file || {}).name,
									endAdornment: (
										<InputAdornment position="end">
											<IconButton disabled={false}>
												<label htmlFor="contained-button-file">
													<PhotoLibraryIcon />
												</label>
											</IconButton>
										</InputAdornment>
									),
								}}
							/>
						</GridItem>
					</GridContainer>
				</CardBody>
				<CardFooter>
					<span />
					<Button
						disabled={!form.file}
						variant="contained"
						color="primary"
						component="span"
						onClick={handleUpload}
					>
						<PublishIcon />
						Upload
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
