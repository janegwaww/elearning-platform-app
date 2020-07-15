const exportHistory = {
  getValues() {
    return new Set(localStorage.getItem("kengineSearchHistory"));
  },
  setValues(values) {
    localStorage.setItem("kengineSearchHistory", [...values]);
  },
  values() {
    const history = localStorage
      .getItem("kengineSearchHistory")
      .split(",")
      .filter((el) => el);
    if (history.length) {
      return history;
    }
    return [];
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
