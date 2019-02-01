import firebase from 'firebase'
export default {
	state: {
		user: null,
		unsubscribeAuth: null

	},
	getters:{
		checkUser(state){
			return state.user !== null
		},
		user(state){
			return state.user
		}
	},
	mutations: {
		set_user(state, payload){
			state.user = {id: payload.uid}
		},
		sign_out(state, payload){
			state.user = payload
		},
		set_unsubscribeAuth(state, payload){
			state.unsubscribeAuth = payload
		},
		set_unsubscribeAuth(state, payload){
			state.unsubscribeAuth = payload
		}
	},
	actions: {
		INIT_EVENT_FIREBASE_AUTH({dispatch, commit, state}){
			return new Promise(function(resolve, reject) {
				if (state.unsubscribeAuth) {
					state.unsubscribeAuth()
				}
				let unsubscribeAuth = firebase.auth().onAuthStateChanged(user => {
					if(user){
						dispatch('SET_USER', user);
						dispatch("GET_MOVIES_LIST");
						resolve(user);
					}
				});
				commit('set_unsubscribeAuth', unsubscribeAuth)
			});
		},
		async REGISTER_USER({commit}, {email, password}){
			commit('clear_error');
			commit('set_loading', true);
			try{
				const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
				commit('set_user', user.user);
				commit('set_loading', false);
			}catch(error){
				commit('set_error', error.message);
				commit('set_loading', false);
				throw error
			}

		},
		async LOGIN_USER({commit}, {email, password}){
			commit('clear_error');
			commit('set_loading', true);
			try{
				const user = await firebase.auth().signInWithEmailAndPassword(email, password);
				commit('set_user', user.user);
				commit('set_loading', false);
			}catch(error){
				commit('set_error', error.message);
				commit('set_loading', false);
				throw error
			}

		},
		SET_USER({commit}, payload){
			commit('set_user', payload)
		},
		async SIGN_OUT({commit}){
			await firebase.auth().signOut();
			commit('sign_out', null)
			commit('clear_movies')
		}

	}

}
