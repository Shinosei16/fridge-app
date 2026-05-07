<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Recipe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RecipeController extends Controller
{
    public function index()
    {
        $recipes = Auth::user()->recipes()
            ->where('is_completed', false)
            ->with('recipeIngredients', 'mealPlan')
            ->get();
        return response()->json($recipes);
    }

    public function store(Request $request)
    {
        $recipe = Auth::user()->recipes()->create([
            'title' => $request->title,
            'description' => $request->description,
        ]);

        foreach ($request->ingredients as $ingredient) {
            $recipe->recipeIngredients()->create([
                'name' => $ingredient['name'],
                'quantity' => $ingredient['quantity'],
                'unit' => $ingredient['unit'],
                'is_seasoning' => $ingredient['is_seasoning'],
            ]);
        }

        if ($request->planned_date) {
            Auth::user()->mealPlans()->create([
                'recipe_id' => $recipe->id,
                'planned_date' => $request->planned_date,
            ]);
        }

        return response()->json($recipe->load('recipeIngredients'), 201);
    }

    public function show(string $id)
    {
        $recipe = Auth::user()->recipes()->with('recipeIngredients', 'mealPlan')->findOrFail($id);
        return response()->json($recipe);
    }

    public function update(Request $request, string $id)
    {
        $recipe = Auth::user()->recipes()->findOrFail($id);
        $recipe->update([
            'title' => $request->title,
            'description' => $request->description,
        ]);
        return response()->json($recipe);
    }

    public function destroy(string $id)
    {
        $recipe = Auth::user()->recipes()->findOrFail($id);
        $recipe->delete();
        return response()->json(null, 204);
    }

    public function complete(string $id)
    {
        $recipe = Auth::user()->recipes()->with('recipeIngredients')->findOrFail($id);

        foreach ($recipe->recipeIngredients as $recipeIngredient) {
            if (!$recipeIngredient->is_seasoning) {
                $ingredient = Auth::user()->ingredients()
                    ->where('name', $recipeIngredient->name)
                    ->first();

                if ($ingredient) {
                    $newQuantity = $ingredient->quantity - $recipeIngredient->quantity;
                    if ($newQuantity <= 0) {
                        $ingredient->delete();
                    } else {
                        $ingredient->update(['quantity' => $newQuantity]);
                    }
                }
            }
        }

        $recipe->update(['is_completed' => true]);

        return response()->json(['message' => '作成済みにしました']);
    }
}