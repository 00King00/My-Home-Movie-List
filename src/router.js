import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Movie from '@/views/Movies.vue'
import Login from '@/views/Login.vue'
import SingUp from '@/views/SingUp.vue'
import store from '@/store/store'
Vue.use(Router)
const router = new Router({
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
			meta: { requiresAuth: true }
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
		},
		{
			path: '*',
			redirect: "/"
		}
	]
});
router.beforeEach((to, from, next) => {
	const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
	if(requiresAuth){
		store.dispatch("INIT_EVENT_FIREBASE_AUTH").then(() =>{
				next()
		});
	}else{
		next()
	}
})

export default router
