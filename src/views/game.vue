<template>
  <div>
    <div class="point-box clearfix">
      <div class="point-wrap">
        <p class="point-text">{{ col }}{{ row }} SCORE 🦡 :</p>
        <p class="count-mole">{{ score }}</p>
        <p class="point-text">TIME ⏱️ :</p>
        <p class="count-mole">{{ time }}</p>
      </div>
      <div class="btn-wrap">
        <button
          v-if="!isStart && !isStop"
          @click="start"
          type="button"
          class="start-btn"
        >
          PRESS START
        </button>
        <button
          v-if="isStart && !isStop"
          @click="pause"
          type="button"
          class="start-btn"
        >
          STOP
        </button>
        <button v-if="isStop" @click="restart" type="button" class="start-btn">
          RESTART
        </button>
        <button @click="stop" type="button" class="start-btn">QUIT</button>
      </div>
    </div>

    <div class="main">
      <ul class="whack-a-mole clearfix">
        <template v-for="(rows, index) in row">
          <template v-for="(cols, colIdx) in col">
            <li
              class="mole"
              :style="colIdx === 0 ? 'clear:left' : ''"
              :key="`list-${index}-${colIdx}`"
            >
              {{ `hole-${index}-${colIdx}` }} /
              <img
                :key="colIdx"
                :id="`hole-${index}-${colIdx}`"
                @click="clickMole(`hole-${index}-${colIdx}`)"
              />
            </li>
          </template>
        </template>
      </ul>
    </div>
  </div>
</template>
<script>
let interval1 = null;
let timer = null;
import { mapMutations, mapGetters } from "vuex";

