/* ============================================================
   CARTA - RESTAURANTE CANELITA
   Renderizado y filtrado del menu de platos
   ============================================================ */

// ==================== DATOS DEL MENU ====================
// Campo "image": URL de la imagen del plato.
// Reemplaza cada URL con la imagen real de tu plato.
const menuItems = [
    // ---- ENTRADAS ----
    {
        id: 1,
        name: "Ceviche de Pescado",
        description: "Pescado fresco marinado en jugo de limon con cebolla morada, cilantro, aji limo y choclo.",
        price: 28.00,
        category: "Entradas",
        image: "https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?w=600&h=400&fit=crop",
        tag: "Popular",
        tagColor: "bg-danger"
    },
    {
        id: 2,
        name: "Causa Limeña",
        description: "Capas de papa amarilla sazonada con aji amarillo, rellena de atun con mayonesa y palta.",
        price: 25.00,
        category: "Entradas",
        image: "https://blog.renaware.com/wp-content/uploads/2024/04/Causa-Limena-02.jpg",
        tag: null,
        tagColor: ""
    },
    {
        id: 3,
        name: "Solterito Arequipeño",
        description: "Ensalada fria de habas, queso fresco, cebolla, tomate y aji, aderezada con limon.",
        price: 22.00,
        category: "Entradas",
        image: "https://blog.renaware.com/wp-content/uploads/2024/06/Solterito-3.jpg",
        tag: null,
        tagColor: ""
    },
    {
        id: 4,
        name: "Papa a la Huancaína",
        description: "Papas cocidas bañadas en cremosa salsa de aji amarillo con queso fresco y galleta soda.",
        price: 23.00,
        category: "Entradas",
        image: "https://comedera.com/wp-content/uploads/sites/9/2022/06/Papas-a-la-huancaina-shutterstock_708596629.jpg",
        tag: "Clasico",
        tagColor: "bg-warning text-dark"
    },

    // ---- FONDOS ----
    {
        id: 5,
        name: "Lomo Saltado",
        description: "Trozos de lomo fino salteados con tomate, cebolla, aji amarillo, salsa de soya y vinagre balsamico.",
        price: 38.00,
        category: "Fondos",
        image: "https://static.wixstatic.com/media/9755d8_b2d98eade0814b17a67fdf7d95888fdc~mv2.png/v1/fill/w_1280,h_720,al_c/9755d8_b2d98eade0814b17a67fdf7d95888fdc~mv2.png",
        tag: "Chef Recomienda",
        tagColor: "bg-warning text-dark"
    },
    {
        id: 6,
        name: "Aji de Gallina",
        description: "Deshebrada de gallina en cremosa salsa de aji amarillo, pan remojado en leche, con arroz y papas.",
        price: 30.00,
        category: "Fondos",
        image: "https://www.ajinomoto.com.pe:8085/img/receta/121.-Aji-de-Gallina.jpg",
        tag: null,
        tagColor: ""
    },
    {
        id: 7,
        name: "Arroz con Pollo",
        description: "Arroz verde preparado con cilantro, trozos de pollo jugoso, verduras frescas y cerveza artesanal.",
        price: 27.00,
        category: "Fondos",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3QdEKca8VVsUa88UWH-Dnk7UOBnmzxkZ9wIjO_4Nki4bRQ9mDdmSc3OHd&s=10",
        tag: null,
        tagColor: ""
    },
    {
        id: 8,
        name: "Rocoto Relleno",
        description: "Rocoto relleno de carne molida especiada con arroz blanco y queso gratinado al horno.",
        price: 35.00,
        category: "Fondos",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXkRv3WwGYOEmuGha6d9nHSWfLxdgxwYHAflyCp04lKp5h1mjrJZ1F6BN5&s=10",
        tag: "Picante",
        tagColor: "bg-danger"
    },
    {
        id: 9,
        name: "Seco de Carne",
        description: "Carne de res guisada lentamente con cilantro, chicha de jora, zapallo y papas.",
        price: 33.00,
        category: "Fondos",
        image: "https://www.recetasnestle.com.ec/sites/default/files/srh_recipes/55c83046b48e9c4a200de84f5dd9c70d.jpg",
        tag: null,
        tagColor: ""
    },
    {
        id: 10,
        name: "Tallarin Saltado",
        description: "Tallarines fritos al wok con carne, verduras, tomate, cebolla y salsa de soya.",
        price: 32.00,
        category: "Fondos",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZS3xwbysIAAWMCAuy8fm3wDRwePcQP5cysPrPXAraTOnVUpCluw4wllw&s=10",
        tag: null,
        tagColor: ""
    },
    {
        id: 11,
        name: "Pachamanca",
        description: "Carne de cerdo, pollo y cecina cocidos en piedra caliente con papas, humitas y frijoles.",
        price: 40.00,
        category: "Fondos",
        image: "https://i.ytimg.com/vi/u9AMJGOF26g/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCCbc29zS_hAfdDPW-fgojJsUwiMA",
        tag: "Especial",
        tagColor: "bg-canelita-subtle text-canelita-emphasis"
    },

    // ---- AEROPUERTOS ----
    {
        id: 12,
        name: "Aeropuerto de Lomo",
        description: "Arroz chaufa de carne, tallarin saltado y papas fritas, coronado con huevo frito.",
        price: 36.00,
        category: "Aeropuertos",
        image: "https://tofuu.getjusto.com/orioneat-local/resized2/63hKGxvPhXmTY6zoH-300-x.webp",
        tag: "Porcion Grande",
        tagColor: "bg-info text-dark"
    },
    {
        id: 13,
        name: "Aeropuerto de Pollo",
        description: "Arroz chaufa de pollo, tallarin saltado con pollo y papas fritas, con huevo frito encima.",
        price: 34.00,
        category: "Aeropuertos",
        image: "https://i.ytimg.com/vi/KfM8UjY-lHs/maxresdefault.jpg",
        tag: null,
        tagColor: ""
    },

    // ---- BEBIDAS ----
    {
        id: 14,
        name: "Chicha Morada",
        description: "Bebida tradicional preparada con maiz morado, canela, clavo y limon. Refrescante y natural.",
        price: 8.00,
        category: "Bebidas",
        image: "https://origin.cronosmedia.glr.pe/large/2023/07/24/lg_64bebe2ae1753238157f7157.jpg",
        tag: "Tradicional",
        tagColor: "bg-canelita-subtle text-canelita-emphasis"
    },
    {
        id: 15,
        name: "Pisco Sour",
        description: "Coctel clasico peruano con pisco, limon, jarabe de goma, clara de huevo y amargo de angostura.",
        price: 18.00,
        category: "Bebidas",
        image: "https://static.wixstatic.com/media/d66edb_d8f201b04c1044e48c316ebac3698835~mv2.jpg/v1/fill/w_568,h_378,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/d66edb_d8f201b04c1044e48c316ebac3698835~mv2.jpg",
        tag: "Clasico",
        tagColor: "bg-warning text-dark"
    },
    {
        id: 16,
        name: "Inca Kola",
        description: "Gaseosa peruana de sabor dulce y aroma unico, perfecta para acompanar cualquier plato criollo.",
        price: 6.00,
        category: "Bebidas",
        image: "https://www.shutterstock.com/image-photo/lima-peru-dec-29-2024refreshing-260nw-2566159601.jpg",
        tag: null,
        tagColor: ""
    },
    {
        id: 17,
        name: "Maracuya Sour",
        description: "Variacion del pisco sour con pulpa de maracuya fresca, refrescante y tropical.",
        price: 20.00,
        category: "Bebidas",
        image: "https://licoresdlacruz.pe/wp-content/uploads/2025/05/Pisco-Sour-de-Maracuya-Peru-1024x768.webp",
        tag: "Nuevo",
        tagColor: "bg-success"
    }
];

