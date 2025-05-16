<?php

namespace App\Http\Controllers;

use App\Http\Resources\CartResource;
use Illuminate\Http\Request;
use App\Http\Resources\DetailWatchResource; 
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Watch;
class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userID = auth()->user()->id; 
        $cart = Cart::with('cartItems')
                    ->where('user_id', $userID)->first();
        $watchIDs = $cart->cartItems->pluck('watch_id')->all() ;
        $watches = Watch::
            with([
            'energy', 'dialSize', 'glassMaterial', 'watchGalleries', 'strap', 'brand', 'waterResistanceLevel', 'caseColor',
            'dialColor', 'dialShape', 'features','cartItem'
            ])->whereIn("id", $watchIDs)->get();
        return CartResource::collection($watches);
    }
    

    public function addToCart(Request $request){
        $userID = auth()->user()->id;  
        $cart = Cart::firstOrCreate(['user_id' => $userID]);
        $watchID = $request->id; 
        $cartItem = CartItem::create([
            'cart_id' => $cart->id, 
            'watch_id' => $watchID, 
            'quantity' => 1, 
            'total' => $request->price,
        ]);
        return response(['status' => "success",'cartItemID' => $cartItem->id],200);

    }

    public function increaseItemQuantity(string $id){ 
        $cartItem = CartItem::with('watch')->findOrFail($id); 
        $cartItem->update([
            'quantity' => $cartItem->quantity + 1, 
            'total' => $cartItem->total + $cartItem->watch->price, 
        ]);
        return response(['status' => "success"],200);
    }

    public function decreaseItemQuantity(string $id){ 
        $cartItem = CartItem::with('watch')->findOrFail($id); 
        $cartItem->update([
            'quantity' => $cartItem->quantity - 1, 
            'total' => $cartItem->total - $cartItem->watch->price, 
        ]);
        return response(['status' => "success"],200);
    }
    public function removeFromCart(string $id){
        $cartItem = CartItem::findOrFail($id); 
        $cartItem->delete();
        return response(['status' => "success"],200);

    }

    public function clearCart(){
        $cart = Cart::with('cartItems')->where('user_id',auth()->user()->id)->first(); 
        $cart->cartItems()->delete();
        $cart->delete();
        return response(['status' => "success"],200);

    }
}   
