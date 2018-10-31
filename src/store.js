import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import getPost from './Popup/getPost.js';

const POPUP_HIDE = 'POPUP_HIDE';
const POPUP_SHOW = 'POPUP_SHOW';
const POPUP_REQUEST = 'POPUP_REQUEST';
const POPUP_REQUEST_DONE = 'POPUP_REQUEST_DONE';
const POPUP_REQUEST_DATA = 'POPUP_REQUEST_DATA';

export const createPopupHide = () => ({type: POPUP_HIDE});
export const createPopupShow = () => ({type: POPUP_SHOW});
const createPopupRequest = () => ({type: POPUP_REQUEST});
const createPopupRequestDone = () => ({type: POPUP_REQUEST_DONE});
const createPopupRequestData = (data) => ({type: POPUP_REQUEST_DATA, payload: data});
export const createPopupPost = (postId, postType) => (dispatch, state) => {
	dispatch(createPopupShow());
	dispatch(createPopupRequest());
	getPost({postId, postType, forceLive: true}).then(
		(response) => {
			// To Do: move to a data reshaping function, maybe in reducer
			// To Do: modify what's exposed to the API to only include the info 
			// necessary to render a component

			console.log(response);

			const { title, acf } = response;
			const { 
				website, images, image, description, director_name, director_bio, director_image, 
				director_website, vimeo_url, video_description, artist_name, artist_website 
			} = acf;
			const relationship = acf[`festival_${postType}_relationship`];

			let selectedImage;
			if(images && images[0] && images[0].sizes) {
				selectedImage = images[0].sizes.large;
			} else if(image && image.sizes) {
				selectedImage = image.sizes.large;
			} else if(image) {
				selectedImage = image;
			} else if(director_image && director_image.sizes) {
				selectedImage = director_image.sizes.large;
			}
			dispatch(createPopupRequestDone());
			dispatch(createPopupRequestData({
				postType: postType,
				title: title.rendered, 
				website, image: selectedImage, description: {__html: description}, relationship, 
				director_name, director_bio: {__html: director_bio}, director_image, director_website, vimeo_url, 
				video_description: {__html: video_description}, artist_name, artist_website
			}));
		}, 
		() => {
			dispatch(createPopupRequestDone());
			dispatch(createPopupRequestData());
		}
	);
};

const defaultState = {
	popupHidden: true,
	popupRequest: false
};

function store(state = defaultState, action) {
	switch(action.type) {
		case POPUP_HIDE:
			return {...state, popupHidden: true};
		case POPUP_SHOW:
			return {...state, popupHidden: false};
		case POPUP_REQUEST: 
			return {...state, popupRequest: true};
		case POPUP_REQUEST_DONE: 
			return {...state, popupRequest: false};
		case POPUP_REQUEST_DATA: 
			return {...state, popupData: action.payload};
		default: 
			return state;
	}
}

const middlewares = [thunk];

if(process.env.NODE_ENV === 'development') {
  const { logger } = require('redux-logger');
  middlewares.push(logger);
}

export default createStore(store, applyMiddleware(...middlewares));