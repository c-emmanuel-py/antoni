# Grupo Antoni - Landing Page

Una landing page moderna y responsive para Grupo Antoni, empresa especializada en arquitectura y construcción.

## 🏗️ Características

- **Diseño Responsive**: Optimizado para todos los dispositivos
- **Performance**: Carga rápida y optimizada
- **Accesibilidad**: Cumple con estándares WCAG 2.1
- **SEO Optimizado**: Meta tags y estructura semántica
- **Modular**: Código organizado en componentes reutilizables
- **Moderno**: Utiliza las últimas tecnologías web

## 🚀 Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Variables CSS, Grid, Flexbox, Animaciones
- **JavaScript ES6+**: Módulos, Clases, Async/Await
- **Vite**: Build tool moderno
- **ESLint**: Linting de código
- **Prettier**: Formateo de código

## 📁 Estructura del Proyecto

```
Web app/
├── assets/
│   ├── images/
│   │   ├── hero/           # Imágenes de la sección hero
│   │   ├── projects/       # Imágenes de proyectos
│   │   ├── team/           # Fotos del equipo
│   │   ├── about/          # Imágenes de la sección about
│   │   └── contact/        # Imágenes de contacto
│   ├── icons/              # Iconos SVG
│   └── fonts/              # Fuentes personalizadas
├── css/
│   ├── components/         # Estilos de componentes
│   │   ├── header.css
│   │   ├── hero.css
│   │   ├── projects.css
│   │   ├── team.css
│   │   └── ...
│   ├── utils/              # Utilidades CSS
│   │   ├── reset.css
│   │   ├── typography.css
│   │   └── responsive.css
│   └── main.css            # Archivo principal de estilos
├── js/
│   ├── components/         # Componentes JavaScript
│   │   ├── navigation.js
│   │   ├── hero.js
│   │   ├── projects.js
│   │   └── ...
│   ├── utils/              # Utilidades JavaScript
│   │   ├── scroll-animations.js
│   │   └── performance.js
│   └── main.js             # Archivo principal de JavaScript
├── sections/               # Secciones HTML modulares
├── index.html              # Página principal
├── package.json            # Dependencias y scripts
├── vite.config.js          # Configuración de Vite
├── .eslintrc.js            # Configuración de ESLint
├── .prettierrc             # Configuración de Prettier
└── README.md               # Este archivo
```

## 🛠️ Instalación y Configuración

### Prerrequisitos

- Node.js (versión 16 o superior)
- npm (versión 8 o superior)

### Instalación

1. **Clonar el repositorio**
   ```bash
   git clone [url-del-repositorio]
   cd "Web app"
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

## 📜 Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Construye el proyecto para producción |
| `npm run preview` | Previsualiza la build de producción |
| `npm run lint` | Ejecuta ESLint para verificar el código |
| `npm run lint:fix` | Ejecuta ESLint y corrige errores automáticamente |
| `npm run format` | Formatea el código con Prettier |
| `npm run format:check` | Verifica el formato del código |
| `npm run optimize:images` | Optimiza las imágenes |
| `npm run serve` | Sirve la build de producción |
| `npm run deploy` | Construye y sirve el proyecto |

## 🎨 Personalización

### Colores

Los colores se definen en variables CSS en `css/main.css`:

```css
:root {
  --color-primary: #4A90E2;
  --color-primary-dark: #357ABD;
  --bg-primary: #0a0a0a;
  --text-primary: #ffffff;
  /* ... más variables */
}
```

### Tipografía

La tipografía se configura en `css/utils/typography.css`:

```css
:root {
  --font-family: 'Inter', sans-serif;
  --font-size-base: 1rem;
  /* ... más variables de tipografía */
}
```

### Imágenes

1. **Hero Section**: Coloca las imágenes en `assets/images/hero/`
2. **Proyectos**: Coloca las imágenes en `assets/images/projects/`
3. **Equipo**: Coloca las fotos en `assets/images/team/`
4. **About**: Coloca las imágenes en `assets/images/about/`
5. **Contacto**: Coloca las imágenes en `assets/images/contact/`

### Contenido

Edita el contenido directamente en `index.html` o en los archivos de secciones individuales.

## 📱 Responsive Design

El diseño es completamente responsive con breakpoints:

- **Mobile**: < 576px
- **Tablet**: 576px - 991px
- **Desktop**: > 992px

## ♿ Accesibilidad

- Navegación por teclado
- Lectores de pantalla
- Contraste de colores
- Texto alternativo en imágenes
- Enlaces de salto
- Regiones ARIA

## 🚀 Despliegue

### Build para Producción

```bash
npm run build
```

Los archivos optimizados se generan en la carpeta `dist/`.

### Despliegue en Servidor

1. Sube el contenido de `dist/` a tu servidor web
2. Configura el servidor para servir `index.html` como página principal
3. Asegúrate de que las rutas de assets sean correctas

## 🔧 Configuración Avanzada

### Variables de Entorno

Crea un archivo `.env` para configuraciones específicas:

```env
VITE_API_URL=https://api.grupoantoni.com
VITE_ANALYTICS_ID=GA-XXXXXXXXX
```

### Optimización de Imágenes

```bash
npm run optimize:images
```

### Linting y Formateo

```bash
# Verificar código
npm run lint

# Corregir automáticamente
npm run lint:fix

# Formatear código
npm run format
```

## 📊 Performance

- **Lazy Loading**: Imágenes cargadas bajo demanda
- **Code Splitting**: JavaScript dividido en chunks
- **Minificación**: CSS y JS optimizados
- **Compresión**: Imágenes optimizadas
- **Caching**: Headers de cache configurados

## 🐛 Solución de Problemas

### Problemas Comunes

1. **Error de módulos ES6**
   - Asegúrate de usar `type="module"` en el script tag
   - Verifica que estés usando un servidor local

2. **Imágenes no cargan**
   - Verifica las rutas en `assets/images/`
   - Asegúrate de que los archivos existan

3. **Estilos no se aplican**
   - Verifica que `css/main.css` esté importado
   - Revisa la consola del navegador por errores

### Debug

```bash
# Modo debug
npm run dev -- --debug

# Ver logs detallados
DEBUG=* npm run dev
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 📞 Contacto

**Grupo Antoni**
- Email: info@grupoantoni.com
- Teléfono: +1 (829) 293-0121
- Dirección: Calle San Juan Bautista de la Salle 35, N°23, Edificio El Buen Pastor, Suite 201, Ensanche Naco, Santo Domingo, República Dominicana

## 🙏 Agradecimientos

- [Inter Font](https://fonts.google.com/specimen/Inter) - Tipografía
- [Font Awesome](https://fontawesome.com/) - Iconos
- [Vite](https://vitejs.dev/) - Build tool
- [AOS](https://michalsnik.github.io/aos/) - Animaciones
- [Swiper](https://swiperjs.com/) - Carousel

---

**Desarrollado con ❤️ para Grupo Antoni**
