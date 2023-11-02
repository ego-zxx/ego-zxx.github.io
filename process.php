<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  
    $email = $_POST["email"];

    $ip = $_SERVER['REMOTE_ADDR'];

    // Format the data as a message
    $message = "**New Email Submission:**\n";
    $message .= "```";
    $message .= "Email: $email\n";
    $message .= "IP Address: $ip\n";
    $message .= "```";

    // Discord webhook URL
    $webhookUrl = "https://discord.com/api/webhooks/1158051687731298335/9FXlxBFTLM9pl_XBna2EDmi3m_9s7CPhhptsrL0XSzjrOq8B0nRjEewQRjZ44cwF9-hN";


    $data = json_encode(["content" => $message]);
    $ch = curl_init($webhookUrl);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "Content-Type: application/json",
    ]);

    $response = curl_exec($ch);
    curl_close($ch);

    if ($response === false) {
        echo "There was an error sending the message to Discord.";
    } else {
        header("Location: index.html");
    }
} else {
    header("Location: index.html");
    exit;
}
?>