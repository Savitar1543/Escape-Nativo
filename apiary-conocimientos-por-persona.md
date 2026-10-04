# Apiary: qué tiene que aprender cada persona

Documento de trabajo del equipo de Execute The Idea (UPB), octubre de 2026.

**Base:** el documento *"Modelo objetivo y modelo MVP: ajustes, iteración, recursos y roles del equipo"* (septiembre de 2026). Cinco analistas lo revisaron por separado, cada uno con un foco distinto: Nicolás, Camila, Miguel, los tres roles sin persona asignada, y el equipo y la empresa en conjunto.

**Cómo leerlo**

- 🔴 **URGENTE**: próximas 2 semanas (ciclos 0 y 1). Sin esto se bloquea el MVP.
- 🟠 **NECESARIO**: durante el MVP (ciclos 2 a 4).
- 🟢 **COMPLEMENTARIO**: para la empresa de más adelante (SAS, inversión, expansión) o para destacarse en el pitch.

Las horas son estimaciones. Casi todos los recursos son gratuitos. El documento base no dice nada sobre la formación de cada persona, así que ningún plan supone conocimientos previos.

> ⚠️ El documento base solo trae tres nombres, y aun así como "por confirmar": **Nicolás** (Métricas), **Camila** (Producto) y **Miguel** (Legal). Backend, Estrategia y Seguridad no tienen persona. Para esos tres roles va un plan por rol y el perfil de quien conviene buscar.

---

## Resumen en una página

| Persona / rol | Lo más urgente | Carga urgente | Frentes de empresa propuestos |
|---|---|---|---|
| **Nicolás**, Métricas | Drawdown, Sharpe y Sortino. Montar las referencias hold BTC y DCA (TWR frente a MWR). Definir operativamente las métricas de producto. pandas y SQL | ≈ 20 h | Finanzas, unit economics, proyección, material para inversionistas |
| **Camila**, Producto | *The Mom Test*. Preventa o lista de espera de pago. Figma. Competencia real. Lenguaje financiero permitido | ≈ 24-30 h | Coordinación del equipo, Lean Canvas, pitch, ventas y comunidad |
| **Miguel**, Legal | Ley 1581 (datos). Diferencia entre informar y asesorar. Captación ilegal y postura de la SFC. T&C de un SaaS. Estatuto del Consumidor en la preventa | ≈ 30-34 h | SAS y tributación, pacto de socios, requisitos de aceleradoras |
| **Backend** (sin persona) | Python, ccxt, simulador con rieles probados (pytest), Linux, systemd y Git | ≈ 38 h | Es la prioridad número 1: conseguir a la persona |
| **Estrategia** (sin persona) | Mercado spot, plantillas de DCA con pausa y de rebalanceo, reglas escritas como especificación, gestión de riesgo | ≈ 13 h | Podría encargarse de las respuestas financieras del pitch |
| **Seguridad** (sin persona) | Secretos en el repositorio, endurecimiento del VPS, HTTPS, gestor de contraseñas y 2FA | ≈ 15 h | Diseño del modo en vivo para el jurado |
| **Todos** | Exchange, llave API, "no custodial", qué hace y qué no hace el bot, palabras prohibidas, las 5 métricas, Git y Notion | ≈ 10 h | — |

**Tres alertas que encontraron los analistas**

1. **El cuello de botella es el backend (3.6).** Si nadie del equipo programa, conseguir a esa persona es la primera tarea de quien coordine. Mientras tanto, hay un atajo: Freqtrade en modo *dry-run* (revisar la licencia GPLv3) más un asistente de programación con IA.
2. **Coordinación, finanzas y pitch no tienen dueño en el documento.** Se proponen dueños más abajo.
3. **La "preventa" de la ruta A significa cobrar dinero.** Eso activa el Estatuto del Consumidor, el derecho de retracto y la facturación, y abre la pregunta de quién factura si todavía no hay SAS. Lo tiene que resolver Miguel antes de abrir la preventa.

---

## 1. Nicolás: Métricas, forward testing y validación cuantitativa

**Por qué importa:** con su tablero se decide si se pasa de un ciclo al siguiente (comprensión de 4/5 o más en el ciclo 2, 50 % de usuarios activos a 14 días en el ciclo 3, datos propios en el ciclo 4). Depende de Backend: sin un esquema de datos por orden acordado en el ciclo 0, no hay tablero en el ciclo 1. Le tocan las incongruencias 3.2, 3.4, 3.5 y 3.8.

