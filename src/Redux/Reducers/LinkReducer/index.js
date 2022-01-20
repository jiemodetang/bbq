
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import types from '../../Types'

const initialState ={
  colTyple:''
}



const LinkReducer =(state=initialState,action)=>{
  switch (action.type) {
    case types.link:
      return{...state,colTyple:action.payload}
    default:
      return state

  }


}


export default LinkReducer
