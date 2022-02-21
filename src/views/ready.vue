<template>
  <div>
    <div>행과 열은 최대 2에서 6까지 입력 가능합니다.</div>

    <div>행 : <input type="number" v-model="row" /></div>
    <div>열 : <input type="number" v-model="col" /></div>
    <div v-if="col && row">
      두더지는 최소 1에서 {{ countofMole }} 까지 입력 가능합니다.
      <div>두더지 : <input type="number" v-model="mole" /></div>
    </div>

    <div>
      <button @click="startGame">시작</button>
      <div>{{ errorMsg }}</div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
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
      if (this.col > 0 && this.row > 0) {
        return parseInt((this.col * this.row) / 2);
      } else {
        return 1;
      }
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
