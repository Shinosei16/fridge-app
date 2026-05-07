<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ShoppingList;
use App\Models\ShoppingListItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ShoppingListController extends Controller
{
    // リストとアイテムを取得
    public function index()
    {
        $list = Auth::user()->shoppingList()->with('items')->first();
        return response()->json($list);
    }

    // アイテムを追加
    public function addItems(Request $request)
    {
        $list = Auth::user()->shoppingList()->firstOrCreate(['user_id' => Auth::id()]);

        foreach ($request->items as $item) {
            $list->items()->create([
                'name' => $item['name'],
                'quantity' => $item['quantity'],
                'unit' => $item['unit'],
            ]);
        }

        return response()->json($list->load('items'), 201);
    }

    // アイテムを削除（買った・買わなかった両方）
    public function destroyItem(string $id)
    {
        $list = Auth::user()->shoppingList;
        $item = $list->items()->findOrFail($id);
        $item->delete();
        return response()->json(null, 204);
    }

    // 買ったアイテムを冷蔵庫に追加して削除
    public function purchased(Request $request, string $id)
    {
        $list = Auth::user()->shoppingList;
        $item = $list->items()->findOrFail($id);

        Auth::user()->ingredients()->create([
            'name' => $item->name,
            'quantity' => $item->quantity,
            'default_unit' => $item->unit,
            'purchased_at' => now(),
            'expiry_days' => 3,
        ]);

        $item->delete();
        return response()->json(null, 204);
    }

    public function updateItem(Request $request, string $id)
    {
        $list = Auth::user()->shoppingList;
        $item = $list->items()->findOrFail($id);
        $item->update([
            'quantity' => $request->quantity,
            'unit' => $request->unit,
        ]);
        return response()->json($item);
    }
}