import { keyBy } from 'lodash-es'

export default class TranslationTable<A, B> {
  private abTable: Map<A, B> = new Map()
  private baTable: Map<B, A> = new Map()
  private symmetricTracker: Set<A | B>

  constructor(table: [A: A, B: B][]) {
    this.symmetricTracker = new Set()
    for (const entry of table) {
      this.add(entry)
    }
  }

  atob(A: A) {
    return this.abTable.get(A)
  }

  btoa(B: B) {
    return this.baTable.get(B)
  }

  add(entry: [A: A, B: B]) {
    const [A, B] = entry
    this.symmetricTracker.add(A)
    this.symmetricTracker.add(B)
    if (this.symmetricTracker.size % 2 !== 0)
      throw new Error(
        'Duplicate entry found! Make sure there are no duplicate entry in A & B',
      )

    this.abTable.set(A, B)
    this.baTable.set(B, A)
    return this
  }
}
