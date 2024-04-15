/*
	Tinder OSINT Tool

	Este script utiliza técnicas de inteligencia de código abierto (OSINT) para buscar personas en Tinder.
	No abuses de este script y úsalo de manera ética y legal. El propósito es educativo y de investigación.

	Autor: j0rd1s3rr4n0
	Fecha de creación: 15/04/2024
	Última actualización: 15/04/2024

	Instrucciones de uso:
	1. Ejecuta el script e introduce los parámetros requeridos.
	2. El script buscará personas en Tinder y proporcionará información relevante.
	3. Utiliza la información de manera ética y legal, y respeta la privacidad de las personas.
*/

// Función para agregar un nuevo usuario al localStorage
function addUserToLocalStorage(name, age) {
    // Obtener los usuarios existentes del localStorage
    var usersInStorage = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : {};

    // Comprobar si el usuario ya existe en el localStorage
    var userKey = name.toLowerCase() + '_' + age;
    if (userKey in usersInStorage) {
        // Incrementar el contador de este usuario
        usersInStorage[userKey].count++;
    } else {
        // Agregar el nuevo usuario al localStorage
        usersInStorage[userKey] = { name: name, age: age, count: 1 }; // Iniciar el contador en 1
    }

    // Guardar los usuarios actualizados en el localStorage
    localStorage.setItem('users', JSON.stringify(usersInStorage));
}

// Función para recuperar los usuarios del localStorage
function getStoredUsers() {
    var users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : {};
    return users;
}

// Llamar a esta función al inicio para mostrar los usuarios y sus respectivos contadores
function displayStoredUsers() {
    var users = getStoredUsers();
    for (var userKey in users) {
        console.log('Name: ' + users[userKey].name + ', Age: ' + users[userKey].age + ', Count: ' + users[userKey].count);
    }
}



var find = false;
var user_to_search = "";
var age_to_search = 0;
var userNotified = false;



function resetNotifiedUser(){
	userNotified = false;
}
function userFound(name, age) {
	if (!userNotified) {
    const element = document.querySelector(".keen-slider__slide").childNodes[0];
    const style = element.style;
    const backgroundImage = style.backgroundImage;
    
    // Define una expresión regular para extraer la URL completa
    const regex = /url\("([^"]+)"\)/;
    const matches = backgroundImage.match(regex);
    var icono = "icono"
    if (matches && matches.length > 1) {
        var url = matches[1];
        icono = url.toString();
        console.log(url);
    }
    // Verificar si el usuario ya ha sido notificado
    Notification.requestPermission()
    .then(function(result) {
        if (result === "granted") {
            var u = new Notification("User Found!", {
                body: "Name: " + name + ", Age: " + age,
                icon: icono
            });
            // Abrir Google al hacer clic en la notificación
            u.onclick = function() {
                u.close();
            };
            // Cerrar la notificación automáticamente después de 10 segundos
            setTimeout(function() {
                //window.open(url, "_blank");
                u.close();
            }, 10000);
            userNotified = true;

        }
    });

}
}


function skipUser(){
	if(document.querySelector("div.recsCardboard__cardsContainer.H\\(100\\%\\).Pos\\(r\\).Z\\(1\\) > div > div.Pos\\(a\\).B\\(0\\).Iso\\(i\\).W\\(100\\%\\).Start\\(0\\).End\\(0\\) > div > div.Mx\\(a\\).Fxs\\(0\\).Sq\\(70px\\).Sq\\(60px\\)--s.Bd.Bdrs\\(50\\%\\).Bdc\\(\\$c-ds-border-gamepad-nope-default\\) > button")){
		document.querySelector("div.recsCardboard__cardsContainer.H\\(100\\%\\).Pos\\(r\\).Z\\(1\\) > div > div.Pos\\(a\\).B\\(0\\).Iso\\(i\\).W\\(100\\%\\).Start\\(0\\).End\\(0\\) > div > div.Mx\\(a\\).Fxs\\(0\\).Sq\\(70px\\).Sq\\(60px\\)--s.Bd.Bdrs\\(50\\%\\).Bdc\\(\\$c-ds-border-gamepad-nope-default\\) > button").click()
	}
}

function stopSearch(){
	find = false;
}

function startSearch(){
	find = true;
}

function setAges(ages){
	age_to_search = (ages*1)
}
function setUserToSearch(name){
	user_to_search = name
}

