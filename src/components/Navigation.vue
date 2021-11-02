<template>
  <div class="profile-nav">
    <div class="user">
      <img src="../assets/cat.jpg" alt="" />
      <h4 class="user-name">{{ userName }}</h4>
    </div>
    <div class="nav-links">
      <div @click="handleProfile" class="link-item">Profile</div>
      <div class="link-item">Groups</div>
      <div class="link-item">Message</div>
      <div @click="handleLogOut" class="link-item">Log out</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navigation",
  data() {
    return {
      showPF: false,
      userName: "",
    };
  },
  created() {
    this.$store.getters.getUserProfile.then((res) => {
      this.userName = res.userName;
    });
  },
  methods: {
    handleProfile() {
      this.showPF = true;
      this.$emit("openProfile");
    },
    handleLogOut() {
      this.currentUser = null;
      this.$router.push({ name: "Landing" });
    },
  },
};
</script>

<style lang="scss" scoped>
.profile-nav {
  margin: auto 0;
  width: 220px;
  height: 75%;
  padding: 1rem 2rem;
  border-radius: 0 9px 9px 0;
  background: var(--secondary-color);
  display: flex;
  flex-direction: column;

  .user {
    margin: 1rem 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      margin-bottom: 16px;
    }

    .user-name {
      font-size: 18px;
      font-weight: 400;
    }

    .nickname {
      font-size: 14px;
    }
  }

  .nav-links {
    height: 180px;
    margin: auto 0;
    display: flex;
    flex-direction: column;
    align-items: center;

    .isSelected {
      background: #d5f2f2;
    }

    .link-item {
      height: 45px;
      width: 133%;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 500ms ease all;
      cursor: pointer;
    }

    .link-item:first-child {
      border: 1px solid var(--border-color);
      border-width: 1px 0 0 0;
    }

    .link-item:nth-child(2) {
      border: 1px solid var(--border-color);
      border-width: 1px 0 1px 0;
    }

    .link-item:last-child {
      border: 1px solid var(--border-color);
      border-width: 1px 0 1px 0;
    }

    .link-item:hover {
      background: #d5f2f2;
    }
  }
}
</style>
