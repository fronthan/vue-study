export default {
  namespaced: true,
  state: {
    toasts: [],
    // toastMessage: '',
    // toastAlert: '',
    // showToast: false
  },

  mutations: {
    // UPDATE_TOAST_MESSAGE(state, payload) {
    //   state.toastMessage = payload;
    // },
    // UPDATE_TOAST_TYPE(state, payload) {
    //   state.toastAlert = payload;
    // },
    // UPDATE_TOAST_STATUS(state, payload) {
    //   state.showToast = payload;
    // },
    ADD_TOAST(state, payload) {
      state.toasts.push(payload)
    },
    REMOVE_TOAST(state) {
      state.toasts.shift()
    }
  },

  actions: {
    triggerToast({ commit }, payload) {
      // message, type = 'success'
      // commit('UPDATE_TOAST_MESSAGE', msg); //toastMessage.value = msg;
      // commit('UPDATE_TOAST_TYPE', type);
      // commit('UPDATE_TOAST_STATUS', true);
      commit('ADD_TOAST', {
        id: Date.now(),
        message: payload.message,
        type: payload.type
      });


      setTimeout(() => {
        // commit('UPDATE_TOAST_MESSAGE', '')
        // commit('UPDATE_TOAST_TYPE', '')
        // commit('UPDATE_TOAST_STATUS', false)
        commit('REMOVE_TOAST');
      }, 5000)
    }
  },
  getters: {
    toastMessageWithSmile(state) {
      return state.toastMessage + '^a^';
    }
  },
}