<template>
  <div class="table-container">
    <button class="add-new-button" @click="$router.push({ name: 'Add User' })">
      + Add new user
    </button>
    <table class="table-fixed min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th scope="col" class="w-1/2 px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
            <input v-model="search" class="name-search text-left text-sm font-medium text-gray-500 uppercase tracking-wider" placeholder="Search..."/>
          </th>
          <th scope="col" class="w-1/4 px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
            Location
          </th>
          <th scope="col" class="w-1/4 px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="user in getPaginatedUsers" :key="user.id">
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="flex items-left">
              <div>
                <div class="limited-row text-sm font-medium text-gray-900 sm:truncate">
                  {{ user.name }} {{ user.surname }}
                </div>
                <div class="limited-row text-sm text-gray-500 sm:truncate">
                  {{ user.email }}
                </div>
              </div>
            </div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm text-gray-900">{{ user.country }}</div>
            <div class="limited-row text-sm text-gray-500">
              {{ user.address }}
            </div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <a class="action-button text-indigo-600 hover:text-indigo-900" @click="$router.push({ name: 'User Edit', params: { id: user.id }})">
              Edit
            </a>
            <a class="action-button text-red-600 hover:text-red-900" @click="deleteUser(user)">
              Delete
            </a>
          </td>
        </tr>
      </tbody>
    </table>
    <h2 v-if="users.length === 0" class="empty-list-title text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
      User list is empty
    </h2>
    <div v-if="getPageCount > 1" class="pagination-container">
      <div v-for="page in getPageCount" :key="page" class="page" :class="{ 'active-page': page === currentPage }" @click="currentPage = page">
        {{ page }}
      </div>
    </div>
    <ConfirmDialog
      v-if="modalOpen"
      :user="deletableUser"
      @confirmDelete="confirmDelete()"
      @closeModal="
        modalOpen = false;
        deletableUser = {};
      "
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import ConfirmDialog from "../components/ConfirmDialog";
export default {
  name: "UserListView",
  components: { ConfirmDialog },
  data() {
    return {
      modalOpen: false,
      deletableUser: {},
      pageSize: 10,
      currentPage: 1,
      search: "",
    };
  },
  computed: {
    ...mapState(["users"]),
    getPageCount() {
      return Math.ceil(this.getSearchedUsers.length / this.pageSize);
    },
    getSearchedUsers() {
      if (this.search) {
        return this.users.filter(
          (obj) =>
            obj.name.toLowerCase().includes(this.search.toLowerCase()) ||
            obj.surname.toLowerCase().includes(this.search.toLowerCase())
        );
      } else return this.users;
    },
    getPaginatedUsers() {
      return this.getSearchedUsers.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    },
  },
  methods: {
    deleteUser(user) {
      this.deletableUser = user;
      this.modalOpen = true;
    },
    confirmDelete() {
      this.$store.commit("removeUser", this.deletableUser);
      this.modalOpen = false;
      this.deletableUser = {};
    },
  },
};
</script>

<style lang="scss" scoped>
$primary-color: rgb(79, 70, 229);
.text-sm {
  text-align: left !important;
}

.action-button {
  cursor: pointer;
  &:first-child {
    margin-right: 10px;
  }
}

.limited-row {
  max-width: 50ch;
}

.page {
  color: $primary-color;
  border: 1px solid $primary-color;
  padding: 2px 4px;
  margin: 0 4px;
  border-radius: 5px;
  cursor: pointer;
}

.active-page {
  color: #ffffff;
  background: $primary-color;
}

.name-search {
  background: #f9fafb;
  height: 100%;
  width: 100%;
  border-radius: 5px;
}

.pagination-container {
  display: flex;
  justify-content: center;
}
</style>
