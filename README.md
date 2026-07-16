# Restaurante Canelita - Comida Criolla Peruana

Sitio web completo del restaurante **Canelita**, un restaurante de comida criolla peruana. Incluye pagina principal con galeria de platillos, carta de menu y un gestor de tareas para administrar las operaciones del restaurante. Desarrollado como proyecto universitario para demostrar el uso de GitHub, GitHub Actions y despliegue continuo con GitHub Pages.

---

## Descripcion

**Canelita** es un sitio web de 3 paginas que combina la presencia digital del restaurante con una herramienta interna de gestion de tareas. La aplicacion esta disenada para ser moderna, responsive y facil de usar, con una tematica calida que evoca los colores de la canela y las especias peruanas.

### Paginas del sitio

| Pagina | Archivo | Descripcion |
| ------ | ------- | ----------- |
| **Inicio** | `index.html` | Portada con hero, galeria de platillos destacados, seccion "Sobre Nosotros" e informacion de contacto |
| **Carta** | `carta.html` | Menu completo del restaurante con busqueda y filtros por categoria |
| **Tareas** | `tareas.html` | Gestor de tareas con CRUD completo, dashboard y filtros |

### Funcionalidades del Gestor de Tareas

- Dashboard con estadisticas en tiempo real
- Crear, editar y eliminar tareas
- Marcar tareas como completadas o pendientes
- Buscador por nombre de tarea
- Filtro por estado (Todas / Pendientes / Completadas)
- Contador de tareas
- Mensajes de confirmacion (toasts) al agregar, editar y eliminar
- Modal de confirmacion antes de eliminar
- Datos de ejemplo precargados al iniciar

### Estructura de cada tarea

| Campo | Descripcion |
| ----- | ----------- |
| ID | Identificador unico 自动生成 |
| Titulo | Nombre de la tarea |
| Descripcion | Detalles de la tarea |
| Fecha | Fecha y hora de creacion |
| Prioridad | Alta, Media o Baja |
| Estado | Pendiente o Completada |

---

## Tecnologias Utilizadas

| Tecnologia | Version | Uso |
| ---------- | ------- | --- |
| HTML5 | - | Estructura de las paginas |
| CSS3 | - | Estilos personalizados |
| JavaScript ES6 | - | Logica de la aplicacion |
| Bootstrap | 5.3.2 | Framework CSS y componentes |
| Bootstrap Icons | 1.11.2 | Iconos vectoriales |

> **Nota:** No se utilizan frameworks de JavaScript, backend, bases de datos ni APIs externas. Los datos se almacenan unicamente en memoria durante la ejecucion.

---

## Estructura de Carpetas

```
Proyecto/
├── index.html                  # Pagina principal (portada / galeria de platillos)
├── carta.html                  # Carta / menu del restaurante
├── tareas.html                 # Gestor de tareas
├── css/
│   └── style.css               # Estilos personalizados (todas las paginas)
├── js/
│   ├── app.js                  # Controlador del gestor de tareas
│   ├── tasks.js                # Gestion de tareas (CRUD en memoria)
│   ├── utils.js                # Funciones auxiliares reutilizables
│   └── carta.js                # Renderizado y filtrado del menu
├── assets/                     # Imagenes e iconos (opcional)
├── .github/
│   └── workflows/
│       └── deploy.yml          # Workflow de GitHub Actions
└── README.md                   # Documentacion del proyecto
```

---

## Como Ejecutar el Proyecto Localmente

### Opcion 1: Abrir directamente el archivo

1. Descarga o clona el repositorio.
2. Navega hasta la carpeta `Proyecto/`.
3. Haz doble clic en `index.html`.
4. El sitio se abrira en tu navegador predeterminado.

### Opcion 2: Usar un servidor local (recomendado)

```bash
# Con Python instalado
cd Proyecto
python -m http.server 8000

# Luego abre en tu navegador:
# http://localhost:8000
```

```bash
# Con Node.js (si tienes http-server instalado globalmente)
npx http-server Proyecto -p 8000
```

---

## Como Subirlo a GitHub

### 1. Crear un repositorio en GitHub

1. Ve a [github.com](https://github.com) e inicia sesion.
2. Haz clic en el boton **"+"** > **"New repository"**.
3. Nombra el repositorio (ej: `canelita-restaurante`).
4. Selecciona **Public** (para que GitHub Pages funcione gratis).
5. **No** inicialices con README, .gitignore ni licencia.
6. Haz clic en **"Create repository"**.

### 2. Subir el codigo

```bash
# En la carpeta del proyecto
git init
git add .
git commit -m "Initial commit: Restaurante Canelita"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/canelita-restaurante.git
git push -u origin main
```

---

## Como Activar GitHub Pages

1. Ve a tu repositorio en GitHub.
2. Haz clic en **"Settings"** (pestaña superior).
3. En el menu lateral izquierdo, selecciona **"Pages"**.
4. En **"Source"**, selecciona:
   - **Source:** GitHub Actions
5. No es necesario seleccionar una rama, ya que el workflow se encarga del despliegue.
6. Guarda los cambios.

---

## Como Comprobar que GitHub Actions se Ejecuto Correctamente

1. Ve a tu repositorio en GitHub.
2. Haz clic en la pestaña **"Actions"** (barra superior).
3. Veras el workflow **"Deploy to GitHub Pages"** con el estado:
   - Amarillo: En progreso
   - Verde: Completado exitosamente
   - Rojo: Error
4. Haz clic en la ejecucion para ver los detalles de cada paso:
   - **Checkout repository**
   - **Verify project structure**
   - **Upload artifact**
   - **Deploy to GitHub Pages**

---

## Como Acceder al Sitio Despues de Desplegado

1. Despues de que el workflow termine correctamente (barra verde).
2. Ve a **Settings > Pages** en tu repositorio.
3. Veras un mensaje: **"Your site is live at..."**
4. Haz clic en el enlace o visita:
   ```
   https://TU_USUARIO.github.io/canelita-restaurante/
   ```

---

## Capturas Sugeridas para Documentacion

Para tu documentacion universitaria, se recomienda incluir las siguientes capturas:

1. **Pagina principal** - Hero con titulo y galeria de platillos destacados
2. **Seccion Sobre Nosotros** - Informacion del restaurante
3. **Pagina Carta** - Menu completo con filtros por categoria
4. **Busqueda en Carta** - Resultados filtrados por nombre
5. **Gestor de Tareas - Dashboard** - Estadisticas y lista de tareas
6. **Formulario de nueva tarea** - Formulario vacio con campos visibles
7. **Tarea agregada** - Toast de confirmacion visible
8. **Modo edicion** - Formulario con datos cargados para editar
9. **Modal de eliminacion** - Dialogo de confirmacion antes de eliminar
10. **Vista responsive** - Captura en formato movil
11. **GitHub Actions** - Workflow ejecutandose exitosamente
12. **GitHub Pages** - Sitio desplegado con URL visible

---

## Autor

**Restaurante Canelita** - Proyecto Universitario 2026

Sitio web completo de un restaurante de comida criolla peruana con gestor de tareas operativas.
