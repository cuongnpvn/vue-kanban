<template>
  <div class="container">
    <div class="head">
      <span class="board-name">Work Space</span>
      <span class="members">Members</span>
      <span class="date">Date</span>
    </div>
    <div
      v-for="ws in userWSs"
      :key="ws.id"
      class="row"
      @click="handleKanban(ws.id)"
    >
      <span class="board-item">{{ ws.data.workSpace }}</span>
      <span class="members-item">{{ ws.data.members.length }}</span>
      <span class="date-item">{{ getDate(ws.data.date) }}</span>
    </div>
  </div>
  <div @click="toggleAddModal" class="row">
    <span class="board-item add">Add ... </span>
  </div>
  <div v-if="addModal" class="addModal">
    <div @click="closeAddModal" class="backgr" ref="backgr"></div>
    <div class="input-wrapper">
      <input type="text" placeholder="Your Work Space name" v-model="WSname" />
      <button @click="handleAddWS">Add</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "WorkSpace",
  props: ["email"],
  components: {},
  created() {
    this.$store.getters.getCurWS
      .then((res) => {
        this.userWSs = res;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  data() {
    return {
      userEmail: this.email,
      userWSs: null,
      addModal: false,
      WSname: "",
    };
  },
  methods: {
    getDate(sec) {
      let temp = sec;
      if (typeof sec !== "number") {
        temp = sec.seconds;
      }
      let d = new Date(temp * 1000);
      let day = d.getDate();
      let month = d.getMonth();
      let year = d.getFullYear();
      return `${day}/${month}/${year}`;
    },
    handleKanban(id) {
      this.$router.push({
        name: "Kanban",
        params: { id },
      });
    },
    toggleAddModal() {
      this.addModal = true;
    },
    closeAddModal(e) {
      if (e.target === this.$refs.backgr) {
        this.addModal = false;
      }
    },
    handleAddWS() {
      let seconds = new Date().getTime() / 1000;
      this.$store.dispatch("addWorkSpace", {
        workSpace: this.WSname,
        members: [this.userEmail],
        date: seconds,
      });
      this.addModal = false;
      this.$store.getters.getCurWS
        .then((res) => {
          this.userWSs = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  overflow: auto;
}
.head,
.row {
  padding: 6px 12px;
  border-radius: 6px;
  background: var(--bg-color);
  position: relative;
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 0.3rem;
  transition: 400ms ease all;
  cursor: pointer;

  .board-item {
    min-width: 180px;
  }

  .members-item {
    min-width: 20px;
  }

  .date-item {
    min-width: 100px;
    text-align: right;
  }

  .add {
    color: var(--border-color);
  }
}

.head {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 1rem;
  cursor: default;
}

.row:hover {
  background: #d5f2f2;
}

.addModal {
  top: 35%;
  left: 50%;
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
</style>
