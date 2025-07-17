<?php
// send.php

// Настройки
$email_to = "vajravarahi@mail.ru"; // твой email
$telegram_chat_id = ""; // если хочешь получать в Telegram — добавь chat_id
$telegram_token = ""; // и токен бота

$name = htmlspecialchars($_POST['name']);
$contact = htmlspecialchars($_POST['contact']);
$descr = htmlspecialchars($_POST['descr']);

$headers = "Content-Type: text/plain; charset=utf-8\r\n";
$subject = "Новая заявка с сайта";

$message = "Имя: $name\n";
$message .= "Контакт (email/телефон): $contact\n";
$message .= "Сообщение:\n$descr\n";

$mail_sent = mail($email_to, $subject, $message, $headers);

// Отправка в Telegram (если нужно)
if (!empty($telegram_chat_id) && !empty($telegram_token)) {
    $telegram_message = urlencode("Новая заявка!\nИмя: $name\nКонтакт: $contact\nСообщение:\n$descr");
    file_get_contents("https://api.telegram.org/bot$telegram_token/sendMessage?chat_id=$telegram_chat_id&text=$telegram_message");
}

if ($mail_sent) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => 'Ошибка отправки email']);
}
?>