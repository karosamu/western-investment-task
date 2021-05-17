<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "App",
  created() {
    axios
      .get("https://restcountries.eu/rest/v2/all?fields=name")
      .then((resp) => {
        this.$store.commit(
          "setCountries",
          resp.data.map((item) => {
            return item["name"];
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
    if (localStorage.getItem("users"))
      this.$store.commit("setUsers", JSON.parse(localStorage.getItem("users")));
  },
};
</script>

<style lang="scss">
$primary-color: rgb(79, 70, 229);
button,
input {
  outline: none !important;
}
body {
  margin: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 20px;
  width: 100vw;
  height: 100vh;
}

.page-title {
  text-align: left;
  height: 40px;
  display: flex;
  align-items: center;
  padding: 5px 0 0 20px;
}

.add-new-button {
  margin-bottom: 20px;
  border: 1px solid $primary-color;
  color: $primary-color;
  border-radius: 5px;
  transition: 0.2s;
  padding: 10px 20px;
  float: left;

  &:hover {
    transition: 0.2s;
    background: $primary-color;
    color: #fff;
  }
}

.double-input-container {
  width: 100%;
  display: flex;

  .input-container {
    width: 50%;
  }

  .input-container:first-child {
    padding-right: 20px;
  }

  .input-container:last-child {
    padding-left: 20px;
  }
}

.input-container {
  width: 100%;
  margin-top: 40px;

  input,
  button {
    padding-left: 10px;
    width: 100%;
    border: 1px solid rgba($primary-color, 0.3);
    border-radius: 5px;
    height: 40px;
  }

  label {
    float: left;
    font-size: 1em;
    margin: 5px 0 5px 0;
  }
}

.table-container {
  border-radius: 5px;
  border: 1px solid #cecece99;
  padding: 20px;
}

.empty-list-title {
  margin: 20px 0 0 0;
}

.button-div {
  height: 85px;

  .submit-button {
    margin-top: 40px;
  }
}

.error-text {
  padding-left: 15px;
  text-align: left;
  color: rgb(235, 63, 57);
}
</style>
