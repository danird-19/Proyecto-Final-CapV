/* ============================================================
   APLICACIÓN PRINCIPAL - GESTOR DE TAREAS CANELITA
   Controlador principal: inicialización, eventos y renderizado
   ============================================================ */

// ==================== VARIABLES GLOBALES ====================
let editingTaskId = null;    // ID de la tarea que se está editando (null si es nueva)
let deleteTargetId = null;   // ID de la tarea a eliminar

// ==================== ELEMENTOS DEL DOM ====================
const taskForm = document.getElementById('task-form');
const taskIdInput = document.getElementById('task-id');
const taskTitleInput = document.getElementById('task-title');
const taskDescriptionInput = document.getElementById('task-description');
const taskPriorityInput = document.getElementById('task-priority');
const formTitle = document.getElementById('form-title');
const btnSubmit = document.getElementById('btn-submit');
const btnCancel = document.getElementById('btn-cancel');
const searchInput = document.getElementById('search-input');
const filterStatus = document.getElementById('filter-status');
const tasksContainer = document.getElementById('tasks-container');
const noTasksMessage = document.getElementById('no-tasks-message');
const taskCount = document.getElementById('task-count');

// ==================== INICIALIZACIÓN ====================
document.addEventListener('DOMContentLoaded', function () {
    // Cargar datos de ejemplo al iniciar
    loadSampleData();

    // Renderizar la interfaz inicial
    renderTasks();
    updateStats();

    // Registrar event listeners
    setupEventListeners();
});

/**
 * Configura todos los event listeners de la aplicación.
 */
function setupEventListeners() {
    // Formulario: enviar (agregar o editar tarea)
    taskForm.addEventListener('submit', handleFormSubmit);

    // Botón cancelar edición
    btnCancel.addEventListener('click', cancelEditing);

    // Búsqueda en tiempo real
    searchInput.addEventListener('input', handleSearch);

    // Filtro por estado
    filterStatus.addEventListener('change', handleFilterChange);

    // Confirmar eliminación en el modal
    document.getElementById('btn-confirm-delete').addEventListener('click', handleConfirmDelete);
}

// ==================== MANEJO DEL FORMULARIO ====================

/**
 * Maneja el envío del formulario (agregar o actualizar tarea).
 * @param {Event} e - Evento de envío del formulario.
 */
function handleFormSubmit(e) {
    e.preventDefault();

    // Validar el formulario
    if (!taskForm.checkValidity()) {
        taskForm.classList.add('was-validated');
        return;
    }

    const title = taskTitleInput.value;
    const description = taskDescriptionInput.value;
    const priority = taskPriorityInput.value;

    if (editingTaskId) {
        // Modo edición: actualizar tarea existente
        updateTask(editingTaskId, title, description, priority);
        showToast('Tarea actualizada correctamente.', 'success');
        exitEditMode();
    } else {
        // Modo creación: agregar nueva tarea
        addTask(title, description, priority);
        showToast('Tarea agregada correctamente.', 'success');
    }

    // Limpiar formulario y recargar vista
    resetForm();
    renderTasks();
    updateStats();
}

/**
 * Prepara el formulario para editar una tarea existente.
 * @param {string} id - ID de la tarea a editar.
 */
function startEditing(id) {
    const task = getTaskById(id);
    if (!task) return;

    editingTaskId = id;

    // Rellenar el formulario con los datos de la tarea
    taskIdInput.value = task.id;
    taskTitleInput.value = task.title;
    taskDescriptionInput.value = task.description;
    taskPriorityInput.value = task.priority;

    // Cambiar la interfaz del formulario a modo edición
    formTitle.textContent = 'Editar Tarea';
    btnSubmit.innerHTML = '<i class="bi bi-check-lg"></i> Actualizar Tarea';
    btnCancel.classList.remove('d-none');

    // Hacer scroll al formulario
    document.getElementById('nueva-tarea').scrollIntoView({ behavior: 'smooth' });
    taskTitleInput.focus();
}

/**
 * Sale del modo edición y restaura el formulario.
 */
function exitEditMode() {
    editingTaskId = null;
    formTitle.textContent = 'Nueva Tarea';
    btnSubmit.innerHTML = '<i class="bi bi-plus-lg"></i> Agregar Tarea';
    btnCancel.classList.add('d-none');
}

/**
 * Cancela la edición actual y limpia el formulario.
 */
function cancelEditing() {
    exitEditMode();
    resetForm();
}

/**
 * Limpia y reinicia el formulario.
 */
function resetForm() {
    taskForm.reset();
    taskForm.classList.remove('was-validated');
}

// ==================== BÚSQUEDA Y FILTRADO ====================

/**
 * Maneja la búsqueda de tareas en tiempo real.
 */
function handleSearch() {
    renderTasks();
}

/**
 * Maneja el cambio de filtro por estado.
 */
function handleFilterChange() {
    renderTasks();
}

// ==================== ELIMINACIÓN ====================

/**
 * Muestra el modal de confirmación para eliminar una tarea.
 * @param {string} id - ID de la tarea a eliminar.
 */
