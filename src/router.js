import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Movie from '@/views/Movies.vue'
import Login from '@/views/Login.vue'
import SingUp from '@/views/SingUp.vue'
import store from '@/store/store'
Vue.use(Router)
export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home
		},
		{
			path: '/movies',
			name: 'movies',
			component: Movie,
			beforeEnter(to, from, next){
				store.getters.checkUser ? next() : next('/login');
			}
		},
		{
			path: '/registration',
			name: 'registration',
			component: SingUp
		},
		{
			path: '/login',
			name: 'login',
			component: Login,
		}
	]
})
