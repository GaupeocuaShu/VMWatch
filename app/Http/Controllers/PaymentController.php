<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\PaymentIntent;

class PaymentController extends Controller
{
    public function makePayment(Request $request)
    {

        Stripe::setApiKey(env('STRIPE_SECRET_KEY'));
        $paymentIntent = PaymentIntent::create([
            'amount' => $request->input('cart')[0]['total'],
            'currency' => 'usd',
            'payment_method_types' => ['card'],
        ]);
        return response()->json([
            'clientSecret' => $paymentIntent->client_secret,
        ]);
    }
}
