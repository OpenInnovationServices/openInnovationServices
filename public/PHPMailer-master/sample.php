<?php
  require("../PHPMailer-master/src/PHPMailer.php");
  require("../PHPMailer-master/src/SMTP.php");
  require("../PHPMailer-master/src/Exception.php");

if (isset($_POST['phone_btn'])) {
    $name = $_POST['name'];
    $phNo = $_POST['ph_num'];
    $dateSet = $_POST['date'];
    $timeSet = $_POST['time'];
    $subject = "Message from " . $name;
    $msg =  "Name: ". $name . "<br>Phone no.: " . $phNo . "<br>Date and time: " . $dateSet . " at " . $timeSet . " hours. ";

	$mail = new PHPMailer\PHPMailer\PHPMailer();
    $mail->IsSMTP(); // enable SMTP

    $mail->SMTPDebug = 1; // debugging: 1 = errors and messages, 2 = messages only
    $mail->SMTPAuth = true; // authentication enabled
    $mail->SMTPSecure = 'ssl'; // secure transfer enabled REQUIRED for Gmail
    $mail->Host = "n3plcpnl0030.prod.ams3.secureserver.net";
    $mail->Port = 465; // or 587
    $mail->IsHTML(true);
    $mail->Username = "ask@openinnovationservices.com";                 // SMTP username
    $mail->Password = "Fergal@2018";                           // SMTP password
    $mail->setFrom("ask@openinnovationservices.com", "Open Innovation Services");
    $mail->addAddress("openinnovationservices@gmail.com", 'Regarding meeting');     // Add a recipient
    $mail->Subject = $subject;
    $mail->Body = $msg;
    
     if(!$mail->Send()) {
        echo "Mailer Error: " . $mail->ErrorInfo;
     } else {
        echo "Message has been sent";
     }

     header('Location: ../index.html', true, $statusCode = 303);
   die();
}


if (isset($_POST['infopack_btn'])) {
    $email= $_POST['email'];
    $subject = "Info Pack from Open Innovation Services";
    $msg =  "Hi,". "<br><br>" .
    "Attached please find additional information on our graduate trainee innovation experience. We hope you find it useful."."<br><br>"."Please contact me on fergal@openinnovationservices.com, message me on LinkedIn or ring/text me on my mobile to discuss further."."<br><br>".
    "Kind Regards,"."<br>".
    "Fergal Brophy,"."<br>".
    "Founder & MD,"."<br>".
    "Open Innovation Services"."<br><br>".
    "Phone: 086 806 9685"."<br>".
    "http://linkedin.com/in/fergalbrophy";
    
    $mail = new PHPMailer\PHPMailer\PHPMailer();
    $mail->IsSMTP(); // enable SMTP
    $mail->SMTPDebug = 1; // debugging: 1 = errors and messages, 2 = messages only
    $mail->SMTPAuth = true; // authentication enabled
    $mail->SMTPSecure = 'ssl'; // secure transfer enabled REQUIRED for Gmail
    $mail->Host = "n3plcpnl0030.prod.ams3.secureserver.net";
    $mail->Port = 465; // or 587
    $mail->IsHTML(true);
    $mail->Username = "ask@openinnovationservices.com";                 // SMTP username
    $mail->Password = "Fergal@2018";                           // SMTP password
    $mail->setFrom("ask@openinnovationservices.com", "Open Innovation Services");
    $mail->addAddress($email, 'Innovator');     // Add a recipient
    $mail->Subject = $subject;
    $mail->Body = $msg;
    $mail->addAttachment("grad_innovation_experiences.pdf", "grad_innovation_experiences.pdf", "base64", "application/pdf");
    //mail->addAttachment("a.zip");
    
     if(!$mail->Send()) {
     
        echo "<script>window.location = 'http://openinnovationservices.com/';</script>";
     } else {
        echo "<script>window.location = 'http://openinnovationservices.com/';</script>";
     }

     die();
}    
?>