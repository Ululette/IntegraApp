import { GET_USERS } from './constants.actions';
import supabase from "../supabase.config";

export function getAllUsers() {
    return async (dispatch) => {
    try {
        const { data: users } = await supabase
        .from("users")
        .select("dni,email,role,account");
        dispatch({ type: GET_USERS, payload: users });
    } catch (err) {
    console.error(err);
    }
    };
}