<?php

?>

<!DOCTYPE html>
<html>
<head>
    <title>Примеры. Работа с балуном в ObjectManager</title>
    <meta charset=utf-8">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="css/style.css">
    <script src="https://api-maps.yandex.ru/2.1/?lang=ru-RU" type="text/javascript"></script>
    <script src="https://yandex.st/jquery/2.2.3/jquery.min.js" type="text/javascript"></script>
    <script src="js/js.js" type="text/javascript"></script>
</head>
<body>
    <div class="whole">
        <div class="mapland">
            <div id="map">
            </div>
            <form class="info">
                <label>Город
                    <input type="text" name="city" id="curr_town"> 
                </label><br>
                <label>Улица
                    <input type="text" name="street" id="curr_street">
                </label><br>
                <label>Дом
                    <input type="text" name="house" id="curr_build">
                </label>
                <br>
                <label>Корпус
                    <input type="text" name="corps" id="curr_corps">
                </label>
                <br>
                <label>Строение
                    <input type="text" name="corps" id="curr_str">
                </label>
                <br>
                <button id="tofind">Найти</button>
            </form>
        </div>
    </div>
    <script src="https://api-maps.yandex.ru/2.1/?lang=ru-RU" type="text/javascript"></script>
    <script src="https://yandex.st/jquery/2.2.3/jquery.min.js" type="text/javascript"></script>
    <script src="js/js.js" type="text/javascript"></script>
</body>
</html>