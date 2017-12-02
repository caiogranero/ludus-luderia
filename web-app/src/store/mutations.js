const mutations = {
  setSelectedBooking (state, selectedBooking) {
    state.selectedBooking = selectedBooking
  },

  setSearchedBooking (state, searchedBooking) {
    state.searchedBooking = searchedBooking
  },

  setSearching (state, searching) {
    state.searching = searching
  },

  userInfo (state, userInfo) {
    state.userInfo = userInfo
  }
}

export default mutations
