import reaction from './reaction'
export default function observable(target,key,descritor){
    // 当使用装饰器 修饰属性时
    if( typeof key === 'string'){
     let Reaction = new reaction
     let v =  descritor.initailizer()
     v = createObservable(v)
     return {
       enumerable:true,
       configurable:true,
       get(){
        Reaction.collect()
        return v
       },
       set(value){
        v = value
        Reaction.run()
       },
     }
    }
      return createObservable(target)
  } 
  
  function createObservable(val){
      let handle = () =>{
      let Reaction = new reaction
       return {
         get(target,key){
          Reaction.collect()
          return Reflect.get(target,key)
         },
         set(target,key,value){
          let v = Reflect.set(target,key,value)
          Reaction.run()
          return v
         },
       }
      }   
      return deepProxy(val,handle)
  }
  
  function deepProxy(val,handle){
    if(typeof val !== 'object') return val
  
    // 从后往前依此实现代理
    for(let key in val){
      val[key] = deepProxy(val[key],handle)
    }
  
    return createObservable(val, handle())
  }