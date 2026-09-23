# Voice DNA · Dra. Melissa Buitrago

Patrones extraídos de unos 50 reportes reales. El objetivo es que el reporte suene a ella y no a un libro: frases cortas, descriptivas, en tercera persona impersonal, con clasificaciones siempre explícitas.

## 1. Esqueleto

```
Entidad: <EPS/aseguradora dictada>
Sedación: Propofol
<#QImágenes4,100#>

<TÍTULO DEL PROCEDIMIENTO EN MAYÚSCULAS> [+ <GESTO TERAPÉUTICO>] [+ <OTRO GESTO>]
<Campo>: <texto>
<Campo>: <texto>
...
Biopsias: <No. | Sí, <sitio> (<n.º de frasco>), ...>
Conclusión: 1- <HALLAZGO>;
2- <HALLAZGO>;
3- <HALLAZGO>.
Recomendaciones:
1- ...
2- ...
```

- **Entidad:** lo que ella dicte (SURA, EPS SURA, PÓLIZA SURA, CCQ, CCQ / SURA, COLSANITAS, DUMIAN, PARTICULAR…). Si no la dicta, `Entidad: [ ]`.
- **Sedación:** "Propofol" por defecto, salvo que dicte otra cosa.
- `<#QImágenes4,100#>` es la macro de imágenes de su software. Se copia **exactamente así**, siempre en la tercera línea.
- **Título:** el procedimiento base más cada gesto terapéutico, unidos con " + ". Ejemplos:
  - `ESOFAGOGASTRODUODENOSCOPIA + LIGADURA DE VÁRICES ESOFÁGICAS`
  - `ESOFAGOGASTRODUODENOSCOPIA + ESCISIÓN DE PÓLIPO GÁSTRICO`
  - `COLONOSCOPIA TOTAL + RESECCIÓN DE LESIÓN DE INTESTINO GRUESO`
  - `CPRE + EXTRACCIÓN DE CÁLCULOS BILIARES POR ESFINTEROTOMÍA + INSERCIÓN DE STENT BILIAR`
  - `GASTROSTOMÍA ENDOSCÓPICA PERCUTÁNEA`
  - Sin gesto terapéutico: `ESOFAGOGASTRODUODENOSCOPIA` o `COLONOSCOPIA TOTAL`.
- **Campos:** `Nombre: texto`, un campo por segmento, en orden anatómico. Los campos opcionales solo aparecen si hay algo que decir: `Hipofaringe`, `Anastomosis`, `Asa aferente`, `Asa eferente`, `Procedimiento`, `Indicación`.

## 2. Cómo describe

**Orden dentro de cada segmento:**
1. Aspecto general (lumen, contenido, distensibilidad).
2. Mucosa de base.
3. "excepto en…" / "Adicionalmente, …" para introducir lo patológico.
4. Hallazgo con **localización → número → morfología → tamaño → superficie/estigmas**.
5. Gesto terapéutico con instrumento.
6. Resultado.
7. Punto anatómico de referencia (unión gastroesofágica, píloro).

**Conectores y fórmulas propias:**
- "Mucosa sin alteraciones, excepto en el tercio distal, donde se observan…"
- "Adicionalmente, en …, se observa/identifica…"
- "…compatible(s) con…" (hallazgo con aspecto típico) / "…que podría corresponder a…" (hallazgo dudoso)
- "…– se toman biopsias." / "…– se reseca con pinza." (el gesto va tras un guion largo)
- "…se reseca totalmente con pinza jumbo."
- "…sin complicaciones inmediatas."
- "…obteniendo adecuada hemostasia." / "…obteniendo hemostasia inmediata."
- "No hay sangre ni coágulos."
- "…sin estigmas de sangrado o proceso inflamatorio agudo." (divertículos)
- "…sin estigmas de sangrado activo o reciente."
- "…que impide el paso del equipo debido al riesgo de perforación."
- "A la revisión, no se observan signos de sangrado o perforación intestinal."
- "No se identifica estenosis o factor obstructivo mecánico."

**Medidas:**
- Siempre en mm para lesiones ("pólipo sésil de 4 mm de diámetro") y en cm para distancias ("a 30 cm de la arcada dentaria superior", "a 25 cm del reborde anal", "unión gastroesofágica a 3 cm de la impresión diafragmática").
- Cuando no mide exacto usa los cortes "de menos de 5 mm" / "de más de 5 mm", "de hasta 6 mm".

**Severidad:** leve / moderada / intensa (no usa "severa"). Ejemplos: "eritema leve", "edema intenso en mosaico", "gastritis erosiva corporoantral moderada".

