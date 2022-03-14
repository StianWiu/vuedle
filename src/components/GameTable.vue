<script>
export default {
  data() {
    return {
      game: {
        table: Array.from({ length: 6 }, () =>
          Array.from({ length: 5 }, () => 3)
        ),
        row: 0,
        currentRow: 0,
        possibleWords: require("../assets/PossibleWords.json"),
        wordOfTheDay: require("../assets/WordsOfTheDay.json")[0][
          Math.floor(
            Math.random() * require("../assets/WordsOfTheDay.json")[0].length
          )
        ],
        greenLettersChanged: [],
        yellowLettersChanged: [],
        over: false,
      },
    };
  },
  created() {
    const escapeWindowCallFunction = (key) => {
      this.updateArray(key);
    };
    const checkIfContinue = () => {
      if (this.game.over === false) {
        return true;
      } else {
        return false;
      }
    };
    window.addEventListener("keydown", function (event) {
      if (checkIfContinue()) {
        escapeWindowCallFunction(event.key);
      }
    });
  },
  methods: {
    calculateBooksMessage() {
      return this.author.books.length > 0 ? "Yes" : "No";
    },
    updateArray(key) {
      let stop = false;
      if (key === "Backspace") {
        // Loop from back of array and set first element found to 3
        for (let i = this.game.table.length - 1; i >= 0; i--) {
          for (let j = this.game.table[i].length - 1; j >= 0; j--) {
            if (i === this.game.row) {
              if (this.game.table[i][j] !== 3) {
                this.game.table[i][j] = 3;
                stop = true;
                break;
              }
            } else {
              break;
            }
          }
          if (stop) {
            break;
          }
        }
      } else if (key === "Enter") {
        if (
          this.game.row !== this.game.table.length &&
          this.game.table[this.game.row][4] !== 3
        ) {
          if (this.checkIfWordExists(this.game.row)) {
            this.checkLetters(this.game.row);
            if (this.checkIfWordIsCorrect(this.game.row)) {
              this.game.over = true;
            } else {
              if (this.game.row === this.game.table.length - 1) {
                window.alert("You lose!");
                this.game.over = true;
              } else {
                this.game.row++;
              }
            }
          }
        }
      }
      // Check if key is a letter
      if (key.length === 1 && key.match(/[a-z]/i)) {
        if (
          this.game.row !== this.game.table.length &&
          this.game.table[this.game.row][4] === 3
        ) {
          for (let i = 0; i < this.game.table.length; i++) {
            for (let j = 0; j < this.game.table[i].length; j++) {
              if (this.game.table[i][j] === 3 && !stop) {
                this.game.table[i][j] = key;
                stop = true;
              }
            }
          }
        }
      }
    },
    checkIfWordExists(row) {
      let word = "";
      for (let i = 0; i < this.game.table[row].length; i++) {
        if (this.game.table[row][i] !== 3) {
          word += this.game.table[row][i];
        }
      }
      if (word.length > 0) {
        if (this.game.possibleWords[0].includes(word.toLowerCase())) {
          return true;
        } else {
          this.shakeRow(row);
          return false;
        }
      }
    },
    checkIfWordIsCorrect(row) {
      let word = "";
      for (let i = 0; i < this.game.table[row].length; i++) {
        if (this.game.table[row][i] !== 3) {
          word += this.game.table[row][i];
        }
      }
      if (word.length > 0) {
        if (this.game.wordOfTheDay === word.toLowerCase()) {
          return true;
        } else {
          return false;
        }
      }
    },
    async shakeRow(row) {
      document.getElementById(`gameTableRow_${row}`).style.animation =
        "shakeLine 0.5s";
      await new Promise((resolve) => setTimeout(resolve, 500));
      document.getElementById(`gameTableRow_${row}`).style.animation = "";
    },
    async checkLetters(row) {
      // Split wordOfTheDay into a array
      let colors = [0, 0, 0, 0, 0];

      let rowString = "";
      for (let i = 0; i < this.game.table[row].length; i++) {
        if (this.game.table[row][i] !== 3) {
          rowString += this.game.table[row][i];
        }
      }
      let word = this.game.wordOfTheDay.split("");
      let rowArray = rowString.split("");
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < rowString.length; j++) {
          if (word[j] === rowString[i] && i === j) {
            colors[i] = 3;
            word[j] = 5;
          }
        }
      }
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < rowString.length; j++) {
          if (word[j] === rowString[i] && colors[j] !== 3) {
            colors[i] = 2;
          }
        }
      }
      for (let i = 0; i < colors.length; i++) {
        if (colors[i] === 0) {
          colors[i] = 1;
        }
      }

      for (let i = 0; i < colors.length; i++) {
        if (colors[i] === 3) {
          document.getElementById(
            `gameTableObject_${row}_${i}`
          ).style.animation = "turnGreen 0.5s ease-in-out 0s forwards";
          if (this.game.greenLettersChanged.indexOf(rowArray[i]) === -1) {
            document.getElementById(`key_${rowArray[i]}`).style.animation =
              "turnGreen 0.5s ease-in-out 0s forwards";
            this.game.greenLettersChanged.push(rowArray[i]);
          }
        } else if (colors[i] === 2) {
          document.getElementById(
            `gameTableObject_${row}_${i}`
          ).style.animation = "turnYellow 0.5s ease-in-out 0s forwards";
          if (
            this.game.greenLettersChanged.indexOf(rowArray[i]) === -1 &&
            this.game.yellowLettersChanged.indexOf(rowArray[i]) === -1
          ) {
            document.getElementById(`key_${rowArray[i]}`).style.animation =
              "turnYellow 0.5s ease-in-out 0s forwards";
            this.game.yellowLettersChanged.push(rowArray[i]);
          }
        } else if (colors[i] === 1) {
          document.getElementById(
            `gameTableObject_${row}_${i}`
          ).style.animation = "turnGray 0.5s ease-in-out 0s forwards";
          if (
            this.game.yellowLettersChanged.indexOf(rowArray[i]) === -1 &&
            this.game.greenLettersChanged.indexOf(rowArray[i]) === -1
          ) {
            document.getElementById(`key_${rowArray[i]}`).style.animation =
              "turnGray 0.5s ease-in-out 0s forwards";
          }
        }
        await new Promise((resolve) => setTimeout(resolve, 300));
      }
    },
    keyboardPress(key) {
      if (this.game.over === false) {
        this.updateArray(key);
      }
    },
  },
};
</script>

