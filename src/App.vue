<template lang="pug">
	v-app
		app-header
		v-content
			v-container(fluid)
				router-view
		app-footer
</template>
<script>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import firebase from 'firebase'
// Initialize Firebase
const config = {
	apiKey: "AIzaSyDlsIo-YbDgfa_kKR-1rgdDCTWUX9HjGCw",
	authDomain: "my-home-movie-list.firebaseapp.com",
	databaseURL: "https://my-home-movie-list.firebaseio.com",
	projectId: "my-home-movie-list",
	storageBucket: "my-home-movie-list.appspot.com",
	messagingSenderId: "1031099148086"
};
firebase.initializeApp(config);
export default {
	components: {
		AppHeader,
		AppFooter
	},
	created(){
	}
}
</script>

<style lang="sass">

</style>
