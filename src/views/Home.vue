<template>
  <div class="home">
    <div class="container">
      <div v-if="!showWS" @click="handleBack" class="back">
        <i class="fas fa-arrow-left"></i>
      </div>
      <Navigation @openProfile="openProfile" />
      <main>
        <WorkSpace v-if="showWS" v-bind:email="this.userEmail" />
        <Profile v-if="showPF" v-bind:userProfile="this.userProfile" />
      </main>
    </div>
  </div>
</template>

<script>
import WorkSpace from "../components/WorkSpace.vue";
import Profile from "../components/Profile.vue";
import Navigation from "../components/Navigation.vue";

export default {
  name: "Home",
  components: {
    WorkSpace,
    Profile,
    Navigation,
  },
  props: ["emailUser"],
  data() {
    return {
      userWorkSpaces: null,
      userProfile: null,
      showWS: true,
      showPF: false,
      userName: "",
      userEmail: "",
      isUser: null,
    };
  },
  created() {
    this.isUser = this.$store.getters.getCurUser;

    if (!this.isUser) {
      console.log("OUT");
      this.$router.push({ name: "Landing" });
    } else {
      this.$store.getters.getCurWS
        .then((res) => {
          this.userWorkSpaces = res;
        })
        .catch((err) => {
          console.log(err);
        });
      this.$store.getters.getUserProfile
        .then((res) => {
          this.userProfile = res;
          this.userName = this.userProfile.userName;
          this.userEmail = this.userProfile.email;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
  methods: {
    openProfile() {
      this.showPF = true;
      this.showWS = false;
    },
    handleBack() {
      this.showPF = false;
      this.showWS = true;
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
.home {
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
      display: flex;
      flex-direction: column;
      background: #fff;
      border-radius: 9px 0 0 9px;
    }
  }
}
</style>
