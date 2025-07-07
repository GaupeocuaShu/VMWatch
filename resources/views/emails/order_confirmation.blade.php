<!DOCTYPE html>
<html>

<head>
    <title>Order Confirmation</title>
</head>

<body>
    <h1>Thank you, {{ $order->user->name }}!</h1>
    <p>Order ID: {{ $order['id'] }}</p>
    <p>Your order total is: <strong>{{ $order['total_amount'] }}$</strong></p>
    <p>Your order status is: <strong>{{ $order['status'] }}</strong></p>
    <p>We appreciate your business and look forward to serving you again.</p>
</body>

</html>
