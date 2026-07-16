/* ============================================================
   GESTIÓN DE TAREAS - GESTOR DE TAREAS CANELITA
   Funciones para CRUD de tareas (datos en memoria)
   ============================================================ */

// ==================== ALMACENAMIENTO EN MEMORIA ====================
// Arreglo global que almacena todas las tareas durante la ejecución.
let tasks = [];

// ==================== FUNCIONES CRUD ====================

/**
 * Agrega una nueva tarea al arreglo.
 * @param {string} title - Título de la tarea.
 * @param {string} description - Descripción de la tarea.
 * @param {string} priority - Prioridad: 'Alta', 'Media' o 'Baja'.
 * @returns {object} La tarea creada.
 */
function addTask(title, description, priority) {
    const newTask = {
        id: generateId(),
        title: title.trim(),
        description: description.trim(),
        priority: priority,
        status: 'Pendiente',
        createdAt: new Date().toISOString()
    };
    tasks.push(newTask);
    return newTask;
}

/**
 * Actualiza una tarea existente por su ID.
 * @param {string} id - ID de la tarea a actualizar.
 * @param {string} title - Nuevo título.
 * @param {string} newDescription - Nueva descripción.
 * @param {string} newPriority - Nueva prioridad.
 * @returns {object|null} La tarea actualizada o null si no se encontró.
 */
function updateTask(id, title, newDescription, newPriority) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.title = title.trim();
        task.description = newDescription.trim();
        task.priority = newPriority;
    }
    return task;
}

/**
 * Elimina una tarea del arreglo por su ID.
 * @param {string} id - ID de la tarea a eliminar.
 * @returns {boolean} true si se eliminó, false si no se encontró.
 */
function deleteTask(id) {
    const index = tasks.findIndex(t => t.id === id);
    if (index !== -1) {
        tasks.splice(index, 1);
        return true;
    }
    return false;
}

/**
 * Cambia el estado de una tarea entre 'Pendiente' y 'Completada'.
 * @param {string} id - ID de la tarea.
 * @returns {object|null} La tarea actualizada o null si no se encontró.
 */
function toggleTaskStatus(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.status = task.status === 'Pendiente' ? 'Completada' : 'Pendiente';
    }
    return task;
}

/**
 * Obtiene una tarea por su ID.
 * @param {string} id - ID de la tarea.
 * @returns {object|undefined} La tarea encontrada o undefined.
 */
function getTaskById(id) {
    return tasks.find(t => t.id === id);
}

// ==================== FUNCIONES DE CONSULTA ====================

/**
 * Filtra tareas por estado y/o texto de búsqueda.
 * @param {string} statusFilter - Filtro por estado: 'Todas', 'Pendiente', 'Completada'.
 * @param {string} searchText - Texto de búsqueda para filtrar por título.
 * @returns {array} Arreglo de tareas filtradas.
 */
function getFilteredTasks(statusFilter = 'Todas', searchText = '') {
    return tasks.filter(task => {
        // Filtro por estado
        const matchesStatus = statusFilter === 'Todas' || task.status === statusFilter;

        // Filtro por texto (búsqueda insensible a mayúsculas)
        const matchesSearch = searchText === '' ||
            task.title.toLowerCase().includes(searchText.toLowerCase());

        return matchesStatus && matchesSearch;
    });
}

/**
 * Obtiene estadísticas generales de las tareas.
 * @returns {object} Objeto con las estadísticas.
 */
function getTaskStats() {
    return {
        total: tasks.length,
        pendientes: tasks.filter(t => t.status === 'Pendiente').length,
        completadas: tasks.filter(t => t.status === 'Completada').length,
        prioridadAlta: tasks.filter(t => t.priority === 'Alta').length
    };
}

/**
 * Agrega datos de ejemplo para demostración.
 */
function loadSampleData() {
    const sampleTasks = [
        {
            id: generateId(),
            title: 'Preparar el ceviche del día',
            description: 'Verificar la frescura del pescado y preparar el ceviche tradicional con limón, cebolla y cilantro.',
            priority: 'Alta',
            status: 'Pendiente',
            createdAt: new Date(Date.now() - 86400000).toISOString()
        },
        {
            id: generateId(),
            title: 'Revisar inventario de especias',
            description: 'Controlar los niveles de comino, ají panca y pimentón en almacén.',
            priority: 'Media',
            status: 'Pendiente',
            createdAt: new Date(Date.now() - 172800000).toISOString()
        },
        {
            id: generateId(),
            title: 'Actualizar menú del día',
            description: 'Agregar la causa limeña y el lomo saltado a la carta del día.',
            priority: 'Baja',
            status: 'Completada',
            createdAt: new Date(Date.now() - 259200000).toISOString()
        },
        {
            id: generateId(),
            title: 'Limpieza profunda de cocina',
            description: 'Realizar la limpieza general de utensilios, freidoras y refrigeradores.',
            priority: 'Alta',
            status: 'Pendiente',
            createdAt: new Date(Date.now() - 345600000).toISOString()
        },
        {
            id: generateId(),
            title: 'Capacitar personal nuevo',
            description: 'Impartir curso sobre técnicas de preparación de ají de gallina y papa a la huancaína.',
            priority: 'Media',
            status: 'Completada',
            createdAt: new Date(Date.now() - 432000000).toISOString()
        }
    ];

    tasks = sampleTasks;
}
