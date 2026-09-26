# Crear y dar permisos a colaboradores

| Estado | Rol mínimo | Tiempo |
|---|---|---|
| 🟡 por verificar | Administrador | 5 min |

## Roles recomendados

| Rol | Para quién | Puede |
|---|---|---|
| Administrador | Dueños (principal + respaldo) | Todo, incluidos plugins, usuarios y actualizaciones |
| Gestor de tienda (Shop Manager) | Quien opera ventas | Productos, pedidos, cupones, informes de WooCommerce |
| Editor | Contenido y blog | Páginas y entradas |
| Autor | Colaborador de blog | Solo sus propias entradas |

Principio: dar el **rol mínimo** necesario. Accesos para herramientas o integraciones (p. ej. Claude)
se hacen con un usuario propio y una **contraseña de aplicación** que se puede revocar.

## Pasos

1. `wp-admin` → **Usuarios → Añadir nuevo**.
2. Nombre de usuario, correo del colaborador y rol.
3. Marcar «Enviar aviso al usuario» para que defina su propia contraseña.
4. Registrar el usuario en [inventario/usuarios.md](../inventario/usuarios.md) (sin contraseña).

### Contraseña de aplicación (integraciones)

1. **Usuarios → Perfil** del usuario de integración → sección *Contraseñas de aplicación*.
2. Nombre descriptivo (p. ej. `claude-code`) → **Añadir**.
3. Guardarla de inmediato en el gestor de secretos correspondiente. No se vuelve a mostrar.
4. Para revocar: misma sección → **Revocar**.

## Al terminar una colaboración

- Cambiar el rol a *Suscriptor* o eliminar el usuario, atribuyendo su contenido a otro usuario.
- Revocar sus contraseñas de aplicación.
