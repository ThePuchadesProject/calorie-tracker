import { useState } from "react";
import { categories } from "../data/categories";
import type { ChangeEvent } from "react";
import type { Activity } from "../types";

export default function Form() {
  const [activity, setActivity] = useState<Activity>({
    category: 1,
    name: "",
    calories: 0,
  });
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
  return (
    <form className="space-y-5 bg-white shadow p-10 rounded-lg">
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
        value="Save Food or Exercise"
        className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer"
      />
    </form>
  );
}
