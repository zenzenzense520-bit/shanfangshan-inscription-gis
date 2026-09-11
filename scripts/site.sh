#!/usr/bin/env bash
# 修改说明：统一执行静态站点检查与本地预览，并将输出保存到 logs。
set -euo pipefail
script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
project_root="$(cd "$script_dir/.." && pwd)"
cd "$project_root"
mkdir -p logs

case "${1:-check}" in
  check)
    {
      test -f index.html
      test -f assets/css/site.css
      test -f assets/js/site.js
      test -f data/project_coordinate_records.geojson
      uv run --no-project --python 3.12 python -m json.tool data/project_coordinate_records.geojson >/dev/null
      ! rg -n 'api\.tianditu|[?&]tk=|file://' index.html assets data/project_coordinate_records.geojson
      echo 'Static site checks passed.'
    } 2>&1 | tee logs/site-check.log
    ;;
  serve)
    uv run --no-project --python 3.12 python -m http.server "${2:-4173}" --bind 127.0.0.1 2>&1 | tee logs/site-serve.log
    ;;
  *) echo 'Unknown action' >&2; exit 2 ;;
esac
