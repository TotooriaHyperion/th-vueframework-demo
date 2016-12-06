<template>
	<div id="app">
		<button @click="hello">Hello world!</button>
		<input type="text" :value="msg" @input="handleInput">
		<th-input ref="haha" pattern="^\d+$" keepmsg="Warning" :defaultValue.number="searchInfo.dv" :onInput="onInput" :controlled="(function(control){testControl();return control;})(control,testControl)"/>
		<p>{{searchInfo.dv}}</p>
		<button @click="doSave">Submit</button>
		<button @click="toggleControl">ToggleControl</button>
		<button @click="toggleAuto">ToggleAuto</button>
	</div>
</template>

<script>
	import thInput from "./common_components/Input.vue";

//	const filters = {
//		userName:user => user.name,
//		userImg:user => user.img
//	};

	export default {
		name: 'app',
		data () {
			return {
				msg: 'Welcome to Your Vue.js App',
				searchInfo:{
					dv:123
				},
//				onInput:null,
				control:true,
				auto:null,
				onInput: function(oldValue,newValue) {
					this.searchInfo.dv = newValue;
				}.bind(this),
				testControl:function () {
					console.log("haha");
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
			hello() {
				console.log(this);
			},
			handleInput(e) {
				this.msg = e.target.value;
			},
			doSave() {
				let data = this.$refs["haha"].getData();
				console.log(data);
			},
			toggleControl() {
				this.control = !this.control;
			},
			toggleAuto() {
				if (this.auto) {
					clearInterval(this.auto);
					this.auto = null;
				} else {
					this.startAuto();
				}
			},
			startAuto() {
				let _this = this;
				_this.auto = setInterval(function () {
					_this.searchInfo.dv -= 0;
					_this.searchInfo.dv += 1;
				},500)
			}
		},
		components: {
			thInput
		},
		created:function () {
			this.startAuto();
		}
	}
</script>

<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
	}

	h1, h2 {
		font-weight: normal;
	}

	ul {
		list-style-type: none;
		padding: 0;
	}

	li {
		display: inline-block;
		margin: 0 10px;
	}

	a {
		color: #42b983;
	}
</style>
