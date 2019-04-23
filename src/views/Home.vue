<template lang="pug">
	v-container(grid-list-lg)
		v-layout(row wrap )
			v-flex(xs12)
				v-card(color="grey lighten-2")
					v-card-title.display-2.light-blue--text Search movies list
					v-divider
					v-card-text
						v-text-field(prepend-icon="search" v-model="search" @input="currentPage=1" label="Search movies list")
			v-flex.text-xs-center(xs12)
				h1.display-2.light-blue--text Top 50 IMDB films
			v-flex(xs12)
				v-list(color="grey lighten-2" subheader two-line)
					v-list-tile(v-for="(item, index) in displayedList" :key="`moviesList+${index}`")
						v-list-tile-content
							v-list-tile-title {{ item.title }}
							v-list-tile-sub-title {{ item.description }}
					v-divider
				v-layout(row wrap )
					v-flex.text-xs-center(fluid v-if="displayedList.length")
						v-pagination(v-model="currentPage" :length="totalPage" :total-visible="perPage")
</template>
<script>
import firebase from 'firebase/app'
export default {
	data:()=>({
		showMasage: false,
		search: "",
		currentPage: 1,
		perPage: 7,
		setMoviesListOnPage: 10,
		list: []
	}),
	computed:{
		moviesList(){
			return this.list
		},
		filteredList(){
			return this.moviesList.filter( post => {
				return post.title.toLowerCase().includes(this.search.toLowerCase());
			})
		},
		displayedList () {
			return this.paginator(this.filteredList);
		},
		totalPage(){
			return Math.ceil(this.filteredList.length/this.setMoviesListOnPage)
		}
	},
	created(){
		if(this.displayedList.length == 0){
			firebase.database().ref('defaultMoviesList/').once('value')
				.then(snapshot=>{
					let lists = snapshot.val();
					this.list = lists
				})
				.catch(error => console.log(error));
		}

	},
	methods:{
			paginator(list){
			let page = this.currentPage;
			let setMoviesListOnPage = this.setMoviesListOnPage;
			let from = (page * setMoviesListOnPage) - setMoviesListOnPage;
			let to = (page * setMoviesListOnPage);
			return list.slice(from, to);
		}

	}
}
</script>
<style lang="sass" scoped>
.v-btn--top.v-btn--absolute
	top: 5px
.v-btn--right
	right: 0
.v-pagination
	margin: 20px 0 50px 0
</style>
