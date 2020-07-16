const isBrowser = () => typeof window !== "undefined";

const isExist = () =>
  isBrowser() && window.localStorage.getItem("kengineSearchHistory");

const exportHistory = {
  getValues() {
    return isExist()
      ? new Set(JSON.parse(localStorage.getItem("kengineSearchHistory")))
      : new Set();
  },
  setValues(values) {
      localStorage.setItem("kengineSearchHistory", JSON.stringify([...values]));
  },
  values() {
    return [...this.getValues()].filter((el) => el);
  },
  add(value) {
    if (!value) return;
    const adding = this.getValues().add(value);
    this.setValues(adding);
  },
  remove(value) {
    const removing = this.getValues().delete(value);
    this.setValues(removing);
  },
};

export default exportHistory;
