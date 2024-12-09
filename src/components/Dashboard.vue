<template>
  <v-container>
    <v-row class="mb-2">
      <v-btn @click="logout">Logout</v-btn>
    </v-row>
    <v-row class="mb-2">
      <v-col cols="12" md="3" v-for="card in statusCards" :key="card.title">
        <v-card class="pa-4" outlined>
          <v-card-title class="text text-center">{{ card.title }}</v-card-title>
          <v-card-subtitle class="text-h4 text-center">{{ card.count }}</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>

    <v-card>
      <v-card-title>Orders Dashboard</v-card-title>
      <v-card-text>
        <v-data-table :headers="headers" :items="paginatedOrders" class="elevation-1" dense>
          

          <template v-slot:[`item.actions`]="{ item }">
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" small>Change Status</v-btn>
              </template>
              <v-list>
                <v-list-item v-for="status in statuses" :key="status" @click="changeStatus(item.id, status)">
                  <v-list-item-title>{{ status }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
          <template v-slot:bottom>
            <v-row class="align-center" >
              <v-col>

                <v-pagination v-model="currentPage" :length="totalPages" class="mt-3" circle></v-pagination>
              </v-col>
            
          <v-col>
            Showing {{startCount}} to {{ lastCount }}   of {{ totalOrdersCount }}
          </v-col>
          </v-row>
        </template>
        </v-data-table>
      </v-card-text>
    </v-card>
    
  </v-container>
</template>

<script>

import { computed, onMounted, ref } from "vue";
import { StatusEnum } from "@/stores/orders";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    const statuses = Object.values(StatusEnum);
    const logout = () => {
      store.dispatch('auth/logout');
      router.push('/login')
    }
    const headers = [
      { text: "Customer Name", value: "customerName" },
      { text: "Items Ordered", value: "items" },
      { text: "Total Amount", value: "totalAmount" },
      { text: "Current Status", value: "status" },
      { text: "Actions", value: "actions", sortable: false },
    ];

    const statusCards = computed(() => [
      { title: StatusEnum.ORDER_RECEIVED, count: store.getters['order/orderReceivedCount'],value:"orderReceived" },
      { title: StatusEnum.PREPARING, count: store.getters['order/preparingCount'],value:"preparing" },
      { title: StatusEnum.READY_TO_SERVE, count: store.getters['order/readyToServeCount'],value:"readyToServe" },
      { title: "Total Orders", count: store.getters['order/totalOrdersCount'],value:"totalOrders" },
    ]);

    const paginatedOrders = computed(() => store.getters['order/paginatedOrders']);
    const totalOrdersCount = computed(() => store.getters['order/totalOrdersCount']);
    const startCount = computed(() => store.state.order.itemsPerPage * (currentPage.value - 1) + 1);
    const lastCount = computed(() => startCount.value + paginatedOrders.value.length - 1);

    const currentPage = computed({
      get: () => store.getters["order/currentPage"],
      set: (value) => (store.dispatch("order/setCurrentPage", value)),
    });
    const totalPages = computed(() => store.getters["order/totalPages"]);

    const changeStatus = (orderId, status) => {
      store.dispatch('order/changeOrderStatus', { orderId, status });
    };

    return { headers, statuses, logout, statusCards,totalOrdersCount,startCount,lastCount, paginatedOrders, currentPage, totalPages, changeStatus, };
  },
};
</script>

<style></style>