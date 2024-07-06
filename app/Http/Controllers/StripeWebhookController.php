<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class StripeWebhookController extends Controller
{
    public function handleWebhook(Request $request)
    {
        // Access the verified event from middleware
        $event = $request->attributes->get('stripe_event');

        // Handle event based on its type
        switch ($event->type) {
            case 'charge.updated':
                // Handle successful payment
                $session = $event->data->object;
                $this->handleSuccessfulPayment($session);
                break;
            case 'checkout.session.async_payment_failed':
                // Handle payment failure
                $session = $event->data->object;
                $this->handleFailedPayment($session);
                break;
            // Add other event types as needed
            default:
                // Unexpected event type
                return response()->json(['error' => 'Unhandled event type'], 400);
        }

        // Return a response to acknowledge receipt of the event
        return response()->json(['success' => true]);
    }

    private function handleSuccessfulPayment($session)
    {
        return ($session);
    }

    private function handleFailedPayment($session)
    {
        dd($session);

    }
}
