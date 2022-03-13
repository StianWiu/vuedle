<script>
export default {
  data() {
    return {
      author: {
        name: "John Doe",
        books: ["Vue 2 - Advanced Guide"],
      },
      game: {
        table: Array.from({ length: 6 }, () =>
          Array.from({ length: 5 }, () => 3)
        ),
      },
    };
  },
  created() {
    const escapeWindowCallFunction = (key) => {
      this.updateArray(key);
    };

    window.addEventListener("keydown", function (event) {
      escapeWindowCallFunction(event.key);
    });
  },
  methods: {
    calculateBooksMessage() {
      return this.author.books.length > 0 ? "Yes" : "No";
    },
    updateArray(key) {
      console.log(key);
      for (let i = 0; i < this.game.table.length; i++) {
        for (let j = 0; j < this.game.table[i].length; j++) {
          this.game.table[i][j] = 2;
        }
      }
    },
  },
};
</script>

<template>
  <main>
    <div class="gameTable">
      <div v-for="line in this.game.table" :key="line" class="line">
        <div v-for="object in line" :key="object" class="object">
          <h3 v-if="object !== 3" v-html="object"></h3>
          <h3></h3>
        </div>
      </div>
    </div>
  </main>
</template>
