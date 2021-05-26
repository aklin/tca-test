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

const useStyles = makeStyles((theme) => ({
	input: {
		display: 'none',
	},
}));

const dim = {
	xs: 12, sm: 12, md: 4,
};


export default function UploadView() {
	const classes = useStyles();
	const [form, setForm]=useState({})

	return (
		<div>
			<Card>
				<CardHeader color={'rose'}>
					<h4>Upload a picture</h4>
					<p>Your picture will be visible in the <i>My Uploads</i> tab</p>
				</CardHeader>
				<CardBody>

					<GridContainer>
						<GridItem {...dim}>
							<CustomInput
								labelText={'Name (optional)'}
								id={'name'}
								inputProps={{onChange:({target})=>setForm({...form, name: target.value})}}
							/>
						</GridItem>
						<GridItem {...dim}>
							<input
								accept='image/*'
								className={classes.input}
								id='contained-button-file'
								type='file'
								onChange={({ target })=> setForm({...form, file: target.files[0].name})}
							/>
							<CustomInput
								labelText={'Selected file'}
								value={form.file}
								inputProps={{
									disabled:true,
									value:form.file,
									endAdornment: (
										<InputAdornment position="end">
											<IconButton disabled={false}>
												<label htmlFor='contained-button-file'>
													<PhotoLibraryIcon/>
												</label>
											</IconButton>
										</InputAdornment>)
								}}
							/>
						</GridItem>
					</GridContainer>

				</CardBody>
				<CardFooter>

					<span />
					<Button disabled={!form.file} variant='contained' color='primary' component='span'>
						<PublishIcon />
						Upload
					</Button>

				</CardFooter>
			</Card>
		</div>
	);
}
