# Guía de Optimización y Ahorro de Tokens en el Portfolio 3.0

Esta guía contiene las directrices, reglas y buenas prácticas para optimizar el uso de **tokens** cuando interactúas con Modelos de Lenguaje (LLMs / IAs de desarrollo como Gemini, Claude o ChatGPT) en este proyecto. Seguir estas reglas evitará el consumo innecesario de contexto, reducirá costos, acelerará las respuestas y mejorará la precisión de las ediciones de código.

---

## 📋 Resumen Rápido

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    ¿CÓMO REDUCIR EL USO DE TOKENS?                       │
├────────────────────────────────────┬────────────────────────────────────┤
│         PARA EL DESARROLLADOR       │       ARQUITECTURA DEL PROYECTO    │
├────────────────────────────────────┼────────────────────────────────────┤
│ • Lee solo líneas específicas      │ • Mover traducciones a JSON        │
│ • Usa buscador grep antes de leer  │ • Mover datos de trabajos a JSON   │
│ • Aplica reemplazos específicos    │ • Usar iconos remotos/SVG externos │
│ • No copies y pegues archivos CSS  │ • Evitar clases redundantes        │
└────────────────────────────────────┴────────────────────────────────────┘
```

---

## 🛠️ 1. Arquitectura de Código Eficiente (Propuestas del Proyecto)

Actualmente, el proyecto tiene datos estáticos e información de internacionalización acoplados en los archivos de lógica Javascript. Esto infla drásticamente los tokens necesarios en cada lectura.

### A. Modularizar el Sistema de Traducciones (I18N)
Actualmente, el archivo [script.js](file:///c:/Users/RICARDO%20RAMOS/OneDrive/Escritorio/portfolio3.0/js/script.js) contiene un gran objeto llamado `translations` (líneas 1 a 155) que representa más de la mitad del archivo.
* **Acción sugerida**: Mover este diccionario a archivos JSON externos:
  * `locales/es.json`
  * `locales/en.json`
* **Beneficio**: Al realizar modificaciones de comportamiento en `script.js`, el asistente no tendrá que leer ni procesar las traducciones completas, ahorrando miles de tokens por turno.

### B. Modularizar el Historial Laboral (`jobData`)
El archivo [jobs.js](file:///c:/Users/RICARDO%20RAMOS/OneDrive/Escritorio/portfolio3.0/js/jobs.js) define los puestos de trabajo en un array en español e inglés.
* **Acción sugerida**: Extraer esta información a un archivo JSON externo en `data/jobs.json`.
* **Beneficio**: Permite actualizar el stack o la trayectoria editando solo un pequeño JSON, en lugar de interactuar con el archivo de renderizado y lógica Javascript.

---

## 🤖 2. Reglas para Interactuar con la IA

Cuando uses asistentes de IA para modificar o añadir funcionalidades, pídele al modelo o sigue estas directrices para evitar desbordar el contexto:

### ⚠️ Regla de Oro: Lectura y Escritura Fraccionada
* **❌ NUNCA leas ni escribas archivos enteros**: Si necesitas modificar una función específica en `script.js` (como `updateText`), no leas todo el archivo. Pídele al asistente que lea sólo el rango de líneas de esa función.
* **⚡ Usa reemplazos quirúrgicos**: Utiliza la herramienta de reemplazo de contenido (`replace_file_content` o diffs) en lugar de que el modelo te devuelva todo el código fuente del archivo modificado.
* **🔍 Usa búsquedas inteligentes (Grep)**: En lugar de leer un archivo completo para buscar dónde está una sección o clase CSS, realiza una búsqueda grep exacta. Por ejemplo, busca `"navbar-links"` para saber exactamente qué líneas leer en `index.html`.

### 💡 Ejemplo Práctico de Instrucción Ahorradora
> **Incorrecto (Gasta Tokens):**
> *"Aquí tienes mi index.html entero, por favor añade un enlace de Instagram al Navbar."* (Envía y recibe ~8,000 tokens).
>
> **Correcto (Ahorra Tokens):**
> *"Busca en `index.html` la sección del Navbar, lee únicamente las líneas relevantes (alrededor de la línea 25-45) y añade el enlace de Instagram conservando las clases existentes."* (Envía y recibe ~400 tokens).

---

## 🌐 3. Buenas Prácticas en HTML y CSS (Ahorro de Contexto)

### A. Evitar HTML redundante e Inline SVGs
* **Usar Iconos mediante Librerías Ligereas**: Actualmente el proyecto utiliza Lucide Icons (`<i data-lucide="github">`), lo cual es una excelente práctica. Evita pegar código XML de SVGs directamente en el HTML. Un solo SVG inline detallado puede ocupar 50-100 líneas de código, multiplicando el peso del archivo HTML para el modelo.
* **Limitar la profundidad del DOM**: Mantén las estructuras de divs limpias y simples. Menos contenedores se traducen en menos etiquetas de apertura/cierre y menos tokens que procesar.

### B. Estilo híbrido Inteligente (Tailwind + CSS Custom Properties)
* **Variables CSS para Temas**: Se están utilizando variables como `var(--lila)` y `var(--background)`. Esto es óptimo porque evita que la IA deba sugerir e insertar clases de color repetitivas en cada elemento del DOM.
* **Consolidar Clases Repetidas**: Si detectas que un grupo de clases de Tailwind se repite constantemente (por ejemplo, en las tarjetas de habilidades en `index.html`), consolídalas en una sola clase personalizada (como `.tech-card`) dentro de tus archivos CSS en la carpeta `/css/`. Esto hace que el archivo HTML sea mucho más corto y legible.

---

## 📈 4. Plan de Acción de Limpieza Inmediata

Si deseas reducir el tamaño actual de los archivos inmediatamente, puedes realizar las siguientes refactorizaciones:

1. **Crear carpeta `/data` y `/locales`**.
2. **Extraer datos**:
   * Cortar las líneas `1-155` de `script.js` y guardarlas estructuradas en locales independientes.
   * Cortar las líneas `1-72` de `jobs.js` y guardarlas en `jobs.json`.
3. **Cargar mediante Fetch**:
   * Modificar `script.js` para cargar dinámicamente las traducciones y los datos del empleo utilizando `fetch()` al iniciar el script.
4. **Verificar el tamaño de archivos**:
   * `index.html` (~30KB) - Mantener limpio y delegar contenido dinámico.
   * `script.js` (Reducido de ~16KB a ~3KB).
   * `jobs.js` (Reducido de ~8.5KB a ~1.5KB).
