// import { createApp } from 'vue'
import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
    state () {
        return {
            linkName: ""
        }
    },
    mutations: {
        update(state, data){
            state.linkName = data;
        }
    },
    getters: {
        getLinkName() {
            return this.state.linkName;
        }
    },
    actions: {

    }
})

export default store;