function calcReducerKey(
  arenaReducerDict,
  reducerKey,
  vReducerKey,
  curReducerKey
) {
  let item = { actions: {}, reducerKey, vReducerKey };
  let newDict = Object.assign({}, arenaReducerDict, {
    [reducerKey]: item
  });
  if (vReducerKey) {
    newDict[vReducerKey] = item;
  }
  newDict[curReducerKey] = item;
  newDict._curScene = null;
  return newDict;
}

export function calcCurtainReducerDict(
  arenaReducerDict,
  curtainReducerKey,
  vReducerKey
) {
  return calcReducerKey(
    arenaReducerDict,
    curtainReducerKey,
    vReducerKey,
    "_curCurtain"
  );
}

export function calcSwitchReducerDict(
  arenaReducerDict,
  switchReducerKey,
  vReducerKey
) {
  return calcReducerKey(
    arenaReducerDict,
    switchReducerKey,
    vReducerKey,
    "_curSwitch"
  );
}
