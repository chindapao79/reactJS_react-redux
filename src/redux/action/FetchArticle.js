import axios from 'axios'
import { baseURL } from '../..'
import { actionType } from './ActionType'
export const fetchArticle = () => {
    return (dispatch) => {
        axios.get(`${baseURL}todos`).then(result => dispatch({
            type: actionType.fetch_article,
            DATA: result.data
        }));
    }
}