# Backup y restauración

| Estado | Rol mínimo | Tiempo |
|---|---|---|
| 🟡 por verificar | Administrador (WordPress y Hostinger) | 15 min |

## Tipos de respaldo

| Respaldo | Dónde | Qué cubre |
|---|---|---|
| Backups automáticos de Hostinger | hPanel → *Sitios web* → *Copias de seguridad* | Archivos + base de datos |
| Páginas privadas de respaldo en WordPress | Páginas 880, 2371, 1985 / 1987 / 1998 | Versiones anteriores del Home y borradores |
| Medios originales | Drive → `ESCAPE NATIVO/Web BackUps/RollBack Save/` | Videos y artes para restaurar secciones |
| Código y documentación | Este repositorio | Plantillas, CSS/HTML versionados y docs |

## Antes de un cambio grande

1. Crear un backup manual en Hostinger.
2. Duplicar la página que se va a modificar y dejar la copia como *Privada*.
3. Anotar la fecha y el motivo en el historial de cambios o en un ADR.

## Restaurar

- **Una sola página:** abrir la copia privada, copiar sus bloques a la página publicada, o usar
  **Revisiones** de la página → *Restaurar esta revisión*.
- **Todo el sitio:** hPanel → *Copias de seguridad* → elegir la fecha → restaurar archivos y base de
  datos. ⚠️ Se pierden los pedidos posteriores a esa fecha: exportarlos antes.

## Verificar después de restaurar

- [ ] Home, tienda y checkout cargan.
- [ ] Una compra de prueba funciona.
- [ ] Los pedidos recientes siguen en el admin.
