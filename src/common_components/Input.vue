<template>
	<div>
		<input @input="handleInput" :value="!!-controlled ? defaultValue : state.value" />
		<p :class="state.showWarning ? 'db' : 'dn'">{{keepmsg}}</p>
	</div>
</template>

<style scoped>
	.dn {
		display: none;
	}
	.db {
		display: block;
	}
</style>

<script>
	export default {
		name:"th-input",
		props: ["defaultValue","onInput","keepmsg","pattern","controlled"],
		data () {
			return {
				state: {
					value: this.defaultValue,
					showWarning: false
				}
			}
		},
		computed: {
			storeState() {
				return {
					user:this.$store.state.user
				};
			}
		},
		methods: {
			handleInput(e) {
				let oldValue = this.state.value;
				this.state.value = e.target.value;
				let newValue = this.state.value;
				let reg = new RegExp(this.pattern);
				this.state.showWarning = !reg.test(newValue);
				(this.onInput instanceof Function) && this.onInput(oldValue,newValue);
			},
			getData() {
				return this.state.value;
			}
		}
	}
</script>
