#!/bin/bash
# AiEdu 파일 변경 감지 → 자동 동기화 + Docker 재배포
# inotifywait 필요: sudo apt install inotify-tools

LOCAL_PATH="$(cd "$(dirname "$0")" && pwd)"
DEBOUNCE=3
LAST_DEPLOY=0

# 기본 대상: 두 서버 모두. 인수로 선택 가능
TARGET="${1:-all}"   # all | local | remote

echo "======================================"
echo " AiEdu 자동 동기화 + Docker 배포 (watch)"
echo " 대상: $TARGET"
echo " 종료: Ctrl+C"
echo "======================================"

if ! command -v inotifywait &>/dev/null; then
  echo "❌ inotifywait 없음 → sudo apt install inotify-tools"
  exit 1
fi

deploy_all() {
  local NOW=$(date +%s)
  if (( NOW - LAST_DEPLOY < DEBOUNCE )); then return; fi
  LAST_DEPLOY=$NOW

  echo ""
  echo "🔄 [$(date '+%H:%M:%S')] 변경 감지 → 배포 시작"
  bash "$(dirname "$0")/sync.sh" "$TARGET" 2>&1 | grep -E "✅|❌|⚠️|📂|🐳"
  echo "  ✅ [$(date '+%H:%M:%S')] 완료"
}

# 최초 1회 배포
echo "🚀 최초 배포..."
bash "$(dirname "$0")/sync.sh" "$TARGET" 2>&1 | grep -E "✅|❌|⚠️|📡"
LAST_DEPLOY=$(date +%s)
echo ""
echo "👁  파일 변경 감지 시작... (src/ 디렉토리)"

while true; do
  inotifywait -r -e modify,create,delete,move \
    --exclude '(node_modules|\.git|dist|\.vite)' \
    "$LOCAL_PATH/src" \
    --format '%w%f' -q 2>/dev/null
  deploy_all
done
