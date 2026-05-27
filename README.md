# AgroDistribuciones - ERP Agrícola y Tienda Virtual

## 📋 Descripción del Proyecto

Sistema web demo/prototipo completo para una empresa dedicada a la compra y venta de agroquímicos, fertilizantes, cinta de riego, semillas, herramientas agrícolas y productos para el rubro agrícola.

El sistema simula un ERP completo con:
- **Tienda Virtual**: Catálogo funcional, carrito, checkout, boleta y seguimiento de pedidos
- **Panel Administrativo**: Dashboard, gestión de productos, compras, ventas, kardex, reportes y más

### ⚠️ Importante: Sistema Simulado 100% Frontend

Este proyecto funciona **100% en frontend** sin backend ni base de datos:
- ❌ No hay conexión a servidor backend
- ❌ No hay base de datos
- ❌ No hay API externa
- ❌ No hay autenticación real
- ❌ No hay pasarelas de pago reales
- ✅ Todos los datos se guardan en localStorage
- ✅ La tienda virtual tiene funcionalidad real local

## 🛠️ Tecnologías Utilizadas

- **React 18.3.1** - Biblioteca UI
- **Vite 5.4** - Bundler y dev server
- **Tailwind CSS 3.4** - Framework CSS utility-first
- **React Router DOM 6.28** - Enrutamiento
- **Lucide React 0.454** - Iconografía
- **Recharts 2.15** - Gráficos y visualizaciones

## 📦 Estructura del Proyecto

```
agro-demo/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   ├── store/
│   │   └── admin/
│   ├── data/
│   │   ├── products.js          (20 productos precargados)
│   │   ├── customers.js         (10 clientes simulados)
│   │   ├── suppliers.js         (8 proveedores simulados)
│   │   └── ...
│   ├── layouts/
│   │   ├── StoreLayout.jsx
│   │   └── AdminLayout.jsx
│   ├── pages/
│   │   ├── EntryPoint.jsx
│   │   ├── store/
│   │   │   ├── StoreLanding.jsx
│   │   │   ├── StoreCatalog.jsx
│   │   │   ├── StoreProductDetail.jsx
│   │   │   ├── StoreCart.jsx
│   │   │   ├── StoreCheckout.jsx
│   │   │   ├── StoreReceipt.jsx
│   │   │   └── StoreTracking.jsx
│   │   └── admin/
│   │       ├── AdminDashboard.jsx
│   │       ├── AdminProducts.jsx
│   │       ├── AdminOrders.jsx
│   │       ├── AdminKardex.jsx
│   │       └── ... (13 módulos más)
│   ├── utils/
│   │   ├── formatCurrency.js
│   │   └── localStorage.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
│   └── images/
│       ├── producto1.png
│       ├── producto2.png
│       └── ... (hasta producto20.png)
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── index.html
```

## 🚀 Cómo Instalar y Ejecutar

### Requisitos Previos
- Node.js 18+ 
- npm o yarn

### Pasos de Instalación

1. **Descomprime el archivo ZIP:**
   ```bash
   unzip agro-demo.zip
   cd agro-demo
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Inicia el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

   La aplicación se abrirá automáticamente en `http://localhost:5173`

4. **Para generar el build de producción:**
   ```bash
   npm run build
   ```

5. **Para visualizar el build:**
   ```bash
   npm run preview
   ```

## 🏪 Tienda Virtual - Funcionalidades

### ✅ Funcional 100% Local

La tienda virtual tiene todas estas funcionalidades completamente operativas:

- 📋 **Catálogo**: 20 productos precargados con filtros y búsqueda
- 🔍 **Filtros Avanzados**: Por categoría, subcategoría y búsqueda por nombre/marca/SKU
- 📄 **Detalle de Producto**: Especificaciones técnicas, modo de uso, advertencias
- 🛒 **Carrito de Compras**: Agregar, eliminar, modificar cantidades
- 💳 **Checkout**: Formulario de cliente y selección de método de pago
- 📋 **Boleta Simulada**: Comprobante visual de venta con datos reales
- 📦 **Seguimiento de Pedidos**: Timeline interactivo del estado del pedido
- 💾 **Persistencia**: Los datos se guardan en localStorage
- 📱 **Responsivo**: Funciona en desktop, tablet y móvil

