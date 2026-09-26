# Actualizar WordPress, plugins y tema

| Estado | Rol mínimo | Tiempo |
|---|---|---|
| 🟡 por verificar | Administrador | 15 min |

## Pasos

1. Hacer un **backup** ([backup-restauracion.md](backup-restauracion.md)).
2. `wp-admin` → **Escritorio → Actualizaciones**.
3. Actualizar en este orden, **de a uno**:
   1. Plugins (WooCommerce y Mercado Pago con especial cuidado).
   2. Tema.
   3. Núcleo de WordPress.
4. Después de cada actualización importante, revisar Home, tienda y checkout.
5. Hacer una **compra de prueba**.
6. Anotar versiones y fecha en [inventario/sitio.md](../inventario/sitio.md).

## Si algo se rompe

- Desactivar el último plugin actualizado desde **Plugins**.
- Si no se puede entrar al admin: hPanel → *Administrador de archivos* → renombrar la carpeta del
  plugin en `wp-content/plugins/`.
- En último caso, restaurar el backup.
