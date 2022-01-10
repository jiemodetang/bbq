/*
 * @Author: your name
 * @Date: 2021-04-01 10:00:53
 * @LastEditTime: 2022-01-10 17:12:38
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /openSeaClone-master/src/Components/App/index.js
 */
import React from 'react';
import { Switch,Route } from 'react-router-dom'

import Home from '../Home'
import Navigation from '../Navigation'
// 我的集合
import Collections from '../MyCollection'

// 创建集合
import createCollection from '../CreateCollection'
const NB = ()=>{
  return 111
}

const App =()=>{


  return(
    <div>
    <Navigation/>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/NB' component={NB} />
      {/* 我的集合页面 */}
      <Route exact path='/collections' component={Collections} />

      {/* 创建集合页面 */}
      <Route exact path='/collection/create' component={createCollection} />
    </Switch>
    </div>
  )
}

export default App
