<template>
  <v-container class="bg-background fill-height flex-column" fluid>
    <h1 class="text-center text-primary">
      Pizza Stack
    </h1>
<v-col >

  <v-card fluid color="secondary" class="pa-5" outlined>
    <v-card-title class="text-center">Login</v-card-title>
    <v-form @submit.prevent="handleLogin">
      <v-text-field
        v-model="username"
        label="Username"
        type="text"
        outlined
        dense

        required
      />
      <v-text-field
        v-model="password"
        label="Password"
        type="password"
        outlined
        dense
        required
      />
      <v-btn type="submit" color="primary" block class="mt-4">Login</v-btn>
      <v-alert v-if="error" type="error" class="mt-4" dismissible>
        {{ error }}
      </v-alert>
    </v-form>
  </v-card>
</v-col>     
  </v-container>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  setup() {
    const username = ref("");
    const password = ref("");
    const error = ref(null);
    const router = useRouter();
    const store = useStore();

    const handleLogin = () => {
      const hardcodedUsername = "admin";
      const hardcodedPassword = "root";
      const fakeToken = "authToken";

      if (username.value === hardcodedUsername && password.value === hardcodedPassword) {
        store.dispatch("auth/login",fakeToken);
        router.push("/dashboard"); 
      } else {
        error.value = "Invalid username or password.";
      }
    };

    return { username, password, error, handleLogin };
  },
};
</script>

<style scoped>

</style>
