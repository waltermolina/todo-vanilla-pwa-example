//
newTaskInput = document.getElementById("newTaskInput");
addBtn = document.getElementById("addBtn");
list = document.getElementById("list");
fullscreenBtn = document.getElementById("fullscreenBtn");
theme = document.getElementById("themeSwitcher");
let tasks = [];

let geo = { lat: null, lon: null };

//Comportamiento del bot贸n fullscreen
fullscreenBtn.addEventListener("click", (e) => {
    if (document.fullscreenElement == null) {
        document.documentElement.requestFullscreen();
        fullscreenBtn.innerHTML = "馃挩";
    } else {
        document.exitFullscreen();
        fullscreenBtn.innerHTML = "馃摵";
    }
});

// Acci贸n del bot贸n de Cambio de Tema (Dark/Light)
theme.addEventListener("click", (e) => {
    setTheme();
});

//Acci贸n del bot贸n Agregar Tarea
addBtn.addEventListener("click", function (e) {
    e.preventDefault(); // evita el reload de la p谩gina
    const textoDeLaTarea = newTaskInput.value;
    const idDeLaTarea = Date.now();

    const newTask = {
        id: idDeLaTarea,
        texto: textoDeLaTarea,
        "completado": false,
        "ubicacion": { "lat": geo.lat, "lon": geo.lon }
    }

    //Registramos la tarea en el array de tareas
    tasks.push(newTask)
    agregarTarea(newTask);

    //Actualizamos el localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));
    newTaskInput.value = "";
});

const agregarTarea = (task) => {
    console.log(task)
    //creamos un elemento li
    const nuevoLi = document.createElement("li");
    //le damos un atributo 煤nico

    nuevoLi.setAttribute("data-id", task.id)
    nuevoLi.innerHTML =
        `
        <input type="checkbox" onclick="marcarTarea(this)" ${task.completado ? 'checked' : ''}>
        <p>${task.texto}</p>
        <button class="button" onclick="copiarTarea(this)">馃搵</button>
        <button class="button" onclick="compartirTarea(this)">鉁夛笍</button>
        <button class="button" onclick="eliminarTarea(this)">馃棏锔?</button>
        `;

    //Agregamos el elemento al DOM en la lista
    list.prepend(nuevoLi);
}

const eliminarTarea = (e) => {
    e.parentElement.remove();
    tasks = tasks.filter(task => task.id != e.parentElement.dataset.id);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

const marcarTarea = (e) => {
    console.log(e);
    tasks = tasks.map(task => task.id != e.parentElement.dataset.id ? task : { ...task, "completado": !task.completado });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

//M茅todo para copiar la tarea en el portapapeles
const copiarTarea = (e) => {
    if (navigator.clipboard != undefined) {
        navigator.clipboard.writeText(e.parentElement.children[1].innerText)
            .then(() => console.log("馃槉 Copiado!"))
            .catch(err => console.error("馃槶 Error al copiar!", err));
    }
}

//M茅todo para compartir la tarea usando la API del dispositivo
const compartirTarea = (e) => {
    if (!("share" in navigator)) { //si no esta API share en el navegador tiro un mensaje
        console.log("馃槶 Share API no soportada en este navegador.");
        return;
    }

    text = e.parentElement.children[1].innerText;

    navigator.share({
        title: 'Te comparto una tarea de mi lista',
        text: text,
        url: document.URL //podr铆amos mejorar esta url si la app tuviera una p谩gina para cada tarea
    }).then(
        () => console.log('馃槉 Compartido!')
    ).catch(
        error => console.error('馃槶 Error al compartir:', error)
    );
}

//M茅todo para obtener la ubicaci贸n de la persona usuaria
const recuperarUbicacion = () => {

    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            function (location) {
                geo.lat = location.coords.latitude;
                geo.lon = location.coords.longitude;
            },
            function (err) {
                console.warn(err);
                geo.lat = null;
                geo.lon = null;
            }
        );
    } else {
        return null;
    }

}

//M茅todo para registrar el service worker.
const registerServiceWorker = () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('serviceWorker.js')
            .then(registration => {
                console.log('馃槉 Service Worker Registered');
            })
            .catch(err => {
                console.warn('馃槶 Service Worker Failed to Register', err);
            });
    }
}

function setTheme(val) {
    switch (val) {
        case "dark":
            document.body.classList.remove("light");
            document.body.classList.add("dark");
            theme.innerHTML = "馃尀";
            document.querySelector("meta[name='theme-color']").setAttribute('content', "#222")
            break;

        case "light":
            document.body.classList.remove("dark");
            document.body.classList.add("light");
            theme.innerHTML = "馃寵";
            document.querySelector("meta[name='theme-color']").setAttribute('content', "#eee")
            break;

        default:
            document.body.classList.contains("dark") ? setTheme("light") : setTheme("dark");
            break
    }
}

//M茅todo para escuchar el estado de la conexi贸n a internet (online/offline)
const handleStateChange = () => {
    const indicator = document.getElementById("title-bar-status-indicator");
    if (navigator.onLine) {
        indicator.innerHTML = "Online";
        indicator.classList.add("online");
        indicator.classList.remove("offline");

    } else {
        indicator.innerHTML = "Offline";
        indicator.classList.add("offline");
        indicator.classList.remove("online");
    }
}

//M茅todo para evitar repintar la UI muy seguido.
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

const setExampleTasks = () => {
    return [{ "id": 1654810497705, "texto": "Ver video sobre PWA", "completado": false, "ubicacion": { "lat": -33.671937866435044, "lon": -65.48830173045123 } }, { "id": 1654810504144, "texto": "Disfrutar 馃榿", "completado": true, "ubicacion": { "lat": -33.671937866435044, "lon": -65.48830173045123 } }, { "id": 1654810510990, "texto": "Entrar a whatwebcando.today", "completado": false, "ubicacion": { "lat": -33.671937866435044, "lon": -65.48830173045123 } }]
}




//Evento Load de la App.
window.addEventListener("load", () => {
    handleStateChange();
    if (window.matchMedia) {
        const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');

        colorSchemeQuery.addEventListener('change', () => {
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                setTheme("dark")
            } else {
                setTheme("light")
            }
        });
        colorSchemeQuery.dispatchEvent(new window.Event('change'));
    } else {
        setTheme("light")
    }

    recuperarUbicacion();

    //Creamos algunas tareas de prueba...
    tasks = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : setExampleTasks();

    for (let i = 0; i < tasks.length; i++) {
        agregarTarea(tasks[i]);
    }

    if ('windowControlsOverlay' in navigator) {

        navigator.windowControlsOverlay.addEventListener('geometrychange', debounce(e => {
            // Detect if the Window Controls Overlay is visible.
            const isOverlayVisible = navigator.windowControlsOverlay.visible;
            // Get the size and position of the title bar area.
            const titleBarRect = e.titlebarAreaRect;

            if (isOverlayVisible) {
                titleBar.classList.add("overlay");
                titleBar.classList.remove("no-overlay");

                if (titleBarRect.width > 300) {
                    titleBar.classList.remove("mini")
                } else {
                    titleBar.classList.add("mini");
                }

            } else {
                titleBar.classList.remove("overlay");
                titleBar.classList.add("no-overlay");
                titleBar.classList.remove("mini")
            }

            console.log(`The overlay is ${isOverlayVisible ? 'visible' : 'hidden'}, the title bar width is ${titleBarRect.width}px`);

        }, 200));

        navigator.windowControlsOverlay.dispatchEvent(new Event('geometrychange'));
    }

    registerServiceWorker();
});

window.addEventListener('online', handleStateChange);
window.addEventListener('offline', handleStateChange);