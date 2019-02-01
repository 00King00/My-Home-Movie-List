import firebase from 'firebase'
import store from './store'
import eventBus from '@/eventBus'
export default{
	state: {
		movies: [],
	},
	getters:{
		moviesList(state){
			return state.movies
		}
	},
	mutations: {
		deleteMovie(state, currentItem){
			state.movies.splice(currentItem,1)
		},
		addMovie(state, payload){
			state.movies.push(payload)
		},
		set_movies_list(state, payload){
			state.movies = payload || []
		},
		clear_movies(state){
			state.movies = [];
		}
	},
	actions: {
		GET_MOVIES_LIST({commit}){
			const urlDb = 'moviesList/' + store.state.userAuthentication.user.id;
			firebase.database().ref(urlDb).once('value').then(snapshot=>{
				let lists = snapshot.val();
				commit('set_movies_list', lists)
			}).catch(error => console.log(error))
		},
		async SET_MOVIES_LIST({commit, state}){
			commit('clear_error');
			commit('set_loading', true);
			try{
				await firebase.database().ref('moviesList/' + store.state.userAuthentication.user.id)
					.set(state.movies.map(item => item));
					eventBus.$emit("savedData")
				commit('set_loading', false);
			}catch(error){
				commit('set_error', error.message);
				commit('set_loading', false);
				throw error
			}
		},
	}
}
