

import types from '../../Types'


const initialState={
  show:false
}

const mobileNavReducer =(state = initialState,action)=>{
  switch(action.type){
    case types.showTrue:
      if(state.show){
        return{...state,show:false}
      }else{
        return{...state,show:true}
      }

    case types.showFalse:
      return{...state,show:false}

    default:
      return state
  }
}

export default mobileNavReducer
