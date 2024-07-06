<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Stripe\Exception\SignatureVerificationException;
use Stripe\Webhook;
class VerifyStripeWebhookSignature
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
        $payload = $request->getContent();
        $sig_header = $request->header('Stripe-Signature');

        $endpoint_secret = config('stripe.webhook_secret');
        
        try {
            $event = Webhook::constructEvent(
                $payload, $sig_header, $endpoint_secret
            );
        } catch (SignatureVerificationException $e) {
            return response()->json(['error' => 'Webhook signature verification failed.'], 403);
        }

        // Store the event details or pass them to the controller
        $request->attributes->add(['stripe_event' => $event]);

        return $next($request);
    }
}
