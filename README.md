# Marketplace de Anuncios - Práctica React Avanzado

<div align="center">

  [![Next.js](https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://es.react.dev/)
  [![TypeScript](https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![PostgreSQL](https://img.shields.io/badge/postgresql-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
  [![Prisma](https://img.shields.io/badge/prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
  [![Tailwind CSS](https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
  [![Docker](https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
  [![Vitest](https://img.shields.io/badge/vitest-00FF74?style=for-the-badge&logo=vitest&logoColor=white)](https://vitest.dev/)

</div>

Este proyecto es una **aplicación web fullstack** de un marketplace de anuncios de segunda mano, desarrollada como parte de la práctica de React Avanzado. La aplicación permite a los usuarios registrarse, publicar artículos a la venta, buscar y filtrar anuncios, y dar "me gusta" con actualización optimista.

El principal requisito técnico de la práctica es el uso de **Next.js App Router** con **Server Components**, **Server Actions**, **Streaming UI** y **autenticación con JWT**, siguiendo las mejores prácticas de React 19 y Next.js 16.

## ✨ Características Implementadas

### Hito 1: Listado de Anuncios

- **Server Components**: La página principal renderiza los anuncios directamente en el servidor, sin `useEffect` ni `fetch` en el cliente.
- **Filtros vía URL**: Buscando por nombre, precio máximo y categoría (tag). La URL refleja los filtros aplicados (ej: `/?query=iphone&price=1000&tag=tecnoogía`).
- **Loading UI (Streaming)**: Skeleton animado con `loading.tsx`que se muestra mientras el servidor obtiene los datos, evitando pantallas en blanco.

### Hito 2: Detalle del ANuncio

- **Rutas dinámicas**: Cada anuncio tiene su propia página en `/ads/[id]`.
- **SEO dinámico**: `generateMetadata`genera títulos y descripciones únicos por anuncio para mejorar el posicionamiento.
- **Información del vendedor**: Se muestra el nombre del usuario que publicó el anuncio.

### Nito 3: Autenticación y Mutaciones

- **Login con Server Actions**: Formulario de inicio de sesión validado con Zod y procesado en el servidor.
- **JWT + Cookies HttpOnly**: Autenticación segura con tokens JWT almacenados en cookies `httOnly`, `secure`y `sameSite`.
- **Crear anuncio con validación Zod**: Formulario con validación de campos (título, descripción, precio, tags, URL de imagen).
- **`useActionState`**: Hook de React 19 para gestionar el estado del formulario y mostrar errores de validación por campo.
- **`revalidatePath`**: Revalidación automática del listado tras crear un nuevo anuncio.

### Hito 4: Manejo de Errores

- **`not-found.tsx`**: Página 404 personalizada para anuncios inexistentes o rutas inválidas.
- **`error.tsx`**: Página de error genérica con botón "Intentar de nuevo" para errores inesperados.

### Requisitos Pro

- **Middleware de protección**: La ruta `/ads/create` está protegida. Si el usuario no está autenticado, se redirige automáticamente a `/login`.
- **Optimistic UI**: Botón de "me gusta" con `useOptimistic` que actualiza el contador al instante sin esperar la respuesta del servidor.
- **Separación Client/Server**: Los componentes interactivos (`"use client"`) están claramente separados de los Server Componentes.

### Testing

**7 test unitarios** del schema de validación de anuncios con Vitest, cubriendo: datos válidos, título corto, precio inválido, campos opcionales y URL inválida.

### Reglas de Negocio

**Email único**: No se pueden registrar dos usuarios con el mismo email.
**Contraseñas hasheadas**: Las contraseñas se almacenan con bcrypt, nunca en texto plano.
**Mensajes genéricos de error**: En el login, nunca se indica si falló el email o la contraseña.
**Solo usuarios autenticados crean anuncios**: Protección tanto en middleware como en la Server Action.

## 🚀 Instalación y Puesta en marcha

### Requisitos previos

**Node.js** v22+
**Docker Desktop** (para PostgreSQL)
**pnpm**:

### 1. Clonar el repositorio

````bash
git clone https://github.com/Aratea10/nextjs-marketplace.git
cd nextjs-marketplace
````

### 2. Instalar dependencias

````bash
pnpm install
````

### 3. Configurar variables de entorno

Crea un archivo `.env`en la raíz del proyecto:

````
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/marketplace?schema=public"
JWT_SECRET="tu_clave_secreta_aquí"
````

### 4. Levantar PostgreSQL con Docker

Asegúrate de tener Docker Desktop abierto:

````bash
docker compose up -d
````

Esto iniciará un contenedor PostgreSQL en segundo plano.

### 5. Configurar la base de datos

````bash
pnpm prisma generate
pnpm prisma db push
pnpm prisma/seed.mjs
````

Esto genera el cliente de Prisma, crea las tablas y las llena con datos de ejemplo.

### 6. Arranca el servidor

````bash
pnpm dev
````

La aplicación estará disponible en `http://localhost:3000`

### 7. Ejecutar los tests

````bash
pnpm test
````

## 📄 Páginas y Rutas

| Ruta | Descripción |
| --- | --- |
| `/` | Listado de anuncios con filtros (búsqueda, precio, categoría) |
| `/ads/[id]` | Detalle de un anuncio con botón de "me gusta" |
| `/ads/create` | Crear un nuevo anuncio (requiere autenticación) |
| `/login` | Inicio de sesión |

### Usuarios de prueba

| Email | Contraseña |
| --- | --- |
| `sara@example.com` | `1234` |
| `kratos@example.com` | `1234` |

## 🛠️ Scripts Disponibles

| Script | Descripción |
| --- | --- |
| `pnpm dev` | Arranca el servidor en modo desarrollo con hot-reload |
| `pnpm build` | Compila el proyecto para producción |
| `pnpm start` | Arranca el servidor en modo producción |
| `pnpm lint` | Ejecuta ESLint para verificar la calidad del código |
| `pnpm test` | Ejecuta los tests unitarios con Vitest |

## 🔧 Tecnologías Utilizadas

- **Next.js 16**: Framework React fullstack con App Router.
- **React 19**: Librería de interfaces con Server Components y hooks modernos.
- **TypeScript 5**: Superset de JavaScript con tipado estático.
- **PostgreSQL 17**: Base de datos relacional.
- **Prisma 7**: ORM con tipado automático y migraciones.
- **Tailwind CSS 4**: Framework de estilos utility-first.
- **JSON Web Tokens (JWT)**: Autenticación basada en tokens con `jose`.
- **bcryptjs**: Hashing de contraseñas.
- **Zod 4**: Validación de esquemas y datos de entrada.
- **Vitest 4**: Framework de testing unitario.
- **Docker**: Contenedorización de PostgreSQL.
- **pnpm**: Gestor de paquetes rápido y eficiente.

## 🤝 Contribución

Si quieres mejorar el proyecto:

1. Haz fork del repositorio.
2. Crea una rama: `git checkout -b feature/mi-mejora`.
3. Haz commits claros siguiendo Conventional Commits.
4. Haz push y abre un Pull Request describiendo los cambios.

---

## 📄 Licencia

Este proyecto se entrega con **Licencia MIT**.

---

## 👩‍💻 Autora

**Sara Gallego Méndez** — Estudiante Bootcamp Desarrollo Web FullStack en [KeepCoding](https://keepcoding.io/)