export default {
  mounted() {
    this.updateScoreLanking();
  },
  computed: {
    ...mapGetters(["getMoleGameObject"]),
    col() {
      return Number(this.getMoleGameObject.row);
    },
    row() {
      return Number(this.getMoleGameObject.col);
    },
    maxofMole() {
      return Number(this.getMoleGameObject.mole);
    },
  },
  data() {
    return {
      time: 5,
      score: 0,
      isStart: false,
      isStop: false,
      countofMole: 0,
      moleSize: ["small", "medium", "large"],
      moleIcon: [
        { type: "mole", src: require("../assets/images/mole.png") },
        { type: "bomb", src: require("../assets/images/bomb.png") },
      ],
    };
  },
  methods: {
    ...mapMutations({ setCurrentGameScore: "setCurrentGameScore" }),

    pause() {
      // '일시정지' 버튼의 이벤트 핸들러
      this.isStop = true;

      // 모든 이벤트 관련 함수 초기화
      clearInterval(interval1);
      clearInterval(timer);

      // 일시정지 시점에 노출된 두더지 모두 제거
      this.clearAllMole();
    },
    restart() {
      // '재개하기' 버튼의 이벤트 핸들러
      this.isStop = false;
      this.start();
    },
    start() {
      // '시작하기'버튼의 이벤트 핸들러
      this.isStart = true;
      this.isStop = false;

      // 두더지 노출 주기의 값을 2초로 세팅
      let lastTime = 2000;

      // 노출할 두더지/bomb의 값을 랜덤하게 생성
      const countofShow = this.getRandomInt(0, 4);

      // 기존의 두더지, bomb 관련 타이머함수 초기화
      clearInterval(interval1);
      clearInterval(timer);

      // 기존에 생성된 두더지, bomb 모두 삭제
      this.clearAllMole();

      // 두더지/bomb 노출 이벤트 호출
      this.showMole(countofShow);

      timer = setInterval(() => {
        if (this.time === 0) {
          // 시간이 종료된 경우, 모든 타이머함수 초기화
          clearInterval(interval1);
          clearInterval(timer);

          // 노출된 두더지, bomb 모두 삭제
          this.clearAllMole();

          // 현재 점수 저장
          this.setCurrentGameScore(this.score);

          // 랭킹 업데이트
          this.updateScoreLanking();

          this.$router.push("/score");

          alert("게임종료!");
          return;
        }

        // 타이머의 시간을 1초씩 감소
        this.time -= 1;

        // 남은시간에 비례하는 show 주기 (10초 주기로 두더지 호출함수의 속도를 증가한다.)
        // 10초 단위로, 남은 시간에 반비례하여 두더지 호출 함수의 속도를 변경한다.
        if ((this.time / 10) % 1 === 0) {
          lastTime = 2000 * (this.time / 60);
        }

        interval1 = setTimeout(() => {
          // 일시정지 버튼을 누른 경우, 타이머 초기화
          if (this.isStop) {
            clearInterval(interval1);
            return;
          }

          // 모든 두더지/bomb 삭제
          this.clearAllMole();

          // 0부터 입력받은 두더지 수 중 랜덤하게 화면에 보이도록 난수만큼 두더지/bomb 생성
          const countofShow = this.getRandomInt(0, 4);
          this.showMole(countofShow);
        }, lastTime);
        console.log("남은시간", this.time, ", show 주기: ", lastTime);
      }, 1000);
    },
    clearAllMole() {
      // 모든 두더지를 지운다.
      [...document.querySelectorAll("[id^='hole-']")].map((hole) => {
        hole.className = "";
      });
    },
    showMole(countofShow) {
      // 화면에 보여질 두더지/폭탄의 수
      let show = countofShow;
      while (show > 0) {
        // 행, 열 랜덤 아이디
        const randomCol = this.getRandomInt(0, this.col),
          randomRow = this.getRandomInt(0, this.row);

        // hole의 아이디와 엘리먼트 추출
        const holeId = `hole-${randomRow}-${randomCol}`,
          hole = document.getElementById(holeId);

        // hole이 가지고 있는 기존 클래스 삭제
        this.clearIcon(hole);

        // 홀에 보여질 값이 두더지/폭탄인지 임의의 값을 받아 랜덤하게 생성
        const { src, type } = this.moleIcon[this.getRandomInt(0, 2)];

        // hole의 이미지(경로, 아이콘 타입) 세팅
        hole.src = src;
        hole.setAttribute("icon", type);

        // 폭탄의 크기는 한가지(large), 두더지의 경우 small, medium, large중 하나로 랜덤하게 생성
        const sizeClass =
          type === "mole" ? this.moleSize[this.getRandomInt(0, 3)] : "large";

        // hole의 크기 관련 클래스 추가
        hole.classList.add(sizeClass);

        // 화면에 보여질 두더지 수 추가
        this.countofMole += 1;

        // 홀에 보여질 두더지 수의 임의의 값을 감소, 0이 될때까지 해당 반복문을 반복한다.
        show -= 1;
      }
    },
    clearIcon(icon) {
      // 크기 관련 클래스 모두 삭제
      icon?.classList.remove("small");
      icon?.classList.remove("medium");
      icon?.classList.remove("large");
    },
    getRandomInt(min, max) {
      //최댓값은 제외, 최솟값은 포함
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    },
    clickMole(id) {
      // 클릭한 경우의 이벤트 핸들러
      const hole = document.getElementById(id);

      // 클릭한 엘리먼트가 빈 hole일 경우 리턴
      if (!hole.classList[0]) return;

      // 클릭한 엘리먼트의 hide 이벤트 처리
      hole.className = "";

      // 스코어 처리(두더지 : +1, bomb : -1)
      hole.getAttribute("icon") === "mole"
        ? (this.score += 1)
        : (this.score -= 1);
    },

    stop() {
      // '그만하기' 버튼 이벤트 핸들러
      this.$router.push("/ready");
    },

    setDateFormat(date) {
      let year = date.getFullYear().toString();

      let month = date.getMonth() + 1;
      month = month < 10 ? "0" + month.toString() : month.toString();

      let day = date.getDate();
      day = day < 10 ? "0" + day.toString() : day.toString();

      let hour = date.getHours();
      hour = hour < 10 ? "0" + hour.toString() : hour.toString();

      let minites = date.getMinutes();
      minites = minites < 10 ? "0" + minites.toString() : minites.toString();

      let seconds = date.getSeconds();
      seconds = seconds < 10 ? "0" + seconds.toString() : seconds.toString();

      return `${year}-${month}-${day}-${hour}-${minites}-${seconds}`;
    },

    updateScoreLanking() {
      let recentScoreList = JSON.parse(localStorage.getItem("recentScoreList"));
      if (recentScoreList === null) recentScoreList = [];

      const entry = {
        time: this.setDateFormat(new Date()),
        score: this.score,
      };

      recentScoreList.push(entry);

      recentScoreList.sort(function (a, b) {
        if (a.score > b.score) {
          return -1;
        }
        if (a.score < b.score) {
          return 1;
        }
        // a must be equal to b
        return 0;
      });

      localStorage.setItem("recentScoreList", JSON.stringify(recentScoreList));
    },
  },
};
</script>
<style scoped>
*,
*:before,
*:after {
  box-sizing: inherit;
}
button {
  font-family: inherit;
  cursor: pointer;
}
li {
  /* clear: left; */
  float: left;
  margin: 3px;
}

