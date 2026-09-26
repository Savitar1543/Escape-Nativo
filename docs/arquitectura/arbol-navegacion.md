# Árbol de navegación

Estructura vigente al **14 de julio de 2026**.
Fuente: `ESCAPE NATIVO/Web BackUps/arbol-navegacion-escape-nativo.pdf` (Drive).

```mermaid
flowchart TD
    Home["Inicio /"] --> Tienda["Tienda /tienda/"]
    Home --> Nosotros["Nuestra Historia /nosotros/"]
    Home --> Contacto["Contacto /contacto/"]
    Home -.admins.-> Impacto["Impacto Nativo /impacto-nativo/ (privada)"]
    Tienda --> P1["Premium Seleccionado"]
    Tienda --> P2["Premium Honey"]
    Tienda --> P3["Dúo Selección + Honey (agotado)"]
    P1 & P2 & P3 --> Cart["Carrito /cart/"]
    Cart --> Checkout["Checkout /checkout/ · Mercado Pago"]
    Checkout --> Account["Mi Perfil /my-account/"]
```

## Menú principal

| Página | Ruta | Tipo | Contenido |
|---|---|---|---|
| Inicio | `/` | Cinemática | Hero con video · Nuestros cafés · Compromiso · Historia (video de finca; en móvil caja 16:9) · FAQ · Cierre día/noche |
| Tienda | `/tienda/` | WooCommerce | Catálogo |
| Nuestra Historia | `/nosotros/` | Cinemática | Historia de la finca · El Proceso (video inmersivo, ancla `#proceso`) |
| Contacto | `/contacto/` | Cinemática | Canales (correo / WhatsApp / redes) · Formulario · Galería del equipo |
| Impacto Nativo | `/impacto-nativo/` | Cinemática · **Privada** | Visible en el menú solo para administradores. Ver [campaña](../campanas/impacto-nativo.md). |

## Productos

| Producto | Ruta | Estado |
|---|---|---|
| Café Premium Seleccionado | `/product/cafe-premium-seleccionado/` | Activo |
| Café Premium Honey | `/product/cafe-premium-honey/` | Activo |
| Dúo Selección + Honey | `/product/duo-escape-nativo-seleccion-honey/` | Agotado — reactivar desde Productos |

## Comercio (sin entrada de menú)

| Página | Ruta | Notas |
|---|---|---|
| Carrito «Tu Selección» | `/cart/` | Vacío muestra la escena montaña (día en claro / noche en oscuro) |
| Finalizar compra | `/checkout/` | Mercado Pago (tarjeta, PSE) |
| Mi Perfil | `/my-account/` | Login con Google |

## Legales (pie de página)

| Página | Ruta | Marco legal |
|---|---|---|
| Aviso de Privacidad | `/aviso-de-privacidad/` | Tratamiento de datos personales — Ley 1581 de 2012 |
| Condiciones del Servicio | `/condiciones-del-servicio/` | Compras, pagos, envíos, retracto y garantía — Ley 1480 de 2011 |

## Redirecciones permanentes (301)

| Origen | Destino |
|---|---|
| `/product-category/store/` | `/tienda/` |
| `/products/` | `/tienda/` |
| `/about-us/` | `/nosotros/` |

## Fuera de navegación

| Elemento | Ruta / ID | Estado |
|---|---|---|
| El Café de tus Partidos | `/partidos/` | Privada — campaña Mundial 2026 en pausa, reactivable |
| Home anterior | página 880 | Privada (respaldo) |
| Backup pre-reestructura | página 2371 | Privada (respaldo) |
| Borradores cinemáticos | páginas 1985 / 1987 / 1998 | Privada (borradores) |
| Página 404 | — | Mensaje en español + CTA a la tienda |
