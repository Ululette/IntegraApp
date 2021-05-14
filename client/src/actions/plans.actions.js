
import {SET_NP_BEN_SEL,ADD_NP_BEN,SEND_NP_FORM } from './constants.actions'

export function saveNpBenefSel(arr) {
  return { type: SET_NP_BEN_SEL, payload: arr };
}

export function addNpBen(arr) {
  return { type: ADD_NP_BEN, payload: arr };
}

export function sendedNpForm(boolean) {
  return { type: SEND_NP_FORM, payload: boolean };
}

