import React from 'react';
import CarouselContainer from '../containers/CarouselContainer';
import HotspotBriefContainer from '../containers/HotspotBriefContainer';
import RecommendAlbumContainer from '../containers/RecommendAlbumContainer';
import RecommendAuthorContainer from '../containers/RecommendAuthorContainer';


let Home = ({children})=> (
	<div>
		<CarouselContainer />
		<RecommendAlbumContainer />
		<RecommendAuthorContainer />
		<HotspotBriefContainer />
		{children}
	</div>
);

export default Home