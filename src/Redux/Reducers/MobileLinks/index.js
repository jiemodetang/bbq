import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import types from '../../Types'

const initialState ={
  linksData:[{title:'Browse'},{title:'Activity'},{title:'Rankings'},
  {title:'Blog'},
  {title:'Community',icon:<NavigateNextIcon style={{fontSize:"30px"}}/>,payload:types.community},
  {title:'Create',icon:<NavigateNextIcon style={{fontSize:"30px"}}/>,payload:types.create},
  {title:'Account',icon:<NavigateNextIcon style={{fontSize:"30px"}}/>,payload:types.account}],
  showSecondView:false
}



const mobileLinksReducers =(state=initialState,action)=>{

  switch (action.payload) {
    case types.account:
      return{...state,showSecondView:true}

    case types.community:
      return{...state,showSecondView:true}

    case types.create:
      return{...state,showSecondView:true}
    default:
      return state

  }


}


export default mobileLinksReducers
