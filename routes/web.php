<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StripeWebhookController;
use App\Http\Middleware\VerifyStripeWebhookSignature;
use Illuminate\Http\Request;
use Laravel\Cashier\Cashier;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\TestEmailController;

Route::get('test-email', [TestEmailController::class, 'sendTestEmail'])
    ->name('test.email');

require __DIR__ . '/auth.php';
