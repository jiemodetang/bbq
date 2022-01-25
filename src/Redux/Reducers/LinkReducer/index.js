import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import types from "../../Types";

const initialState = {
    colTyple: "",
    search:''
};

const LinkReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.link:
            return { ...state, colTyple: action.payload };
        case types.search:
            return { ...state, search: action.payload };
        default:
            return state;
    }
};

export default LinkReducer;
