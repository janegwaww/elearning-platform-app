const isBrowser = () => typeof window !== "undefined";
const isExist = (key) => isBrowser() && window.localStorage.getItem(`${key}`);
const getValues = (key) => {
  return isExist(key)
    ? new Set(JSON.parse(localStorage.getItem(key)))
    : new Set();
};
const setValues = (key, values) => {
  localStorage.setItem(key, JSON.stringify(values));
};

const exportHistory = (name) => {
  const state = [];
  getValues(name).forEach((o) => state.push(o));
  const history = () => {};

  return Object.assign(history, {
    values() {
      return state;
    },
    add(value) {
      if (!value) return;
      state.unshift(value);
    },
    remove(value) {
      state.filter((o) => o === value);
    },
    save() {
      setValues(name, state);
    },
  });
};

export default exportHistory;
