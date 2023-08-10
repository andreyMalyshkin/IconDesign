<?php

// Токен
  const TOKEN = '6045207763:AAG2JLQkw55DVrGOA56LGa28iHR4bAbgZRI';

  // ID чата
  const CHATID = '-1001972179274';

  // Массив допустимых значений типа файла.
  $types = array('image/gif', 'image/png', 'image/jpeg', 'application/pdf');

  // Максимальный размер файла в килобайтах
  // 1048576; // 1 МБ
  $size = 1073741824; // 1 ГБ

if ($_SERVER["REQUEST_METHOD"] == "POST") {

  $fileSendStatus = '';
  $textSendStatus = '';
  $msgs = [];

  // Проверяем не пусты ли поля с именем и телефоном
  if (!empty($_POST['name']) && !empty($_POST['phone'])) {

    // Если не пустые, то валидируем эти поля и сохраняем и добавляем в тело сообщения. Минимально для теста так:
    $txt = "";

    // Имя
    if (isset($_POST['name']) && !empty($_POST['name'])) {
        $txt .= "Имя пославшего: " . strip_tags(trim(urlencode($_POST['name']))) . "%0A";
    }

    // Номер телефона
    if (isset($_POST['phone']) && !empty($_POST['phone'])) {
        $txt .= "Телефон: " . strip_tags(trim(urlencode($_POST['phone']))) . "%0A";
    }
    // Город
    if (isset($_POST['city']) && !empty($_POST['city'])) {
      $txt .= "Город: " . strip_tags(trim(urlencode($_POST['city']))) . "%0A";
  }
  if (isset($_POST['neoclassic']) && !empty($_POST['neoclassic'])) {
    $txt .= "Неоклассика " . strip_tags(trim(urlencode($_POST['neoclassic']))) . "%0A";
  }

  if (isset($_POST['modern']) && !empty($_POST['modern'])) {
    $txt .= "Модерн " . strip_tags(trim(urlencode($_POST['modern']))) . "%0A";
  }
  if (isset($_POST['eco']) && !empty($_POST['eco'])) {
    $txt .= "Экостиль " . strip_tags(trim(urlencode($_POST['eco']))) . "%0A";
  }
  if (isset($_POST['japan']) && !empty($_POST['japan'])) {
    $txt .= "Японский " . strip_tags(trim(urlencode($_POST['japan']))) . "%0A";
  }
  if (isset($_POST['art-deco']) && !empty($_POST['art-deco'])) {
    $txt .= "Арт Деко " . strip_tags(trim(urlencode($_POST['art-deco']))) . "%0A";
  }
  if (isset($_POST['min']) && !empty($_POST['min'])) {
    $txt .= "Минимализм " . strip_tags(trim(urlencode($_POST['min']))) . "%0A";
  }
  if (isset($_POST['square']) && !empty($_POST['square'])) {
    $txt .= "Площадь " . strip_tags(trim(urlencode($_POST['square']))) . "%0A";
  }
  if (isset($_POST['fast']) && !empty($_POST['fast'])) {
    $txt .= "Как можно скорее " . strip_tags(trim(urlencode($_POST['fast']))) . "%0A";
  }
  if (isset($_POST['week']) && !empty($_POST['week'])) {
    $txt .= "В течение пару недель " . strip_tags(trim(urlencode($_POST['week']))) . "%0A";
  }
  if (isset($_POST['late']) && !empty($_POST['late'])) {
    $txt .= "Не торопимся " . strip_tags(trim(urlencode($_POST['late']))) . "%0A";
  }


    // Не забываем про тему сообщения
    if (isset($_POST['theme']) && !empty($_POST['theme'])) {
        $txt .= "Тема: " . strip_tags(urlencode($_POST['theme']));
    }

    $textSendStatus = @file_get_contents('https://api.telegram.org/bot'. TOKEN .'/sendMessage?chat_id=' . CHATID . '&parse_mode=html&text=' . $txt);

    if( isset(json_decode($textSendStatus)->{'ok'}) && json_decode($textSendStatus)->{'ok'} ) {
      if (!empty($_FILES['files']['tmp_name'])) {

          $urlFile =  "https://api.telegram.org/bot" . TOKEN . "/sendMediaGroup";

          // Путь загрузки файлов
          $path = $_SERVER['DOCUMENT_ROOT'] . '/telegramform/tmp/';

          // Загрузка файла и вывод сообщения
          $mediaData = [];
          $postContent = [
            'chat_id' => CHATID,
          ];

          for ($ct = 0; $ct < count($_FILES['files']['tmp_name']); $ct++) {
            if ($_FILES['files']['name'][$ct] && @copy($_FILES['files']['tmp_name'][$ct], $path . $_FILES['files']['name'][$ct])) {
              if ($_FILES['files']['size'][$ct] < $size && in_array($_FILES['files']['type'][$ct], $types)) {
                $filePath = $path . $_FILES['files']['name'][$ct];
                $postContent[$_FILES['files']['name'][$ct]] = new CURLFile(realpath($filePath));
                $mediaData[] = ['type' => 'document', 'media' => 'attach://'. $_FILES['files']['name'][$ct]];
              }
            }
          }

          $postContent['media'] = json_encode($mediaData);

          $curl = curl_init();
          curl_setopt($curl, CURLOPT_HTTPHEADER, ["Content-Type:multipart/form-data"]);
          curl_setopt($curl, CURLOPT_URL, $urlFile);
          curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
          curl_setopt($curl, CURLOPT_POSTFIELDS, $postContent);
          $fileSendStatus = curl_exec($curl);
          curl_close($curl);
          $files = glob($path.'*');
          foreach($files as $file){
            if(is_file($file))
              unlink($file);
          }
      }
      echo json_encode('SUCCESS');
    } else {
      echo json_encode('ERROR');
      //
      // echo json_decode($textSendStatus);
    }
  } else {
    echo json_encode('NOTVALID');
  }
} else {
  header("Location: /");
}