**Hueco que debería cerrar él:** el documento pide que todos conozcan "las cinco métricas del MVP", pero no las enumera. Saliendo de la fila "Éxito" y del ciclo 4, serían: **retención a 14 días, uso del kill switch, comprensión, drawdown y lista de espera o preventa**.

### 🔴 Urgente
| Conocimiento | Por qué | Recurso (horas) |
|---|---|---|
| Métricas de rendimiento y riesgo: retorno, drawdown máximo, volatilidad, Sharpe y Sortino, siempre con comisiones | La ficha de métricas del ciclo 0 tiene que definir cada cálculo antes de que haya datos | Investopedia: *Maximum Drawdown*, *Sharpe*, *Sortino*. Librería QuantStats en GitHub (5 h) |
| Referencias hold BTC y DCA, y la diferencia entre TWR y MWR (el DCA mete dinero en distintas fechas) | Las referencias corren desde el día 1 del bot y corrigen la incongruencia 3.4 | Investopedia: *Time- vs Money-Weighted Return*. Datos de data.binance.vision para el ejercicio del DCA semanal de COP 50.000 (5 h) |
| Definición operativa de activación, usuario activo a 14 días y uso del kill switch | Definirlas antes de ver los datos evita "mirarlos a conveniencia" | Amplitude, *Mastering Retention* (3 h) |
| pandas y SQL básico | El tablero se alimenta de la base de datos del bot. Hay que acordar con Backend los campos de cada orden | Kaggle Learn *Pandas* y SQLBolt (7 h) |

### 🟠 Necesario
| Conocimiento | Por qué | Recurso (horas) |
|---|---|---|
| Inferencia con muestras pequeñas (intervalo de Wilson, bootstrap) | Con 5 a 30 usuarios, una cifra como "50 % activos" tiene un margen enorme | *OpenIntro Statistics* (PDF libre) y *Seeing Theory* (8 h) |
| Cohortes y embudo landing → lista de espera → preventa en Looker Studio o Sheets | Tablero quincenal del ciclo 3 y prueba de disposición a pagar (3.2) | Ayuda oficial de Looker Studio y de Google Sheets (6 h) |
| Encuestas Likert sin sesgo y comprensión medida con una tarea | La encuesta decide si la bitácora se rediseña en el ciclo 2 | Pew Research, *Questionnaire Design*, y NN/g (3 h) |
| Realismo del paper trading: comisiones, deslizamiento, lookahead | Auditar el simulador de Backend antes de la beta | Documentación de Freqtrade: *Dry-run*, *Lookahead analysis* (3,5 h) |
| Visualización honesta: curva de capital, gráfico *underwater*, incertidumbre | Las gráficas del pitch tienen que mostrar **control**, no rentabilidad | Wilke, *Fundamentals of Data Visualization* (5 h) |

### 🟢 Complementario
- **Métricas SaaS (MRR, churn, LTV/CAC):** a16z, *16 Startup Metrics* (3,5 h).
- **Experimentos de precio y pruebas A/B:** curso gratuito de Udacity *A/B Testing* (15 h).
- **Sobreajuste en estrategias de IA (Sharpe deflactado, walk-forward):** artículos de Bailey y López de Prado en SSRN (5 h).
- **Reglas para mostrar rendimiento simulado (GIPS, SEC):** se trabaja con Miguel (3 h).
- **SQL analítico con funciones de ventana:** Mode, *SQL Tutorial* (6 h).

---

## 2. Camila: Producto, diseño y validación con usuarios

**Por qué importa:** su prototipo tiene que estar listo antes de que Backend programe las pantallas; si se atrasa, se bloquea el ciclo 2. También consigue a los usuarios beta, el recurso más escaso. Le tocan las incongruencias 3.2, 3.3, 3.5, 3.7, 3.9 y 3.10.

