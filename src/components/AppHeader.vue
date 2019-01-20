<template lang="pug">
	v-toolbar(app color="cyan" dark)
		v-toolbar-side-icon.hidden-sm-and-up
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
import firebase from 'firebase/app'
export default {
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
