<template>
  <div class="kanban">
    <div class="container">
      <div @click="handleBack" class="back">
        <i class="fas fa-arrow-left"></i>
      </div>
      <Navigation v-bind:userName="this.userName" @openProfile="openProfile" />
      <main>
        <div
          v-for="col in cols"
          :key="col.id"
          :class="{ colActive: active }"
          class="column"
          @dragenter.prevent
          @dragleave.prevent
          @dragover.prevent="handleDragOver($event)"
          @drop.prevent="handleDrop($event, col)"
        >
          <h3>{{ col.columnName }}</h3>
          <div
            draggable="true"
            @dragstart="handleDragStart($event, card, col.id)"
            v-for="card in col.cards"
            :key="card.id"
            class="card"
          >
            <span>{{ card.content }}</span>
          </div>
          <span @click="openAddCard(col.id)" class="add-card">Add...</span>
        </div>
        <div @click="openAddColumn" class="add-column">
          <span>Add ...</span>
        </div>
        <div v-if="addColumnModal" class="addModal">
          <div @click="closeAddColumnModal" class="backgr" ref="backgr"></div>
          <div class="input-wrapper">
            <input type="text" placeholder="Column name" v-model="newColName" />
            <button @click="handleAddColumn">Add</button>
          </div>
        </div>
        <div v-if="addCardModal" class="addModal">
          <div @click="closeAddCardModal" class="backgr" ref="backgr"></div>
          <div class="input-wrapper">
            <input
              type="text"
              placeholder="Card content"
              v-model="newCardContent"
            />
            <button @click="handleAddCard">Add</button>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import Navigation from "../components/Navigation.vue";

