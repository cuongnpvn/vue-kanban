<template>
  <div class="landing">
    <div class="left">
      <img src="../assets/image.png" alt="" />
    </div>
    <div class="right">
      <div v-if="signInError" class="error-wrapper">
        <h4>Invalid User</h4>
        <button @click="toggleSignInError" class="close-btn">Try again</button>
      </div>
      <header>
        <h1>Kanban board</h1>
        <h5>
          Bring your teams, work, and apps together from anywhere in one tool.
        </h5>
      </header>
      <main>
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
        <a @click="toSignUp">I'm new here</a>
        <button @click="handleSignIn" class="signin-btn">Sign in</button>
      </main>
      <footer>
        <div class="card-left">
          <div class="hline"></div>
          <p>I'm Android User</p>
        </div>
        <div class="card-mid">
          <div class="hline"></div>
          <div class="wrapper">
            <h3>1659</h3>
            <span>Monthly Users</span>
          </div>
          <div class="wrapper">
            <h3>989</h3>
            <span>Paid Users</span>
          </div>
        </div>
        <div class="card-right">
          <div class="hline"></div>
          <p>I'm iOS User</p>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "Landing",
  components: {},
  data() {
    return {
      email: "",
      password: "",
      currentUser: null,
      signInError: false,
      signInErrorMessage: "",
    };
  },
  methods: {
    handleSignIn() {
      this.$store
        .dispatch("userSignIn", { email: this.email, password: this.password })
        .then(() => {
          this.currentUser = this.$store.state.currentUser;
          this.$router.push({
            name: "Home",
            params: { emailUser: this.currentUser.email },
          });
        })
        .catch((err) => {
          console.log(err);
          this.signInError = true;
          this.signInErrorMessage = err.message;
        });
    },

    toggleSignInError() {
      this.signInError = !this.signInError;
    },

    toSignUp() {
      this.$router.push({ name: "SignUp" });
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
  position: relative;

  .error-wrapper {
    width: 280px;
    height: 170px;
    position: absolute;
    background: #fff;
    left: 30%;
    top: 30%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    transition: 500ms ease all;
    background: #f07b88;

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

  header {
    margin-left: 1rem;
    margin-bottom: 2rem;
    h1 {
      font-family: var(--title-font);
      font-size: 48.83;
      color: var(--secondary-color);
      margin-bottom: 1rem;
    }

    h5 {
      width: 60%;
      font-size: 18px;
      font-weight: 400;
      color: var(--font-color);
      margin-left: 4rem;
    }
  }

  main {
    margin-top: 2rem;
    margin-left: 5rem;

    display: flex;
    flex-direction: column;
    color: var(--font-color);
    justify-content: space-around;

    .input-wrapper {
      display: flex;
      flex-direction: column;
      margin-bottom: 1.5rem;

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

    .input-wrapper:nth-child(2) {
      margin-bottom: 6px;
    }

    a {
      margin-bottom: 1rem;
      width: 380px;
      text-align: right;
      cursor: pointer;
    }

    .signin-btn {
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

    .signin-btn:hover {
      transform: scale(0.98);
    }
  }

  footer {
    position: relative;
    display: flex;
    justify-content: space-around;

    .card-left,
    .card-mid,
    .card-right {
      width: 180px;
      height: 180px;
      border-radius: 20px 0 20px 0;
      padding-top: 28px;
      padding-left: 12px;
      padding-right: 12px;
      transition: 500ms ease all;
      box-shadow: 0 10px 10px 10px rgba(0, 0, 0, 0.1),
        0 18px 15px 10px rgba(0, 0, 0, 0.07);
    }
    .card-left:hover,
    .card-mid:hover,
    .card-right:hover {
      transform: scale(0.98);
    }

    .card-left,
    .card-right {
      background: var(--secondary-color);
      margin-top: 2rem;

      .hline {
        height: 1px;
        width: 100%;
        background: var(--font-color);
      }

      p {
        padding-top: 18px;
        padding-left: 12px;

        font-size: 25px;
        font-weight: bold;
        width: 80%;
      }
    }

    .card-mid {
      height: 190px;
      background: #e1b3c2;
      .hline {
        height: 1px;
        width: 100%;
        background: var(--font-color);
      }

      .wrapper {
        margin-top: 6px;
        h3 {
          font-size: 31.25px;
        }

        span {
          padding-left: 6px;
          font-weight: bold;
        }
      }
    }

    .card-right {
      background: var(--primary-color);
      margin-top: 4rem;
    }
  }
}
</style>
