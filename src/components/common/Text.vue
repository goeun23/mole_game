<template>
  <div :class="classes">
    <h2 v-if="type === 'heading-02'">
      <slot />
    </h2>
    <h3 v-else-if="type === 'heading-03'">
      <slot />
    </h3>
    <strong v-else-if="type === 'heading-sub-02'">
      <slot />
    </strong>
    <strong v-else-if="type === 'heading-sub-03'">
      <slot />
    </strong>
    <slot name="desc"></slot>
  </div>
</template>

<script>
const Types = ["heading-02", "heading-03", "heading-sub-02", "heading-sub-03"];

export default {
  name: "BaseTitle",

  props: {
    type: {
      type: String,
      default: "heading-02",
      validator: (value) => Types.includes(value),
    },
  },

  computed: {
    classes() {
      return {
        title: true,
        [`title--${this.type}`]: !!this.type,
      };
    },
  },
};
</script>

<style >
.title--heading-02 {
  color: #1a1a1a;
  font-size: 24px;
  font-weight: 500;
}
.title--heading-03 {
  color: #1a1a1a;
  font-size: 20px;
  font-weight: 500;
}
.title--heading-sub-02 {
  color: #1a1a1a;
  font-size: 16px;
  font-weight: 400;
}
.title--heading-sub-03 {
  color: #4c4c4c;
  font-size: 14px;
  font-weight: 400;
}
.title > strong {
  display: inline-block;
  vertical-align: top;
}
.title > p {
  color: #666;
  display: inline-block;
  font-size: 14px;
  vertical-align: top;
}
</style>
