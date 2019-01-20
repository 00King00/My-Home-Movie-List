export default {
	state: {
		loading: false,
		error: null,

	},
	getters:{
		loading(state){
			return state.loading
		},
		error(state){
			return state.error
		}

	},
	mutations: {
		set_loading(state, payload){
			state.loading = payload
		},
		set_error(state, payload){
			state.error = payload
		},
		clear_error(state){
			state.loading = false;
			state.error = null;
		}
	},
	actions: {
		SET_LOADING({commit}, payload){
			commit('set_loading', payload)
		},
		SET_ERROR({commit}, payload){
			commit('set_error', payload)
		},
		CLEAR_ERROR({commit}, payload){
			commit('clear_error', payload)
		}
	}

}
