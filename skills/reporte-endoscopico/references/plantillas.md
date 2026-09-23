# Plantillas por procedimiento

Esta tabla dice **qué campos lleva cada procedimiento y en qué orden**. El texto de cada campo sale de `frases-base.md`, y los ejemplos completos están en `ejemplos/`.

Todas las plantillas (salvo la CPRE, que no lo usa en su corpus) empiezan con el mismo encabezado:
```
Entidad: <dictada | [ ]>
Sedación: Propofol
<#QImágenes4,100#>
```

| Procedimiento | Título (+ gestos) | Campos en orden |
|---|---|---|
| EVDA diagnóstica | ESOFAGOGASTRODUODENOSCOPIA | Esófago · Estómago · Duodeno · Biopsias · Conclusión · Recomendaciones |
| EVDA + cuerpo extraño | … + EXTRACCIÓN DE CUERPO EXTRAÑO POR VÍA ENDOSCÓPICA | Hipofaringe · Esófago · Estómago · Duodeno · Biopsias · Conclusión · Recomendaciones |
| EVDA + ligadura | … + LIGADURA DE VÁRICES ESOFÁGICAS | igual a la diagnóstica; la ligadura se describe en Esófago (n.º de bandas) |
| EVDA + polipectomía | … + ESCISIÓN DE PÓLIPO(S) GÁSTRICO(S) / POLIPECTOMÍA DE ESÓFAGO | igual; el gesto va en el segmento correspondiente |
| EVDA + hemostasia | … + CONTROL DE HEMORRAGIA <GÁSTRICA/DUODENAL/ESOFÁGICA> POR <INYECCIÓN DE ADRENALINA / HEMOCLIP / TERAPIA ENDOSCÓPICA COMBINADA> | igual; el gesto va en el segmento correspondiente |
| EVDA + sonda nasoenteral | INSERCIÓN DE SONDA NASOENTERAL VÍA ENDOSCÓPICA | Esófago · Estómago · Duodeno · Procedimiento · Conclusión · Recomendaciones |
| EVDA + sonda nasoyeyunal | ESOFAGOGASTRODUODENOSCOPIA + INSERCIÓN DE SONDA NASOYEYUNAL | según la anatomía; Procedimiento al final |
| PEG | GASTROSTOMÍA ENDOSCÓPICA PERCUTÁNEA | Esófago · Estómago · Duodeno · Procedimiento · Conclusión · Recomendaciones |
| Endovac | ESOFAGOGASTRODUODENOSCOPIA + INSERCIÓN DE DISPOSITIVO EN ESÓFAGO (ENDOVAC) [+ SONDA NASOENTERAL] | Indicación · Esófago · Estómago · Duodeno · Biopsias · Procedimiento · Conclusión · Recomendaciones |
| Bypass en Y de Roux | ESOFAGOGASTRODUODENOSCOPIA | Esófago · Estómago (pouch, medida por curvatura menor) · Anastomosis · Asa aferente · Asa eferente · Biopsias · Conclusión |
| Gastrectomía total/radical | ESOFAGOGASTRODUODENOSCOPIA [+ …] | Esófago · Estómago ("Ausente por antecedente quirúrgico de gastrectomía radical.") · Anastomosis · Asa aferente · Asa eferente · [Procedimiento] · Conclusión · Recomendaciones |
| Sleeve | ESOFAGOGASTRODUODENOSCOPIA | Esófago · Estómago (forma tubular, línea de sutura mecánica) · Duodeno · Biopsias · Conclusión |
| Colonoscopia | COLONOSCOPIA TOTAL [+ RESECCIÓN DE LESIÓN DE INTESTINO GRUESO VÍA ENDOSCÓPICA] | Examen externo · Tacto rectal · Procedimiento · Preparación · Biopsias · Conclusión · Recomendaciones |
| Rectosigmoidoscopia / colonoscopia limitada | COLONOSCOPIA / RESECCIÓN DE LESIÓN DEL COLON VÍA ENDOSCÓPICA | igual; Procedimiento "hasta <segmento>" y Boston con `x` en los segmentos no evaluados |
| CPRE | CPRE + <gestos: EXTRACCIÓN DE STENT BILIAR / EXTRACCIÓN DE CÁLCULOS BILIARES POR ESFINTEROTOMÍA / INSERCIÓN DE STENT BILIAR> | Indicación · Premedicación · Descripción · Duodenoscopia · Procedimiento · Biopsia · Conclusión · Recomendaciones (sin el encabezado de Entidad) |
| Examen no realizado | (sin título) | Nota en MAYÚSCULAS, en texto corrido: motivo de la suspensión y conducta. Ver `ejemplos/otros-procedimientos.md` |

## Reglas de los gestos terapéuticos en el título

- Hay un gesto por cada acción: `+ EXTRACCIÓN DE STENT BILIAR + EXTRACCIÓN DE CÁLCULOS… + INSERCIÓN DE STENT BILIAR`.
- Si no hubo gesto, el título queda solo con el examen.
- EVDA y colonoscopia en el mismo acto: son **dos bloques**, cada uno con su título, sus campos y su conclusión, bajo un solo encabezado de Entidad.
