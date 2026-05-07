<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/fridge', function () {
        return Inertia::render('Fridge/Index');
    })->name('fridge.index');

    Route::get('/recipes', function () {
        return Inertia::render('Recipe/Index');
    })->name('recipes.index');

    Route::get('/recipes/create', function () {
        return Inertia::render('Recipe/Create');
    })->name('recipes.create');

    Route::get('/calendar', function () {
        return Inertia::render('Calendar/Index');
    })->name('calendar.index');

    Route::get('/shopping', function () {
        return Inertia::render('Shopping/Index');
    })->name('shopping.index');

    Route::get('/prompt', function () {
        return Inertia::render('Prompt/Index');
    })->name('prompt.index');

    Route::get('/settings', function () {
        return Inertia::render('Settings/Index');
    })->name('settings.index');

    Route::get('/recipes/{id}', function ($id) {
        return Inertia::render('Recipe/Show', ['id' => $id]);
    })->name('recipes.show');
});

require __DIR__.'/auth.php';
