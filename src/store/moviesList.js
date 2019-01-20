import firebase from 'firebase'
import store from './store'
export default{
	state: {
		//"movies": [
		// 	{
		// 	"title": " Втеча з Шоушенка (1994)",
		// 	"description": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency."
		// 	},
		// 	{
		// 	"title": " Хрещений батько (1972)",
		// 	"description": "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son."
		// 	},
		// 	{
		// 	"title": " Темний лицар (2008)",
		// 	"description": "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham. The Dark Knight must accept one of the greatest psychological and physical tests of his ability to fight injustice."
		// 	},
		// 	{
		// 	"title": "Хрещений батько - 2 (1974)",
		// 	"description": "The early life and career of Vito Corleone in 1920s New York City is portrayed, while his son, Michael, expands and tightens his grip on the family crime syndicate."
		// 	},
		// 	{
		// 	"title": " Кримiнальне чтиво (1994)",
		// 	"description": "The lives of two mob hit-men, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption."
		// 	},
		// 	{
		// 	"title": "12 розгнiваних чоловiкiв (1957) ",
		// 	"description": ""
		// 	},
		// 	{
		// 	"title": "Список Шиндлера (1993)",
		// 	"description": ""
		// 	},
		// 	{
		// 	"title": "Володар перснiв: Повернення короля (2003)",
		// 	"description": ""
		// 	},
		// 	{
		// 	"title": "Хороший, поганий, злий (1966)",
		// 	"description": ""
		// 	},
		// 	{
		// 	"title": "Бiйцiвський клуб (1999)",
		// 	"description": ""
		// 	},
		// 	{
		// 	"title": "Володар перснiв: Хранителi персня (2001)",
		// 	"description": ""
		// 	},
		// 	{
		// 	"title": "Форрест Гамп (1994)",
		// 	"description": ""
		// 	},
		// 	{
		// 	"title": "Початок (2010)",
		// 	"description": ""
		// 	},
		// 	{
		// 	"title": "Володар перснiв: Двi вежi (2002)",
		// 	"description": ""
		// 	},
		// 	{
		// 	"title": "Пролiтаючи над гнiздом зозулi (1975)",
		// 	"description": ""
		// 	}
		// ],
		movies: [],
		test: []
	},
	getters:{
		moviesList(state){
			return state.movies
		}
	},
	mutations: {
		deleteMovie(state, currentItem){
			state.movies.splice(currentItem,1)
		},
		addMovie(state, payload){
			state.movies.push(payload)
		},
		set_movies_list(state, payload){
			state.movies = payload
		},
		clear_movies(state){
			state.movies = [];
		}
	},
	actions: {
		async GET_MOVIES_LIST({commit}){
			const urlDb = 'moviesList/' + store.state.userAuthentication.user.id;
			console.log(urlDb);
			await firebase.database().ref(urlDb).once('value').then(snapshot=>{
				console.log(store.state.userAuthentication.user.id);
				let lists = snapshot.val();
				const arrList = [];
				Object.keys(lists).map(key=>{
					arrList.push(lists[key]);
				})
				commit('set_movies_list', arrList)
			}).catch(error => console.log(error))
		},
		async SET_MOVIES_LIST({commit, state}){
			commit('clear_error');
			commit('set_loading', true);
			try{
				const post = await firebase.database().ref('moviesList/' + store.state.userAuthentication.user.id)
					.set(state.movies.map(item => item));
				console.log(post);
				commit('set_loading', false);
			}catch(error){
				console.log(error);
				commit('set_error', error.message);
				commit('set_loading', false);
				throw error
			}
		},
	}
}
