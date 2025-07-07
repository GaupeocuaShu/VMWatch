<?php

namespace App\Services;

use Resend;

class ResendEmailService
{
    protected $resend;

    public function __construct()
    {
        $this->resend = Resend::client(env('RESEND_API_KEY'));
    }

    public function sendEmail($to, $subject, $htmlContent)
    {
        return $this->resend->emails->send([
            'from' => env('RESEND_FROM'),
            'to' => $to,
            'subject' => $subject,
            'html' => $htmlContent,
        ]);
    }
}