### Datos de Productos

Se incluyen exactamente **20 productos** con campos completos:
- Fosfato Monoamónico Granulado 50 Kg
- Fosfato Diamónico 25 Kg
- Sulfato de Amonio 50 Kg
- Arriba 1 Lt
- Y 16 productos más...

Cada producto tiene:
- Nombre, SKU, categoría, subcategoría, marca, proveedor
- Precio en soles peruanos, stock disponible
- Descripción técnica, ficha técnica, modo de uso, advertencias
- Peso/volumen, registro sanitario, lote, fecha de vencimiento

## 🔧 Panel Administrativo - Módulos

El panel administrativo cuenta con **15 módulos** completos:

1. **Dashboard** ✅ Operativo
   - Tarjetas KPI (ventas, compras, stock crítico, pedidos)
   - Gráficos de ventas vs compras
   - Gráfico circular de gastos
   - Últimos pedidos
   - Productos con bajo stock

2. **Productos** ✅ Operativo
   - Tabla con búsqueda y filtros
   - Acciones: crear, editar, eliminar, exportar

3. **Categorías** - Interfaz completa
   - Gestión de categorías y subcategorías
   - Formularios simulados

4. **Compras** - Interfaz completa
   - Registro de compras
   - Detalles de facturas

5. **Flete de Compras** - Interfaz completa
   - Distribución de costos de flete
   - Métodos de valuación

6. **Ventas/Pedidos** - Interfaz completa
   - Listado de pedidos generados en la tienda
   - Cambio de estado de pedidos

7. **Clientes** - Interfaz completa
   - Listado de clientes
   - Historial de compras

8. **Proveedores** - Interfaz completa
   - Gestión de proveedores
   - Historial de compras

9. **Kardex** - Interfaz completa
   - Kardex valorizado
   - Método: promedio ponderado

10. **Gastos** - Interfaz completa
    - Registro de gastos operacionales
    - Categorización

11. **Flujo de Caja** - Interfaz completa
    - Reporte de ingresos y egresos
    - Saldo actual

12. **Reportes** - Interfaz completa
    - Reporte de ventas
    - Reporte de compras
    - Reporte de stock
    - Exportación simulada

13. **Almacén** - Interfaz completa
    - Control de inventario
    - Productos próximos a vencer

14. **Usuarios** - Interfaz completa
    - Gestión de usuarios administrativos
    - Roles y permisos

15. **Configuración** - Interfaz completa
    - Datos de la empresa
    - Parámetros del sistema

## 🎨 Diseño Visual

