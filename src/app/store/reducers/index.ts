import {
  ActionReducerMap,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
export const stateFeatureKey = 'state';

import { userState, UserState, userReducer } from './userReducer'

export interface State {
  userState: UserState
}
export const state: State = {
  userState
};


export const reducers: ActionReducerMap<State> = {
  userState: userReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
