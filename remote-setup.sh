#!/bin/bash
# 원격 서버 최초 1회 실행 스크립트
# 실행: ssh aiedu-remote "bash /home/work/git/AiEdu/remote-setup.sh"
# 또는 원격 서버에 직접 접속 후 bash ~/git/AiEdu/remote-setup.sh

echo "======================================"
echo " AiEdu 원격 서버 초기 설정"
echo "======================================"

# 1. docker 그룹에 work 추가 (sudo 필요)
echo ""
echo "① docker 그룹 설정..."
if groups | grep -q docker; then
  echo "  ✅ 이미 docker 그룹 멤버"
else
  sudo usermod -aG docker work
  echo "  ✅ docker 그룹 추가 완료 (재로그인 또는 newgrp docker 필요)"
fi

# 2. sudo 없이 docker 실행 가능하도록 NOPASSWD 설정
echo ""
echo "② docker NOPASSWD sudo 설정..."
SUDOERS_FILE="/etc/sudoers.d/aiedu-docker"
if [ -f "$SUDOERS_FILE" ]; then
  echo "  ✅ 이미 설정됨"
else
  echo "work ALL=(root) NOPASSWD: /usr/bin/docker, /usr/bin/docker compose, /usr/local/bin/docker, /usr/local/bin/docker-compose" \
    | sudo tee "$SUDOERS_FILE" > /dev/null
  sudo chmod 440 "$SUDOERS_FILE"
  echo "  ✅ NOPASSWD 설정 완료"
fi

# 3. nvm + node 20 설정
echo ""
echo "③ Node.js 20 설정..."
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
if command -v node &>/dev/null && [[ $(node -v) == v2* ]]; then
  echo "  ✅ Node $(node -v) 준비됨"
else
  nvm install 20 --silent && nvm use 20 --silent
  echo "  ✅ Node $(node -v) 설치 완료"
fi

# 4. npm install
echo ""
echo "④ npm install..."
cd ~/git/AiEdu
source ~/.nvm/nvm.sh && nvm use 20 --silent
npm install --silent && echo "  ✅ 완료"

# 5. 첫 Docker 빌드
echo ""
echo "⑤ Docker 첫 빌드..."
# 그룹 적용 (로그아웃 없이)
sg docker -c "cd ~/git/AiEdu && docker compose up -d --build" 2>/dev/null \
  || sudo docker compose up -d --build 2>/dev/null \
  || echo "  ⚠️  Docker 빌드 실패 — 재로그인 후 bash deploy.sh 실행"

echo ""
echo "======================================"
echo " 설정 완료!"
echo " 이후: bash ~/git/AiEdu/deploy.sh"
echo "======================================"
