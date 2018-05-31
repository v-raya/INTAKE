export class Maybe {
  constructor(value) {
    this._value = value
  }

  isNothing() {
    return this._value === null || this._value === undefined
  }

  isSomething() {
    return !this.isNothing()
  }

  map(f) {
    return this.isNothing() ? this : Maybe.of(f(this._value))
  }

  valueOrElse(fallback) {
    return this.isNothing() ? fallback : this._value
  }

  join() {
    return this.isNothing() ? this : this._value
  }

  chain(f) {
    return this.map(f).join()
  }

  static of(value) {
    return new Maybe(value)
  }
}