export default {
  name: "Kanban",
  components: {
    Navigation,
  },
  data() {
    return {
      workSpaceId: null,
      columnsID: null,
      cols: [],
      colsName: [],
      active: false,
      showPF: false,
      tempColLeaveEvent: null,
      workSpace: null,
      openProfile: false,

      addColumnModal: false,
      newColName: "",
      addCardModal: false,
      newCardContent: "",
      newCardColumn: "",
    };
  },
  created() {
    this.userName = this.$store.getters.getCurUser;
    console.log(this.userName);
    this.workSpaceId = this.$route.params.id;
    this.$store.getters
      .getWScols(this.workSpaceId)
      .then((res) => {
        this.columnsID = res;
        this.columnsID.forEach((columnID) => {
          this.$store.getters
            .getCols(columnID)
            .then((res) => {
              let cardContent = [];
              res.cards.forEach((card) => {
                this.$store.getters.getCardContent(card).then((content) => {
                  cardContent.push({ id: card, content: content });
                });
              });
              this.cols.push({
                id: columnID,
                columnName: res.colName,
                cards: cardContent,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    handleBack() {
      this.$router.push({ name: "Home" });
    },
    handleDragStart(evt, item, colID) {
      console.log("START");
      let j = JSON.stringify(item);
      evt.dataTransfer.setData("item", j);
      evt.dataTransfer.setData("itemCol", colID);
      this.tempColLeaveEvent = colID;
      evt.dataTransfer.dropEffect = "move";
      evt.dataTransfer.effectAllowed = "move";
    },
    handleDrop(evt, col) {
      console.log("DROP");
      const item = JSON.parse(evt.dataTransfer.getData("item"));
      this.cols.forEach((c) => {
        if ((c.id === col.id) & (this.tempColLeaveEvent !== col.id)) {
          c.cards.push(item);
        }
      });
      this.cols.forEach((c) => {
        if (
          (c.id === this.tempColLeaveEvent) &
          (this.tempColLeaveEvent !== col.id)
        ) {
          c.cards = c.cards.filter((card) => card.id !== item.id);
        }
      });
      if (this.tempColLeaveEvent !== col.id) {
        this.$store.getters.addCardToColumn(col.id, item.id);
        this.$store.getters.removeCardFromColumn(
          this.tempColLeaveEvent,
          item.id
        );
      }
    },
    handleDragOver(evt) {
      console.log("OVER");
      evt.dataTransfer.dropEffect = "move";
      evt.dataTransfer.effectAllowed = "move";
    },
    handleLogOut() {
      this.currentUser = null;
      this.$router.push({ name: "Landing" });
    },
    openAddColumn() {
      this.addColumnModal = true;
    },
    closeAddColumnModal() {
      this.addColumnModal = false;
    },
    handleAddColumn() {
      let newCards = [];
      this.$store
        .dispatch("addColumnDB", {
          colName: this.newColName,
          cards: newCards,
          workSpaceID: this.workSpaceId,
        })
        .then(() => {
          this.cols.push({
            id: this.$store.state.ColumnID,
            columnName: this.newColName,
            cards: newCards,
          });
        });
      this.addColumnModal = false;
    },
    openAddCard(id) {
      this.newCardColumn = id;
      this.addCardModal = true;
    },
    closeAddCardModal() {
      this.addCardModal = false;
    },
    handleAddCard() {
      this.$store
        .dispatch("addCardDB", {
          content: this.newCardContent,
          color: "red",
          cardColumnID: this.newCardColumn,
        })
        .then(() => {
          console.log("HAHAHA");
          this.cols.forEach((col) => {
            if (col.id === this.newCardColumn) {
              col.cards.push({
                id: this.$store.state.CardID,
                content: this.newCardContent,
              });
            }
          });
        });
      this.addCardModal = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.kanban {
  height: 100vh;
  background: var(--bg-color);
  display: flex;
  justify-content: center;
  align-items: center;

  .container {
    width: 80%;
    height: 80%;
    border-radius: 12px;
    background: var(--primary-color);
    display: flex;
    color: var(--font-color);
    font-family: var(--font-family);
    cursor: default;
    position: relative;

    .back {
      position: absolute;
      width: 20px;
      height: 20px;
      top: 1rem;
      left: 17rem;
      cursor: pointer;

      i {
        font-size: 24px;
      }
    }

    main {
      margin: auto 0;
      margin-left: 3rem;
      padding: 1.3rem 0.8rem;
      width: 885px;
      height: 85%;
      position: relative;
      display: flex;
      background: #fff;
      border-radius: 9px 0 0 9px;
      overflow: auto;

      .column {
        width: 200px;
        max-width: 210px;
        min-width: 200px;
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 2px solid var(--border-color);
        border-width: 0 2px 0 0;

        h3 {
          margin: 1rem 0;
        }

        .card {
          width: 120px;
          height: 80px;
          min-height: 80px;
          background: #d5f2f2;
          margin: 4px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: center;
          cursor: pointer;
        }
        .add-card {
          margin-top: 12px;
          cursor: pointer;
        }
      }
      .add-column {
        padding-top: 16px;
        padding-left: 12px;
        width: 60px;

        span {
          color: var(--border-color);
          cursor: pointer;
        }
      }

      .addModal {
        top: 33%;
        left: 35%;
        position: absolute;
        width: 300px;
        height: 160px;
        border: 2px solid var(--secondary-color);
        border-radius: 8px;
        color: var(--font-color);
        background: #fff;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .backgr {
          position: absolute;
          background: rgba($color: #fff, $alpha: 0.5);
          width: 99.5vw;
          left: -50vw;
          height: 103vh;
        }

        .input-wrapper {
          z-index: 99;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          input {
            padding: 8px 24px;
            border: 1px solid var(--border-color);
            border-radius: 6px;
            margin-bottom: 24px;
            outline: none;
            transition: 400ms ease all;
          }

          input:focus {
            border-color: var(--secondary-color);
          }

          button {
            padding: 10px 32px;
            border: none;
            border-radius: 6px;
            background: var(--secondary-color);
            color: #fff;
            font-size: 18px;
            cursor: pointer;
            transition: 400ms ease all;
          }

          button:hover {
            transform: scale(0.98);
          }
        }
      }
    }
  }
}
</style>
