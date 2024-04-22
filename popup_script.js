var position_spoof = false;

function stopSearch() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: 'stop'});
    });
}

function startSearch() {
    var name = document.getElementById('Name').value;
    var age = document.getElementById('Age').value;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: 'start', params: {name: name, age: age}});
    });
}

function stopGPSSpoof(){
    position_spoof = false;
}

// Función para reemplazar getCurrentPosition
function spoofGeolocation(latitude, longitude) {
    // Guardar la referencia a la función original
    var originalGetCurrentPosition = navigator.geolocation.getCurrentPosition;

    // Reemplazar getCurrentPosition con una función personalizada
    navigator.geolocation.getCurrentPosition = function(successCallback, errorCallback, options) {
        // Llamar a la función original con las coordenadas spoofeadas
        originalGetCurrentPosition.call(navigator.geolocation, function(position) {
            // Modificar las coordenadas en el objeto position
            position.coords.latitude = latitude;
            position.coords.longitude = longitude;
            // Llamar al callback de éxito con la posición modificada
            successCallback(position);
        }, errorCallback, options);
    };
}



function changeLocation(value) {
    position_spoof = value != 'true' ? false : true;
    if (position_spoof) {
        // Solicitar las coordenadas al usuario
        var coordinatesInput = prompt("Introduce las coordenadas (latitud, longitud):");

        // Verificar si el usuario ingresó un valor
        if (coordinatesInput !== null && coordinatesInput.trim() !== "") {
            // Separar las coordenadas por la coma
            var coordinatesArray = coordinatesInput.split(',');

            // Verificar si se obtuvieron dos valores (latitud y longitud)
            if (coordinatesArray.length === 2) {
                // Convertir las coordenadas a números flotantes
                var latitude = parseFloat(coordinatesArray[0].trim());
                var longitude = parseFloat(coordinatesArray[1].trim());

                // Verificar si las coordenadas son números válidos
                if (!isNaN(latitude) && !isNaN(longitude)) {
                    // Solicitar permiso al usuario para acceder a su ubicación
                    spoofGeolocation(latitude, longitude);
                } else {
                    console.error("Las coordenadas ingresadas no son válidas.");
                }
            } else {
                console.error("Se requieren dos valores separados por coma (latitud, longitud).");
            }
        } else {
            console.error("Se requieren coordenadas válidas.");
        }
    }
}

changeLocation('false');

document.addEventListener('DOMContentLoaded', function() {
    var toggleButton = document.getElementById("toggleButton");

    // Agregar evento onclick al botón
    toggleButton.addEventListener('click', function() {
        action(); // Llamar a la función action() cuando se hace clic en el botón
    });

    // var gps_button = document.getElementById("gpsButton");
    // gps_button.addEventListener('click', function() {
    //     changeLocation('true');
    // });

    // setInterval(() => {
    //     navigator.geolocation.getCurrentPosition(function(position) {
    //         document.getElementById('latitude').innerText = position.coords.latitude;
    //         document.getElementById('longitude').innerText = position.coords.longitude;
    //     });
    // }, 1000);
});

function action() {
    var button = document.getElementById("toggleButton");
    var buttonText = button.querySelector(".button-82-front.text").innerText;
    
    if (buttonText.includes('Activate')) {
        // Cambiar texto y estilos para Desactivar
        button.innerHTML = `
            <span class="button-82-shadow"></span>
            <span class="button-82-edge"></span>
            <span class="button-82-front text">
                Deactivate
            </span>
        `;
        // Llamar a la función startSearch() para iniciar la búsqueda
        startSearch();
    } else {
        // Cambiar texto y estilos para Activar
        button.innerHTML = `
            <span class="button-82-shadow"></span>
            <span class="button-82-edge"></span>
            <span class="button-82-front text">
                Activate
            </span>
        `;
        // Llamar a la función stopSearch() para detener la búsqueda
        stopSearch();
    }
}