function showDeleteModal(id) {
    const task = getTaskById(id);
    if (!task) return;

    deleteTargetId = id;
    document.getElementById('delete-task-name').textContent = task.title;

    // Mostrar el modal de Bootstrap
    const modal = new bootstrap.Modal(document.getElementById('deleteModal'));
    modal.show();
}

/**
 * Confirma y ejecuta la eliminación de la tarea.
 */
function handleConfirmDelete() {
    if (deleteTargetId) {
        deleteTask(deleteTargetId);
        showToast('Tarea eliminada correctamente.', 'danger');
        deleteTargetId = null;

        // Cerrar el modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('deleteModal'));
        if (modal) modal.hide();

        // Si estábamos editando la tarea eliminada, salir del modo edición
        if (editingTaskId === null) {
            exitEditMode();
            resetForm();
        }

        renderTasks();
        updateStats();
    }
}

// ==================== TOGGLE ESTADO ====================

/**
 * Alterna el estado de una tarea (Pendiente / Completada).
 * @param {string} id - ID de la tarea.
 */
function handleToggleStatus(id) {
    const task = toggleTaskStatus(id);
    if (task) {
        const statusMsg = task.status === 'Completada'
            ? 'Tarea marcada como completada.'
            : 'Tarea marcada como pendiente.';
        showToast(statusMsg, 'info');
        renderTasks();
        updateStats();
    }
}

// ==================== RENDERIZADO ====================

/**
 * Renderiza la lista de tareas según los filtros actuales.
 */
function renderTasks() {
    const searchText = searchInput.value;
    const statusFilter = filterStatus.value;
    const filteredTasks = getFilteredTasks(statusFilter, searchText);

    // Limpiar el contenedor
    tasksContainer.innerHTML = '';

    // Mostrar mensaje de "no hay tareas" o la lista
    if (filteredTasks.length === 0) {
        noTasksMessage.classList.remove('d-none');
        tasksContainer.classList.add('d-none');
    } else {
        noTasksMessage.classList.add('d-none');
        tasksContainer.classList.remove('d-none');

        // Renderizar cada tarea
        filteredTasks.forEach(task => {
            tasksContainer.appendChild(createTaskCard(task));
        });
    }

    // Actualizar el contador de tareas
    const totalFiltered = filteredTasks.length;
    taskCount.textContent = totalFiltered === 1 ? '1 tarea' : `${totalFiltered} tareas`;
}

/**
 * Crea el elemento HTML de una tarjeta de tarea.
 * @param {object} task - Objeto de la tarea.
 * @returns {HTMLElement} Elemento DOM de la tarjeta.
 */
function createTaskCard(task) {
    const isCompleted = task.status === 'Completada';
    const priorityBadge = getPriorityBadgeClass(task.priority);
    const priorityIcon = getPriorityIcon(task.priority);

    // Crear el elemento de tarjeta
    const card = document.createElement('div');
    card.className = `card task-card border-0 shadow-sm mb-3 ${isCompleted ? 'completed' : ''}`;
    card.innerHTML = `
        <div class="card-body p-3">
            <div class="d-flex justify-content-between align-items-start flex-wrap">
                <!-- Información de la tarea -->
                <div class="flex-grow-1 me-3">
                    <div class="d-flex align-items-center gap-2 mb-1">
                        <h5 class="task-title mb-0">${sanitizeHTML(task.title)}</h5>
                        <span class="badge ${priorityBadge}">
                            <i class="bi ${priorityIcon}"></i> ${sanitizeHTML(task.priority)}
                        </span>
                        <span class="badge ${isCompleted ? 'bg-success' : 'bg-warning text-dark'}">
                            ${isCompleted ? 'Completada' : 'Pendiente'}
                        </span>
                    </div>
                    <p class="task-description mb-2">${sanitizeHTML(task.description)}</p>
                    <div class="task-meta">
                        <i class="bi bi-calendar3"></i> Creada: ${formatDate(task.createdAt)}
                    </div>
                </div>

                <!-- Botones de acción -->
                <div class="task-actions d-flex gap-1 flex-shrink-0">
                    <button class="btn btn-sm ${isCompleted ? 'btn-outline-warning' : 'btn-outline-success'}"
                            title="${isCompleted ? 'Marcar como pendiente' : 'Marcar como completada'}"
                            onclick="handleToggleStatus('${task.id}')">
                        <i class="bi ${isCompleted ? 'bi-arrow-counterclockwise' : 'bi-check-lg'}"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-primary"
                            title="Editar tarea"
                            onclick="startEditing('${task.id}')">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger"
                            title="Eliminar tarea"
                            onclick="showDeleteModal('${task.id}')">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `;

    return card;
}

/**
 * Actualiza las estadísticas del dashboard.
 */
function updateStats() {
    const stats = getTaskStats();

    document.getElementById('stat-total').textContent = stats.total;
    document.getElementById('stat-pendientes').textContent = stats.pendientes;
    document.getElementById('stat-completadas').textContent = stats.completadas;
    document.getElementById('stat-alta').textContent = stats.prioridadAlta;
}
