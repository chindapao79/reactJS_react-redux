import { combineReducers } from "redux";
import { articleReducer } from "./ArticleReducer";

export const rootReducers = combineReducers({
    articleR: articleReducer
});