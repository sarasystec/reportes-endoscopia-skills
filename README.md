# Reportes de endoscopia con Claude · Dra. Melissa Buitrago

Son dos *skills* (habilidades) para Claude que:

1. **`reporte-endoscopico`**: convierten lo que usted dicta, en telegráfico y con abreviaturas, en un **reporte técnico con su estructura, sus frases y su forma de escribir**. Aplican las escalas acordadas y cierran con recomendaciones basadas en guías internacionales.
2. **`cargar-reporte-urosoft`**: lleva el reporte aprobado a **Urosoft** (Nota Operatoria → HALLAZGOS), que solo funciona en **Firefox**. Lo hace con un botón en la barra de marcadores de Firefox. Usted conserva el control de todo lo demás.

> Claude no ve las imágenes ni al paciente y **no inventa hallazgos**. El criterio clínico, la revisión y la firma son suyos.

---

## 1. Instalación (una sola vez, unos 5 minutos)

1. Entre a **Releases**, a la derecha de esta página (o en `…/releases`), y descargue los dos archivos:
   - `reporte-endoscopico.zip`
   - `cargar-reporte-urosoft.zip`
   - `instalar-boton-urosoft.html` (para Firefox, ver sección 3)

   No descomprima los `.zip`.
2. Abra **claude.ai** en el computador → su nombre, abajo a la izquierda → **Configuración** → **Capacidades**.
3. Active **"Ejecución de código y creación de archivos"** si no está activo.
4. En la sección **Skills**, haga clic en **"Subir skill"** y suba cada `.zip`. Verifique que queden activadas.
5. Listo. Las skills se usan solas cuando usted dicta un caso; no hay que nombrarlas.

> Si más adelante hay una versión nueva, se descarga de Releases y se sube de nuevo reemplazando la anterior.

## 2. Uso diario: dictar un caso

Abra un chat nuevo en Claude y escriba o dicte los hallazgos como le salgan. Ejemplos:

```
sura. evda + ligadura. esófago desde 30 cm 3 cordones >5mm tortuosos con red spots, sin sangrado, 5 bandas.
estómago gastropatía hipertensiva leve en mosaico, hill II. duodeno nl. no bx. pte con terlipresina
```

```
colsanitas colono total hasta íleon. sigmoides pólipo sésil 6mm asa fría a patología.
divertículos sigmoides. boston 2 3 3. hemorroides internas grado I
```

```
cpre. indicación colangitis. premed diclofenaco propofol. colédoco 14mm 3 cálculos hasta 10mm,
esfinterotomía amplia, balón saca cálculos y pus, colangio oclusiva limpia. stent 10Fr x 7cm
```

**Claude le devuelve:**
- **A) El reporte**, en un recuadro con botón de copiar, con su formato:
  - encabezado (Entidad / Sedación / `<#QImágenes4,100#>`);
  - título + gesto terapéutico;
  - segmentos;
  - biopsias;
  - conclusión numerada en mayúsculas con escalas;
  - recomendaciones con la guía citada.
- **B) Datos para la plataforma**: material a patología SÍ/NO y los tejidos enviados.
- **C) Notas para revisar**, si las hay: lo que asumió, lo que falta y las inconsistencias. Ejemplo: "dijo eritema intenso pero concluyó leve".

**Consejos:**
- Diga siempre la **entidad**, el **Hill**, el **Boston por segmento** y el **número de frasco** de cada biopsia. Si falta algo importante, Claude le preguntará antes de entregar.
- Si no menciona un segmento, Claude usa su texto de normalidad y se lo avisa.
- Puede pedir cambios: "ponlo más corto", "quita la recomendación 3", "cambia a Forrest IIa".
- También puede pegar un reporte viejo y decir **"revísalo"**: le devuelve la versión corregida y la lista de inconsistencias.

**Privacidad:** **no dicte nombres, cédulas ni número de historia**. Si se le escapan, Claude no los copia en el reporte.

## 3. Subir el reporte a Urosoft (Firefox)

Urosoft solo funciona en **Firefox**, así que se usa un **botón en la barra de marcadores** que pega el reporte en HALLAZGOS con un clic.

