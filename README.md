# Reportes de endoscopia con Claude · Dra. Melissa Buitrago

Son dos *skills* (habilidades) para Claude que:

1. **`reporte-endoscopico`**: convierten lo que usted dicta, en telegráfico y con abreviaturas, en un **reporte técnico con su estructura, sus frases y su forma de escribir**. Aplican las escalas acordadas y cierran con recomendaciones basadas en guías internacionales.
2. **`cargar-reporte-urosoft`**: con el navegador, **pegan el reporte aprobado en Urosoft** (Nota Operatoria → HALLAZGOS). Usted conserva el control de todo lo demás.

> Claude no ve las imágenes ni al paciente y **no inventa hallazgos**. El criterio clínico, la revisión y la firma son suyos.

---

## 1. Instalación (una sola vez, unos 5 minutos)

1. Entre a **Releases**, a la derecha de esta página (o en `…/releases`), y descargue los dos archivos:
   - `reporte-endoscopico.zip`
   - `cargar-reporte-urosoft.zip`

   No los descomprima.
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

## 3. Subir el reporte a Urosoft con el navegador

Urosoft es una plataforma cerrada, así que se usa **Claude in Chrome** (la extensión de Claude para Google Chrome).

### Preparación (una vez)
1. Instale **Claude in Chrome** desde la Chrome Web Store e inicie sesión con su misma cuenta de Claude.
2. Dé permiso a la extensión para el sitio `urosoft.clinicasagradafamilia.net`.

### Cada vez
1. Abra Urosoft en Chrome e **inicie sesión usted misma**. Claude nunca escribe su usuario ni su contraseña.
2. Abra el panel lateral de Claude en esa pestaña y escriba, por ejemplo:
   > "Carga en Urosoft este reporte. Sede: ___. Panel: Gastroprocedimiento. El paciente ya está abierto." (y pegue el reporte)
3. Claude navega así: **Atención de pacientes → sede → panel → paciente → Evolución → Nota Operatoria → crear acto quirúrgico**. Luego pega el reporte en **HALLAZGOS** y le propone marcar **Material enviado a patología**.
4. **Antes de guardar**, Claude le muestra una captura y la lista de campos que quedan para usted: anestesiólogo, horas, tipo de anestesia, tejidos, diagnósticos, CUPS… **Solo guarda si usted dice "sí"**, o usted misma da el clic.

**Lo que Claude NO hace en Urosoft:**
- No escribe credenciales.
- No elige un paciente sin su confirmación.
- No llena diagnósticos, CUPS, profesionales, horas ni antibióticos.
- No borra el texto prellenado de "Descripciones".
- No firma ni guarda sin su autorización.

> Si en la extensión de Chrome no aparece la skill instalada, cree un **atajo** (shortcut) en Claude in Chrome con este texto y úselo cada vez:
>
> "Sigue estas reglas para cargar un reporte en Urosoft: yo inicio sesión; tú vas a Usuario → Atención de pacientes → la sede que te diga → Cirugía o Gastroprocedimiento → el paciente que yo confirme → Evolución → Nota Operatoria → crear acto quirúrgico. Pega el reporte (desde el título, sin las líneas Entidad/Sedación/macro de imágenes) en HALLAZGOS. Propón Material enviado a patología SÍ/NO según Biopsias. No toques ningún otro campo. Antes de guardar, muéstrame captura y espera mi 'sí'."

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
    SKILL.md                         recorrido en Urosoft y reglas de seguridad
evals/casos.json                     casos de prueba para validar las skills
scripts/build-zips.sh                genera los .zip para subir a Claude
```

**Para ajustar su estilo**, por ejemplo una frase que ya no usa o una recomendación que prefiere distinta: se edita el archivo correspondiente en `references/`, se ejecuta `scripts/build-zips.sh` y se sube el nuevo `.zip`.

## 5. Límites y responsabilidad

- Es una herramienta de **redacción y consulta**: no reemplaza su juicio clínico.
- Las recomendaciones citan guías que se actualizan; verifique la versión vigente cuando el caso lo amerite.
- Los ejemplos del repositorio provienen de reportes reales **sin datos identificables** de pacientes ni de personal.
