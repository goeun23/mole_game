<template>
  <div>
    <div class="score-warp">
      <div class="point-box clearfix">
        <div class="point-wrap">
          <p class="count-mole">최종점수</p>
          <p class="point-text">{{ getRecentScore }}점</p>
        </div>
        <div class="btn-wrap">
          <button @click="$router.push('game')" type="button" class="start-btn">
            다시하기
          </button>
          <button
            @click="$router.push('ready')"
            type="button"
            class="start-btn"
          >
            처음으로
          </button>
        </div>
      </div>
    </div>
    <div class="lanking-wrap">
      <p class="count-mole">순위</p>
      <div class="main">
        <ul
          class="whack-a-mole clearfix"
          v-for="(rank, index) in ranks"
          :key="index"
        >
          <li
            v-if="index < 10"
            class="mole"
            :style="index === 0 ? 'clear:left' : ''"
          >
            {{ index + 1 }} {{ rank.time }} {{ rank.score }}
          </li>
        </ul>
        <button @click="reset" type="button" class="start-btn">초기화</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      ranks: [],
    };
  },
  created() {
    this.ranks = JSON.parse(localStorage.getItem("recentScoreList"));
  },
  computed: {
    ...mapGetters(["getRecentScore"]),
  },
  methods: {
    reset() {
      this.ranks = [];
      localStorage.setItem("recentScoreList", JSON.stringify([]));
    },
  },
};
</script>

