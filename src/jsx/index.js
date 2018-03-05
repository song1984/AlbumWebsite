import React from 'react';
import ReactDom from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router';
// import Root from './components/Root';
import appReducers from './reducers/combine';
import App from './components/App';
import Home from './components/Home';
import PhotoFrameFullContainer from './containers/PhotoFrameFullContainer';


let store = createStore(appReducers, applyMiddleware(thunkMiddleware));
let rootElement = document.getElementById('pad');

ReactDom.render(
	<Provider store = {store} >
		<Router history={browserHistory} >
			<Route path="/" component={App}>
				<IndexRoute component={Home} >
					<Route path="pic/:id" component={PhotoFrameFullContainer} />
				</IndexRoute> 
				<Route  path="home" component={Home} >
					<Route path="pic/:id" component={PhotoFrameFullContainer} />
				</Route> 
			</Route>
		</Router>
	</Provider>
	,
	rootElement
);