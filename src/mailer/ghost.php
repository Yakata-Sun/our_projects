<?php 

$name = $_POST['name'];
$phone = $_POST['phone'];
$text = $_POST['text'];

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require 'phpmailer/Exception.php';
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';


$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

// $mail->SMTPDebug = 3;                               // Enable verbose debug output

try {
	//$mail->SMTPDebug = SMTP::DEBUG_SERVER;
	$mail->isSMTP();                                      // Set mailer to use SMTP
	$mail->Host = 'smtp.mail.ru';  // Specify main and backup SMTP servers
	$mail->SMTPAuth = true;                               // Enable SMTP authentication
	$mail->Username = 'vajravarahi@mail.ru';                 // Наш логин
	$mail->Password = 'x7jvcsUgxQFZYBduwpbX';                           // Наш пароль от ящика
	$mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; 
	$mail->Port = 465;                                    // TCP port to connect to
	 
	$mail->setFrom('vajravarahi@mail.ru', 'Новосвободная-хостелс');   // От кого письмо 
	$mail->addAddress('vajravarahi@mail.ru');     // Add a recipient
	$mail->addAddress('ayakata@yandex.ru');               // Name is optional
	//$mail->addReplyTo('info@example.com', 'Information');
	//$mail->addCC('cc@example.com');
	//$mail->addBCC('bcc@example.com');
	//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
	//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
	$mail->isHTML(true);                                  // Set email format to HTML
	
	$mail->Subject = 'Запрос на гостевой дом';
	$mail->Body    = '
			Заявка на звонок по размещению от <br> 
		    <p><strong>Имя:</strong> ' . $name . '</p>
        <p><strong>Телефон:</strong> ' . $phone . '</p>
        <p><strong>Сообщение:</strong><br>' . $text . '</p>
        <p><em>Дата: ' . date('d.m.Y H:i') . '</em></p>
    ';
	
	$mail->send();

} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
echo json_encode([
  'status' => 'success',
  'message' => 'Подписка успешно обработана'
]);
exit;
?>