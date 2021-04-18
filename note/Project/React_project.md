### React Class

## 基本开发文件结构

```javascript
├── public
├── src
│   ├── api
│   ├── common
│   ├── page
│   ├── components //组件
│   ├── store //Redux
│   ├── router //路由配置根据封装
│   └── layout
│   └── App.js
│   └── index.js
```

### Redux 配和 React-Redux

### Redux

> index. js

```javacript
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';  //中间件
import reducer from './reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //浏览器DevTool
const store = createStore(reducer, composeEnhancers(
	applyMiddleware(thunk)
));

export default store;
```

> reducer.js

```javascript
import { combineReducers } from 'redux-immutable';
import { reducer as loginReducer } from './login/';


// 合并多个中间件
const reducer = combineReducers({
	login: loginReducer,
});

export default reducer;
```

> login/

```javascript
// actionCreators.js
import {Login} from '../../api/request'
import { message} from 'antd';

const changeLogin = () => ({
	type: 'LOGIN',
	value: true
})


export const login = (username, password) => {
	return (dispatch) => {
		Login(username, password).then((res)=>{
			if(res.status !== 200) return message.error(res.message)
			message.success(res.message)
			const { token } = res.data
			window.localStorage.setItem('token',token)
			dispatch(changeLogin())
		})
    }
}

// reduce.js
import { fromJS } from 'immutable';

const defaultState = fromJS({
	login: localStorage.getItem('token')? true : false
});

export default (state = defaultState, action) => {
    switch(action.type) {
		case 'LOGIN':
			return state.set('login', action.value);
		case 'LOGOUT':
			return state.set('login', action.value);
		default:
			return state;
	}
}

// index.js 
import reducer from './reducer';
import * as actionCreators from './actionCreators';

export { reducer, actionCreators };
```

### React-Redux

```javascript
// APP.js
// <Provider store={store}> context 传递全部的 store

import React, { Component } from "react";
import { BrowserRouter,Switch, Route,Redirect } from "react-router-dom";
import { Provider } from 'react-redux';

import Login from '../src/components/login/index.jsx'
import Register from '../src/components/register'
import Index from '../src/components/home/index.jsx'

import store from './store';

export default class App extends Component {
  render() {
    return(
      <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path='/login'  exact component={Login}></Route>
          <Route path='/register'exact  component={Register}></Route>
          <Route path='/'  component={Index}></Route>
        </Switch>
      </BrowserRouter>
      </Provider>
    );
  }
}


// login.jsx
// connect 告诫组件 将login包裹 将State和Action挂在this.props上
import { connect } from 'react-redux';

const mapState = (state) => ({
	loginStatus: state.getIn(['login', 'login'])
})

const mapDispatch = (dispatch) => ({
	login(username, password){
		dispatch(actionCreators.login(username, password))
	}
})

export default connect(mapState, mapDispatch)(Login);
```

### Immutable 基本使用

```javascript
import { fromJS } from 'immutable';

const defaultState = fromJS({
	login: localStorage.getItem('token')? true : false
});

.set('键名', value);
.getIn(['login', 'login'])  // 第一个参数和 combineReducers 合并多个中间件的键一致	

```

### styled-components

```javascript
import { injectGlobal } from 'styled-components';
// injectGlobal 全局注入样式
injectGlobal`
	body {
		line-height: 1;
	}
`;

import styled from "styled-components";
// styled 样式组件
export const LoginrWrapper = styled.div`
  min-width: 100vh;
  min-height: 100vh;
  background: #efefee;
`;

```

### 注意

- 一级路由配合 BrowserRouter Switch Route 和exact属性 （需要二级路由的路径无需exact）
- 二级路由配合 Switch Route 和exact属性 （需要三级级路由的路径无需exact） 同理