# ToDo Vanilla PWA Example

Esta *app de ejemplo* pretende probar y mostrar el uso algunas de las tecnologías web para construir una *Progressive Web Application* usando *Javascript Vanilla* (sin frameworks ni bibliotecas de terceros).

![https://raw.githubusercontent.com/waltermolina/todo-vanilla-pwa-example/main/resources/app1.png](https://raw.githubusercontent.com/waltermolina/todo-vanilla-pwa-example/main/resources/app1.png)

# 💻 Sobre la app…

La App en cuestión se trata de una lista de tareas sencilla que permite:

- **agregar** una tarea en la lista,
- **eliminar** una tarea de la lista,
- o **cambiar el estado** de una tarea.

Utiliza `LocalStorage` para almacenar las tareas en el dispositivo en una clave `tasks` con un array de tareas, como en el siguiente ejemplo:

```jsx
[
	{ 
		"id": 1654810497705, 
		"texto": "Ver video sobre PWA", 
		"completado": false, 
		"ubicacion": { 
			"lat": -33.671937866435044, 
			"lon": -65.48830173045123 
		} 
	}, 
	{ 
		"id": 1654810504144, 
		"texto": "Disfrutar 😁", 
		"completado": true, 
		"ubicacion": { 
			"lat": -33.671937866435044, 
			"lon": -65.48830173045123 
		} 
	},
	. . .
]
```

Para cumplir con la condición mínima de ser una PWA, la app cuenta con un 📄[manifiesto](https://github.com/waltermolina/todo-vanilla-pwa-example/blob/main/manifest.json) y un ⚙️[serviceWorker](https://github.com/waltermolina/todo-vanilla-pwa-example/blob/main/serviceWorker.js) que permite almacenar de forma offline los recursos necesarios para que la app funciona sin conexión a la red (o, mejor dicho, al servidor web).

![https://raw.githubusercontent.com/waltermolina/todo-vanilla-pwa-example/main/resources/installBanner.png](https://raw.githubusercontent.com/waltermolina/todo-vanilla-pwa-example/main/resources/installBanner.png)

# Algunas tecnologías en uso:

- LocalStorage.
- Device Color Scheme.
- GeoLocation.
- Window Controls Overlay.
- Network Status.
- FullScreen.
- Clipboard.
- Share API.
- Shortcuts (aka *Jump List* en *Windows*)

# 🤔 ¿Cómo uso la app?

**¡Fácil!** Desde este link 👉 [https://waltermolina.github.io/todo-vanilla-pwa-example/](https://waltermolina.github.io/todo-vanilla-pwa-example/).

También podes clonar este repo en tu PC y ejecutar directamente la app en *localhost*.

# ⚠️ ¡Importante!

Esta app se desarrolló para una demo especialmente organizada por Lamansys para su equipo de *Front end Devs* y se grabó la reunión. Si sos del Team Lamansys, podes pedir acceso a el video desde el canal `#hallway-talk` en **Slack**.

---

# ¡Algunas imágenes!

Porque una imagen vale más que mil palabras:

![Indicador de estado de Red (Online/Offline).](https://raw.githubusercontent.com/waltermolina/todo-vanilla-pwa-example/main/resources/networkStatus.png)

Indicador de estado de Red (Online/Offline).

![Shortcuts.](https://raw.githubusercontent.com/waltermolina/todo-vanilla-pwa-example/main/resources/jumpList.png)

Shortcuts.

![Usando la API *Share*.](https://raw.githubusercontent.com/waltermolina/todo-vanilla-pwa-example/main/resources/share.png)

Usando la API *Share*.

![Usando la API *Clipboard*.](https://raw.githubusercontent.com/waltermolina/todo-vanilla-pwa-example/main/resources/clipboard.png)

Usando la API *Clipboard*.

![Vista *Standalone*.](https://raw.githubusercontent.com/waltermolina/todo-vanilla-pwa-example/main/resources/app2.png)

Vista *Standalone*.

![Vista Standalone con *Window Controls Overlay*.](https://raw.githubusercontent.com/waltermolina/todo-vanilla-pwa-example/main/resources/app1.png)

Vista Standalone con *Window Controls Overlay*.
