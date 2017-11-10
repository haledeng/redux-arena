import { ComponentType } from "react";
import { ActionCreatorsMapObject } from "redux";
import { PropsPicker, SceneReducer, SceneBundleOptions } from "../core";

export type Diff<T extends string, U extends string> = ({ [P in T]: P } &
  { [P in U]: never } & { [x: string]: never })[T];
export type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>;

export type DefaultPickedProps<S, A extends ActionCreatorsMapObject> = {
  actions: A;
} & S;

export type DefaultState = {};

export type DefaultActions<S> = { setState: (state: Partial<S>) => void };

export type SceneBundleBase<P> = {
  Component: ComponentType<P>;
  saga?: (...params: any[]) => any;
  options?: SceneBundleOptions;
};

export type SceneBundleNoS<P, A extends ActionCreatorsMapObject, PP> = {
  actions: A;
  propsPicker: PropsPicker<P, DefaultState, A, PP>;
  reducer: SceneReducer<DefaultState>;
} & SceneBundleBase<P>;

export type SceneBundleNoR<P, S, A extends ActionCreatorsMapObject, PP> = {
  state: S;
  actions: A;
  propsPicker: PropsPicker<P, S, A, PP>;
};

export type SceneBundleNoPP<P, S, A extends ActionCreatorsMapObject> = {
  state: S;
  actions: A;
  reducer: SceneReducer<DefaultState>;
} & SceneBundleBase<P>;

export type SceneBundleNoA<P, S, PP> = {
  state: S;
  reducer: SceneReducer<DefaultState>;
  propsPicker: PropsPicker<P, DefaultState, DefaultActions<S>, PP>;
} & SceneBundleBase<P>;

export type SceneBundleNoSR<P, A extends ActionCreatorsMapObject, PP> = {
  actions: A;
  propsPicker?: PropsPicker<P, DefaultState, DefaultActions<DefaultState>, PP>;
} & SceneBundleBase<P>;

export type SceneBundleNoSPP<P, S, A extends ActionCreatorsMapObject> = {
  actions: A;
  reducer: SceneReducer<S>;
} & SceneBundleBase<P>;

export type SceneBundleNoSA<P, PP> = {
  reducer: SceneReducer<DefaultState>;
  propsPicker: PropsPicker<P, DefaultState, DefaultActions<DefaultState>, PP>;
} & SceneBundleBase<P>;

export type SceneBundleNoAPP<P, S> = {
  state: S;
  reducer: SceneReducer<S>;
} & SceneBundleBase<P>;

export type SceneBundleNoASPP<P> = {
  reducer: SceneReducer<DefaultState>;
} & SceneBundleBase<P>;