<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MealPlan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MealPlanController extends Controller
{
    public function index()
    {
        $mealPlans = Auth::user()->mealPlans()->with('recipe')->get();
        return response()->json($mealPlans);
    }

    public function store(Request $request)
    {
        $mealPlan = Auth::user()->mealPlans()->create([
            'recipe_id' => $request->recipe_id,
            'planned_date' => $request->planned_date,
        ]);
        return response()->json($mealPlan->load('recipe'), 201);
    }

    public function show(string $id)
    {
        $mealPlan = Auth::user()->mealPlans()->with('recipe')->findOrFail($id);
        return response()->json($mealPlan);
    }

    public function update(Request $request, string $id)
    {
        $mealPlan = Auth::user()->mealPlans()->findOrFail($id);
        $mealPlan->update([
            'planned_date' => $request->planned_date,
        ]);
        return response()->json($mealPlan);
    }

    public function destroy(string $id)
    {
        $mealPlan = Auth::user()->mealPlans()->findOrFail($id);
        $mealPlan->delete();
        return response()->json(null, 204);
    }
}