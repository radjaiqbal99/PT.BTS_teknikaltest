<template>
  <div>
    <form @submit.prevent="addDataModel()">
      <input type="text" v-model="addData.name" />
      <button type="submit" style="margin-bottom: 20px">Add Checklist</button>
    </form>

    <div
      v-for="(data, index) in data"
      :key="index"
      style="background-color: smoke; border: 1px solid; margin-bottom: 10px"
    >
      <a>{{ data.name }}</a>
      <a>{{ data.checklistCompletionStatus }}</a>
      <button @click="delet(data.id)">delete</button>
      <div style="margin-bottom: 40px">
        <form @submit.prevent="addItem(data.id)">
          <input type="text" style="float: right" v-model="item.itemName" />

          <button type="submit" style="float: right">Add Item</button>
        </form>
        <!-- <button @click="AddItem(data.items.id)" style="float:right">Add Item</button> -->
      </div>
      <div
        v-for="(dat, i) in data.items"
        :key="i"
        style="background-color: gray; border: 1px solid; padding-left: 40px"
      >
        <a>{{ dat.name }}</a>
        <a>{{ dat.itemCompletionStatus }}</a>
        <button>edit</button>
        <button @click="detailItem(dat.id)">detail</button>
        <button @click="deleteItem(dat.id)">delete</button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { onMounted, ref } from "vue";
export default {
  setup() {
    onMounted(async () => {
      GetItem();
    });
    const data = ref([]);
    const dataitem = ref([]);
    const addData = ref({});
    const item = ref({});
    // const addDataModel = ();
    function GetItem() {
      axios
        .get("http://18.139.50.74:8080/checklist", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((result) => {
          data.value = result.data.data;
          dataitem.value = result.data.data.items;
        })
        .catch((err) => {
          validation.value = err.response.data;
        });
    }
    function addDataModel() {
      // console.log()
      axios
        .post("http://18.139.50.74:8080/checklist", addData.value, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((result) => {
        })
        .catch((err) => {
        });
    }
    function delet(id) {
      axios
        .delete(`http://18.139.50.74:8080/checklist/${id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((result) => {
          GetItem();
        })
        .catch((err) => {
        });
    }
    function addItem(id) {
      item.value.checklistId = id;
      axios
        .post(`http://18.139.50.74:8080/item`, item.value, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((result) => {
          GetItem();
          item.value.checklistId = null;
          item.value.iitemName = null;
        })
        .catch((err) => {
        });
    }
    function detailItem(id){
        axios
        .get(`http://18.139.50.74:8080/item/${id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((result) => {
          alert("Name : "+result.data.data.name+", Status : "+result.data.data.itemCompletionStatus);
        })
        .catch((err) => {
        });
    }
    function deleteItem(id){
        axios
        .delete(`http://18.139.50.74:8080/item/${id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((result) => {
          GetItem();
          
        })
        .catch((err) => {
        });
    }
    return {
    deleteItem,
      detailItem,
      item,
      addItem,
      GetItem,
      delet,
      data,
      dataitem,
      addData,
      addDataModel,
    };
  },
};
</script>
