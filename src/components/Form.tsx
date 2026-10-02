import type { ChangeEvent, Dispatch, SubmitEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { categories } from "../data/categories";
import type { Activity } from "../types";
import type {
  ActivityActions,
  ActivityState,
} from "../reducers/activity-reducer";

type FormProps = { dispatch: Dispatch<ActivityActions>; state: ActivityState };

const initialState: Activity = {
  id: uuidv4(),
  category: 1,
  name: "",
  calories: 0,
};

export default function Form({ dispatch, state }: FormProps) {
  const [activity, setActivity] = useState<Activity>(initialState);

  useEffect(() => {
    if (state.activeId) {
      const selectedActivity = state.activities.filter(
        (stateActivity) => stateActivity.id === state.activeId,
      )[0];
      setActivity(selectedActivity);
    }
  }, [state.activeId]);

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>,
  ) => {
    const isNumberField = ["category", "calories"].includes(e.target.id);

    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value, // Propiedad Computada
      // Si pusiera e.target.id, se pensaria que quiero crear una variable con ese mismo nombre, y de esta forma busca el elemento que desencadena el evento
    });
  };

  const isValidActivity = () => {
    const { name, calories } = activity;
    return name.trim() !== "" && calories > 0;
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch({ type: "save-activity", payload: { newActivity: activity } });

    setActivity({ ...initialState, id: uuidv4() });
  };

  const handleCancelEdit = () => {
    dispatch({ type: "clear-activeId" });
    setActivity({ ...initialState, id: uuidv4() });
  };

  return (
    <form
      className="space-y-5 bg-white shadow p-10 rounded-lg"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className="font-bold">
          Category:
        </label>
        <select
          id="category"
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          value={activity.category}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name" className="font-bold">
          Activity:
        </label>

        <input
          id="name"
          type="text"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="E.g. Food, Orange Juice, Salad, Exercise, Weights, Bicycle"
          value={activity.name}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="font-bold">
          Calories:
        </label>

        <input
          id="calories"
          type="number"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Calories (e.g., 300, 500)"
          value={activity.calories}
          onChange={handleChange}
        />
      </div>

      <input
        type="submit"
        value={activity.category === 1 ? "Save Food" : "Save Exercise"}
        className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-20"
        disabled={!isValidActivity()}
      />

      {state.activeId && (
        <button
          type="button"
          className="bg-slate-500 hover:bg-slate-600 w-full p-2 font-bold uppercase text-white cursor-pointer"
          onClick={handleCancelEdit}
        >
          Cancel
        </button>
      )}
    </form>
  );
}
