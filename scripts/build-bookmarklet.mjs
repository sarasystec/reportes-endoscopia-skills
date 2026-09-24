// Genera dist/instalar-boton-urosoft.html: página que se abre en Firefox para arrastrar el botón
// "Pegar en Urosoft" a la barra de marcadores. Uso: node scripts/build-bookmarklet.mjs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = readFileSync(join(root, 'herramientas/urosoft-firefox/pegar-hallazgos.js'), 'utf8');

// Quita comentarios de línea y espacios sobrantes; el código no usa "//" dentro de cadenas.
const code = src
  .split('\n')
  .map((l) => l.replace(/^\s*\/\/.*$/, '').replace(/\s+\/\/ .*$/, '').trim())
  .filter(Boolean)
  .join('\n');
const href = 'javascript:' + encodeURIComponent(code);
const attr = href.replace(/&/g, '&amp;').replace(/"/g, '&quot;');

const html = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Botón Pegar en Urosoft</title>
<style>
  :root { --bg:#faf7f4; --fg:#222; --muted:#5b5b5b; --accent:#e8742a; --card:#fff; --line:#eadfd6; }
  @media (prefers-color-scheme: dark) { :root { --bg:#1d1b1a; --fg:#eee; --muted:#b5b0ab; --card:#292624; --line:#3b3633; } }
  body { margin:0; background:var(--bg); color:var(--fg); font:16px/1.55 system-ui,-apple-system,"Segoe UI",sans-serif; }
  main { max-width:680px; margin:0 auto; padding:32px 16px 48px; }
  h1 { font-size:26px; margin:0 0 6px; }
  p.lead { color:var(--muted); margin:0 0 24px; }
  .drag { display:inline-block; padding:12px 20px; background:var(--accent); color:#fff; border-radius:10px;
          font-weight:700; text-decoration:none; cursor:grab; box-shadow:0 3px 10px rgba(232,116,42,.35); }
  .card { background:var(--card); border:1px solid var(--line); border-radius:12px; padding:18px 20px; margin:18px 0; }
  ol { padding-left:22px; margin:8px 0 0; } li { margin:6px 0; }
  kbd { border:1px solid var(--line); border-bottom-width:2px; border-radius:4px; padding:0 5px; font-size:.9em; }
  .warn { color:var(--muted); font-size:14px; }
</style>
</head>
<body>
<main>
  <h1>Botón “Pegar en Urosoft”</h1>
  <p class="lead">Pega el reporte que te dio Claude en el campo HALLAZGOS de la Nota Operatoria y marca “Material enviado a patología”. No guarda ni toca ningún otro campo.</p>

  <div class="card">
    <strong>1. Instalar (una sola vez, en Firefox)</strong>
    <ol>
      <li>Muestra la barra de marcadores: <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>B</kbd> (en Mac <kbd>⌘</kbd>+<kbd>Shift</kbd>+<kbd>B</kbd>).</li>
      <li>Arrastra este botón hasta la barra de marcadores:<br><br>
        <a class="drag" href="${attr}" onclick="alert('No hagas clic aquí: arrástralo a la barra de marcadores.');return false;">📋 Pegar en Urosoft</a></li>
    </ol>
  </div>

  <div class="card">
    <strong>2. Usar con cada paciente</strong>
    <ol>
      <li>En Claude, copia el reporte con el botón de copiar del recuadro.</li>
      <li>En Urosoft (Firefox) entra como siempre: Atención de pacientes → sede → Cirugía / Gastroprocedimiento → paciente → Evolución → <b>Nota Operatoria</b> → crear acto quirúrgico.</li>
      <li>Haz clic en <b>📋 Pegar en Urosoft</b> en la barra de marcadores. Pega el reporte (<kbd>Ctrl</kbd>/<kbd>⌘</kbd>+<kbd>V</kbd>), revisa la opción de patología y dale a <b>Insertar</b>.</li>
      <li>El campo queda marcado en verde. Completa lo demás (anestesiólogo, horas, tejidos, diagnósticos, CUPS…) y <b>guarda tú</b>.</li>
    </ol>
  </div>

  <p class="warn">Se quitan solas las líneas “Entidad”, “Sedación” y la macro de imágenes, porque Urosoft ya muestra la entidad. Si HALLAZGOS ya tenía texto, el botón pregunta antes de reemplazarlo. Si no encuentra el campo, avisa y no hace nada.</p>
</main>
</body>
</html>
`;

mkdirSync(join(root, 'dist'), { recursive: true });
writeFileSync(join(root, 'dist/instalar-boton-urosoft.html'), html);
writeFileSync(join(root, 'herramientas/urosoft-firefox/instalar-boton-urosoft.html'), html);
console.log('dist/instalar-boton-urosoft.html (' + href.length + ' caracteres de bookmarklet)');
