<template lang="pug">
	v-footer(dark )
		v-card.flex(flat tile)
			v-card-title.cyan
				strong.subheading Get connected with us on social networks!
				v-spacer
				v-btn.mx-3(v-for='icon in icons' :key='icon' dark icon)
					v-icon(size='24px') {{ icon }}
			v-card-actions.indigo.justify-center
				| ©2018 — Created by Vasyl Bilous
</template>

<script>
export default {
	data: () => ({
      icons: [
        'fab fa-facebook',
        'fab fa-twitter',
        'fab fa-google-plus',
        'fab fa-linkedin',
        'fab fa-instagram'
      ]
    })
}
</script>

<style lang="css">
</style>
