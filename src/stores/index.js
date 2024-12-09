import { createStore } from "vuex"
import {authStore} from "./auth"
import {ordersStore} from "./orders"
export const store = createStore({
    modules: {
      auth: authStore,
      order: ordersStore
    }
  })
  