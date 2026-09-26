# Crear una página y conectarla al menú

| Estado | Rol mínimo | Video |
|---|---|---|
| 🟡 por verificar | Editor (página) · Administrador (menú) | `DEMOS/Formularios.mov` |

## Crear la página

1. `wp-admin` → **Páginas → Añadir nueva**.
2. Título y **enlace permanente** en minúsculas con guiones (p. ej. `/impacto-nativo/`).
3. Construir siguiendo el patrón *Cinemática* ([stack.md](../arquitectura/stack.md#patrón-de-diseño-de-páginas)).
4. Visibilidad: *Privada* mientras está en construcción.
5. Revisar en celular y en modo claro y oscuro → **Publicar**.

## Conectarla al menú

1. **Apariencia → Menús**, o **Apariencia → Editor → Navegación** en temas de bloques.
2. Añadir la página al menú principal en la posición acordada:
   `Inicio | Café | Nuestra Historia | Impacto Nativo | Contacto`.
3. **Guardar menú** y navegar el sitio para comprobarlo.
4. Actualizar [arbol-navegacion.md](../arquitectura/arbol-navegacion.md).

## Cambiar la ruta de una página existente

Si cambia la URL, crear una **redirección 301** de la ruta vieja a la nueva y agregarla a la tabla
de redirecciones del árbol de navegación.

## Formularios

- Formularios actuales: contacto (`/contacto/`) y beca (`/impacto-nativo/`).
- Al crear o editar un formulario: probar el envío y confirmar que el correo llega al buzón
  correcto. Registrar el formulario en [inventario/sitio.md](../inventario/sitio.md).
