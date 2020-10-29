import rootReducer, { RootStoreState } from "../redux/reducers/RootReducer";
import { preloadedState } from "../redux/initialState";
import { createEpicMiddleware, EpicMiddleware } from "redux-observable";
import { createStore, applyMiddleware, Action } from "redux";
import rootEpics from "../redux/epics/RootEpics";
import axios from "axios-observable";

export type EpicDepenciesType = {
  http: typeof axios;
};

type IEpicMiddleware = EpicMiddleware<
  Action<any>,
  Action<any>,
  RootStoreState,
  EpicDepenciesType
>;

export default (initStore = preloadedState) => {
  const epicMiddleware: IEpicMiddleware = createEpicMiddleware({
    dependencies: { http: axios },
  });

  const store = createStore(
    rootReducer,
    initStore,
    applyMiddleware(epicMiddleware)
  );

  epicMiddleware.run(rootEpics);

  return store;
};
