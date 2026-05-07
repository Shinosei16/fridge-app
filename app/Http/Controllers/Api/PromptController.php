<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PromptController extends Controller
{
    public function recipe(Request $request)
    {
        $selectedIngredients = $request->selected_ingredients; // 選んだ食材
        $otherRequest = $request->other_request; // その他自由入力

        $disliked = Auth::user()->dislikedIngredients()->pluck('name')->join('、');
        $ingredients = collect($selectedIngredients)->map(fn($i) => "{$i['name']}{$i['quantity']}{$i['default_unit']}")->join('、');

        $prompt = "冷蔵庫に{$ingredients}があります。";
        if ($disliked) {
            $prompt .= "{$disliked}は使わないでください。";
        }
        if ($otherRequest) {
            $prompt .= "{$otherRequest}。";
        }
        $prompt .= 'レシピを以下のJSON形式で返してください。単位はg・ml・個・本・枚・袋・適量のいずれかで統一してください。{"title":"","steps":"","ingredients":[{"name":"","quantity":0,"unit":"","is_seasoning":false}]}';

        return response()->json(['prompt' => $prompt]);
    }

    public function shopping(Request $request)
    {
        $days = $request->days ?? 3; // 何日分か
        $otherRequest = $request->other_request;

        $disliked = Auth::user()->dislikedIngredients()->pluck('name')->join('、');

        $prompt = "{$days}日分の買い物リストを作成してください。";
        if ($disliked) {
            $prompt .= "{$disliked}は含めないでください。";
        }
        if ($otherRequest) {
            $prompt .= "{$otherRequest}。";
        }
        $prompt .= '以下のJSON形式で返してください。単位はg・ml・個・本・枚・袋・適量のいずれかで統一してください。{"items":[{"name":"","quantity":0,"unit":""}]}';

        return response()->json(['prompt' => $prompt]);
    }
}