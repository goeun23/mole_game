import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate"
Vue.use(Vuex);

const store = new Vuex.Store({
  plugins: [createPersistedState()],

  state: {
    moleGameObject: {
      col: 0,
      row: 0,
      mole: 0
    },
    currentGameScore: 0
  },
  mutations: {
    setMoleGameObject(state, payload) {
      state.moleGameObject = payload;
    },
    setCurrentGameScore(state, payload) {
      state.currentGameScore = payload
    }
  },
  getters: {
    getMoleGameObject: state => {
      return state.moleGameObject;
    },
    getRecentScore: state => {
      return state.currentGameScore;
    }
  }
});

export default store;