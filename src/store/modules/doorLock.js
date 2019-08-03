const sideBar = {
  state: {
    multipleSelection: null,
    is_show_make_card_dialog: null,
    is_show_signal_test_dialog: null,
    is_show_open_door_dialog: null,
    is_show_set_lock_state_dialog: null,
    is_show_reset_dialog: null
  },
  getters: {
    getMultipleSelection: (state) => {
      return state.multipleSelection || []
    },
    getIsShowMakeCardDialog: (state) => {
      return state.is_show_make_card_dialog || false
    },
    getIsShowSignalTestDialog: (state) => {
      return state.is_show_signal_test_dialog || false
    },
    getIsShowOpenDoorDialog: (state) => {
      return state.is_show_open_door_dialog || false
    },
    getIsShowSetLockStateDialog: (state) => {
      return state.is_show_set_lock_state_dialog || false
    },
    getIsShowResetDialog: (state) => {
      return state.is_show_reset_dialog || false
    }
  },
  mutations: {
    SET_MULTIPLE_SELECTION: (state, arr) => {
      state.multipleSelection = arr
    },
    SET_IS_SHOW_MAKE_CARD_DIALOG: (state, is) => {
      state.is_show_make_card_dialog = is
    },
    SET_IS_SHOW_SIGNAL_TEST_DIALOG: (state, is) => {
      state.is_show_signal_test_dialog = is
    },
    SET_IS_SHOW_OPEN_DOOR_DIALOG: (state, is) => {
      state.is_show_open_door_dialog = is
    },
    SET_IS_SHOW_SET_LOCK_STATE_DIALOG: (state, is) => {
      state.is_show_set_lock_state_dialog = is
    },
    SET_IS_SHOW_RESET_DIALOG: (state, is) => {
      state.is_show_reset_dialog = is
    }
  },

  actions: {
    setMultipleSelection ({ commit }, arr) {
      commit('SET_MULTIPLE_SELECTION', arr)
    },
    setIsShowMakeCardDialog ({ commit }, is) {
      commit('SET_IS_SHOW_MAKE_CARD_DIALOG', is)
    },
    setIsShowSignalTestDialog ({ commit }, is) {
      commit('SET_IS_SHOW_SIGNAL_TEST_DIALOG', is)
    },
    setIsShowOpenDoorDialog ({ commit }, is) {
      commit('SET_IS_SHOW_OPEN_DOOR_DIALOG', is)
    },
    setIsShowSetLockStateDialog ({ commit }, is) {
      commit('SET_IS_SHOW_SET_LOCK_STATE_DIALOG', is)
    },
    setIsShowResetDialog ({ commit }, is) {
      commit('SET_IS_SHOW_RESET_DIALOG', is)
    }
  }
}

export default sideBar
