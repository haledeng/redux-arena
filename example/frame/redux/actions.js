import { ADD_CNT, FRAME_CLEAR_CNT } from "./actionTypes";

export function addCnt() {
  return {
    type: ADD_CNT
  };
}

export function clearCnt() {
  return {
    type: FRAME_CLEAR_CNT
  };
}