### 🔴 Urgente
| Conocimiento | Por qué | Recurso (horas) |
|---|---|---|
| Entrevistas sobre comportamiento pasado | Guion del ciclo 0 y 8 entrevistas del ciclo 1. Resuelve la 3.5 y da el dato propio para el pitch (3.8) | *The Mom Test* (Rob Fitzpatrick) y el ejercicio de convertir la pregunta "¿pagarías?" en 5 preguntas (6-8 h) |
| Prueba de disposición a pagar con preventa, lista de espera o *fake door* | La landing tiene que medir intención real (3.2, ruta A) | *Testing Business Ideas* (Strategyzer) y Carrd o Framer con Tally (4-5 h) |
| Figma: wireframes y prototipo clickeable | Entregable del ciclo 1 | Figma Learn y un UI kit de la Community (8-10 h) |
| Propuesta de valor frente a la competencia real | Responder "¿por qué no el bot gratis de Binance?" con datos correctos (3.3) | Páginas de precios de 3Commas, Bitsgap y Pionex, y el *Value Proposition Canvas* (4 h) |
| Lenguaje financiero permitido y prohibido | El disclaimer del ciclo 0 se escribe junto con Miguel | Lista del documento base y 1 h con Legal (2-3 h) |

### 🟠 Necesario
- **Pruebas de usabilidad con *think-aloud*:** para llegar a 4/5 de comprensión en el ciclo 2. NN/g y *Rocket Surgery Made Easy* (6 h).
- **Interfaces financieras y microcopy:** mostrar pérdidas, un mensaje neutro para el freno de 7 días (3.9) y la plantilla de la bitácora (3.7). NN/g y las guías de estilo de Mailchimp y GOV.UK (6-8 h).
- **Encuestas Likert, junto con Nicolás:** NN/g, *Rating Scales* (3 h).
- **Onboarding y retención (activación, cohortes, entrevistas de salida):** Amplitude, Mixpanel y Lenny's Newsletter (5-6 h).
- **Reclutar y gestionar una beta cerrada:** guía de *User Interviews* y comunidades cripto colombianas, con consentimiento conforme a la Ley 1581 (4 h).

### 🟢 Complementario
- **UX de IA explicable y de agentes:** *People + AI Guidebook* de Google PAIR (6 h).
- **Pricing por niveles:** *Monetizing Innovation* y el método de Van Westendorp (6-8 h).
- **Descubrimiento continuo:** *Continuous Discovery Habits* (Teresa Torres) e *Inspired* (Marty Cagan) (10-12 h).
- **Localización para México, Brasil y EE. UU.:** guías de Lokalise o Phrase (4 h).
- **Storytelling de pitch con evidencia propia:** YC, *How to pitch your startup*, y dos simulacros (4-5 h).

---

## 3. Miguel: Legal, regulatorio e internacional

**Por qué importa:** la landing del ciclo 0 ya recoge correos, así que necesita autorización de datos desde el primer día. Además fija el criterio "informar, no asesorar" (3.1) y da el concepto legal para elegir entre la ruta A y la B (3.2).

> Todos los números de normas hay que **verificarlos (número, vigencia y modificaciones)** en SUIN-Juriscol o en secretariasenado.gov.co antes de citarlos. Nada de esto reemplaza a un abogado.

### 🔴 Urgente
| Conocimiento | Por qué | Recurso (horas) |
|---|---|---|
| Protección de datos: Ley 1581/2012 y Decreto 1377/2013 (compilado en el 1074/2015). Autorización, aviso de privacidad, RNBD | La lista de espera, las entrevistas grabadas y la política de privacidad del ciclo 1 | Micrositio de Protección de Datos de la SIC, guías para pymes y formatos (8-10 h) |
| Diferencia entre informar y asesorar en inversión (Decreto 2555/2010, modificado por el 661/2018) y palabras prohibidas | Resuelve la 3.1 junto con Estrategia. Disclaimer del ciclo 0. Límites a lo que redacta la IA (3.7) | SFC, AMV e Investor.gov (6-8 h) |
| Captación ilegal y ejercicio ilegal de actividad financiera, y por qué el diseño no custodial protege. Postura de la SFC sobre cripto | Sustenta el "somos software" y la decisión entre ruta A y B | SFC, sección de criptoactivos, y SUIN-Juriscol (5-6 h) |
| T&C de un SaaS no custodial | Entregable del ciclo 1, listo antes de los primeros usuarios | Plantillas abiertas (Basecamp, CC) y los T&C de Binance y Bybit (6 h) |
| Estatuto del Consumidor (Ley 1480/2011) aplicado a la preventa | La preventa de la ruta A cobra dinero: retracto, publicidad, facturación | SIC, sección de Protección al Consumidor (4 h) |

