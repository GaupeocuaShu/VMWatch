<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Stripe\Stripe; 
use Stripe\Checkout\Session;
use Stripe\Price;
use Stripe\Product;
class PaymentController extends Controller
{
    public function makePayment(Request $request){
        // Stripe::setApiKey(config('stripe.secret_key')); 
        // $products = $request->all();
        // $lineItems = [];
        // foreach($products as $product) {
        //     $priceInCents = $product["price"] * 100; 
        //     $stripeProduct = Product::create([
        //         'name' => $product['name'],
        //     ]);
        //     $price = Price::create([
        //         'unit_amount' =>$priceInCents,
        //         'currency' => 'usd',
        //         'product' => $stripeProduct->id,
        //     ]);
    
        //     $lineItems[] = [
        //         'price' => $price->id,
        //         'quantity' => $product['quantity'], 
             
        //     ];
        // }
    
        // $session = Session::create([
        //     'payment_method_types' => ['card'],
        //     'line_items' => [$lineItems],
        //     'mode' => 'payment',
        //     'success_url' => route('checkout-success'),
        //     'cancel_url' => route('checkout-cancel'),
        // ]);
        $stripePriceId = 'price_1Pb1nHHDMdg24UFcGKGWIcH6';
 
        $quantity = 1;
        
        $session = $request->user()->checkout([$stripePriceId => $quantity], [
            'success_url' => route('checkout-success'),
            'cancel_url' => route('checkout-cancel'),
        ]);
        return response($session->url);
    }
    

    public function paymentSuccesss(){
        
    }
    public function pasymentCancel(){
        
    }
}
