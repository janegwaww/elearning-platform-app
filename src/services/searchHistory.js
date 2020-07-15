const isBrowser = () => typeof window !== "undefined";

const isExist = () =>
  isBrowser() && window.localStorage.getItem("kenginesearchhistory");

const exportHistory = {
  getValues() {
    return isExist()
      ? new Set(window.localStorage.getItem("kengineSearchHistory"))
      : new Set([]);
  },
  setValues(values) {
    isExit() &&
      window.localStorage.setItem("kengineSearchHistory", [...values]);
  },
  values() {
    return [...this.getValues()].filter(el => el);
  },
  add(value) {
    if (!value) return;
    this.setValues(this.getValues().add(value));
  },
  remove(value) {
    this.setValues(this.getValues().delete(value));
  }
};

export default exportHistory;
