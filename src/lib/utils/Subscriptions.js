function shouldNotify(atMs, intervalCount) {
  return intervalCount % atMs === 0
}

export default class Subscriptions {
  constructor() {
    this.clear()
  }

  clear() {
    this.inc = 0
    this.subscriptions = []
  }

  end() {
    this.clear()
    clearInterval(this.interval)
  }

  notify() {
    this.subscriptions.forEach(({ f, atMs }) => {
      if (shouldNotify(atMs, this.inc)) {
        f()
      }
    })
  }

  start() {
    this.inc = 0
    this.interval = setInterval(() => {
      if (this.inc >= 10000) {
        this.inc = 0
      }
      this.notify()
      this.inc += 50
    }, 50)
  }

  subscribe(f, atMs) {
    if (atMs > 10000) {
      throw new ReferenceError('Please enter a value < 10000ms')
    }

    this.subscriptions.push({ f, atMs })
  }
}
