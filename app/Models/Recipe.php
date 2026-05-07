<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Recipe extends Model
{
    protected $fillable = [
        'user_id',
        'title',
        'description',
        'is_completed',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function mealPlan()
    {
        return $this->hasOne(MealPlan::class);
    }

    public function recipeIngredients()
    {
        return $this->hasMany(\App\Models\RecipeIngredient::class);
    }
}
