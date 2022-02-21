import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  // ...
  state: {
    moleGameObject: {
      col: 0,
      row: 0,
      mole: 0
    }
  },
  mutations: {
    setMoleGameObject(state, payload) {
      state.moleGameObject = payload;
    }
  },
  getters: {
    getMoleGameObject: state => {
      return state.moleGameObject;
    },
  }
});

export default store;