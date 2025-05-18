# ERI Bancaire - Prueba Técnica Frontend

Este proyecto es una simulación de una interfaz de usuario para un sistema bancario, desarrollada con React.

## Características Principales

La aplicación replica funcionalidades clave de un sistema de gestión bancaria, permitiendo al usuario:

- **Navegación Intuitiva:** Un panel lateral (Sidebar) y una barra superior (Topbar) persistentes para fácil acceso a las diferentes secciones.
- **Búsqueda y Visualización de Clientes:** Funcionalidad para buscar clientes y ver su información detallada, incluyendo datos generales, comunicación, y más, organizados en pestañas.
- **Gestión de Cuentas:**
    - Listar las cuentas asociadas a un cliente, con opciones de paginación y filtros.
    - Ver el detalle específico de una cuenta, incluyendo sus características (IBAN, tipo, saldo, etc.).
    - Visualizar los movimientos o transacciones de una cuenta seleccionada.
- **Visión General de Cuentas (`AccountsOverviewPage`):** Un dashboard que presenta un resumen de las cuentas del usuario, posiblemente con saldos totales y gráficos (si se implementan).
- **Informe de Transacciones (`TransactionsReportPage`):** Permite generar y visualizar informes de transacciones, con opciones para filtrar por cuenta y rango de fechas.
- **Configuración (`SettingsPage`):** Una sección donde el usuario podría ajustar preferencias de la aplicación o de su perfil.
- **Datos Simulados (Mock):** Toda la aplicación opera con datos locales (mock data) para simular la interacción con un backend, facilitando el desarrollo y la demostración del frontend.

## Pila Tecnológica

La aplicación se ha construido utilizando un conjunto moderno de tecnologías frontend:

- **Framework Principal:**
    - `React (v18+)`: Biblioteca para construir interfaces de usuario interactivas y componentizadas.
    - `react-dom`: Provee los métodos específicos del DOM para React.
- **Enrutamiento:**
    - `react-router-dom (v6+)`: Para la navegación declarativa y la gestión de rutas en la Single Page Application (SPA).
- **UI y Componentes Visuales:**
    - `bootstrap (v5+)`: Framework CSS para un diseño responsivo y componentes predefinidos.
    - `react-bootstrap`: Componentes de Bootstrap reconstruidos para React, facilitando su integración.
    - `CSS Personalizado`: Estilos adicionales en `App.css` e `index.css` para adaptar la apariencia a los requisitos específicos y la paleta de colores ERI.
- **Iconografía:**
    - `@fortawesome/fontawesome-svg-core`, `@fortawesome/free-solid-svg-icons`, `@fortawesome/react-fontawesome`: Para la inclusión de iconos vectoriales escalables.
- **Gestión de Estado:**
    - Principalmente a través del estado local de los componentes y el paso de `props`. Para escenarios más complejos, se podría considerar Context API de React o bibliotecas externas (ver Posibles Mejoras Futuras).
- **Entorno de Desarrollo y Herramientas de Construcción (proporcionadas por Create React App):**
    - `Node.js` (v16+ recomendado) y `npm`/`yarn`: Entorno de ejecución JavaScript y gestores de paquetes.
    - `Webpack`: Empaquetador de módulos.
    - `Babel`: Transpilador de JavaScript para asegurar compatibilidad con navegadores.
    - Servidor de desarrollo con Hot Reloading.

## Estructura de Datos (Mock)

Los datos simulados se encuentran en la carpeta `src/data/` y son cruciales para el funcionamiento de la UI.

-   **`clients.js`**: Define la estructura de los clientes.
    ```javascript
    // Ejemplo de estructura (puede variar)
    {
      id: '015454156',
      name: 'Elena',
      surname: 'Petrova',
      // ... otros campos como dirección, contacto, etc.
    }
    ```
-   **`accounts.js`**: Contiene la información de las cuentas bancarias.
    ```javascript
    // Ejemplo de estructura
    {
      id: '015454156909782034',
      clientId: '015454156', // Vincula la cuenta al cliente
      type: 'Current Account',
      currency: 'EUR',
      balance: 12500.75,
      iban: 'ES8020481234567890123456',
      name: 'Cuenta Principal Nómina',
      openedDate: '2018-05-20',
      // ... otros campos relevantes
    }
    ```
