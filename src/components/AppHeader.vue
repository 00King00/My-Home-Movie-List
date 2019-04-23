<template lang="pug">
	div
		v-navigation-drawer.hidden-md-and-up.blue.lighten-3(dark temporary clipped absolute v-model="drawer")
			v-btn(fab flat absolute right @click.prevent="drawer=false")
				v-icon close
			v-list
				v-list-tile(to="/")
					v-list-tile-action
						v-icon home
					v-list-tile-content
						v-list-tile-title Home
				v-list-tile(to="movies"  v-if="checkUser")
					v-list-tile-action
						v-icon movie
					v-list-tile-content
						v-list-tile-title Movie
				v-list-tile(to="login"  v-if="!checkUser")
					v-list-tile-action
						v-icon input
					v-list-tile-content
						v-list-tile-title Log In
				v-list-tile(to="registration"  v-if="!checkUser")
					v-list-tile-action
						v-icon supervisor_account
					v-list-tile-content
						v-list-tile-title Sing Up
				v-list-tile(to="/"  v-if="checkUser")
					v-list-tile-action
						v-icon fas fa-sign-out-alt
					v-list-tile-content
						v-list-tile-title sign-out
		v-toolbar(app color="cyan" dark)
			v-toolbar-side-icon.hidden-sm-and-up(@click.prevent="drawer=!drawer")
			v-toolbar-title Movie Listing
			v-spacer
			v-toolbar-items.hidden-xs-only
				v-btn(flat to="/")
					v-icon(left) home
					| Home
				v-btn(flat to="movies" v-if="checkUser")
					v-icon(left ) movie
					| Movies
				v-btn(flat to="login" v-if="!checkUser")
					v-icon(left ) input
					| Log In
				v-btn(flat  to="registration" v-if="!checkUser")
					v-icon(left) supervisor_account
					| Sing Up
				v-btn(flat  to="/" v-if="checkUser" @click="signOut")
					v-icon(left) fas fa-sign-out-alt
					| sign-out
</template>
<script>
export default {
	data(){
		return{
			drawer: false

		}
	},
	computed:{
		checkUser(){
			return this.$store.getters.checkUser
		}
	},
	created(){
		return this.$store.getters.checkUser
	},
	methods:{
		signOut(){
			this.$store.dispatch('SIGN_OUT');
		}
	}
}
</script>
