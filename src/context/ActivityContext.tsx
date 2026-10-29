import {
  createContext,
  useCallback,
  useMemo,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";
import {
  activityReducer,
  initialState,
  type ActivityActions,
  type ActivityState,
} from "../reducers/activity-reducer";
import type { Activity } from "../types";
import { categories } from "../data/categories";

type ActivityProviderProps = {
  children: ReactNode;
};

type ActivityContextProps = {
  state: ActivityState;
  dispatch: Dispatch<ActivityActions>;
  caloriesConsumed: number;
  caloriesBurned: number;
  netCalories: number;
  categoryName: (category: number) => string;
  isEmptyActivities: boolean;
};
export const ActivityContext = createContext<ActivityContextProps>(null!);

export const ActivityProvider = ({ children }: ActivityProviderProps) => {
  const [state, dispatch] = useReducer(activityReducer, initialState);

  // Contadores
  const caloriesConsumed = useMemo(
    () =>
      state.activities.reduce(
        (total, activity) =>
          activity.category === 1 ? total + activity.calories : total,
        0,
      ),
    [state.activities],
  );

  const caloriesBurned = useMemo(
    () =>
      state.activities.reduce(
        (total, activity) =>
          activity.category === 2 ? total + activity.calories : total,
        0,
      ),
    [state.activities],
  );

  const netCalories = useMemo(
    () => caloriesConsumed - caloriesBurned,
    [state.activities],
  );

  const categoryName = useCallback(
    (category: Activity["category"]) => {
      const target = categories.find((cat) => cat.id === category);
      return target ? target.name : "";
    },
    [], // [] significa que creo la función una sola vez al cargar el componente y nunca mas
  );

  const isEmptyActivities = useMemo(
    () => state.activities.length === 0,
    [state.activities],
  );

  return (
    <ActivityContext.Provider
      value={{
        state,
        dispatch,
        caloriesConsumed,
        caloriesBurned,
        netCalories,
        categoryName,
        isEmptyActivities,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};
