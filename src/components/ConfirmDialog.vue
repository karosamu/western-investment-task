<template>
  <div class="modal" @click="$emit('closeModal')">
    <div class="modal-container" @click.stop>
      <div class="modal-header">
        <button @click="$emit('closeModal')">Close</button>
      </div>
      <div class="username modal-content text-xl leading-7 text-gray-900 sm:text-xl">
        Are you sure you want to delete {{ user.name }} {{ user.surname }}?
      </div>
      <div class="modal-footer">
        <button class="accept" @click="$emit('confirmDelete')">Delete</button>
        <button class="cancel" @click="$emit('closeModal')">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConfirmDialog",
  props: ["user"],
};
</script>

<style lang="scss" scoped>
.username {
  word-wrap: break-word;
}
.modal {
  position: absolute;
  top: 0;
  left: 0;
  background: #00000055;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .modal-container {
    background: #ffffff;
    width: 400px;
    border-radius: 5px;

    .modal-header {
      width: 100%;
      height: 40px;

      button {
        border-radius: 5px;
        float: right;
        margin: 5px 5px 5px 0;
        padding: 3px 6px;
        transition: 0.2s;

        &:hover {
          background: #00000011;
        }
      }
    }

    .modal-content {
      height: max-content;
      width: 100%;
      padding: 20px;
    }

    .modal-footer {
      width: 100%;
      height: 40px;
      display: flex;
      justify-content: space-evenly;

      button {
        width: 50%;
        transition: 0.2s;
        margin: 5px;
        border-radius: 5px;

        &:hover {
          background: #00000011;
        }
      }

      .accept {
        color: rgb(235, 63, 57);

        &:hover {
          background: rgba(235, 63, 57, 0.1);
        }
      }
    }
  }
}
</style>
