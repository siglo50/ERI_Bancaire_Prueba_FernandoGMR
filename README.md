# ERI Bancaire - Prueba Tecnica Frontend

Este proyecto es una simulación de una interfaz de usuario para un sistema bancario, desarrollada con React y siguiendo una arquitectura de microfrontends (conceptual).

## Descripción del Proyecto

La aplicación replica las funcionalidades básicas de un sistema bancario, permitiendo:
- Navegar a la página de búsqueda de clientes.
- Ver el detalle de un cliente con información general, comunicación, estadísticas, etc., a través de pestañas.
- Listar las cuentas de un cliente con paginación y filtros.
- Ver el detalle y movimientos de una cuenta específica.

Se utilizan datos simulados (mock) para representar clientes, cuentas y movimientos.

## Requisitos Previos

- Node.js (v16 o superior)
- npm o yarn

## Instalación y Puesta en Marcha

1.  **Clonar el repositorio (si aplica):**
    ```bash
    git clone <url-del-repositorio>
    cd ERI_Bancaire_Prueba_FernandoGMR
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    # o
    yarn install
    ```
    Dependencias principales:
    - `react`
    - `react-dom`
    - `react-router-dom`
    - `bootstrap`
    - `react-bootstrap`
    - `@fortawesome/fontawesome-svg-core`
    - `@fortawesome/free-solid-svg-icons`
    - `@fortawesome/react-fontawesome`

3.  **Iniciar el servidor de desarrollo:**
    ```bash
    npm start
    # o
    yarn start
    ```
    La aplicación estará disponible en `http://localhost:3000` (o el puerto que indique la consola).

## Estructura del Proyecto

```
ERI_Bancaire_Prueba_FernandoGMR/
├── public/
│   └── index.html
├── src/
│   ├── components/         # Componentes reutilizables (Sidebar, Topbar, Tablas, etc.)
│   │   ├── Sidebar.jsx
│   │   └── Topbar.jsx
│   ├── data/               # Datos mock (clientes, cuentas, movimientos)
│   │   ├── clients.js
│   │   ├── accounts.js
│   │   └── transactions.js
│   ├── pages/              # Componentes de página (ClientDetailsPage, AccountListPage, etc.)
│   │   ├── ClientSearchPage.jsx
│   │   ├── ClientDetailsPage.jsx
│   │   ├── AccountListPage.jsx
│   │   └── AccountCharacteristicsPage.jsx
│   ├── styles/             # (Opcional, si separamos más los CSS)
│   ├── App.css             # Estilos principales de la aplicación
│   ├── App.jsx             # Componente raíz con el layout y enrutador
│   ├── index.css           # Estilos globales e importación de Bootstrap
│   └── index.js            # Punto de entrada, renderiza App
├── .gitignore
├── package.json
├── README.md
```

## Decisiones de Diseño y Arquitectura

-   **React y Componentización:** Se utiliza React para construir una interfaz de usuario modular y reactiva. La UI se divide en componentes reutilizables (barra lateral, barra superior, tablas, pestañas, etc.) para facilitar el mantenimiento y la escalabilidad.
-   **Microfrontends (Conceptual):** Aunque este proyecto no implementa una infraestructura completa de microfrontends (como Module Federation), se estructura pensando en esa posibilidad. Cada "página" o funcionalidad principal (Detalle Cliente, Lista de Cuentas) podría, en una evolución, convertirse en un microfrontend independiente.
-   **React Router:** Para la navegación entre las diferentes vistas de la aplicación, asegurando una experiencia de usuario fluida (SPA).
-   **Datos Mock:** Se utilizan archivos JS/JSON para simular la respuesta de una API, permitiendo desarrollar y probar la UI sin necesidad de un backend real.
-   **Estilos:** Se utiliza Bootstrap para un diseño base responsivo y familiar, complementado con CSS personalizado para ajustar la apariencia a las capturas de pantalla proporcionadas. Se utiliza la paleta de colores especificada.
-   **Iconos:** Se utiliza FontAwesome para los iconos, buscando similitud con los de las capturas.

## Posibles Mejoras Futuras

-   **Integración con API Real:** Reemplazar los datos mock con llamadas a un backend real.
-   **Autenticación y Autorización:** Implementar un sistema de login y gestión de permisos.
-   **Gestión de Estado Avanzada:** Para aplicaciones más complejas, considerar el uso de bibliotecas como Redux, Zustand o Context API de forma más extensiva para la gestión del estado global.
-   **Pruebas Unitarias e Integración:** Añadir pruebas con Jest y React Testing Library.
-   **Implementación Completa de Microfrontends:** Utilizar herramientas como Webpack Module Federation o single-spa para desplegar las diferentes partes de la aplicación de forma independiente.
-   **Optimización del Rendimiento:** Técnicas como code splitting, lazy loading de componentes y optimización de imágenes.
-   **Accesibilidad (a11y):** Mejorar la accesibilidad siguiendo las pautas WCAG.
-   **Internacionalización (i18n):** Preparar la aplicación para múltiples idiomas.