**Vocabulario suyo (úsalo; no lo "mejores"):**
- Esófago y estómago: lumen, lago gástrico, franqueable, en retrovisión, región subcardial, incisura angularis, píloro centrado / excéntrico.
- Várices: cordones varicosos violáceos, tortuosos / rectilíneos, áreas de fragilidad (red spots), hematoquiste, "white nipple".
- Esófago de Barrett: proyecciones digitiformes de mucosa aterciopelada, de coloración rosa-salmón.
- Atrofia y erosiones: fácil visualización de los vasos submucosos, erosiones planas / elevadas cubiertas por fibrina, puntos de hematina.
- Colon: orificios diverticulares de boca ancha, despulimiento apical, colgajos cutáneos perianales.
- Sangrado: sangrado escaso, en capa, persistente, autolimitado; habón de palidecimiento perilesional.
- Otros: pinza diente de ratón, "con la técnica PULL".

## 3. Conclusión

- Numerada `1- `, `2- `, … Numeración continua, sin saltos ni viñetas mezcladas.
- **En MAYÚSCULAS y con tildes**: las mayúsculas también se tildan (ÚLCERA, PÓLIPO, GÁSTRICA). Ojo: "colon" no lleva tilde (COLON).
- Cada ítem termina en `;` y el último en `.`.
- **Fórmula:** `DIAGNÓSTICO + LOCALIZACIÓN + GRADO/SEVERIDAD (ESCALA)` y, si hubo gesto, ` – GESTO + RESULTADO`. Ejemplos:
  - `ESOFAGITIS EROSIVA DISTAL LEVE (LOS ÁNGELES, GRADO A);`
  - `HERNIA HIATAL TIPO I (SAGES) DE 3 CM;`
  - `GASTRITIS ERITEMATOSA CORPOROANTRAL LEVE;`
  - `GASTRITIS ATRÓFICA CORPOROANTRAL CON METAPLASIA INTESTINAL;`
  - `ÚLCERA GÁSTRICA ACTIVA (SAKITA A1 / FORREST Ib) – CONTROL DE HEMORRAGIA POR INYECCIÓN DE ADRENALINA Y HEMOCLIP, SIN COMPLICACIONES INMEDIATAS;`
  - `PÓLIPO GÁSTRICO RESECADO (PARIS 0-Is);`
  - `VÁRICES ESOFÁGICAS GRANDES CON ÁREAS DE FRAGILIDAD, SIN SANGRADO ACTIVO – LIGADURA ELÁSTICA SIN COMPLICACIONES INMEDIATAS;`
  - `ENFERMEDAD DIVERTICULAR DEL COLON SIGMOIDES;`
  - `COLONOSCOPIA TOTAL NORMAL.`
- Las lesiones pendientes de histología llevan "A ESTUDIO" ("PÓLIPOS GÁSTRICOS A ESTUDIO", "COLITIS SEGMENTARIA A ESTUDIO"). La sospecha se escribe entre paréntesis ("(PROBABLE ADENOCARCINOMA BORRMANN IV)").
- **Dentro de las mayúsculas, el grado conserva su forma técnica:** FORREST Ib, FORREST IIa, PARIS 0-Is, PARIS 0-IIa, PRAGA C1M2, JNET 2A.
- La conclusión **nunca** trae algo que no esté descrito arriba, y todo lo descrito relevante aparece en la conclusión.

## 4. Biopsias

- Formato: `Sitio (n.º de frasco)`, separados por comas. Ejemplos:
  - `Sí, de cuerpo (1) y antro (2).`
  - `Pólipo del cuerpo (1), antro e incisura (2), esófago (3).`
  - `Íleon distal (1), colon (2) – para investigación de diarrea.`
- Si no hay: `No.` Si se decidió no tomarlas, se explica: `No – intensa friabilidad del tejido y riesgo de resangrado.`
- Si se resecó y no se recuperó: `No fue posible recuperar el pólipo resecado.`

## 5. Recomendaciones / Obs

- Históricamente las escribe como `Obs:` en texto corrido. Ahora el formato es `Recomendaciones:` numerado `1- `, que es el formato acordado con ella y el mismo que ya usa en CPRE.
- **Primero va la conducta que ella dictó**, en su redacción:
  - "Mantener ayuno VO por 12 horas."
  - "Iniciar dieta VO – alta con orientaciones y signos de alarma."
  - "Control ambulatorio por gastroenterología con resultados de patología."
  - "NVO hasta mañana."
  - "Vigilar signos de pancreatitis o sangrado."
- **Después van las recomendaciones de guía**, con la cita entre paréntesis al final: "(ESGE 2021)", "(Baveno VII, 2022)".
- **Eventos adversos** (desaturación, paro, perforación): van en un campo `Observación:` aparte, en MAYÚSCULAS y en orden cronológico, tal como ella lo dicta. Nunca se suavizan ni se omiten.

## 6. Abreviaturas que usa y se conservan

VO (vía oral), EV / IV (endovenoso), NVO (nada vía oral), IBP, AINE, DII (segunda porción duodenal), UCI, EVDA, CPRE, TAC, Fr (French), CD / CT / CI (Boston: colon derecho, transverso, izquierdo).
