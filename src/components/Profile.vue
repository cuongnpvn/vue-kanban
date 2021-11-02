<template>
  <div class="profile">
    <div class="input-wrapper">
      <span>User name:</span>
      <input type="text" :placeholder="userProfile.userName" />
    </div>
    <div class="input-wrapper">
      <span>Company:</span>
      <input type="text" :placeholder="userProfile.company" />
    </div>
    <button>Save</button>
  </div>
</template>

<script>
export default {
  name: "Profile",
  props: ["userProfile"],
  created() {},
};
</script>

<style lang="scss" scoped>
.profile {
  margin: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: none;
  color: var(--font-color);

  .input-wrapper {
    margin-bottom: 12px;
    width: 480px;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    input {
      width: 360px;
      height: 45px;
      border: 1px solid var(--border-color);
      border-radius: 8px;
      outline: none;
      padding-left: 12px;
      transition: 300ms ease all;
      caret-color: transparent;
    }

    input:focus {
      border-color: var(--secondary-color);
    }
  }

  button {
    margin-top: 3rem;
    padding: 16px 45px;
    background: var(--secondary-color);
    border: none;
    border-radius: 6px;
    color: #fff;
    font-size: 16px;
    font-weight: 500;
    transition: 300ms ease all;
  }

  button:hover {
    transform: scale(0.98);
  }
}
</style>
