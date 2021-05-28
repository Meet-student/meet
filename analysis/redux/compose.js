export default function compose(...funcs) {
    if (funcs.length === 0) {
        return args => args; //如果没有要组合的函数，则返回的函数原封不动的返回参数
    }
    else if (funcs.length === 1) {
        //要组合的函数只有一个
        return funcs[0];
    }

    return funcs.reduce((a, b) => (...args) => a(b(...args)))
}