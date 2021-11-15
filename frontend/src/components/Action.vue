<template>
  <li class="nav-item active action">
    <a class="nav-link" href="#" @click="execute">
      <img
        v-bind:src="img"
        width="32"
        height="32"
        class="d-inline-block align-center"
        alt=""
      />{{name}}
    </a>
  </li>
</template>

<script>
export default {
  name: "Action",
  components: {},
  props: ["name", "img", "execute"]
};
</script>
