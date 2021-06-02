export const SET_NP_BEN_SEL = "SET_NP_BEN_SEL";
export const ADD_NP_BEN = "ADD_NP_BEN";
export const SEND_NP_FORM = "SEND_NP_FORM";

export function saveNpBenefSel(arr) {
  return { type: SET_NP_BEN_SEL, payload: arr };
}

export function addNpBen(arr) {
  return { type: ADD_NP_BEN, payload: arr };
}

export function sendedNpForm(boolean) {
  return { type: SEND_NP_FORM, payload: boolean };
}

