# Documentación — Web Café Escape Nativo

Base de conocimiento del sitio [escapenativo.com](https://escapenativo.com): cómo está construido,
cómo se opera y qué decisiones se han tomado. Es la versión versionada de la
*Carpeta de transferencia operativa*.

> ⚠️ Aquí **nunca** van contraseñas, llaves de API ni datos personales de clientes.
> Solo se documenta *dónde* está cada acceso y *quién* lo administra.

## Índice

| Carpeta | Contenido |
|---|---|
| [`arquitectura/`](arquitectura/) | Stack técnico, árbol de navegación y redirecciones |
| [`marca/`](marca/) | Sistema de marca, reglas de copy y flujo del Home |
| [`procesos/`](procesos/) | Guías paso a paso para operar la tienda (una por proceso) |
| [`inventario/`](inventario/) | Inventario digital: servicios, plugins, usuarios, formularios, páginas |
| [`campanas/`](campanas/) | Landings y campañas (Impacto Nativo, El Café de tus Partidos) |
| [`decisiones/`](decisiones/) | Registro de decisiones (ADR) |

## Cómo contribuir

1. Crea una rama (`feature/…` o `claude/…`) y edita el Markdown.
2. Si documentas un proceso, parte de [`procesos/_plantilla.md`](procesos/_plantilla.md).
3. Si tomas una decisión que cambia el sitio, agrega un ADR en [`decisiones/`](decisiones/).
4. Abre un pull request hacia `main`.

Estados usados en los documentos: ✅ verificado · 🟡 por verificar · ⬜ pendiente.
