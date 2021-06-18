<template>
  <div>
    <form @submit.prevent="postregisterData()">
      <p>Email</p>
      <input type="text" v-model="registerData.email" />
      <p>Username</p>
      <input type="text" v-model="registerData.username" />
      <p>Password</p>
      <input type="password" v-model="registerData.password" />
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import {reactive} from "vue";

export default {
  setup() {
    const registerData = reactive({
      email: "",
      password: "",
      username: "",
    });
    function postregisterData() {
      axios
        .post("http://18.139.50.74:8080/register", registerData)
        .then((result) => {
          router.push({
            name: "checklist",
          });
        console.log(result)
        })
        .catch((err) => {
          console.log(err)
        });
    }
    return {
      registerData,
      postregisterData,
    };
  },
};
</script>
