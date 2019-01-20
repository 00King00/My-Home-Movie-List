import Vue from 'vue'
import Vuex from 'vuex'
import moviesList from './moviesList'
import userAuthentication from './userAuthentication'
import userAuthentication_helper from './userAuthentication_helper'
Vue.use(Vuex)

export default new Vuex.Store({
	state: {

	},
	mutations: {

	},
	actions: {

	},
	modules:{
		moviesList,
		userAuthentication,
		userAuthentication_helper
	}
})
