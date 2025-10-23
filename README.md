# Grupo Antoni - Landing Page

Landing page profesional para Grupo Antoni, empresa líder en arquitectura y construcción en República Dominicana.

## 🚀 Características

- **Diseño Responsivo**: Optimizado para todos los dispositivos
- **Performance**: Imágenes optimizadas, code splitting, lazy loading
- **Accesibilidad**: Cumple estándares WCAG 2.1
- **SEO**: Meta tags optimizados, estructura semántica
- **Calidad de Código**: ESLint, Prettier, Husky pre-commit hooks

## 🛠️ Tecnologías

- **Build Tool**: Vite 5.x
- **Lenguaje**: Vanilla JavaScript (ES2022)
- **Estilos**: CSS3 con PostCSS
- **Optimización**: Sharp para imágenes, esbuild para minificación
- **Calidad**: ESLint (Airbnb), Prettier, Husky

## 📦 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/grupo-antoni/landing-page.git
cd landing-page

# Instalar dependencias
npm install

# Configurar Git hooks
npm run prepare
```

## 🚀 Scripts de Desarrollo

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo (localhost:3001)

# Calidad de código
npm run lint         # Verificar código con ESLint
npm run lint:fix     # Corregir errores automáticamente
npm run format       # Formatear código con Prettier
npm run format:check # Verificar formato
npm run quality      # Ejecutar lint + format check
npm run quality:fix  # Ejecutar lint:fix + format

# Build y análisis
npm run build        # Build de producción
npm run analyze      # Análisis del bundle con visualizer
npm run preview      # Preview del build
npm run serve        # Servir build localmente

# Optimización
npm run optimize:images # Optimizar imágenes con imagemin
```

## 📁 Estructura del Proyecto

```
├── assets/           # Assets estáticos (iconos, imágenes originales)
├── css/             # Estilos CSS organizados por componentes
│   ├── components/  # Estilos de componentes específicos
│   ├── utils/       # Utilidades CSS (reset, responsive, typography)
│   ├── main.css     # Estilos principales
│   └── styles.css   # Estilos globales
├── img/             # Imágenes optimizadas
│   ├── Team/        # Fotos del equipo (optimizadas)
│   └── optimized/   # Imágenes procesadas
├── js/              # JavaScript modular
│   ├── components/  # Componentes de la aplicación
│   ├── utils/       # Utilidades (analytics, performance, logger)
│   └── main.js      # Punto de entrada principal
├── scripts/         # Scripts de automatización
├── dist/            # Build de producción
└── index.html       # Página principal
```

## 🎯 Optimizaciones Implementadas

### **Performance**
- **Code Splitting**: Chunks separados por funcionalidad
- **Image Optimization**: Reducción del 99.9% en tamaño de imágenes
- **Lazy Loading**: Carga diferida de imágenes y componentes
- **Minificación**: esbuild para JavaScript, cssnano para CSS
- **Tree Shaking**: Eliminación de código no utilizado

### **SEO**
- **Meta Tags**: Open Graph, Twitter Cards, keywords
- **Estructura Semántica**: HTML5 semántico
- **Canonical URLs**: URLs canónicas
- **Sitemap**: Estructura optimizada para crawlers

### **Accesibilidad**
- **ARIA Labels**: Etiquetas descriptivas
- **Keyboard Navigation**: Navegación por teclado
- **Screen Readers**: Compatibilidad con lectores de pantalla
- **Contrast**: Contraste adecuado en colores
- **Focus Management**: Gestión del foco visible

## 🔧 Configuración de Calidad

### **ESLint**
- Configuración Airbnb Base
- Reglas personalizadas para el proyecto
- Integración con Prettier
- Pre-commit hooks con Husky

### **Prettier**
- Formato consistente
- Integración con ESLint
- Configuración para HTML, CSS, JS

### **Husky**
- Pre-commit hooks
- Lint-staged para archivos modificados
- Prevención de commits con errores

## 📊 Análisis de Bundle

```bash
npm run analyze
```

Genera un reporte visual en `dist/bundle-analysis.html` con:
- Tamaño de chunks
- Dependencias
- Análisis de duplicación
- Métricas de compresión

## 🚀 Deployment

### **Build de Producción**
```bash
npm run build
```

### **Optimizaciones Aplicadas**
- Sourcemaps deshabilitados en producción
- Console logs eliminados
- Imágenes optimizadas
- CSS y JS minificados
- Assets con hash para cache busting

### **Estructura de Build**
```
dist/
├── css/           # CSS minificado con hash
├── js/            # JavaScript con code splitting
├── img/           # Imágenes optimizadas
├── assets/        # Assets estáticos
└── index.html     # HTML optimizado
```

## 🔍 Monitoreo y Analytics

- **Google Analytics**: Tracking de eventos
- **Performance Monitoring**: Core Web Vitals
- **Error Tracking**: Captura de errores JavaScript
- **User Interactions**: Tracking de interacciones

## 📱 Responsive Design

- **Mobile First**: Diseño móvil primero
- **Breakpoints**: 480px, 768px, 1024px, 1200px
- **Touch Friendly**: Elementos táctiles optimizados
- **Performance**: Optimizado para conexiones lentas

## 🎨 Sistema de Diseño

### **Colores**
- Primary: #4F8CE3 (Azul corporativo)
- Secondary: #1a1a1a (Negro)
- Accent: #25d366 (Verde WhatsApp)

### **Tipografía**
- Headings: Georgia, serif
- Body: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif
- Sizes: Escala modular responsive

### **Espaciado**
- Base: 1rem
- Scale: 0.5rem, 1rem, 1.5rem, 2rem, 3rem, 4rem

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### **Estándares de Código**
- Seguir las reglas de ESLint
- Formatear con Prettier
- Commits con Conventional Commits
- Tests para nuevas funcionalidades

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 📞 Contacto

**Grupo Antoni**
- Website: [grupoantoni.com](https://grupoantoni.com)
- Email: info@grupoantoni.com
- Teléfono: +1 (829) 893-0121
- Dirección: Calle San Juan Bautista de La Salle St. #125, Edificio El Buen Pastor Suit 201, Ensanche Renacimiento, Santo Domingo, República Dominicana

---

*Desarrollado con ❤️ para Grupo Antoni*
