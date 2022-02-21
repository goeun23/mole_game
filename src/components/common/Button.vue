<template>
  <button v-bind="$attrs" @click.prevent="$emit('click', $event)">
    <slot />
  </button>
</template>


<script>
export default {
  name: "BaseButton",
};
</script>


<style scoped>
button {
  width: 20%;
  height: 70px;
  font-size: 20px;
  font-weight: 900;
  margin: 20px 30px;
  background: #222;
  border: none;
  color: #f2ecff;
  border-radius: 20px;
}
button:hover {
  opacity: 0.5;
  color: #f9f871;
}
</style>