// ==================== RENDERIZADO ====================

/**
 * Renderiza los platos del menu en el contenedor.
 * @param {Array} items - Arreglo de platos a mostrar.
 */
function renderMenu(items) {
    const container = document.getElementById('menu-container');
    const noResults = document.getElementById('no-results');

    container.innerHTML = '';

    if (items.length === 0) {
        noResults.classList.remove('d-none');
        container.classList.add('d-none');
    } else {
        noResults.classList.add('d-none');
        container.classList.remove('d-none');

        items.forEach(item => {
            container.appendChild(createMenuCard(item));
        });
    }
}

/**
 * Crea el elemento HTML de una tarjeta de plato.
 * @param {object} item - Objeto del plato.
 * @returns {HTMLElement} Elemento DOM de la tarjeta.
 */
function createMenuCard(item) {
    const col = document.createElement('div');
    col.className = 'col-md-6 col-lg-4';

    const tagHTML = item.tag
        ? `<span class="dish-badge badge ${item.tagColor} position-absolute top-0 end-0 m-2">${item.tag}</span>`
        : '';

    col.innerHTML = `
        <div class="card dish-card border-0 shadow-sm h-100">
            <div class="dish-image-wrapper position-relative">
                <img src="${item.image}" alt="${item.name}" class="dish-img" loading="lazy">
                ${tagHTML}
            </div>
            <div class="card-body d-flex flex-column">
                <span class="menu-category badge bg-canelita-subtle text-canelita-emphasis mb-2 align-self-start">
                    ${item.category}
                </span>
                <h5 class="dish-name">${item.name}</h5>
                <p class="dish-desc text-muted flex-grow-1">${item.description}</p>
                <div class="d-flex justify-content-between align-items-center mt-2">
                    <span class="dish-price">S/ ${item.price.toFixed(2)}</span>
                    <span class="dish-category-badge text-muted small">
                        <i class="bi bi-tag"></i> ${item.category}
                    </span>
                </div>
            </div>
        </div>
    `;

    return col;
}

// ==================== FILTRADO ====================

/**
 * Filtra los platos por categoria y texto de busqueda.
 */
function filterMenu() {
    const searchText = document.getElementById('menu-search').value.toLowerCase();
    const activeCategory = document.querySelector('.category-btn.active').getAttribute('data-category');

    const filtered = menuItems.filter(item => {
        const matchesCategory = activeCategory === 'Todos' || item.category === activeCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchText) ||
                              item.description.toLowerCase().includes(searchText);
        return matchesCategory && matchesSearch;
    });

    renderMenu(filtered);
}

// ==================== INICIALIZACION ====================
document.addEventListener('DOMContentLoaded', function () {
    renderMenu(menuItems);

    document.getElementById('menu-search').addEventListener('input', filterMenu);

    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.category-btn').forEach(b => {
                b.classList.remove('active', 'btn-canelita');
                b.classList.add('btn-outline-secondary');
            });
            this.classList.add('active', 'btn-canelita');
            this.classList.remove('btn-outline-secondary');
            filterMenu();
        });
    });
});
