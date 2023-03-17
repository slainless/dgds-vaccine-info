export default class TranslationTable {
  constructor(table) {
    this.abTable = new Map();
    this.baTable = new Map();
    this.symmetricTracker = new Set();
    for (const entry of table) {
      this.add(entry);
    }
  }
  atob(A) {
    return this.abTable.get(A);
  }
  btoa(B) {
    return this.baTable.get(B);
  }
  add(entry) {
    const [A, B] = entry;
    this.symmetricTracker.add(A);
    this.symmetricTracker.add(B);
    if (this.symmetricTracker.size % 2 !== 0)
      throw new Error("Duplicate entry found! Make sure there are no duplicate entry in A & B");
    this.abTable.set(A, B);
    this.baTable.set(B, A);
    return this;
  }
}
