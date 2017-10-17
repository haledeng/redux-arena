import {
  ARENA_CURTAIN_LOAD_SCENE,
  ARENA_CURTAIN_INIT_SAGA,
  ARENA_CURTAIN_CLEAR_REDUX,
  ARENA_CURTAIN_SET_STATE,
  ARENA_STATETREE_NODE_DISABLE,
  ARENA_STATETREE_NODE_DELETE
} from "../actionTypes";
import {
  takeEvery,
  take,
  put,
  fork,
  select,
  cancel,
  setContext,
  getContext,
  ForkEffect
} from "redux-saga/effects";
import { Action } from "redux";
import { applySceneBundle } from "./sceneBundleSaga";

function* takeEverySceneBundleAction() {
  let _reducerKey = yield getContext("_reducerKey");
  let lastTask;
  while (true) {
    let action = yield take(ARENA_CURTAIN_LOAD_SCENE);
    if (action.arenaReducerDict._arenaCurtain.reducerKey === _reducerKey) {
      if (lastTask && lastTask.isRunning()) {
        yield cancel(lastTask);
      }
      lastTask = yield fork(applySceneBundle, action);
    }
  }
}

/**
 * Listen to the loading of each scene,
 * and handle different processing functions when handling scene switches.
 * 
 * @param {any} ctx 
 */

function* forkSagaWithContext(ctx) {
  yield setContext(ctx);
  yield fork(takeEverySceneBundleAction);
}

/**
 * It is used to initialize the ArenaSwitch layer.
 * 
 * @param {any} { reducerKey, setSagaTask } 
 */

interface InitArenaCurtainAction extends Action {
  reducerKey: string;
  setSagaTask: (object) => void;
}

function* initArenaCurtainSaga({
  reducerKey,
  setSagaTask
}: InitArenaCurtainAction) {
  let sagaTask = yield fork(forkSagaWithContext, {
    _reducerKey: reducerKey
  });
  setSagaTask(sagaTask);
}

/**
 * It is used to cancel the task of the ArenaSwitch layer.
 * 
 * @param {any} { sagaTaskPromise } 
 */

interface KillArenaCurtainAction extends Action {
  sagaTaskPromise: Promise<object>;
  reducerKey: string;
}

function* killArenaCurtainSaga({
  sagaTaskPromise,
  reducerKey
}: KillArenaCurtainAction) {
  let sagaTask = yield sagaTaskPromise;
  if (sagaTask) yield cancel(sagaTask);
  let store = yield getContext("store");
  yield put({
    type: ARENA_STATETREE_NODE_DISABLE,
    reducerKey
  });
  let { reduxInfo } = yield select(state => state[reducerKey]);
  if (reduxInfo.reducerKey != null) {
    yield put({
      type: ARENA_STATETREE_NODE_DELETE,
      reducerKey: reduxInfo.reducerKey
    });
    store.removeReducer(reduxInfo.reducerKey);
  }
  store.removeReducer(reducerKey);
}

export default function* saga() {
  yield takeEvery(ARENA_CURTAIN_INIT_SAGA, initArenaCurtainSaga);
  yield takeEvery(ARENA_CURTAIN_CLEAR_REDUX, killArenaCurtainSaga);
}