### 🟠 Necesario
- **Mapa regulatorio cripto en Colombia (DIAN, UIAF, sandbox de la SFC):** entregable del ciclo 2, con tres columnas: aplica, no aplica, en duda (8-10 h).
- **Transferencia internacional de datos:** el VPS, la API del LLM y los formularios están fuera de Colombia. Guía de la SIC y DPA de cada proveedor (4 h).
- **MiCA, IOSCO y la lista de jurisdicciones restringidas de los exchanges:** para el documento internacional del ciclo 4. ESMA e iosco.org (8 h).
- **Verificación de fuentes y afirmaciones comparativas:** resuelve la 3.3 y la 3.8 (3-4 h).
- **Cómo preparar una consulta con un abogado:** consultorio jurídico de la UPB y preguntas cerradas (2-3 h).

### 🟢 Complementario
- **SAS (Ley 1258/2008), pacto de socios entre 6 fundadores, vesting, SAFE:** Cámara de Comercio y documentos de YC (6 h).
- **Propiedad intelectual:** registro de software ante la DNDA, marca "Apiary" ante la SIC y compatibilidad de la GPLv3 de Freqtrade (5 h).
- **Modo en vivo y cobro por volumen:** cuándo empieza a parecer intermediación (6 h).
- **Mapa regulatorio de México (Ley Fintech), Brasil (Lei 14.478/2022) y EE. UU. (SEC, CFTC, FinCEN)** (8-10 h).
- **SARLAFT, KYC y la *travel rule* del GAFI**, para cuando se escale (4 h).

---

## 4. Roles sin persona asignada

### Rol 1: Backend y motor del bot. Es la prioridad número 1.
**Perfil a buscar:** estudiante o egresado de ingeniería de sistemas o software que ya haya construido un backend en Python con base de datos y lo haya desplegado en Linux. Se puede buscar en los semilleros o grupos de programación de la UPB.

| Nivel | Conocimientos y recursos |
|---|---|
| 🔴 | Python básico y `venv`: *Python for Everybody* (20 h). ccxt para datos públicos, `fetch_ticker` y `fetch_ohlcv`: docs.ccxt.com (4 h). Simulador de órdenes con rieles como funciones probadas: Freqtrade y pytest (6 h). Shell, Git, SSH y systemd: MIT *Missing Semester* (8 h) |
| 🟠 | FastAPI para el dashboard y el kill switch (10 h). SQL y SQLAlchemy para la bitácora (8 h). Explicación de cada orden con plantilla Jinja2 y un LLM con prompt restringido (3.7) (4 h). Robustez: logging, reintentos, límites de peticiones, UptimeRobot (5 h) |
| 🟢 | Ejecución real en la testnet de Binance y Bybit (10 h). Docker y GitHub Actions (8 h). Arquitectura multi-exchange tipo Hummingbot (10 h). Agentes de IA con *tool use* en los que los rieles validan cada acción (8 h) |

### Rol 2: Estrategia y gestión de riesgo
**Perfil a buscar:** estudiante de finanzas, economía o ingeniería financiera que opere cripto de verdad. Puede compartir persona con Métricas si se mantiene la división: Estrategia diseña las reglas y Métricas mide si funcionan.

| Nivel | Conocimientos y recursos |
|---|---|
| 🔴 | Mercado spot: órdenes, comisiones maker y taker, stablecoins, en Binance Academy (4 h). Plantillas de DCA con pausa y de rebalanceo BTC/stablecoin (3.1): Binance Academy, Investopedia y Bogleheads (3 h). Escribir reglas como especificación sin ambigüedad: tablas de decisión y pseudocódigo (3 h). Riesgo básico (tamaño de posición, pérdida diaria, stop) y tabla de perfiles (3 h) |
| 🟠 | Costos reales y trampas del backtesting: QuantStart y Freqtrade (4 h). ATR y escenarios extremos como la pérdida de paridad de USDC o UST (3 h). Comparación con hold, con DCA y con los bots gratuitos de los exchanges (3.3 y 3.4) (4 h). Diferencia entre informar y asesorar, junto con Miguel (3 h) |
| 🟢 | Derivados: perpetuos, funding, liquidación (6 h). EDHEC, *Portfolio Construction with Python* en modo auditoría (20 h). Kelly, CVaR y paridad de riesgo (4 h). FreqAI y sus trampas (5 h) |

### Rol 5: Seguridad informática y datos
**Perfil a buscar:** estudiante de sistemas o telecomunicaciones interesado en ciberseguridad. Puede ser medio tiempo, pero conviene que **no** sea la misma persona de Backend, para que uno revise el trabajo del otro.

