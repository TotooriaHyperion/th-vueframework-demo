/**
 * Created by Totooria Hyperion on 2016/11/30.
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const now = new Date();
const store = new Vuex.Store({
	state: {
		user: {
			name: 'coffce',
			img: 'dist/images/1.jpg'
		},
	},
	mutations: {
		INIT_DATA (state) {
			let data = localStorage.getItem('vue-chat-session');
			if (data) {
				state.sessions = JSON.parse(data);
			}
		},
		// 发送消息
		SEND_MESSAGE ({ sessions, currentSessionId }, content) {
			let session = sessions.find(item => item.id === currentSessionId);
			session.messages.push({
				content: content,
				date: new Date(),
				self: true
			});
		},
		// 选择会话
		SELECT_SESSION (state, id) {
			state.currentSessionId = id;
		} ,
		// 搜索
		SET_FILTER_KEY (state, value) {
			state.filterKey = value;
		}
	}
});

store.watch(
	(state) => state.sessions,
	(val) => {
		console.log('CHANGE: ', val);
		localStorage.setItem('vue-chat-session', JSON.stringify(val));
	},
	{
		deep: true
	}
);

export default store;
export const actions = {
	initData: ({ dispatch }) => dispatch('INIT_DATA'),
	sendMessage: ({ dispatch }, content) => dispatch('SEND_MESSAGE', content),
	selectSession: ({ dispatch }, id) => dispatch('SELECT_SESSION', id),
	search: ({ dispatch }, value) => dispatch('SET_FILTER_KEY', value)
};