<template>
  <main>
    <div class="gameTable">
      <div
        :key="indexLine"
        v-for="(line, indexLine) in this.game.table"
        class="line"
        :id="`gameTableRow_` + indexLine"
      >
        <div
          class="objectParent"
          v-for="(object, indexObject) in line"
          :key="indexObject"
        >
          <div
            v-if="object !== 3"
            :id="`gameTableObject_` + indexLine + `_` + indexObject"
            class="object not_empty"
          >
            <h3 v-html="object"></h3>
          </div>
          <div v-else class="object">
            <h3></h3>
          </div>
        </div>
      </div>
    </div>
    <div class="keyboard">
      <div class="row-1 row">
        <button id="key_q" @click="keyboardPress(`q`)" class="margin-button">
          Q
        </button>
        <button id="key_w" @click="keyboardPress(`w`)" class="margin-button">
          W
        </button>
        <button id="key_e" @click="keyboardPress(`e`)" class="margin-button">
          E
        </button>
        <button id="key_r" @click="keyboardPress(`r`)" class="margin-button">
          R
        </button>
        <button id="key_t" @click="keyboardPress(`t`)" class="margin-button">
          T
        </button>
        <button id="key_y" @click="keyboardPress(`y`)" class="margin-button">
          Y
        </button>
        <button id="key_u" @click="keyboardPress(`u`)" class="margin-button">
          U
        </button>
        <button id="key_i" @click="keyboardPress(`i`)" class="margin-button">
          I
        </button>
        <button id="key_o" @click="keyboardPress(`o`)" class="margin-button">
          O
        </button>
        <button id="key_p" @click="keyboardPress(`p`)">P</button>
      </div>
      <div class="row-2 row">
        <button id="key_a" @click="keyboardPress(`a`)" class="margin-button">
          A
        </button>
        <button id="key_s" @click="keyboardPress(`s`)" class="margin-button">
          S
        </button>
        <button id="key_d" @click="keyboardPress(`d`)" class="margin-button">
          D
        </button>
        <button id="key_f" @click="keyboardPress(`f`)" class="margin-button">
          F
        </button>
        <button id="key_g" @click="keyboardPress(`g`)" class="margin-button">
          G
        </button>
        <button id="key_h" @click="keyboardPress(`h`)" class="margin-button">
          H
        </button>
        <button id="key_j" @click="keyboardPress(`j`)" class="margin-button">
          J
        </button>
        <button id="key_k" @click="keyboardPress(`k`)" class="margin-button">
          K
        </button>
        <button id="key_l" @click="keyboardPress(`l`)">L</button>
      </div>
      <div class="row-3 row">
        <button
          id="key_enter"
          @click="keyboardPress(`Enter`)"
          class="large-button margin-button"
        >
          ENTER
        </button>
        <button id="key_z" @click="keyboardPress(`z`)" class="margin-button">
          Z
        </button>
        <button id="key_x" @click="keyboardPress(`x`)" class="margin-button">
          X
        </button>
        <button id="key_c" @click="keyboardPress(`c`)" class="margin-button">
          C
        </button>
        <button id="key_v" @click="keyboardPress(`v`)" class="margin-button">
          V
        </button>
        <button id="key_b" @click="keyboardPress(`b`)" class="margin-button">
          B
        </button>
        <button id="key_n" @click="keyboardPress(`n`)" class="margin-button">
          N
        </button>
        <button id="key_m" @click="keyboardPress(`m`)" class="margin-button">
          M
        </button>
        <button
          id="key_del"
          @click="keyboardPress(`Backspace`)"
          class="large-button backspace-button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
          >
            <path
              fill="var(--color-tone-1)"
              d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  </main>
