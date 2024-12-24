"use client";
import { useState } from "react";

export default function MealPlans() {
  const [days, setDays] = useState(5);
  const [preferences, setPreferences] = useState("");
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState("");

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:4000/generate-meal-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ days, preferences }),
      });
      if (!response.ok) {
        throw new Error("Failed to generate meal plan");
      }
      const data = await response.json();
      setPlan(data.mealPlan);
    } catch (error) {
      console.error(error);
      alert("Error generating meal plan. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Weekly Meal Plans</h1>
      <form onSubmit={handleGenerate} className="space-y-4">
        <div>
          <label className="block font-medium">Number of Days</label>
          <select
            className="border border-gray-300 px-2 py-1 rounded"
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
          >
            <option value={3}>3 Days</option>
            <option value={5}>5 Days</option>
            <option value={7}>7 Days</option>
          </select>
        </div>
        <div>
          <label className="block font-medium">Preferences</label>
          <textarea
            className="border border-gray-300 p-2 rounded w-full"
            rows={3}
            placeholder="Any dietary restrictions or notes..."
            value={preferences}
            onChange={(e) => setPreferences(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Plan"}
        </button>
      </form>
      {plan && (
        <div className="mt-6 p-4 bg-white border border-gray-300 rounded">
          <h2 className="text-xl font-bold mb-2">Your Meal Plan</h2>
          <pre className="whitespace-pre-wrap">{plan}</pre>
        </div>
      )}
    </div>
  );
}
