<?php
header('Content-Type: application/json');

// Разбираем параметры
$name      = $_POST['name'] ?? '';
$phone     = $_POST['phone'] ?? '';
$routeName = $_POST['routeName'] ?? '';
$tourType  = $_POST['tourType'] ?? '';
$price     = $_POST['price'] ?? '';
$text      = $_POST['message'] ?? '';

require 'phpmailer/Exception.php';
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

// $mail->SMTPDebug = 3; // для отладки

try {
    $mail->isSMTP();
    $mail->Host = 'smtp.mail.ru';
    $mail->SMTPAuth = true;
    $mail->Username = 'vajravarahi@mail.ru';
    $mail->Password = 'x7jvcsUgxQFZYBduwpbX';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = 465;

    $mail->setFrom('vajravarahi@mail.ru', 'Нвсб-маршруты');
    $mail->addAddress('vajravarahi@mail.ru');
    $mail->addAddress('ayakata@yandex.ru');

    $mail->isHTML(true);
    $mail->Subject = 'заявка на проведение маршрута';
    $mail->Body = '
        Заявка на маршрут от <br> 
        <p><strong>Имя:</strong> ' . htmlspecialchars($name, ENT_QUOTES, 'UTF-8') . '</p>
        <p><strong>Телефон:</strong> ' . htmlspecialchars($phone, ENT_QUOTES, 'UTF-8') . '</p>
        <p><strong>Маршрут:</strong> ' . htmlspecialchars($routeName, ENT_QUOTES, 'UTF-8') . '</p>
        <p><strong>Тип тура:</strong> ' . htmlspecialchars($tourType, ENT_QUOTES, 'UTF-8') . '</p>
        <p><strong>Цена:</strong> ' . htmlspecialchars($price, ENT_QUOTES, 'UTF-8') . '</p>
        <p><strong>Сообщение:</strong><br>' . nl2br(htmlspecialchars($text, ENT_QUOTES, 'UTF-8')) . '</p>
        <p><em>Дата: ' . date('d.m.Y H:i') . '</em></p>
    ';

    $mail->send();
    echo json_encode(['status' => 'success', 'message' => 'Письмо отправлено']);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Mailer Error: ' . $mail->ErrorInfo]);
}
exit;