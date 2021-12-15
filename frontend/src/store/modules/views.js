const state = {
  columnWidths: {}
};

const getters = {
  getColumnWidth: (state) => {
    return function(orderKey){
      return state.columnWidths[orderKey];
    }
  }
};

const actions = {
  storeWidth({commit}, payload){
    commit('addColumnWidth', payload);
  }
};

const mutations = {
  addColumnWidth(state, { orderKey, width}){
    state.columnWidths[orderKey] = width;
  }
};

export default {
    state,
    getters,
    actions,
    mutations
};
