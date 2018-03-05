import React from 'react';
import Header from './Header';
import Footer from './Footer';
import UploadImgDialogContainer from '../containers/UploadImgDialogContainer';
import LoginDialogContainer from '../containers/LoginDialogContainer';
import CreateAlbumDialogContainer from '../containers/CreateAlbumDialogContainer';
import MessageCenterContainer from '../containers/MessageCenterContainer';
import HeaderContainer from '../containers/HeaderContainer';
import AlertContainer from '../containers/AlertContainer';
import PickUpDialogContainer from '../containers/PickUpDialogContainer';

let App = ({children})=>(
	<div>
		<HeaderContainer />
		<main>
			{ children }
		</main>
		<Footer />
		<div>
			<LoginDialogContainer />
			<UploadImgDialogContainer />
			<CreateAlbumDialogContainer />
			<MessageCenterContainer />
			<PickUpDialogContainer />
		</div>
		<div>
			<AlertContainer />
		</div>		
	</div>
);

export default App