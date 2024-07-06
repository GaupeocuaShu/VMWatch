<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StripeWebhookController;
use App\Http\Middleware\VerifyStripeWebhookSignature;

Route::post('stripe/webhook', [StripeWebhookController::class, 'handleWebhook'])
->middleware(VerifyStripeWebhookSignature::class);

require __DIR__.'/auth.php';



