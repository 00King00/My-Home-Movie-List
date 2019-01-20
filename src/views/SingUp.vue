<template lang="html">
	<v-layout align-center justify-center>
		<v-flex xs12 sm8 md4>
			<v-card class="elevation-12">
				<v-toolbar dark color="cayan">
					<v-toolbar-title>Registers form</v-toolbar-title>
				</v-toolbar>
				<v-card-text>
					<v-form ref="form">
						<v-text-field v-model="email" @change="validate" :rules="rules" prepend-icon="person" name="login" label="Email" type="text"></v-text-field>
						<v-text-field v-model="password" @input="validatePassword" prepend-icon="lock" name="password" label="Password" id="password" type="password"></v-text-field>
						<v-text-field v-model="repeat_password" @input="validatePassword" :rules="passwordRules" prepend-icon="lock" name="repeat_password" label="repeat password" id="repeat_password" type="password"></v-text-field>
					</v-form>
				</v-card-text>
				<v-card-text>
					<v-alert type="error" v-model="alert" dismissible>
						{{errorMessage}}
					</v-alert>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="primary" @click="onSubmit" :disabled="!checkRegistration" :loading="loading" >Registers</v-btn>
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
		repeat_password: "",
		rules:[],
		passwordRules:[],
		checkRegistration: false,
		errorMessage: null,
		alert: false
	}),
	computed:{
		loading(){
			return this.$store.getters.loading
		}
	},
	methods: {
		validate () {
			this.rules = [(v) => !!v || 'E-mail is required',
				(v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
			];
		},
		validatePassword(){
			if(this.repeat_password.length === this.password.length && this.repeat_password.length >=6){
				this.passwordRules = [() => this.repeat_password == this.password  && this.password.length >= 6 || 'Password must be valid',
				() => this.repeat_password.length >= 6 || 'Password should be at least 6 characters'
			];
				if (this.$refs.form.validate()){
					this.checkRegistration= true
				}else{this.checkRegistration= false}
			}else{
				this.checkRegistration= false
			}

		},
		onSubmit(){
			if (this.$refs.form.validate()){
				const user = {
					email: this.email,
					password: this.password
				};
				this.$store.dispatch('REGISTER_USER', user)
					.then(()=>{
						console.log("Registers ");
						this.$router.push("/movies")
					}).catch((err)=>{
						this.errorMessage = err.message;
						this.alert = true
					})
			}
		},
		submit () {
			//if (this.$refs.form.validate()) {
			// Native form submission is not yet supported
			//   axios.post('/api/submit', {
			// 	name: this.name,
			// 	email: this.email,
			// 	select: this.select,
			// 	checkbox: this.checkbox
			//   })
			//}
		},
		clear () {
			//this.$refs.form.reset()
		}
	}
}
</script>
