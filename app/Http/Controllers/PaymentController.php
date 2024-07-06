<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\Stripe; 
use Stripe\Checkout\Session;
class PaymentController extends Controller
{
    public function makePayment(Request $request){
        $lineItems = []; 
        $products = $request->all();
    
        foreach($products as $product) {

            $priceInCents = $product["price"]  * 100; 
            $lineItems[] = [
                'price_data' => [
                    'currency' => 'usd', 
                    'unit_amount' => $priceInCents, 
                    'product_data' => [
                        'name' => $product['name'], 
                        'description' => $product['description'], 
                        'images' => [$product['front']],
                    ]
                    ],
                'quantity' => $product['quantity'],
                ];
        };  

        Stripe::setApiKey(config('stripe.secret_key')); 

        $session = Session::create([
            'payment_method_types' => ['card','cashapp','us_bank_account'],
            'line_items' => $lineItems,
            'mode' => 'payment', 
            'success_url' => 'http://localhost:3000/payment/success', 
            'cancel_url' => 'http://localhost:3000/payment/cancel', 
        ]); 
        return response(['url' => $session->url]);
    } 

    public function paymentSuccesss(){
        
    }
    public function paymentCancel(){
        
    }
}
