#!/bin/bash
# 원격 서버에서 실행되는 Docker 배포 스크립트
# 위치: ~/git/AiEdu/deploy.sh

cd "$(dirname "$0")"

echo "🐳 [$(date '+%H:%M:%S')] Docker 빌드 시작..."

# docker 실행 방법 자동 감지
run_docker() {
  if docker compose version &>/dev/null 2>&1; then
    # work가 docker 그룹이면 직접 실행
    docker compose up -d --build --quiet-pull "$@"
  elif command -v sg &>/dev/null 2>&1; then
    # sg로 그룹 전환
    sg docker -c "docker compose up -d --build --quiet-pull $*"
  else
    # sudo 폴백
    sudo docker compose up -d --build --quiet-pull "$@"
  fi
}

run_docker

if [ $? -eq 0 ]; then
  echo "✅ 컨테이너 실행 중:"
  docker ps --filter "name=aiedu" --format "  {{.Names}}  {{.Status}}  {{.Ports}}" 2>/dev/null \
    || sudo docker ps --filter "name=aiedu" --format "  {{.Names}}  {{.Status}}  {{.Ports}}"
else
  echo "❌ Docker 빌드 실패"
  echo ""
  echo "해결 방법 (원격 서버에서 1회 실행):"
  echo "  sudo usermod -aG docker work"
  echo "  newgrp docker"
  echo "  또는: bash ~/git/AiEdu/remote-setup.sh"
  exit 1
fi
