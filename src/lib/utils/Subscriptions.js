function shouldNotify(timesPerSecond, intervalCount) {
  return Math.floor(20 / timesPerSecond) % intervalCount === 0
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
    this.subscriptions.forEach(({ f, timesPerSecond }) => {
      if (shouldNotify(timesPerSecond, this.inc)) {
        f()
      }
    })
  }

  start() {
    this.inc = 0
    this.interval = setInterval(() => {
      if (this.inc >= 20) {
        this.inc = 0
      }
      this.notify()
      this.inc += 1
    }, 50)
  }

  subscribe(f, timesPerSecond) {
    if (timesPerSecond > 5) {
      throw new ReferenceError('Please enter a value < 5x/sec')
    }

    this.subscriptions.push({ f, timesPerSecond })
  }
}
