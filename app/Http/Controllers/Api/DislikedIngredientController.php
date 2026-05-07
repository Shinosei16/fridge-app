<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DislikedIngredient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DislikedIngredientController extends Controller
{
    public function index()
    {
        $disliked = Auth::user()->dislikedIngredients()->get();
        return response()->json($disliked);
    }

    public function store(Request $request)
    {
        $disliked = Auth::user()->dislikedIngredients()->create([
            'name' => $request->name,
        ]);
        return response()->json($disliked, 201);
    }

    public function destroy(string $id)
    {
        $disliked = Auth::user()->dislikedIngredients()->findOrFail($id);
        $disliked->delete();
        return response()->json(null, 204);
    }

    public function show(string $id) {}
    public function update(Request $request, string $id) {}
}