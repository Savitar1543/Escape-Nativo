# Stack técnico

| Capa | Tecnología | Estado | Notas |
|---|---|---|---|
| Hosting | Hostinger | ✅ | Hosting + dominio. Documentar fechas de renovación y costos en [inventario](../inventario/servicios.md). |
| Dominio | `escapenativo.com` | ✅ | SSL activo (HTTPS). |
| CMS | WordPress (`es_ES`) | ✅ | Admin principal + admin de respaldo (ver inventario). |
| Tienda | WooCommerce | ✅ | Tienda en `/tienda/`, carrito «Tu Selección», checkout, Mi Perfil. |
| Pagos | Mercado Pago | ✅ | Tarjeta y PSE. |
| Login clientes | Google | ✅ | Disponible en `/my-account/`. |
| Analítica | Site Kit by Google · Google Analytics · Search Console | ✅ | |
| Comercio Google | Google Merchant Center | 🟡 | Pendiente: seguimiento de conversiones y reseñas. |
| Correo | Correo corporativo del dominio | 🟡 | |
| Tema | Claro/oscuro automático (`prefers-color-scheme`) | ✅ | Todo el sitio se adapta al tema del dispositivo. |

## Patrón de diseño de páginas

Las páginas marcadas como **[Cinemática]** siguen un mismo patrón:

- Hero con video `mp4` embebido (subido a `wp-content/uploads`), autoplay, silenciado y en bucle.
- Secciones de dos columnas alternadas: H2 + 2–3 párrafos | imagen grande.
- Cita destacada en negrilla entre comillas angulares («…»).
- Fila de 4 mini-features (H5 + una línea).
- FAQ en acordeón.
- CTAs simples: «Comprar», «Contáctanos», WhatsApp.

## Consideraciones de rendimiento

- Los videos del hero pesan varios MB: preferir versiones comprimidas o `webm` y un `poster`.
- Los videos pesados **no** se versionan en Git; viven en el hosting o en Drive.

## Problemas conocidos

- Search Console reporta errores de datos estructurados en *Fichas de comerciantes* y
  *Fragmentos de productos* (julio 2026). Ver [ADR 0002](../decisiones/0002-datos-estructurados.md).
