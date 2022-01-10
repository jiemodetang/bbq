import {combineReducers} from 'redux'

import mobileNavReducer from './MobileNavReducer'
import mobileLinksReducer from './MobileLinks'



const rootReducer = combineReducers({
  mobileNavReducer,
  mobileLinksReducer
})

export default rootReducer
