let nowFn = null
let counter = 0
class Reaction {
  constructor(){
    this.id = ++counter
    this.store = {}

  }
  run(){
    if(this.store[this.id]){
      this.store[this.id].forEach(w=>w())
    }
  }
  collect(){
    if(nowFn){
      this.store[this.id] = this.store[this.id] || []
      this.store[this.id].push(nowFn)
    }
  }
  static start(handle){
    nowFn = handle
  }
  static end (){
    nowFn = null
  }
}
