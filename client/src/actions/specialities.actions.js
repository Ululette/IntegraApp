import { GET_SPECIALITIES,FIND_SPECIALITY, DELETE_SPECIALITY } from "./constants.actions";
import supabase from "../supabase.config";

export function getMedicSpecialities() {
    return async (dispatch) => {
    try {
        const { data: medic_specialities } = await supabase
        .from("medical_specialities")
        .select("*");
        dispatch({ type: GET_SPECIALITIES, payload: medic_specialities });
    } catch (err) {
    console.error(err);
    }
    };
}

export function findSpeciality(name) {
    return async (dispatch) => {
    try {
        const { data: speciality } = await supabase
        .from("medical_specialities")
        .select("name")
        .eq('name', name);
        console.log('pase por addSpeciality', speciality)
        dispatch({ type: FIND_SPECIALITY, payload: speciality });
    } catch (err) {
        console.error(err);
    }
    };
}

export function addSpeciality(name) {
    return async (dispatch) => {
    try {
        const { data, error } = await supabase
        .from('medical_specialities')
        .insert([{ name: name}])
        dispatch({ type: 'OK'});
    } catch (err) {
        console.error(err);
    }
    };
}

export function deleteSpeciality(id) {
    return async (dispatch) => {
    try {
        const { data:specialities, error } = await supabase
        .from('medical_specialities')
        .select(`
            *,
            medics_medical_specialities (
            id,dni)
        `)
        .match({ id: id } )
        dispatch({ type: DELETE_SPECIALITY, payload: specialities });
        console.log('pase por delete',specialities)
    } catch (err) {
        console.error(err);
    }
    };
}


