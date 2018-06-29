ymaps.ready(init);

function init() {
    var myPlacemark,
        myMap = new ymaps.Map('map', {
            center: [55.753994, 37.622093],
            zoom: 13
        }, {
            searchControlProvider: 'yandex#search'
        });

    // Событие клика по карте
    myMap.events.add('click', function (e) {

        var coords = e.get('coords');

        // Если метка уже создана – просто передвигаем ее.
        if (myPlacemark) {
            myPlacemark.geometry.setCoordinates(coords);
        }
        // Если нет – создаем.
        else {
            myPlacemark = createPlacemark(coords);
            myMap.geoObjects.add(myPlacemark);
            // Слушаем событие окончания перетаскивания на метке.
            myPlacemark.events.add('dragend', function () {
                getAddress(myPlacemark.geometry.getCoordinates());
            });
        };
        getAddress(coords);

        // myMap.setCenter(coords, 16, {
        //     checkZoomRange: true
        // });
        var curr_zoom = myMap.getZoom();
        if (curr_zoom < 16) {
            myMap.setCenter(coords, 16, {
                checkZoomRange: true
            });
        };
    });

    // Создание метки.
    function createPlacemark(coords) {
        return new ymaps.Placemark(coords, {
            iconCaption: 'поиск...'
        }, {
            preset: 'islands#redIcon',
            draggable: true
        });
    };


    // Обратное геокодирование
    function getAddress(coords) {
        myPlacemark.properties.set('iconCaption', 'поиск...');
        ymaps.geocode(coords).then(function (res) {
            var firstGeoObject = res.geoObjects.get(0);

            myPlacemark.properties.set({
                // Формируем строку с данными об объекте.
                iconCaption: [
                    // Название населенного пункта или вышестоящее административно-территориальное образование.
                    firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
                    // Получаем путь до топонима, если метод вернул null, запрашиваем наименование здания.
                    firstGeoObject.getThoroughfare() || firstGeoObject.getPremiseNumber()
                ].filter(Boolean).join(', '),
                // вывод в балун строки об объекте
                balloonContent: firstGeoObject.getAddressLine()
            });
            var curr_town = firstGeoObject.getLocalities();
            var curr_street = firstGeoObject.getThoroughfare();
            var curr_build = firstGeoObject.getPremiseNumber().split(/к|с/);
            console.log(curr_town + ', ' + curr_street + ' ' + curr_build[0] + ', ' + curr_build[1].replace(/\D/g, ''));


            var c_town = document.getElementById('curr_town'),
                c_street = document.getElementById('curr_street'),
                c_build = document.getElementById('curr_build'),
                c_corps = document.getElementById('curr_corps');
                c_str = document.getElementById('curr_str');

            if ((typeof(curr_town) != 'undefined') && (typeof(curr_street) != 'undefined') && (typeof(curr_build[0]) != 'undefined')) {
                c_town.value = curr_town;
                c_street.value = curr_street;
                c_build.value = curr_build[0];
                if (typeof(curr_build[1]) != 'undefined') {
                    if (firstGeoObject.getPremiseNumber().includes('к')) {
                        c_corps.value = curr_build[1].replace(/\D/g, '');
                        c_str.value = '';
                    } else if (firstGeoObject.getPremiseNumber().includes('с')) {
                        c_str.value = curr_build[1].replace(/\D/g, '');
                        c_corps.value = '';
                    };
                } else {
                    c_corps.value = '';
                    c_str.value = '';
                };
            };
        });

        
    };
}