h1 {
  color: #f2ecff;
  text-align: center;
  line-height: 1.5;
}
.main {
  position: relative;
  width: 100%;
}
.whack-a-mole {
  background-color: #028f3f;
  margin: 0 auto;
  list-style: none;
  /* width: 600px; */
  border-radius: 20px;
}
.mole {
  /* float: left; 
  clear: left;*/
  width: 160px;
  height: 160px;
  margin: 10px;
  overflow: hidden;
  cursor: pointer;
  border-radius: 20px;
  background: no-repeat center/cover url("../assets/hole.png");
}
.mole > img {
  position: relative;
  bottom: -5px;
  /* display: block; */
  width: 100%;
  opacity: 0;
  transition: 0.05s ease-out;
}
.whack-a-mole .medium {
  opacity: 1;
  width: 130px;
  bottom: -33px;
  animation: shake 0.5s;
  animation-iteration-count: infinite;
}
.whack-a-mole .small {
  opacity: 1;
  width: 95px;
  bottom: -48px;
  animation: shake 0.5s;
  animation-iteration-count: infinite;
}
.whack-a-mole .large {
  bottom: 0;
  opacity: 1;
  animation: shake 0.5s;
  animation-iteration-count: infinite;
}
@keyframes shake {
  0% {
    transform: translate(1px, 1px) rotate(0deg);
  }
  10% {
    transform: translate(-1px, -2px) rotate(-1deg);
  }
  20% {
    transform: translate(-3px, 0px) rotate(1deg);
  }
  30% {
    transform: translate(3px, 2px) rotate(0deg);
  }
  40% {
    transform: translate(1px, -1px) rotate(1deg);
  }
  50% {
    transform: translate(-1px, 2px) rotate(-1deg);
  }
  60% {
    transform: translate(-3px, 1px) rotate(0deg);
  }
  70% {
    transform: translate(3px, 1px) rotate(-1deg);
  }
  80% {
    transform: translate(-1px, -1px) rotate(1deg);
  }
  90% {
    transform: translate(1px, 2px) rotate(0deg);
  }
  100% {
    transform: translate(1px, -2px) rotate(-1deg);
  }
}
.point-wrap {
  float: left;
  width: 100%;
  height: 60px;
  margin: 20px 0 0 0;
}
.btn-wrap {
  /* float: right; */
  width: 100%;
}
.start-btn {
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
.start-btn:hover {
  opacity: 0.5;
  color: #f9f871;
}
.point-box {
  background-color: #4e4e4e;
  /* width: 600px; */
  margin: 30px auto 30px auto;
  text-align: center;
  border-radius: 20px;
}
.point-text {
  float: left;
  font-size: 24px;
  font-weight: bold;
  margin: 15px 0 0 25%;
  color: #f2ecff;
}

.count-mole {
  float: left;
  font-size: 30px;
  font-weight: bold;
  margin: 10px 10px 0 60px;
  color: #f2ecff;
}
</style>