/**
 * 装饰器 mobx-react 修饰类组件
 * @param {*} target 
 */
export default function observer(target){
    let cwm = target.prototype.componentWillMount;
    target.prototype.componentWillMount = function(){
      cwm && cwm.call(this);
      autorun(()=>{
        this.render();
        this.forceUpdate();
      })
    }
  }