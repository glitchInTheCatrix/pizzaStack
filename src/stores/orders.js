
export const StatusEnum = Object.freeze({
  ORDER_RECEIVED: "Order Received",
  PREPARING: "Preparing",
  READY_TO_SERVE: "Ready to Serve",
  COMPLETED: "Completed",
});

export const ordersStore = {
  namespaced: true,
  state: () => ({
    orders: [
      { id: 1, customerName: "John Doe", items: 3, totalAmount: 45.5, status: StatusEnum.COMPLETED },
      { id: 2, customerName: "Jane Smith", items: 5, totalAmount: 120, status: StatusEnum.ORDER_RECEIVED },
      { id: 3, customerName: "Emily Johnson", items: 2, totalAmount: 30, status: StatusEnum.PREPARING },
      { id: 4, customerName: "Alice Brown", items: 4, totalAmount: 50.5, status: StatusEnum.PREPARING },
      { id: 5, customerName: "Bob White", items: 3, totalAmount: 75, status: StatusEnum.READY_TO_SERVE },
      { id: 6, customerName: "Charlie Green", items: 6, totalAmount: 150, status: StatusEnum.READY_TO_SERVE },
      { id: 7, customerName: "David Lee", items: 2, totalAmount: 20.5, status: StatusEnum.COMPLETED },
      { id: 8, customerName: "Eva Adams", items: 3, totalAmount: 45, status: StatusEnum.COMPLETED },
    ],
    statuses: Object.values(StatusEnum),
    currentPage: 1,
    itemsPerPage: 5,
  }),
  mutations: {
    SET_CURRENT_PAGE(state, page) {
      state.currentPage = page;
    },
    CHANGE_ORDER_STATUS(state, { orderId, status }) {
      const order = state.orders.find((o) => o.id === orderId);
      if (order) {
        order.status = status;
      }
    },
  },
  actions: {
    changeOrderStatus({ commit }, { orderId, status }) {
      commit("CHANGE_ORDER_STATUS", { orderId, status });
    },
    setCurrentPage({ commit }, page) {
      commit("SET_CURRENT_PAGE", page);
    },
  },
  getters: {
    paginatedOrders: (state) => {
      const start = (state.currentPage - 1) * state.itemsPerPage;
      const end = start + state.itemsPerPage;
      return state.orders.slice(start, end);
    },
    totalPages: (state) => Math.ceil(state.orders.length / state.itemsPerPage),
    currentPage: (state) => state.currentPage,
    orderReceivedCount: (state) =>
      state.orders.filter((order) => order.status === StatusEnum.ORDER_RECEIVED).length,
    preparingCount: (state) =>
      state.orders.filter((order) => order.status === StatusEnum.PREPARING).length,
    readyToServeCount: (state) =>
      state.orders.filter((order) => order.status === StatusEnum.READY_TO_SERVE).length,
    totalOrdersCount: (state) => state.orders.length,
  },
};