| Nivel | Conocimientos y recursos |
|---|---|
| 🔴 | Secretos: `.gitignore`, `.env`, *push protection* de GitHub y gitleaks (3 h). Endurecer el VPS: SSH con llaves, ufw, fail2ban; OverTheWire Bandit y DigitalOcean (9 h). HTTPS con certbot y Nginx (2 h). Bitwarden y 2FA en todas las cuentas del equipo (1-2 h) |
| 🟠 | OWASP Top 10, pip-audit, bandit y Dependabot (6 h). Autenticación con Argon2 o bcrypt, sesiones y TOTP, según las OWASP Cheat Sheets (5 h). Datos personales en la práctica y backups cifrados con restic (4 h). Modelado de amenazas (STRIDE) y diseño de llaves API solo de trading, sin retiro, con lista blanca de IP (6 h) |
| 🟢 | Vault o KMS (8 h). OWASP Top 10 para LLM (3 h). PortSwigger Web Security Academy (20 h). Caso de las llaves filtradas de 3Commas en 2022, ISO 27001 y la circular de ciberseguridad de la SFC (4 h) |

---

## 5. Lo que debe saber todo el equipo

El jurado le puede preguntar cualquier cosa a cualquiera.

| Tema | Recurso | Horas |
|---|---|---|
| Qué es un exchange, una llave API y "no custodial". Qué hace y qué no hace el bot, en 2 frases iguales para todos. Palabras prohibidas. Las 5 métricas | Binance Academy y una hoja de una página hecha por el equipo (las métricas las redacta Nicolás) | 3-5 |
| Trabajo en ciclos de 2 semanas: pregunta del ciclo, revisión y retrospectiva | Guía de Scrum en español, solo esas ideas | 1,5 |
| Git y GitHub | GitHub Skills, *Introduction to GitHub*, y Pro Git en español, capítulos 1 a 3 | 4 |
| Notion como tablero común (tareas, decisiones, banco de preguntas del jurado) | Notion Help Center | 1 |
| Pitch | Video de YC *How to Pitch Your Startup* | 1 |
| Finanzas conductuales (aversión a la pérdida) | Investopedia, *Behavioral Finance* | 3 |

## 6. Frentes de empresa que no tenían dueño

| Frente | Dueño propuesto | Nivel | Recurso |
|---|---|---|---|
| Coordinación del equipo, asignación de roles vacíos, decisión ruta A/B | **Camila** | 🔴 | YC Startup School: *How to Work Together* |
| Lean Canvas del MVP | **Camila**, con revisión de Nicolás | 🔴 | LeanStack |
| Finanzas mínimas: costos, precio con IVA del 19 % y comisión de la pasarela, escenarios A y B | **Nicolás** | 🔴 | a16z *16 Startup Metrics* y una hoja propia |
| Pitch y relato ("control, no rendimiento") | **Camila**, con datos de Nicolás y revisión de lenguaje de Miguel. Se puede pasar a Estrategia si Camila está saturada | 🟠 | Regla 10/20/30 de Kawasaki y plantilla de Sequoia |
| Proyección a 12 meses y unit economics | **Nicolás** | 🟠 | David Skok, *SaaS Metrics 2.0* |
| SAS, RUT, IVA, facturación electrónica y Régimen Simple | **Miguel** | 🟠 | Cámara de Comercio y dian.gov.co |
| Ventas y comunidad en la beta | **Camila** | 🟠 | Startup School: *How to Get Your First Customers* |
| Inversión y aceleradoras (Apps.co, ALDEA+, Medellín Next, ecosistema UPB) | **Nicolás** (material), **Miguel** (requisitos) | 🟢 | Casi todas piden empresa constituida y tracción: es tarea para después del concurso |
| Pacto de socios, reparto de participación y vesting | **Miguel** | 🟢 | Startup School: *Co-founder Equity* |
| Cultura del equipo, toma de decisiones, salida de miembros | **Camila** | 🟢 | Atlassian Team Playbook |
| Finanzas de una ronda (SAFE, pre-money) | **Nicolás** | 🟢 | Post-money SAFE de YC |

---

## Próximos pasos sugeridos

1. Confirmar los nombres de los 6 roles y las horas semanales de cada persona. Con 15-17 h por semana de estudio urgente, la carga de Miguel y la de Camila son altas: hay que contrastarlas con su disponibilidad real.
2. Esta misma semana, cada persona hace el "primer ejercicio" que propone el documento base para su rol.
3. Conseguir a la persona de Backend antes que cualquier otra cosa.
4. Revisar este plan al cierre de cada ciclo de 2 semanas.