### Instalar el botón (una vez)
1. Abra en **Firefox** el archivo descargado `instalar-boton-urosoft.html` (doble clic o arrástrelo a una pestaña de Firefox).
2. Muestre la barra de marcadores: `Ctrl + Shift + B` (en Mac `⌘ + Shift + B`).
3. **Arrastre** el botón naranja **📋 Pegar en Urosoft** hasta la barra de marcadores.

### Cada paciente
1. En Claude, copie el reporte con el botón de copiar del recuadro.
2. En Firefox, en Urosoft, entre como siempre con **su usuario y contraseña** → Atención de pacientes → sede → Cirugía / Gastroprocedimiento → paciente → Evolución → **Nota Operatoria** → crear acto quirúrgico.
3. Haga clic en **📋 Pegar en Urosoft** (barra de marcadores). Se abre un recuadro: pegue el reporte (`Ctrl/⌘ + V`), revise **Material enviado a patología** (se sugiere solo según "Biopsias") y dele **Insertar**.
4. HALLAZGOS queda marcado en verde con el reporte. Complete lo demás (anestesiólogo, horas, tipo de anestesia, tejidos, diagnósticos, CUPS…) y **guarde usted**.

**Lo que el botón hace:**
- Quita solo las líneas Entidad, Sedación y la macro de imágenes, porque Urosoft ya muestra la entidad.
- Pregunta antes de reemplazar si HALLAZGOS ya tenía texto.
- Si no encuentra el campo, avisa y no toca nada.

**Lo que el botón no hace:** no guarda, no firma, no ve ni envía datos a ningún lado y no toca ningún otro campo, incluido el texto prellenado de "Descripciones".

> **Opción avanzada:** si su app de escritorio de Claude tiene la función de controlar la pantalla (*computer use*), puede pedirle "súbelo a Urosoft" y Claude hace el recorrido en Firefox con las mismas reglas. Usted inicia sesión, confirma el paciente y autoriza el guardado.

## 4. Qué hay en este repositorio

```
skills/
  reporte-endoscopico/
    SKILL.md                         instrucciones principales
    references/
      voz-dra-buitrago.md            su "voice DNA": estructura, léxico, fórmulas de conclusión
      frases-base.md                 su texto de normalidad por segmento y procedimiento
      plantillas.md                  campos y orden por tipo de procedimiento
      escalas.md                     Los Ángeles, Praga, Forrest, Sakita, OLGA, París, NBI/JNET,
                                     Boston, Hill, SAGES, Kodsi, Sarin, Strasberg, Bismuth, ASGE
      recomendaciones.md             conductas con su guía (ESGE, ACG, ASGE, AGA, Baveno VII, USMSTF…)
      correcciones.md                ortografía, terminología y chequeo de calidad antes de entregar
      ejemplos/                      sus reportes reales, ANONIMIZADOS y corregidos
  cargar-reporte-urosoft/
    SKILL.md                         cómo llevar el reporte a Urosoft y reglas de seguridad
herramientas/urosoft-firefox/
  pegar-hallazgos.js                 código del botón "Pegar en Urosoft" (legible)
  instalar-boton-urosoft.html        página para instalar el botón en Firefox
  prueba/formulario-simulado.html    réplica del formulario para probar sin datos reales
evals/casos.json                     casos de prueba para validar las skills
scripts/build-zips.sh                genera los .zip para subir a Claude
scripts/build-bookmarklet.mjs        genera la página de instalación del botón
```

**Para ajustar su estilo**, por ejemplo una frase que ya no usa o una recomendación que prefiere distinta: se edita el archivo correspondiente en `references/`, se ejecuta `scripts/build-zips.sh` y se sube el nuevo `.zip`.

## 5. Límites y responsabilidad

- Es una herramienta de **redacción y consulta**: no reemplaza su juicio clínico.
- Las recomendaciones citan guías que se actualizan; verifique la versión vigente cuando el caso lo amerite.
- Los ejemplos del repositorio provienen de reportes reales **sin datos identificables** de pacientes ni de personal.
