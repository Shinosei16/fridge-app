<?php

use App\Http\Controllers\Api\IngredientController;
use App\Http\Controllers\Api\RecipeController;
use App\Http\Controllers\Api\MealPlanController;
use App\Http\Controllers\Api\ShoppingListController;
use App\Http\Controllers\Api\PromptController;
use App\Http\Controllers\Api\DislikedIngredientController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('ingredients', IngredientController::class);
    Route::apiResource('recipes', RecipeController::class);
    Route::apiResource('meal-plans', MealPlanController::class);
    Route::apiResource('disliked-ingredients', DislikedIngredientController::class);

    // 買い物リスト
    Route::get('shopping-list', [ShoppingListController::class, 'index']);
    Route::post('shopping-list/items', [ShoppingListController::class, 'addItems']);
    Route::delete('shopping-list/items/{id}', [ShoppingListController::class, 'destroyItem']);
    Route::post('shopping-list/items/{id}/purchased', [ShoppingListController::class, 'purchased']);

    // プロンプト生成
    Route::post('prompts/recipe', [PromptController::class, 'recipe']);
    Route::post('prompts/shopping', [PromptController::class, 'shopping']);

    Route::post('recipes/{id}/complete', [RecipeController::class, 'complete']);
    Route::put('shopping-list/items/{id}', [ShoppingListController::class, 'updateItem']);
});
