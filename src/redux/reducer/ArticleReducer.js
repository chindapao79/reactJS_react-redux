import { actionType } from "../action/ActionType"

const initState = {
    dataPhoto: []
}

export const articleReducer = (state = initState, action) => {
    switch (action.type) {
        case actionType.fetch_article:
            return { ...state, dataPhoto: action.DATA }
        default:
            return state;
    }
}