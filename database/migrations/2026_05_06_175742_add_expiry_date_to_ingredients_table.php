<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('ingredients', function (Blueprint $table) {
            $table->dropColumn('expiry_days');
            $table->date('expiry_date')->nullable()->after('purchased_at');
        });
    }

    public function down(): void
    {
        Schema::table('ingredients', function (Blueprint $table) {
            $table->dropColumn('expiry_date');
            $table->integer('expiry_days')->default(3)->after('purchased_at');
        });
    }
};
