<template lang="pug">
	v-container(grid-list-lg)
		v-layout(row wrap )
			v-flex(xs12 md6 order-xs2 order-md1 )
				v-alert(:value="!moviesList.length" color="info" icon="info" outline) You have empty movie list...
				v-card(color="grey lighten-2" v-for="(item, index) in displayedList" :key="`moviesList+${index}`")
					v-card-title.pr-5.headline.light-blue--text
						| {{item.title}}
					v-btn.light-blue--text(fab flat absolute right top @click="deleteMovie(`moviesList+${index}`)")
						v-icon close
					v-card-text.subheadin(v-if="item.description.length")  {{item.description}}
					v-divider
				v-layout(row wrap md6)
					v-flex.text-xs-center(fluid v-if="displayedList.length")
						v-pagination(v-model="currentPage" :length="totalPage" :total-visible="perPage")
			v-flex(xs12 md6 order-xs1 order-md2 )
				v-card(color="grey lighten-2")
					v-card-title.display-1.light-blue--text Search movies list
					v-divider
					v-card-text
						v-text-field(prepend-icon="search" v-model="search" @input="currentPage=1" label="Search movies list")
				v-layout(row wrap md6)
					v-flex.text-xs-center(fluid)
						v-card(color="grey lighten-2")
							v-card-title.display-1.light-blue--text Add movies to list
							v-divider
							v-card-text
								v-text-field(prepend-icon="add" v-model="movies.title" label="Add movies")
								v-text-field(prepend-icon="add" v-model="movies.description" label="Add movies description")
							v-alert(type="info" :value="showMasage" dismissible) You can add some movies description later.
							v-alert(:value="successStatus" color="success" icon="check_circle" outline) You saved successfully
							v-alert(:value="errorStatus" color="error" icon="warning" outline dismissible) {{error}}
							v-card-actions
								v-btn(color="primary" @click="addMovie" :disabled="checkField")
									v-icon add
									| Add
								v-spacer
								v-btn(color="success" @click='onSubmit')
									v-icon save
									| Save
</template>
<script>
export default {
	data:()=>({
		movies:{
			"title":"",
			"description":""
		},
		showMasage: false,
		search: "",
		currentPage: 1,
		perPage: 7,
		setMoviesListOnPage: 5,
		errorStatus: null,
		successStatus: null
	}),
	computed:{
		moviesList(){
			return this.$store.getters.moviesList
		},
		checkField(){
			return this.movies.title.length<3
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
		},
		error(){
			return this.$store.getters.error
		},
	},
	created(){
		this.$bus.$on("savedData",()=>{
			this.savedOk()
		});
		if(this.moviesList.length == 0){
			this.$store.dispatch("GET_MOVIES_LIST");
		}


	},
	beforeDestroy(){
		this.$bus.$off("savedData")
	},
	watch:{
		error: function(val){
			if(val){
				this.errorStatus = true;
			}
		}
	},
	methods:{
		deleteMovie(index){
			this.$store.commit("deleteMovie", index);
		},
		onSubmit(){
			this.$store.dispatch("SET_MOVIES_LIST")
		},
		savedOk(){
				this.successStatus = true;
				setTimeout(() => {this.successStatus = null}, 3000)
		},
		addMovie(){
			this.v_alert()
			this.$store.commit("addMovie", this.movies);
			this.movies = {
				"title":"",
				"description":""
			}
		},
		v_alert(){
			if(!this.movies.description.length){
				this.showMasage = true
				setTimeout(() => this.showMasage = false, 10000)
			}
		},
		paginator(list){
			let page = this.currentPage;
			let setMoviesListOnPage = this.setMoviesListOnPage;
			let from = (page * setMoviesListOnPage) - setMoviesListOnPage;
			let to = (page * setMoviesListOnPage);
			return list.slice(from, to);
		}
	},
}
</script>
<style lang="sass" scoped>
.v-btn--top.v-btn--absolute
	top: 5px
.v-btn--right
	right: 0
</style>
