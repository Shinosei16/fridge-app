<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RecipeIngredient extends Model
{
    protected $fillable = [
        'recipe_id',
        'name',
        'quantity',
        'unit',
        'is_seasoning',
    ];

    public function recipe()
    {
        return $this->belongsTo(Recipe::class);
    }
}