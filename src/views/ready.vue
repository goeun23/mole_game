<template>
  <div>
    <CommonPanel>
      <div class="point-wrap">
        <CommonText type="heading-02">🎮 두더지 게임 </CommonText>
        <CommonText type="heading-sub-02"
          >📍 행과 열은 최대 2에서 6까지 입력 가능합니다.</CommonText
        >
        <CommonText v-if="col && row" type="heading-sub-02"
          >📍 두더지는 최소 1에서 {{ countofMole }} 까지 입력
          가능합니다.</CommonText
        >
        <div class="input-wrap">
          <CommonInput label="행의 수" type="number" v-model="col" />
          <CommonInput label="열의 수" type="number" v-model="row" />
          <CommonInput
            label="두더지의 수"
            :disabled="disabled"
            type="number"
            v-model="mole"
          />
        </div>
      </div>
      <div class="btn-wrap">
        <CommonButton @click="startGame"> START </CommonButton>
      </div>
      <CommonText v-if="errorMsg" type="heading-sub-02">{{
        errorMsg
      }}</CommonText>
    </CommonPanel>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import CommonButton from "@/components/common/Button";
import CommonPanel from "@/components/common/Panel";
import CommonText from "@/components/common/Text";
import CommonInput from "@/components/common/Input";

export default {
  components: {
    CommonButton,
    CommonPanel,
    CommonText,
    CommonInput,
  },
  data() {
    return {
      col: 0,
      row: 0,
      mole: 0,
      errorMsg: "",
    };
  },
  computed: {
    ...mapGetters(["getMoleGameObject"]),
    countofMole() {
      if (this.col >= 2 && this.col <= 6 && this.row >= 2 && this.row <= 6) {
        return parseInt((this.col * this.row) / 2);
      } else {
        return 1;
      }
    },
    disabled() {
      return !(
        this.col >= 2 &&
        this.col <= 6 &&
        this.row >= 2 &&
        this.row <= 6
      );
    },
  },

  methods: {
    ...mapMutations({ setMoleGameObject: "setMoleGameObject" }),
    dataInvalidCheck({ col, row, mole, countofMole }) {
      // 행, 열, 두더지 하나라도 입력되지 않은 경우 > 오류
      if (col === 0 || row === 0 || mole === 0) {
        this.errorMsg = "입력값을 모두 입력해주세요!";
        return false;
      }

      // 행과 열의 값이 유효한지 확인
      if (col < 2 || col > 6 || row < 2 || row > 6) {
        this.errorMsg = "행과 열은 최대 2에서 6까지 입력 가능합니다.";
        return false;
      }

      // 두더지의 입력값이 유효한지 확인
      if (mole < 1 || mole > countofMole) {
        this.errorMsg = `두더지 입력값을 확인해주세요.`;
        return false;
      }

      return true;
    },
    startGame() {
      const { col, row, mole, countofMole } = this;
      if (this.dataInvalidCheck({ col, row, mole, countofMole })) {
        this.setMoleGameObject({
          col,
          row,
          mole,
          countofMole,
        });
        return this.$router.push("/game");
      }
    },
  },
  created() {
    // 돔 그리기 전
    const { col, row, mole } = this.getMoleGameObject;
    this.col = col;
    this.row = row;
    this.mole = mole;
  },
};
</script>

<style>
.input-wrap {
  margin: 20px;
}
</style>
