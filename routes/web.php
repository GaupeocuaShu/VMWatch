<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StripeWebhookController;
use App\Http\Middleware\VerifyStripeWebhookSignature;
use Illuminate\Http\Request;
use Laravel\Cashier\Cashier; 
use App\Http\Controllers\PaymentController;



require __DIR__.'/auth.php';



