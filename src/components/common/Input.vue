<template>
  <span ref="input" class="input input--small">
    <label v-if="label">{{ label }}</label>
    <input
      type="number"
      :value="value"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="input"
    />
  </span>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number],
      default: "",
    },
    label: {
      type: String,
      default: "",
      require: false,
    },
    placeholder: {
      type: String,
      default: "",
      require: false,
    },
    disabled: {
      type: Boolean,
      default: false,
      require: false,
    },
  },
  data() {
    return {
      modelValue: "",
    };
  },
  methods: {
    input(e) {
      this.$emit("input", e.target.value);
    },
  },
};
</script>

<style>
.input {
  display: inline-block;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.54;
  position: relative;
  vertical-align: top;
  margin-right: 40px;
}
.input label {
  color: #4c4c4c;
  display: block;
  font-size: 15px;
  margin: 8px;
}
.input input {
  background-color: #f7f8fb;
  border-color: #f7f8fb;
  border-radius: 8px;
  border-style: solid;
  border-width: 1px;
  color: #1a1a1a;
  font-weight: 400;
  height: 15px;
  padding: 10px 16px;
  width: 100%;
}
.input input:hover {
  background-color: #fff;
  border-color: #ccd2e7;
}
.input input:focus {
  background-color: #fff;
  border-color: #ccd2e7;
  color: #1a1a1a;
}
.input input::placeholder {
  color: #4c4c4c;
}
.input input:read-only {
  background-color: #fafafa;
  border-color: #fafafa;
  color: #4c4c4c;
}
.input input:disabled {
  background-color: #f1f2f5;
  border-color: #f1f2f5;
  color: #ccc;
  pointer-events: none;
}
.input input:disabled::placeholder {
  color: inherit;
}
.input--full {
  width: 100%;
}
.input--medium {
  width: 332px;
}
.input--small {
  width: 130px;
}
.input--extra-small {
  width: 88px;
}
.input--total {
  font-size: 14px;
}
.input--total input {
  background-color: #f7f8fb;
  border: unset;
  border-radius: 40px;
  height: 72px;
  padding-left: 32px;
}
.input--total input:hover {
  background-color: #f7f8fb;
}
.input--total input:focus {
  background-color: #fff;
  box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.08);
  color: #1a1a1a;
}
.input--total input::placeholder {
  color: #999;
}
.input--error input {
  background-color: #fff7f7;
  border-color: #ff8080 !important;
  color: #4c4c4c;
}
.input--error .error-message {
  color: #ff8080;
  display: block;
  margin-top: 4px;
}
.input--opacity input {
  background-color: transparent !important;
  border-color: transparent !important;
}
</style>