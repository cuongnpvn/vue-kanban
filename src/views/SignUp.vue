<template>
  <div class="landing">
    <div class="left">
      <img src="../assets/image.png" alt="" />
    </div>
    <div class="right">
      <header>
        <h1>Kanban board</h1>
        <div class="go-back">
          <i class="fas fa-chevron-left"></i>
          <a @click="backSignIn">I'm already a member</a>
        </div>
      </header>
      <main>
        <div v-if="successfulSignUp" class="success-wrapper">
          <h4>User created!</h4>
          <button @click="backSignIn" class="close-btn">Back to SignIn</button>
        </div>
        <div v-if="invalidSIgnUp" class="error-wrapper">
          <h4>Failed to create user</h4>
          <button @click="closeInvalidMessage" class="close-btn">
            Try again
          </button>
        </div>
        <h3>Let's Sign you up!</h3>
        <div class="input-wrapper">
          <span>Email</span>
          <input type="email" placeholder="Enter your email" v-model="email" />
        </div>
        <div class="input-wrapper">
          <span>Password</span>
          <input
            type="password"
            placeholder="Enter your password"
            v-model="password"
          />
        </div>
        <div class="input-wrapper">
          <span>User Name</span>
          <input
            type="text"
            placeholder="Enter your user name"
            v-model="userName"
          />
        </div>
        <div class="input-wrapper">
          <span>Company</span>
          <input
            type="text"
            placeholder="Enter your company"
            v-model="company"
          />
        </div>
        <div class="email">
          <input id="email-check" type="checkbox" v-model="checked" />
          <label for="email-check">I would like to receive weekly email</label>
        </div>
        <button @click="handleSignUp">Sign Up</button>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignUp",
  components: {},
  data() {
    return {
      email: "",
      password: "",
      userName: "",
      company: "",
      checked: false,
      successfulSignUp: false,
      invalidSIgnUp: false,
    };
  },
  methods: {
    handleSignUp() {
      this.$store
        .dispatch("userSignUp", {
          email: this.email,
          password: this.password,
          userName: this.userName,
          company: this.company,
          checked: this.checked,
        })
        .then(() => {
          this.successfulSignUp = true;
        })
        .catch((err) => {
          this.invalidSIgnUp = true;
          console.log(err);
        });
    },
    backSignIn() {
      this.$router.push({ name: "Landing" });
    },
    closeInvalidMessage() {
      this.invalidSIgnUp = false;
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
.landing {
  display: flex;
  height: 100vh;
}

.left {
  width: 635px;
  background: var(--primary-color);
  height: 100%;
  z-index: 0;
  position: relative;

  img {
    width: 600px;
    height: 495px;
    top: 15vh;
    right: -105px;
    z-index: 1;
    position: absolute;
  }
}

.right {
  width: auto;
  height: 100%;
  padding-top: 3rem;
  padding-left: 5rem;
  font-family: var(--font-family);
  display: flex;
  flex-direction: column;
  cursor: default;
  color: var(--font-color);

  header {
    margin-left: 1rem;
    margin-bottom: 2rem;
    h1 {
      font-family: var(--title-font);
      font-size: 48.83;
      color: var(--secondary-color);
      margin-bottom: 1rem;
    }

    .go-back {
      margin-top: 2.5rem;
      padding-left: 3rem;

      i {
        font-size: 14px;
        margin-right: 6px;
      }

      a {
        font-size: 18px;
        color: var(--font-color);
        text-decoration: none;
        cursor: pointer;
      }
    }
  }

  main {
    margin-left: 5rem;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: var(--font-color);
    position: relative;

    .error-wrapper {
      z-index: 2;
      background: #f07b88;

      .close-btn {
        background: #fff;
      }
    }

    .success-wrapper {
      z-index: 1;
      border: 2px solid #61cf73;
      background: #71d997;

      .close-btn {
        background: #fff;
      }
    }

    .error-wrapper,
    .success-wrapper {
      width: 280px;
      height: 170px;
      position: absolute;
      left: 30%;
      top: 13%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: 12px;
      transition: 500ms ease all;

      h4 {
        font-size: 16px;
        color: #fff;
        margin-bottom: 20px;
      }

      .close-btn {
        padding: 12px 18px;
        background: #fff;
        border: none;
        border-radius: 8px;
        transition: 300ms ease all;
        color: var(--font-color);
        cursor: pointer;
      }

      .close-btn:hover {
        transform: scale(0.98);
      }
    }

    h3 {
      font-size: 25px;
      font-weight: 600;
      text-align: center;
      margin-bottom: 2rem;
    }

    .input-wrapper {
      display: flex;
      flex-direction: column;
      margin-bottom: 1rem;

      span {
        font-size: 16px;
        font-weight: bold;
      }

      input {
        height: 50px;
        width: 380px;
        outline: none;
        border: 1px solid var(--border-color);
        border-radius: 9px;
        padding-left: 12px;
        transition: 400ms ease all;
      }

      input:focus {
        border-color: var(--secondary-color);
      }
    }

    .email {
      margin-top: 0.5rem;
      margin-bottom: 2rem;

      input {
        display: none;
      }

      label {
        position: relative;
        margin-left: 36px;
      }

      label::before {
        position: absolute;
        top: 1px;
        left: -30px;
        content: "";
        width: 18px;
        height: 18px;
        border: 1px solid var(--border-color);
        border-radius: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: 200ms ease-in all;
      }

      input:checked + label::before {
        font-family: "Font Awesome\ 5 Free";
        content: "\f00c";
        font-weight: 900;
        font-size: 15px;
        color: #fff;
        background: var(--secondary-color);
        border-color: var(--secondary-color);
      }
    }

    button {
      width: 160px;
      height: 45px;
      background: var(--secondary-color);
      color: #fff;
      border-radius: 4px;
      border: none;
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 2rem;
      transition: 400ms ease all;
      cursor: pointer;
    }

    button:hover {
      transform: scale(0.98);
    }
  }
}
</style>
