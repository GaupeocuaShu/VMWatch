<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrderResource;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $user = Auth::user();
        $orders = Order::where('user_id', $user->id)->paginate(5);
        return OrderResource::collection($orders);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = Auth::user();
        // Create a new order 
        $order = Order::create([
            'user_id' => $user->id,
            'transaction_id' => $request->input('transaction_id'),
            'total_amount' => $request->input('total'),
            'phone_number' => $request->input('customerInfo')['phoneNumber'],
            'payment_method' => "stripe",
            'shipping_address' => $request->input('customerInfo')['address'],
            'shipping_city' => $request->input('customerInfo')['city'],
            'shipping_state' => $request->input('customerInfo')['state'],
            'shipping_zip' => $request->input('customerInfo')['zipCode'],
            'shipping_country' => "United States",
        ]);
        // Create order items
        foreach ($request->input('cart') as $item) {
            $order->items()->create([
                'watch_id' => $item['id'],
                'quantity' => $item['quantity'],
                'price' => $item['price'],
            ]);
        }
        // Clear the cart
        $user->clearCart();

        return response()->json([
            'status' => 'success',
            'message' => 'Order created successfully',
            'order' => $order,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        //
    }
}
