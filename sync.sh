#!/bin/bash
# AiEdu 동기화 + 원격 Docker 재배포 스크립트
# 로컬: /home/work/Developer/AiEdu
# 원격1: 192.168.10.14:/home/work/git/AiEdu  (포트 3012, 내부망)
# 원격2: docs.yi.or.kr:10022 /home/work/git/AiEdu  (포트 3012, 외부)

LOCAL_PATH="$(cd "$(dirname "$0")" && pwd)"

# 동기화할 서버 목록 (호스트별칭 배열)
# - 192.168.10.14: ~/.ssh/config 직접 사용
# - aiedu-remote:  ~/.ssh/config의 aiedu-remote (docs.yi.or.kr:10022)
TARGETS=("192.168.10.14" "aiedu-remote")
LABELS=("192.168.10.14 (내부망)" "docs.yi.or.kr:10022 (외부)")

sync_to() {
  local host="$1"
  local label="$2"
  local path="/home/work/git/AiEdu"

  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "📡 대상: $label"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

  # 접속 가능 여부 확인
  if ! ssh -o ConnectTimeout=5 "$host" "true" 2>/dev/null; then
    echo "⚠️  접속 불가 ($label) — 건너뜀"
    return 1
  fi

  # 파일 동기화
  echo "📂 파일 동기화 중..."
  rsync -az \
    --exclude 'node_modules' \
    --exclude '.git' \
    --exclude 'dist' \
    --exclude '.vite' \
    --exclude '*.log' \
    --delete \
    "$LOCAL_PATH/" \
    "$host:$path/"

  if [ $? -ne 0 ]; then
    echo "❌ 동기화 실패 ($label)"
    return 1
  fi
  echo "✅ 동기화 완료"

  # Docker 재빌드
  echo "🐳 Docker 빌드 및 재시작 중..."
  ssh "$host" "cd $path && bash deploy.sh"

  if [ $? -eq 0 ]; then
    echo "✅ 배포 완료 → http://${host}:3012"
  else
    echo "⚠️  Docker 배포 실패 (docker 그룹 권한 필요: sudo usermod -aG docker work)"
  fi
}

echo "======================================"
echo " AiEdu 멀티 서버 동기화 + 배포"
echo " 로컬: $LOCAL_PATH"
echo "======================================"

# 인수로 특정 서버만 지정 가능: bash sync.sh local / bash sync.sh remote
if [ "$1" = "local" ]; then
  sync_to "${TARGETS[0]}" "${LABELS[0]}"
elif [ "$1" = "remote" ]; then
  sync_to "${TARGETS[1]}" "${LABELS[1]}"
else
  # 기본: 두 서버 모두
  for i in "${!TARGETS[@]}"; do
    sync_to "${TARGETS[$i]}" "${LABELS[$i]}"
  done
fi

echo ""
echo "======================================"
echo " 완료"
echo "======================================"
