# 0002. Corregir datos estructurados de productos

- Fecha: 2026-09-26
- Estado: propuesta

## Contexto

En julio de 2026, Google Search Console reportó problemas de datos estructurados en
`https://escapenativo.com/` para *Fichas de comerciantes* y *Fragmentos de productos*. Merchant Center
además sugiere configurar el seguimiento de conversiones y las reseñas de la tienda.

## Decisión propuesta

1. Revisar en Search Console qué campos faltan. Suelen ser `shippingDetails`,
   `hasMerchantReturnPolicy`, `review` / `aggregateRating` o `priceValidUntil`.
2. Completar en WooCommerce los datos que los generan: envío, política de devoluciones (Ley 1480) y
   reseñas.
3. Validar con la [Prueba de resultados enriquecidos](https://search.google.com/test/rich-results).
4. Solicitar la validación de la corrección en Search Console.

## Consecuencias

Mejor visibilidad de los productos en Google Shopping y en los resultados enriquecidos.
