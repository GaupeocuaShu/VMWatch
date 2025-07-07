<?php

namespace App\Http\Controllers;

use App\Services\ResendEmailService;
use Illuminate\Http\Request;

class TestEmailController extends Controller
{
    public function sendTestEmail(ResendEmailService $resendService)
    {
        $to = "tranhoangvumy22@gmail.com";
        $subject = "Test Email";
        $htmlContent = "<h1>This is a test email</h1>";


        try {
            // Use the ResendService to send the email
            $response = $resendService->sendEmail($to, $subject, $htmlContent);

            return response()->json(['message' => 'Email sent successfully', 'response' => $response], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to send email: ' . $e->getMessage()], 500);
        }
    }
}
