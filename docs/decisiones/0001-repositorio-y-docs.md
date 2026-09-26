# 0001. Versionar documentación y código de la web en GitHub

- Fecha: 2026-09-26
- Estado: aceptada

## Contexto

El conocimiento de la web estaba repartido entre WordPress, Google Drive (checklist, árbol de
navegación, videos DEMOS) y conversaciones sueltas. Eso hacía difícil la transferencia al equipo y el
trabajo con asistentes en la nube.

## Decisión

- WordPress en Hostinger **sigue siendo la fuente de verdad** del sitio en producción.
- El repositorio `Savitar1543/Escape-Nativo` guarda la documentación (`docs/`) y, más adelante, el
  código propio: tema hijo, CSS y HTML de secciones cinemáticas, y landings de campaña.
- Los medios pesados (videos) se quedan en el hosting y en Drive; en Git solo van assets livianos.
- Ninguna credencial se versiona.

## Consecuencias

- Todo cambio de documentación pasa por un pull request hacia `main`.
- Hay que mantener sincronizado el [árbol de navegación](../arquitectura/arbol-navegacion.md) con el sitio.
- Próximo paso: un entorno de staging para probar cambios antes de producción.
