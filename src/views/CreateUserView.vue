<template>
  <div class="table-container">
    <div>
      <button class="add-new-button" @click="$router.push({ name: 'User List' })">
        Go back
      </button>
      <div class="page-title text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
        Create a new user
      </div>
    </div>
    <form @submit.prevent="submitData">
      <div class="double-input-container">
        <div class="input-container">
          <label for="first_name">First name</label>
          <label v-if="submitted && !name" class="error-text" for="country">
            * First name field is empty
          </label>
          <input id="first_name" v-model="name" class="input-field" type="text" name="first_name"/>
        </div>

        <div class="input-container">
          <label for="last_name">Last name</label>
          <label v-if="submitted && !surname" class="error-text" for="country">
            * Last name field is empty
          </label>
          <input id="last_name" v-model="surname" class="input-field" type="text" name="last_name"/>
        </div>
      </div>

      <div class="input-container">
        <label for="email_address">Email address</label>
        <label v-if="submitted && !email" class="error-text" for="country">* Email field is empty</label>
        <input id="email_address" v-model="email" class="input-field" type="email" name="email_address" autocomplete="email"/>
      </div>

      <div class="input-container">
        <label for="country">Country</label>
        <label v-if="submitted && !country" class="error-text" for="country">* Country is not selected</label>
        <t-rich-select id="country" v-model="country" :options="countries" class="input-field" type="text" name="country"/>
      </div>

      <div class="input-container">
        <label for="email_address">Address</label>
        <label v-if="submitted && !address" class="error-text" for="country">* Address field is empty</label>
        <input id="address" v-model="address" class="input-field" type="text" name="address" autocomplete="address"/>
      </div>

      <div class="button-div">
        <button type="submit" class="add-new-button submit-button">
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "CreateUserView",
  data() {
    return {
      name: "",
      surname: "",
      email: "",
      country: "",
      address: "",
      submitted: false,
    };
  },
  computed: {
    ...mapState(["countries", "users"]),
  },
  methods: {
    submitData() {
      this.submitted = true;
      if (
        this.name &&
        this.surname &&
        this.email &&
        this.country &&
        this.address
      ) {
        this.$store.commit("addUser", {
          id: this.users.length,
          name: this.name,
          surname: this.surname,
          email: this.email,
          country: this.country,
          address: this.address,
        });
        this.$router.push({ name: "User List" });
      }
    },
  },
};
</script>
