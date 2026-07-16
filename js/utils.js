/* ============================================================
   UTILIDADES - GESTOR DE TAREAS CANELITA
   Funciones auxiliares reutilizables
   ============================================================ */

/**
 * Genera un ID único basado en la marca de tiempo y un número aleatorio.
 * @returns {string} ID único generado.
 */
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

/**
 * Obtiene la fecha actual formateada como "DD/MM/AAAA HH:MM".
 * @returns {string} Fecha formateada.
 */
function getCurrentDate() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

/**
 * Formatea una cadena de fecha ISO a formato local legible.
 * @param {string} isoDate - Fecha en formato ISO.
 * @returns {string} Fecha formateada.
 */
function formatDate(isoDate) {
    if (!isoDate) return 'Sin fecha';
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

/**
 * Capitaliza la primera letra de un string.
 * @param {string} str - String a capitalizar.
 * @returns {string} String capitalizado.
 */
function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Escapa caracteres HTML peligrosos para prevenir inyección de código.
 * @param {string} str - String a sanitizar.
 * @returns {string} String sanitizado.
 */
function sanitizeHTML(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
}

/**
 * Muestra un toast de Bootstrap con un mensaje y tipo específico.
 * @param {string} message - Mensaje a mostrar.
 * @param {string} type - Tipo de toast: 'success', 'danger', 'warning', 'info'.
 */
function showToast(message, type = 'success') {
    const toastElement = document.getElementById('confirmation-toast');
    const toastBody = document.getElementById('toast-body');
    const toastMessage = document.getElementById('toast-message');
    const toastIcon = document.getElementById('toast-icon');

    // Configurar el icono según el tipo
    const icons = {
        success: 'bi-check-circle-fill text-success',
        danger: 'bi-exclamation-circle-fill text-danger',
        warning: 'bi-exclamation-triangle-fill text-warning',
        info: 'bi-info-circle-fill text-primary'
    };

    // Limpiar clases previas del icono
    toastIcon.className = 'bi fs-5 ' + (icons[type] || icons.success);

    // Aplicar borde lateral según tipo
    toastElement.className = 'toast align-items-center border-0 shadow toast-' + type;

    // Establecer el mensaje
    toastMessage.textContent = message;

    // Mostrar el toast
    const toast = new bootstrap.Toast(toastElement, { delay: 3000 });
    toast.show();
}

/**
 * Obtiene la clase CSS del badge según la prioridad.
 * @param {string} priority - Prioridad de la tarea.
 * @returns {string} Clase CSS del badge.
 */
function getPriorityBadgeClass(priority) {
    const classes = {
        'Alta': 'badge-alta',
        'Media': 'badge-media',
        'Baja': 'badge-baja'
    };
    return classes[priority] || 'badge-media';
}

/**
 * Obtiene el icono de Bootstrap según la prioridad.
 * @param {string} priority - Prioridad de la tarea.
 * @returns {string} Clase del icono de Bootstrap.
 */
function getPriorityIcon(priority) {
    const icons = {
        'Alta': 'bi-exclamation-triangle-fill',
        'Media': 'bi-dash-circle-fill',
        'Baja': 'bi-arrow-down-circle-fill'
    };
    return icons[priority] || 'bi-dash-circle-fill';
}