</template>

<style>
main {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

body {
  overflow: hidden;
}

.game-table {
  width: 100%;
}

.line {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  /* height: 58px; */
  /* margin: 10px; */
}

.object {
  width: 58px;
  height: 58px;
  margin: 3px;
  border: 2px solid #3a3a3c;
}

.object > h3 {
  width: 100%;
  height: 100%;
  margin: 0;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  text-transform: uppercase;
}

.not_empty {
  border: #565758 2px solid;
  animation: popOut 0.05s;
}

/* Css for keyboard */

button {
  background: #818384;
  border: none;
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  padding: 0.5rem;
  height: 58px;
  width: 43px;
  outline: none;
  cursor: pointer;
  border-radius: 4px;
}

.keyboard {
  margin-bottom: 8vh;
}

button:hover {
  transition: all 0.2s ease-in-out;
  background: #6a6c6d;
}

.large-button {
  width: 65.4px;
}

.margin-button {
  margin: 0 6px 0 0;
}

.row {
  width: 484px;
  margin: 0 0 8px 0;
}

.backspace-button > svg {
  height: 10px;
  transform: scale(2.8);
  fill: white;
}

@keyframes turnGreen {
  0% {
    border: #565758 2px solid;
    background-color: #121213;
  }
  50% {
    border: #565758 2px solid;
    background-color: #121213;
    transform: scaleY(0);
    color: transparent;
  }
  51% {
    border: #538d4e 2px solid;
    background-color: #538d4e;
  }

  100% {
    border: #538d4e 2px solid;
    background-color: #538d4e;
  }
}

@keyframes turnYellow {
  0% {
    border: #565758 2px solid;
    background-color: #121213;
  }
  50% {
    border: #565758 2px solid;
    background-color: #121213;
    transform: scaleY(0);
    color: transparent;
  }
  51% {
    border: #b59f3b 2px solid;
    background-color: #b59f3b;
  }

  100% {
    border: #b59f3b 2px solid;
    background-color: #b59f3b;
  }
}

@keyframes turnGray {
  0% {
    border: #565758 2px solid;
    background-color: #121213;
  }
  50% {
    border: #565758 2px solid;
    background-color: #121213;
    transform: scaleY(0);
    color: transparent;
  }
  51% {
    border: #3a3a3c 2px solid;
    background-color: #3a3a3c;
  }

  100% {
    border: #3a3a3c 2px solid;
    background-color: #3a3a3c;
  }
}

@keyframes popOut {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.15);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes shakeLine {
  0% {
    transform: translateX(0);
  }
  10% {
    transform: translateX(-5px);
  }
  20% {
    transform: translateX(5px);
  }
  30% {
    transform: translateX(-5px);
  }
  40% {
    transform: translateX(5px);
  }
  50% {
    transform: translateX(-5px);
  }
  60% {
    transform: translateX(5px);
  }
  70% {
    transform: translateX(-5px);
  }
  80% {
    transform: translateX(5px);
  }
  90% {
    transform: translateX(-5px);
  }
  100% {
    transform: translateX(0);
  }
}

/* if  Device width is smaller than  500px change sizes*/

@media (min-height: 670px) {
  main {
    padding-top: 60px;
  }
}

@media (min-height: 570px) {
  main {
    padding-top: 50px;
  }
}

@media (max-height: 670px) {
  body {
    transform: scale(0.8);
  }
}
@media (max-height: 570px) {
  body {
    transform: scale(0.7);
  }
}
@media (max-height: 470px) {
  body {
    transform: scale(0.6);
  }
}
@media (max-height: 370px) {
  body {
    transform: scale(0.5);
  }
}

@media (max-width: 670px) {
  body {
    transform: scale(0.8);
  }
}
@media (max-width: 570px) {
  body {
    transform: scale(0.7);
  }
}
@media (max-width: 470px) {
  body {
    transform: scale(0.6);
  }
}
@media (max-width: 370px) {
  body {
    transform: scale(0.5);
  }
}
</style>
