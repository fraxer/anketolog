export const moduleEntity = {
  namespaced: true,
  state () {
    return {
      list: []
    }
  },
  mutations: {
    createItem (state, obj) {
      state.list.push(obj)
    },
    updateItem (state, obj) {
      let index = state.list.findIndex((element) => {
        return element.id === obj.id
      })

      if (index > -1) {
        state.list.splice(index, 1, obj)
      }
    },
    removeItem (state, id) {
      let index = state.list.findIndex((element) => {
        return element.id === id
      })

      if (index > -1) {
        state.list.splice(index, 1)
      }
    }
  },
  getters: {
    getList (state) {
      return state.list
    },
    getListWithoutId: (state) => (id) => {
      return state.list.filter(item => item.id != id)
    },
    getListByParentId: (state) => (id) => {
      return state.list.filter(item => item.parent_id === id)
    },
    getCount (state) {
      return state.list.length
    },
    getItemById: (state) => (id) => {
      return state.list.find(item => item.id === id)
    }
  }
}