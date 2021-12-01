<template>
  <li class="nav-item active action">
    <a class="nav-link" href="#" @click="execute">
      <div class="section">
        <svg viewBox="0 -1.5 32 32" width="22px" height="24px" display="inline">
          <path v-bind:d="img"/>
        </svg>
        {{name}}
      </div>
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
