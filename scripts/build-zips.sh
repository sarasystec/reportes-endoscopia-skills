#!/usr/bin/env bash
# Genera dist/<skill>.zip listos para subir en claude.ai → Configuración → Capacidades → Skills.
set -euo pipefail

root="$(cd "$(dirname "$0")/.." && pwd)"
dist="$root/dist"
rm -rf "$dist"
mkdir -p "$dist"

for dir in "$root"/skills/*/; do
  name="$(basename "$dir")"
  if [[ ! -f "$dir/SKILL.md" ]]; then
    echo "Falta SKILL.md en $name" >&2
    exit 1
  fi
  (cd "$root/skills" && zip -qr "$dist/$name.zip" "$name" -x '*.DS_Store')
  echo "dist/$name.zip"
done