function findUser(){
	if(find && (user_to_search!="")){
		//Check if can do unlikes
		if(document.querySelector("div.recsCardboard__cardsContainer.H\\(100\\%\\).Pos\\(r\\).Z\\(1\\) > div > div.Pos\\(a\\).B\\(0\\).Iso\\(i\\).W\\(100\\%\\).Start\\(0\\).End\\(0\\) > div > div.Mx\\(a\\).Fxs\\(0\\).Sq\\(70px\\).Sq\\(60px\\)--s.Bd.Bdrs\\(50\\%\\).Bdc\\(\\$c-ds-border-gamepad-nope-default\\) > button")){
			var name = document.querySelector("div.recsCardboard__cardsContainer.H\\(100\\%\\).Pos\\(r\\).Z\\(1\\) > div > div.Tcha\\(n\\).Bdbw\\(--recs-gamepad-height\\).Bdbc\\(t\\).Bdbs\\(s\\).Bgc\\(\\#000\\).Wc\\(\\$transform\\).Prs\\(1000px\\).Bfv\\(h\\).Ov\\(h\\).W\\(100\\%\\).StretchedBox.Bdrs\\(8px\\) > div.Pos\\(a\\).D\\(f\\).Jc\\(sb\\).C\\(\\$c-ds-text-primary-overlay\\).Ta\\(start\\).W\\(100\\%\\).Ai\\(fe\\).B\\(0\\).P\\(8px\\)--xs.P\\(16px\\).P\\(20px\\)--l.Cur\\(p\\).focus-button-style > div > div > div > div > div.Fz\\(\\$l\\).Trsdu\\(\\$fast\\).Maw\\(80\\%\\) > div > div > span").innerText;
			if(document.querySelector("div.recsCardboard__cardsContainer.H\\(100\\%\\).Pos\\(r\\).Z\\(1\\) > div > div.Tcha\\(n\\).Bdbw\\(--recs-gamepad-height\\).Bdbc\\(t\\).Bdbs\\(s\\).Bgc\\(\\#000\\).Wc\\(\\$transform\\).Prs\\(1000px\\).Bfv\\(h\\).Ov\\(h\\).W\\(100\\%\\).StretchedBox.Bdrs\\(8px\\) > div.Pos\\(a\\).D\\(f\\).Jc\\(sb\\).C\\(\\$c-ds-text-primary-overlay\\).Ta\\(start\\).W\\(100\\%\\).Ai\\(fe\\).B\\(0\\).P\\(8px\\)--xs.P\\(16px\\).P\\(20px\\)--l.Cur\\(p\\).focus-button-style > div > div > div > div > div.Fz\\(\\$l\\).Trsdu\\(\\$fast\\).Maw\\(80\\%\\) > div > span:nth-child(3)")){
            var age = document.querySelector("div.recsCardboard__cardsContainer.H\\(100\\%\\).Pos\\(r\\).Z\\(1\\) > div > div.Tcha\\(n\\).Bdbw\\(--recs-gamepad-height\\).Bdbc\\(t\\).Bdbs\\(s\\).Bgc\\(\\#000\\).Wc\\(\\$transform\\).Prs\\(1000px\\).Bfv\\(h\\).Ov\\(h\\).W\\(100\\%\\).StretchedBox.Bdrs\\(8px\\) > div.Pos\\(a\\).D\\(f\\).Jc\\(sb\\).C\\(\\$c-ds-text-primary-overlay\\).Ta\\(start\\).W\\(100\\%\\).Ai\\(fe\\).B\\(0\\).P\\(8px\\)--xs.P\\(16px\\).P\\(20px\\)--l.Cur\\(p\\).focus-button-style > div > div > div > div > div.Fz\\(\\$l\\).Trsdu\\(\\$fast\\).Maw\\(80\\%\\) > div > span:nth-child(3)").innerText*1;
            }else{var age = -1;}
            addUserToLocalStorage(name, age);
			if(age_to_search!=0){
				if(name.toLowerCase().includes(user_to_search.toLowerCase()) && age == age_to_search){
					userFound(name,age);
				}
				else{
					resetNotifiedUser();
                    skipUser();
				}
			}
			else{
				if(name.toLowerCase().includes(user_to_search.toLowerCase())){
					userFound(name,age);
				}
				else{
					resetNotifiedUser();
                    skipUser();
				}

			}
			
		}
	}
}

setInterval(findUser,700);


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'stop') {
        stopSearch();
    }
    else if (request.action === 'start') {
        stopSearch();
        var name = request.params.name;
        var age = request.params.age;
        setUserToSearch(request.params.name);
        setAges(request.params.age);
        startSearch();
    }
});
