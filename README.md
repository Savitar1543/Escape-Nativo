# Café Escape Nativo — Web

> **«El sabor tiene raíces»**
> Café de origen de Mogotes, Santander (Colombia).
> Sitio en producción: [escapenativo.com](https://escapenativo.com)

Este repositorio es el punto de partida para **llevar el desarrollo de la web de Escape Nativo a la nube**:
versionar código, documentación y prototipos que hasta ahora vivían en WordPress, Google Drive y
sesiones de trabajo con Claude.

📚 **Documentación completa en [`docs/`](docs/README.md)**: arquitectura, marca, procesos operativos,
inventario, campañas y registro de decisiones.

---

## 1. Contexto del proyecto

Escape Nativo es una marca de **café de especialidad de origen**, cultivado en una finca de Mogotes,
Santander. La web es su tienda en línea y su principal herramienta de marca: tiene que contar la historia
de la finca y, sobre todo, **vender sin fricción**.

**Productos principales** (presentación de 454 g / 1 libra, en grano o molido, tostión media):

| Producto | Carácter | Ruta |
|---|---|---|
| Café Premium Seleccionado | Carácter y cuerpo | `/product/cafe-premium-seleccionado/` |
| Café Premium Honey | Dulzor natural (fermentación controlada antes del secado) | `/product/cafe-premium-honey/` |
| Dúo Selección + Honey | Combo (agotado; se reactiva desde Productos) | `/product/duo-escape-nativo-seleccion-honey/` |

**Canales:** Instagram [@fincaescapenativo](https://instagram.com/fincaescapenativo) · pedidos por WhatsApp · envío a toda Colombia.

---

## 2. Stack actual (producción)

| Pieza | Tecnología |
|---|---|
| CMS | WordPress (idioma `es_ES`) |
| Tienda | WooCommerce |
| Hosting | Hostinger (hosting + dominio `escapenativo.com`, SSL activo) |
| Pagos | Mercado Pago (tarjeta, PSE) |
| Login de clientes | Login con Google en *Mi Perfil* |
| Analítica | Google Site Kit, Google Analytics, Google Search Console, Google Merchant Center |
| Correo | Correo corporativo del dominio |
| Tema visual | Claro / oscuro automático según el dispositivo del visitante |

> ⚠️ **Nunca** subir a este repositorio contraseñas, llaves de API, credenciales de Hostinger,
> WordPress o Mercado Pago. El inventario de accesos vive en la *Carpeta de transferencia operativa*
> (Drive, privada).

---

## 3. Árbol de navegación (vigente al 14 de julio de 2026)

```
escapenativo.com
├── Inicio  /                          [Cinemática]
│     Hero con video · Nuestros cafés · Compromiso · Historia (video finca) · FAQ · Cierre día/noche
├── Tienda  /tienda/                   [WooCommerce]
├── Nuestra Historia  /nosotros/       [Cinemática]  — Historia de la finca · El Proceso (#proceso)
├── Contacto  /contacto/               [Cinemática]  — Canales · Formulario · Galería del equipo
├── Impacto Nativo  /impacto-nativo/   [Cinemática] [Privada — solo admins]
│     Capítulos de impacto · «Trueque que Transforma» · Formulario de beca
│
├── Comercio (sin menú)
│   ├── Carrito «Tu Selección»  /cart/        (vacío → escena montaña día/noche)
│   ├── Finalizar compra        /checkout/    (Mercado Pago)
│   └── Mi Perfil               /my-account/  (login con Google)
│
├── Legales (enlazadas desde el pie)
│   ├── Aviso de Privacidad        /aviso-de-privacidad/       (Ley 1581 de 2012)
│   └── Condiciones del Servicio   /condiciones-del-servicio/  (Ley 1480 de 2011)
│
├── Redirecciones 301
│   ├── /product-category/store/ → /tienda/
│   ├── /products/               → /tienda/
│   └── /about-us/               → /nosotros/
│
└── Fuera de navegación
    ├── El Café de tus Partidos  /partidos/   [Privada] — campaña Mundial 2026 en pausa, reactivable
    ├── Respaldos y borradores   [Privada] — Home anterior (880) · pre-reestructura (2371)
    │                                         · borradores cinemáticos (1985 / 1987 / 1998)
    └── Página 404 premium (mensaje en español + CTA a la tienda)
```

---

## 4. Sistema de marca

| Elemento | Valor |
|---|---|
| Lema madre | «El sabor tiene raíces» |
| Dorado champán | `#C9A86A` |
| Azul marino (degradado) | `#0B111A` → `#1B2737` · acento `#24344A` |
| Texto claro | `#F0EEE9` |
| Títulos | Serif clásica en VERSALES con tracking amplio |
| Cuerpo / UI | Sans limpia |

**Reglas de copy**

- Máximo ~12 palabras por título o pantalla.
- Español colombiano cálido y sobrio, tono humano y cercano.
- Lista negra de clichés: «paladar», «experiencia», «comercio justo», «manos curtidas», «celosamente»,
  «privilegio», «obsesión», «blindamos».
- En campañas deportivas: nunca «FIFA» ni escudos de selecciones; decir «el Mundial» / «tus partidos».

---

## 5. Flujo acordado para el Home (revisión de aceptación)

Principio rector: *cada sección responde una pregunta distinta del visitante*, desde el descubrimiento
de la marca hasta la compra.

1. **Hero** — «CAFÉ ESCAPE NATIVO» + «Un regalo de las montañas de Santander, Colombia.»
2. **Nuestra esencia** — «El sabor tiene raíces».
3. **Nuestros cafés** — Premium Seleccionado y Premium Honey, temprano en el recorrido, con CTA de compra.
4. **Calidad sin concesiones** — cómo producimos.
5. **Nuestro compromiso** — fusiona «Café con propósito» y «Trato justo»: sostenibilidad, personas,
   naturaleza, visitas a la finca, envíos nacionales e internacionales.
6. **Nuestra historia** — video creado con IA como recurso narrativo.
7. **Cierre** — catálogo, botón de compra y WhatsApp.

Además, el Home debe tener: CTA principal «Comprar ahora», CTA secundario «Escríbenos por WhatsApp»,
fotos reales de finca y producto, testimonios, envíos y preguntas frecuentes.

---

## 6. Checklist de aceptación y transferencia

**Procesos que deben quedar documentados (con video)**

- [ ] Crear y dar permisos a colaboradores
- [ ] Administración general
- [ ] Crear / editar un producto
- [ ] Actualizar precios
- [ ] Cambiar una foto
- [ ] Publicar en el blog
- [ ] Revisar pedidos y pagos
- [ ] Crear cupón de descuento
- [ ] Crear una página y conectarla al menú
- [ ] Restaurar un backup
- [ ] Actualizar WordPress

**Inventario digital**

- [ ] Lista de plugins
- [ ] Lista de usuarios (admin principal + admin de respaldo, recuperables por correo)
- [ ] Lista de correos
- [ ] Lista de formularios
- [ ] Lista de páginas
- [ ] Fechas de renovación y costos de hosting y dominio

**Pendientes conocidos**

- [ ] Publicar la landing **Impacto Nativo** (diseño, textos, 10 fotos, formulario, móvil, SEO)
- [ ] Corregir los errores de datos estructurados que reporta Search Console (fichas de comerciante y fragmentos de producto)
- [ ] Configurar el seguimiento de conversiones y las reseñas de la tienda en Google Merchant Center

---

## 7. Recursos existentes (Google Drive → carpeta `ESCAPE NATIVO`)

| Carpeta / archivo | Contenido |
|---|---|
| `Web BackUps/arbol-navegacion-escape-nativo.pdf` | Árbol de navegación oficial |
| `Web BackUps/DEMOS/` | Videos de capacitación: Inicio, Tienda, Productos, Pedidos-Pagos, Formularios, Site Kit, Nota HTML, Herramientas LLM |
| `Web BackUps/RollBack Save/` | Videos y artes para restaurar secciones anteriores |
| `Web BackUps/#ElCafeDeTusPartidos/` | Material de la campaña Mundial 2026 |
| `Fotografía/` | Fotos de la finca y del producto |
| `ARTES&DISEÑO/`, `Publicaciones/` | Piezas gráficas y contenido para redes |
| `CHECKLIST WEB ESCAPE NATIVO` (Doc) | Revisión comercial, técnica y de contenido |
| `Matriz_EscapeNativo_v5_ConCaptions.xlsx` | Banco de copys, calendario 80/20 y captions |

---

## 8. Plan para desarrollar en la nube

Propuesta inicial (se ajusta a medida que avancemos):

```
Escape-Nativo/
├── README.md
├── docs/            # árbol de navegación, procesos, inventario, decisiones
├── theme/           # tema hijo de WordPress / CSS y plantillas personalizadas
├── pages/           # HTML de las secciones cinemáticas (Inicio, Nosotros, Contacto, Impacto Nativo…)
├── campaigns/       # landings de campaña (p. ej. /partidos/)
└── assets/          # SVG, logos e imágenes livianas (los videos pesados quedan en Drive/hosting)
```

**Primeros pasos**

1. Exportar desde WordPress el HTML/CSS de las secciones cinemáticas y versionarlo aquí.
2. Montar un entorno de staging (subdominio o local con Docker: WordPress + WooCommerce) para probar
   cambios antes de producción.
3. Trasladar los procesos del checklist a `docs/` como guías paso a paso.
4. Automatizar la revisión (enlaces rotos, rendimiento, SEO, datos estructurados) con GitHub Actions.

**Convenciones**

- Ramas: `main` estable · `claude/*` o `feature/*` para trabajo en curso.
- Todo cambio a producción pasa por una revisión en staging.
- Commits en español, descriptivos.

---

© Café Escape Nativo · Mogotes, Santander, Colombia