-   **`transactions.js`**: Almacena los movimientos de las cuentas. Es un array donde cada objeto representa una cuenta y contiene un array de sus transacciones.
    ```javascript
    // Ejemplo de estructura
    {
      accountId: '015454156909782034',
      transactions: [
        {
          id: 'txn001',
          date: '2024-05-15',
          description: 'Salary Deposit - ACME Corp',
          amount: 3200.00,
          type: 'Credit', // 'Debit' o 'Credit'
          balance: 12500.75, // Saldo después de la transacción
          valueDate: '2024-05-15',
          category: 'Income'
        },
        // ... más transacciones para esta cuenta
      ]
    },
    // ... más objetos para otras cuentas
    ```

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
    Los datos simulados para la aplicación se encuentran en la carpeta `src/data/`.
    ```bash
    npm install
    # o
    yarn install
    ```

3.  **Iniciar el servidor de desarrollo:**
    ```bash
    npm start
    # o
    yarn start
    ```
    La aplicación estará disponible en `http://localhost:3000` (o el puerto que indique la consola).

## Ejecución de Pruebas

Actualmente, el proyecto no cuenta con una infraestructura de pruebas automatizadas implementada. Sin embargo, está planificado como una mejora futura (ver sección "Posibles Mejoras Futuras").

Cuando se implementen, las pruebas se podrán ejecutar con comandos estándar como:
```bash
npm test
# o
yarn test
```
Se anticipa el uso de herramientas como Jest y React Testing Library.

## Estructura del Proyecto

```
ERI_Bancaire_Prueba_FernandoGMR/
├── public/
│   └── index.html
├── src/
│   ├── components/         # Componentes reutilizables (Sidebar, Topbar, Tablas, etc.)
│   ├── data/               # Datos mock (clientes, cuentas, transacciones)
│   ├── pages/              # Componentes de página (ClientDetailsPage, AccountsOverviewPage, etc.)
│   ├── styles/             # (Opcional, si separamos más los CSS)
│   ├── App.css             # Estilos principales de la aplicación
│   ├── App.jsx             # Componente raíz con el layout y enrutador
│   ├── index.css           # Estilos globales e importación de Bootstrap
│   └── index.js            # Punto de entrada, renderiza App
├── .gitignore
├── package.json
├── README.md
```

## Decisiones de Diseño y Arquitectura (Conceptual)

-   **React y Componentización:** Se utiliza React para construir una interfaz de usuario modular y reactiva.
-   **Microfrontends (Conceptual):** Aunque este proyecto no implementa una infraestructura completa de microfrontends (como Module Federation), se estructura pensando en esa posibilidad. Cada "página" o funcionalidad principal podría, en una evolución, convertirse en un microfrontend independiente.
-   **React Router:** Para la navegación entre las diferentes vistas.
-   **Datos Mock:** Archivos JS para simular la respuesta de una API.
-   **Estilos:** Bootstrap complementado con CSS personalizado. Se utiliza la paleta de colores especificada por ERI.
-   **Iconos:** FontAwesome.

## Posibles Mejoras Futuras

-   **Integración con API Real:** Reemplazar los datos mock con llamadas a un backend real.
-   **Autenticación y Autorización:** Implementar un sistema de login y gestión de permisos.
-   **Gestión de Estado Avanzada:** Para aplicaciones más complejas, considerar el uso de bibliotecas como Redux, Zustand o Context API de forma más extensiva.
-   **Pruebas Unitarias e Integración:** Añadir pruebas con Jest y React Testing Library.
-   **Implementación Completa de Microfrontends:** Utilizar herramientas como Webpack Module Federation o single-spa.
-   **Optimización del Rendimiento:** Code splitting, lazy loading, optimización de imágenes.
-   **Accesibilidad (a11y):** Mejorar la accesibilidad siguiendo las pautas WCAG.
-   **Internacionalización (i18n):** Preparar la aplicación para múltiples idiomas.