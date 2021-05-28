/**
 * @param {object | function } actionCreators 
 * @param {*} dispatch 
 * @returns 
 */
export default function (actionCreators,dispatch) {
    // 为函数时 直接调用自动分发的action创建函数
    if(typeof actionCreators === 'function'){
        _getAutoDispatchActionCreator(actionCreators,dispatch)
     // 为对象时 遍历对象 转化为已创建自动分发的action创建函数的对象
    }else if(typeof actionCreators === 'object'){
        const result = {}
        Object.keys(actionCreators).forEach((key)=>{
            result[key] = _getAutoDispatchActionCreator(actionCreators[key],dispatch)
        })
        return result
    }else{
        throw new TypeError("actionCreators must be an object or function which means action creator")
    }

}
/**
 * 自动分发的action创建函数
 * @param {function} actionCreator 
 * @param {any} dispatch 
 * @returns 
 */
function _getAutoDispatchActionCreator(actionCreator, dispatch){
    return function(...args){
        return dispatch(actionCreator(...args))
    }
}

































// export default function (actionCreators, dispatch) {
//     if (typeof actionCreators === "function") {
//         return getAutoDispatchActionCreator(actionCreators, dispatch);
//     }
//     else if (typeof actionCreators === "object") {
//         const result = {}; //返回结果
//         for (const key in actionCreators) {
//             if (actionCreators.hasOwnProperty(key)) {
//                 const actionCreator = actionCreators[key]; //取出对应的属性值
//                 if (typeof actionCreator === "function") {
//                     result[key] = getAutoDispatchActionCreator(actionCreator, dispatch);
//                 }
//             }
//         }
//         return result;
//     }
//     else {
//         throw new TypeError("actionCreators must be an object or function which means action creator")
//     }
// }

// /**
//  * 得到一个自动分发的action创建函数
//  */
// function getAutoDispatchActionCreator(actionCreator, dispatch) {
//     return function (...args) {
//         const action = actionCreator(...args)
//         dispatch(action);
//     }
// }