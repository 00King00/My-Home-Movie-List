<template lang="html">
	<v-layout align-center justify-center>
		<v-flex xs12 sm8 md4>
			<v-card class="elevation-12">
				<v-toolbar dark color="cayan">
					<v-toolbar-title>Login form</v-toolbar-title>
				</v-toolbar>
				<v-card-text>
					<v-form>
						<v-text-field v-model="email" prepend-icon="person" name="login" label="Login" type="text"></v-text-field>
						<v-text-field v-model="password" prepend-icon="lock" name="password" label="Password" id="password" type="password"></v-text-field>
					</v-form>
				</v-card-text>
				<v-card-text>
					<v-alert type="error" v-model="alert" dismissible>
						{{errorMessage}}
					</v-alert>
				</v-card-text>
				<v-card-actions>
				<v-spacer></v-spacer>
					<v-btn color="primary"  @click="onSubmit" :loading="loading">Login</v-btn>
				</v-card-actions>
			</v-card>
		</v-flex>
	</v-layout>
</template>
<script>
export default {
	data: () => ({
		email: '',
		password:"",
		errorMessage: null,
		alert: false
	}),
	computed: {
		loading(){
			return this.$store.getters.loading
		}
	},
	methods:{
		onSubmit(){
			const user = {
				email: this.email,
				password: this.password
			};
			this.$store.dispatch('LOGIN_USER', user)
				.then(()=>{
					console.log("login_user");
					this.$router.push("/movies")
				}).catch((err)=>{
					this.errorMessage = err.message;
					this.alert = true
				})
		}
	}
}
</script>