### Colores Principales
- **Verde Agrícola (#2d5016)** - Color primario
- **Verde Claro (#65a30d)** - Color secundario
- **Blanco, Grises** - Fondos y textos
- **Tonos Tierra** - Acentos

### Características de Diseño
- ✅ Diseño profesional y moderno
- ✅ Interfaz limpia y organizada
- ✅ Tarjetas, badges y botones bien diseñados
- ✅ Iconografía consistente (Lucide React)
- ✅ Sombras suaves y bordes redondeados
- ✅ Estados hover y transiciones suaves
- ✅ Responsivo para todos los tamaños de pantalla

## 📊 Datos Simulados Incluidos

El sistema viene precargado con:
- **20 productos** precargados con stock variado
- **10 clientes** simulados con historial de compras
- **8 proveedores** simulados
- **Gráficos y dashboards** con datos de ejemplo
- **Reportes simulados** con análisis ficticio

## 🖼️ Imágenes de Productos

### ⚠️ Importante

Las imágenes de productos NO están incluidas en el ZIP por razones de tamaño. 

**Cómo agregar las imágenes:**

1. Crea la carpeta `public/images/` si no existe
2. Coloca 20 imágenes PNG nombradas como:
   ```
   public/images/producto1.png
   public/images/producto2.png
   ...
   public/images/producto20.png
   ```

3. El sistema está configurado para:
   - Mostrar las imágenes si existen
   - Mostrar un placeholder si no existen
   - No romper la interfaz en ningún caso

**Recomendaciones:**
- Usa imágenes de 300x300 px o más
- Optimiza el tamaño (máximo 200-300 KB por imagen)
- Usa formato PNG o JPG

## 💾 Persistencia de Datos

El sistema usa `localStorage` para guardar:
- **Carrito de compras** 🛒
- **Pedidos realizados** 📦
- **Stock actualizado** 📊
- **Cambios de estado de pedidos** ↔️

Los datos persisten mientras el usuario no limpie el cache del navegador.

## 🔐 Acceso al Sistema

### Tienda Virtual
- **URL**: `/store`
- **No requiere login**
- Puedes comprar como cliente anónimo

### Panel Administrativo
- **URL**: `/admin`
- **No requiere login real**
- Haz clic en "Entrar como Administrador" desde la tienda

### Página de Inicio
- **URL**: `/`
- Selector entre Tienda y Admin

## 🧪 Casos de Uso de Prueba

### Flujo de Compra Completo

1. Entra a `/store`
2. Navega al catálogo
3. Filtra por categoría "Agroquímicos"
4. Busca "Arriba"
5. Abre el detalle del producto
6. Agrega 3 unidades al carrito
7. Ve al carrito y modifica cantidades
8. Procede al checkout
9. Completa el formulario de cliente
10. Selecciona método de pago
11. Confirma la compra
12. Visualiza la boleta
13. Verifica el seguimiento del pedido

### Interacción con el Admin

1. Entra a `/admin`
2. Visualiza el dashboard con datos del sistema
3. Abre "Productos" para ver el listado
4. Abre "Ventas/Pedidos" para ver los pedidos de la tienda
5. Cambia el estado de un pedido a "En entrega"
6. Abre "Dashboard" para ver actualizado el widget

## 🌐 Publicación en Vercel

El proyecto está listo para publicar en Vercel:

1. **Sube el repositorio a GitHub**
   ```bash
   git init
   git add .
   git commit -m "Proyecto AgroDistribuciones"
   git push origin main
   ```

2. **Conecta Vercel a tu repositorio**
   - Ve a vercel.com
   - Importa el repositorio
   - Vercel detectará automáticamente que es un proyecto Vite
   - ¡Haz deploy!

## 📝 Variables de Configuración

### IGV (Impuesto General a las Ventas)
- Valor: 18%
- Ubicación: `src/pages/store/StoreCart.jsx`

### Costo de Envío
- Valor: S/ 50
- Ubicación: `src/pages/store/StoreCart.jsx`

### Datos de Empresa
- **RUC**: 20601234567
- **Nombre**: AgroDistribuciones del Valle S.A.C.
- **Dirección**: Av. Agricultura 450, Tacna, Perú
- **Teléfono**: 987 654 321

## 🐛 Mensajes de Funcionalidad Simulada

En el panel administrativo, cuando hagas clic en:
- Nuevo Producto
- Editar Producto
- Eliminar Producto
- Exportar Excel/PDF
- Guardar formularios
- Otras acciones administrativas

Verás un mensaje:
> **"Funcionalidad simulada para presentación del prototipo."**

Este es el comportamiento esperado, ya que no hay backend.

## 📱 Compatibilidad

- ✅ Chrome/Edge últimas versiones
- ✅ Firefox últimas versiones
- ✅ Safari últimas versiones
- ✅ Navegadores móviles
- ✅ Tablets

## 🎓 Notas Educativas

Este proyecto demuestra:
- ✅ Arquitectura de componentes React
- ✅ Enrutamiento con React Router
- ✅ Gestión de estado con hooks
- ✅ Persistencia con localStorage
- ✅ Diseño responsive con Tailwind CSS
- ✅ Componentes visuales avanzados (gráficos, tablas)
- ✅ Buenas prácticas de UX/UI
- ✅ Estructura de carpetas escalable

## 📞 Soporte

Este es un proyecto demo. Para dudas o sugerencias:
- Revisa la estructura del código en `/src`
- Verifica el archivo `tailwind.config.js` para los colores
- Consulta `package.json` para las dependencias

## 📄 Licencia

Este proyecto es de demostración. Úsalo libremente como referencia o punto de partida para tus propios proyectos.

---

**Proyecto creado**: Mayo 2024
**Versión**: 1.0
**Estado**: Demo/Prototipo
