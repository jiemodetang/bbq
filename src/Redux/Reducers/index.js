/*
 * @Author: your name
 * @Date: 2021-04-01 10:00:53
 * @LastEditTime: 2022-01-20 17:21:02
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /openSeaClone-master/src/Redux/Reducers/index.js
 */
import {combineReducers} from 'redux'

import mobileNavReducer from './MobileNavReducer'
import mobileLinksReducer from './MobileLinks'

import linkReducer from './LinkReducer'

const rootReducer = combineReducers({
  mobileNavReducer,
  mobileLinksReducer,
  linkReducer
})

export default rootReducer
