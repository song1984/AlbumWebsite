import React from 'react';
import CarouselContainer from '../containers/CarouselContainer';
import HotspotBriefContainer from '../containers/HotspotBriefContainer';
import RecommendAlbumContainer from '../containers/RecommendAlbumContainer';
import RecommendAuthorContainer from '../containers/RecommendAuthorContainer';

let Main = ()=> (
	<main>
		<CarouselContainer />
		<RecommendAlbumContainer />
		<RecommendAuthorContainer />
		<HotspotBriefContainer />
	</main>
);

export default Main