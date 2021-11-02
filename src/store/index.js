import { createStore } from "vuex";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { query, getDocs, where } from "firebase/firestore";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
export default createStore({
  state: {
    currentUser: null,
    userInfo: null,

    successfulSignUp: false,
    currentWorkSpace: null,

    CardID: "",
    ColumnID: "",
  },
  getters: {
    getCurUser: (state) => {
      return state.currentUser;
    },
    isSuccessSignUp: (state) => {
      return state.successfulSignUp;
    },
    getCurWS: async (state) => {
      let email = state.currentUser.email;
      let selectedWS = [];
      const db = getFirestore();
      const querySnapshot = await getDocs(collection(db, "work-space"));
      querySnapshot.forEach((doc) => {
        let members = doc.data().members;
        if (members.includes(email)) {
          selectedWS.push({ id: doc.id, data: doc.data() });
        }
      });
      return selectedWS;
    },
    getUserProfile: async (state) => {
      let email = state.currentUser.email;
      let res = null;
      const db = getFirestore();
      const q = query(collection(db, "users"), where("email", "==", email));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        res = doc.data();
      });
      return res;
    },
    getWScols: () => async (id) => {
      let res = null;
      const db = getFirestore();
      const q = query(collection(db, "work-space"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        if (doc.id === id) {
          res = doc.data().cols;
        }
      });
      return res;
    },
    getCols: () => async (id) => {
      let res = null;
      const db = getFirestore();
      const q = query(collection(db, "kanban-column"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        if (doc.id === id) {
          res = doc.data();
        }
      });
      return res;
    },
    getCardContent: () => async (id) => {
      let res = null;
      const db = getFirestore();
      const q = query(collection(db, "kanban-card"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        if (doc.id === id) {
          res = doc.data().content;
        }
      });
      return res;
    },
    removeCardFromColumn: () => async (ColID, itemID) => {
      const db = getFirestore();
      const colRef = doc(db, "kanban-column", ColID);
      await updateDoc(colRef, {
        cards: arrayRemove(itemID),
      });
    },
    addCardToColumn: () => async (ColID, itemID) => {
      const db = getFirestore();
      const colRef = doc(db, "kanban-column", ColID);
      await updateDoc(colRef, {
        cards: arrayUnion(itemID),
      });
    },
  },
  mutations: {
    userSignIn(state, user) {
      // sign in success
      state.currentUser = user;
    },
    userSignUp(state, isValidSignUp) {
      if (isValidSignUp) {
        state.successfulSignUp = true;
      }
    },
    addCard(state, CardID) {
      state.CardID = CardID;
    },
    addColumn(state, ColumnID) {
      state.ColumnID = ColumnID;
    },
  },
  actions: {
    async userSignIn(context, { email, password }) {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          context.commit("userSignIn", user);
          return user;
        })
        .catch((error) => {
          throw error;
        });
    },
    async userSignUp(context, { email, password, userName, company, checked }) {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          const db = getFirestore();
          try {
            addDoc(collection(db, "users"), {
              email,
              userName,
              company,
              checked,
            });
          } catch (error) {
            console.log("Cannot add user to db");
            console.log(error);
          }
          context.commit("userSignUp", true);
          return 1;
        })
        .catch((error) => {
          throw error;
        });
    },
    addWorkSpace(context, { workSpace, members, date }) {
      let cols = [];
      const db = getFirestore();
      try {
        addDoc(collection(db, "work-space"), {
          workSpace,
          members,
          date,
          cols,
        });
        context.commit("test");
      } catch (error) {
        console.log("Cannot add work space to db");
        console.log(error);
      }
    },
    addColumnDB(context, { colName, cards, workSpaceID }) {
      const db = getFirestore();
      try {
        addDoc(collection(db, "kanban-column"), {
          colName,
          cards,
        }).then(async (docRef) => {
          console.log(docRef);
          console.log(docRef.id);
          const wsRef = doc(db, "work-space", workSpaceID);
          await updateDoc(wsRef, {
            cols: arrayUnion(docRef.id),
          });
          context.commit("addColumn", docRef.id);
        });
      } catch (error) {
        console.log("Cannot add column to db");
        console.log(error);
      }
    },
    addCardDB(context, { content, color, cardColumnID }) {
      const db = getFirestore();
      try {
        addDoc(collection(db, "kanban-card"), {
          content,
          color,
        }).then(async (docRef) => {
          const colRef = doc(db, "kanban-column", cardColumnID);
          await updateDoc(colRef, {
            cards: arrayUnion(docRef.id),
          });
          context.commit("addCard", docRef.id);
        });
      } catch (error) {
        console.log("Cannot add column to db");
        console.log(error);
      }
    },
  },
  modules: {},
});
