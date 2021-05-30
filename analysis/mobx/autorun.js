  import reaction from './reaction'
  export default function autorun(handle){
    reaction.start()
    handle()
    reaction.end()
  }