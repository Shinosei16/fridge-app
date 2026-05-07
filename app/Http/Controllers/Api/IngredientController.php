<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Ingredient;

class IngredientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $ingredients = Auth::user()->ingredients()->orderBy('purchased_at', 'desc')->get();
        return response()->json($ingredients);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $ingredient = Auth::user()->ingredients()->create([
            'name' => $request->name,
            'quantity' => $request->quantity,
            'default_unit' => $request->default_unit,
            'purchased_at' => $request->purchased_at,
            'expiry_date' => $request->expiry_date,
        ]);
        return response()->json($ingredient, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $ingredient = Auth::user()->ingredients()->findOrFail($id);
        $ingredient->update([
            'name' => $request->name,
            'quantity' => $request->quantity,
            'default_unit' => $request->default_unit,
            'purchased_at' => $request->purchased_at,
            'expiry_date' => $request->expiry_date,
        ]);
        return response()->json($ingredient);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $ingredient = Auth::user()->ingredients()->findOrFail($id);
        $ingredient->delete();
        return response()->json(null, 204);
    }
}
