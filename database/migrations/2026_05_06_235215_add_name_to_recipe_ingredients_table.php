<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
{
    Schema::table('recipe_ingredients', function (Blueprint $table) {
        $table->string('name')->nullable()->after('recipe_id');
        $table->unsignedBigInteger('ingredient_id')->nullable()->change();
    });
}

public function down(): void
{
    Schema::table('recipe_ingredients', function (Blueprint $table) {
        $table->dropColumn('name');
        $table->unsignedBigInteger('ingredient_id')->nullable(false)->change();
    });
}
};
