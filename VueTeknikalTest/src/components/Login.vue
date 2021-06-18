<template>
  <div>
    <form @submit.prevent="postLoginData()">
      <p>Username</p>
      <input type="text" v-model="loginData.username" />
      <p>Password</p>
      <input type="password" v-model="loginData.password" />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { reactive } from "vue";

import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();

    const loginData = reactive({
      username: "",
      password: "",
    });
    function  postLoginData () {
      axios
        .post("http://18.139.50.74:8080/login", loginData)
        .then((result) => {
          console.log("success");
          let token = result.data.data.token;
          console.log(token);
          localStorage.setItem("token", token);
          router.push({
            name: "checklist",
          });
        })
        .catch((err) => {
        });
    }
    return {
      loginData,
      postLoginData,
      router
    };
  },
};
</script>
