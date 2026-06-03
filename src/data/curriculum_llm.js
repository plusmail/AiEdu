// LLM 원리부터 에이전트까지 — 18장 심화 커리큘럼
export const llmModules = [

  // ═══════════════════════════════════
  // PART 1 — LLM 원리와 텍스트 데이터 준비
  // ═══════════════════════════════════

  {
    id: 'llm1', partId: 1,
    title: "CH 01 — 대규모 언어 모델과 다음 단어 예측",
    description: "LLM이 텍스트를 인식하고 다음 단어를 예측하는 근본 원리를 이해합니다.",
    icon: "🧠", color: "blue", estimatedTime: "50분",
    difficulty: 2,
    lessons: [
      {
        id: "llm1-1", title: "1-1 LLM의 작동 원리: 다음 단어 예측",
        duration: "25분", difficulty: 2,
        diagramType: "llm-token",
        content: `
<h2>LLM은 "다음 단어 예측" 기계다</h2>
<p>GPT, Claude, Llama 등 모든 LLM의 핵심은 단 하나입니다. <strong>"주어진 텍스트 다음에 올 단어의 확률 분포를 예측하는 것"</strong>입니다.</p>

<div class="highlight-box">
<strong>입력:</strong> "The quick brown fox"
<strong>출력:</strong>
  jumps: 42%
  ran:   18%
  slept: 11%
  ...

모델은 가장 높은 확률(또는 샘플링)의 단어를 선택 → 반복
</div>

<h3>수백억 파라미터의 의미</h3>
<div class="example-box">
파라미터(Parameter) = 모델의 가중치(Weight)
• GPT-2:   1.5억 개
• GPT-3:   1,750억 개
• LLaMA-3: 700억 개
• Claude:  비공개 (추정 수천억 개)

각 파라미터는 수백만 개 문장을 학습하며 조정된 숫자값
→ 방대한 파라미터 수 = 언어의 복잡한 패턴을 기억·표현
</div>

<h3>코퍼스(Corpus)의 필요성</h3>
<div class="highlight-box">
코퍼스 = 학습용 대규모 텍스트 데이터
• Common Crawl: 웹 페이지 수백 PB
• Wikipedia: 전 세계 언어 백과사전
• GitHub: 코드 수십 억 줄
• Books, 논문, 뉴스 ...

더 방대하고 다양한 코퍼스 → 더 뛰어난 언어 이해력
</div>`,
        keyPoints: ["LLM = 다음 토큰 확률 분포 예측기", "수백억 파라미터가 언어 패턴을 수치로 저장", "방대한 코퍼스로 학습 → 광범위한 지식 획득"],
      },
      {
        id: "llm1-2", title: "1-2 언어 모델의 역사와 트랜스포머 혁명",
        duration: "20분", difficulty: 2,
        diagramType: "transformer-arch",
        content: `
<h2>언어 모델의 발전 역사</h2>
<div class="example-box">
1990년대: N-gram 모델 (통계 기반)
  → "the cat sat" 다음에 "on"이 x%

2013: Word2Vec — 단어 임베딩 탄생
  → "king - man + woman ≈ queen"

2017: Transformer ("Attention is All You Need")
  → RNN 없이 병렬 처리 + 장거리 의존성 해결

2018: BERT (양방향 인코더)
2019: GPT-2 (1.5B, 자기회귀 디코더)
2020: GPT-3 (175B, In-Context Learning)
2022: ChatGPT = GPT + RLHF
2023~: GPT-4, Claude, LLaMA, Gemini ...
</div>

<h3>트랜스포머가 RNN을 대체한 이유</h3>
<div class="highlight-box">
<strong>RNN의 한계:</strong>
• 순차 처리 → GPU 병렬화 불가
• 장기 의존성 소실 (gradient vanishing)

<strong>트랜스포머의 해결:</strong>
• 어텐션으로 모든 위치를 동시에 참조
• 완전 병렬 처리 → GPU 활용 극대화
• 위치 인코딩으로 순서 정보 유지
</div>`,
        keyPoints: ["2017년 트랜스포머 논문이 LLM 혁명의 시작", "Attention 메커니즘으로 장거리 의존성 해결", "병렬 처리 가능으로 대규모 학습이 현실화"],
      },
    ],
    quizId: "quiz-llm01",
  },

  {
    id: 'llm2', partId: 1,
    title: "CH 02 — 텍스트 토큰화와 BPE",
    description: "텍스트를 토큰으로 분해하는 과정과 한국어 토큰화의 특성을 이해합니다.",
    icon: "✂️", color: "purple", estimatedTime: "45분",
    difficulty: 2,
    lessons: [
      {
        id: "llm2-1", title: "2-1 토큰화와 BPE 알고리즘",
        duration: "25분", difficulty: 2,
        diagramType: "bpe-tokenization",
        content: `
<h2>왜 토큰화가 필요한가?</h2>
<p>신경망은 숫자만 처리합니다. 텍스트를 숫자로 변환하는 과정이 <strong>토큰화(Tokenization)</strong>입니다.</p>

<div class="highlight-box">
<strong>토큰화 흐름:</strong>
텍스트 → 토큰 → 정수 ID → 임베딩 벡터

"Hello world"
→ ["Hello", " world"]
→ [15496, 995]
→ [[0.82, -0.31, ...], [0.54, 0.12, ...]]
</div>

<h3>바이트 페어 인코딩 (BPE)</h3>
<div class="example-box">
GPT 계열(tiktoken)이 사용하는 서브워드 방식:

1. 모든 문자를 개별 토큰으로 시작
2. 가장 자주 등장하는 인접 쌍을 병합
3. 어휘 크기(예: 50,257)에 도달할 때까지 반복

결과: 영어 단어는 보통 1~2 토큰
      희귀 단어, 외래어는 더 많은 토큰
</div>

<h3>tiktoken으로 직접 확인</h3>
<pre class="bg-gray-900 text-green-300 text-xs rounded-xl p-3 font-mono">
import tiktoken
enc = tiktoken.get_encoding("cl100k_base")

# GPT-4가 사용하는 토크나이저
tokens = enc.encode("Understanding transformers")
print(tokens)       # [16051, 278, 1007, 515, 388]
print(len(tokens))  # 5개 토큰
</pre>`,
        keyPoints: ["BPE = 빈도 높은 문자 쌍을 반복 병합해 어휘 사전 구축", "서브워드 방식으로 미등록 단어도 처리 가능", "tiktoken으로 GPT 토크나이저 직접 사용 가능"],
      },
      {
        id: "llm2-2", title: "2-2 한국어 토큰화의 한계",
        duration: "20분", difficulty: 2,
        diagramType: "korean-token",
        content: `
<h2>한국어는 왜 토큰을 더 많이 소비하나?</h2>
<div class="highlight-box">
<strong>영어:</strong> "cat" → 1 토큰
<strong>한국어:</strong> "고양이" → 3~4 토큰 (ê³ , ìì, ì´, ...)

이유: GPT 토크나이저는 영어 중심으로 학습
→ 한글 자모가 개별 토큰으로 분해
→ 영어의 1.5~2배 토큰 소비
</div>

<h3>실용적 영향</h3>
<div class="example-box">
같은 4K 컨텍스트 윈도우에서:
• 영어: ~3,000 단어 담기 가능
• 한국어: ~1,700 단어만 가능

API 비용도 1.5~2배 차이
→ 한국어 전용 토크나이저 필요 (HyperCLOVA-X 등)
</div>

<h3>해결 방향</h3>
<div class="example-box">
• 한국어 전용 BPE 어휘 사전 구축
• 공동 학습 (Joint Training)으로 균형 잡기
• HyperCLOVA, EXAONE 등 한국어 특화 모델
</div>`,
        keyPoints: ["한국어는 영어 대비 1.5~2배 토큰 소비", "같은 컨텍스트에서 더 적은 내용, 더 높은 비용", "한국어 특화 토크나이저로 해결 가능"],
      },
    ],
    quizId: "quiz-llm02",
  },

  {
    id: 'llm3', partId: 1,
    title: "CH 03 — PyTorch 데이터 로더 구성",
    description: "슬라이딩 윈도우로 LLM 훈련용 데이터셋을 구성하는 방법을 배웁니다.",
    icon: "🔄", color: "green", estimatedTime: "40분",
    difficulty: 3,
    lessons: [
      {
        id: "llm3-1", title: "3-1 슬라이딩 윈도우와 +1 Shift",
        duration: "25분", difficulty: 3,
        diagramType: "sliding-window",
        content: `
<h2>LLM 학습 데이터의 핵심: +1 Shift</h2>
<p>LLM은 <strong>"입력 시퀀스를 보고 다음 토큰을 예측"</strong>하도록 학습합니다. 이를 위해 같은 텍스트에서 입력과 정답을 한 칸 밀어서 생성합니다.</p>

<div class="highlight-box">
텍스트: [The, cat, sat, on, mat]

입력(X): [The, cat, sat, on]  (앞 4개)
정답(Y): [cat, sat, on, mat]  (뒤 4개, +1 shift)

모델은 "The"를 보고 "cat"을 예측
         "The, cat"을 보고 "sat"을 예측
         ... (자기회귀)
</div>

<h3>PyTorch Dataset 구현</h3>
<pre class="bg-gray-900 text-green-300 text-xs rounded-xl p-3 font-mono">
import torch
from torch.utils.data import Dataset, DataLoader

class LMDataset(Dataset):
    def __init__(self, tokens, seq_len):
        self.tokens = tokens
        self.seq_len = seq_len

    def __len__(self):
        return len(self.tokens) - self.seq_len

    def __getitem__(self, idx):
        x = self.tokens[idx : idx + self.seq_len]
        y = self.tokens[idx+1 : idx + self.seq_len + 1]
        return torch.tensor(x), torch.tensor(y)

# 슬라이딩 윈도우로 샘플 생성
dataset = LMDataset(token_ids, seq_len=128)
loader  = DataLoader(dataset, batch_size=32, shuffle=True)
</pre>`,
        keyPoints: ["입력과 정답을 1 토큰씩 밀어서(+1 shift) 페어 생성", "슬라이딩 윈도우로 텍스트 전체에서 효율적 샘플링", "배치(Batch) = 여러 시퀀스를 묶어 GPU 병렬 처리"],
      },
    ],
    quizId: "quiz-llm03",
  },

  {
    id: 'llm4', partId: 1,
    title: "CH 04 — 단어 임베딩과 위치 인코딩",
    description: "토큰을 의미 있는 벡터로 변환하고 위치 정보를 추가하는 방법을 학습합니다.",
    icon: "📐", color: "orange", estimatedTime: "45분",
    difficulty: 3,
    lessons: [
      {
        id: "llm4-1", title: "4-1 토큰 임베딩: 의미를 벡터로",
        duration: "25분", difficulty: 3,
        diagramType: "token-embedding",
        content: `
<h2>임베딩: 토큰 ID → 의미 벡터</h2>
<p>토큰 ID(정수)를 <strong>고차원 밀집 벡터</strong>로 변환합니다. 비슷한 의미의 단어는 벡터 공간에서 가깝게 위치합니다.</p>

<div class="highlight-box">
<strong>임베딩의 핵심 성질:</strong>
king   → [0.8, 0.2, -0.5, ...]
queen  → [0.7, 0.3, -0.4, ...]  ← 비슷!
apple  → [-0.1, 0.9, 0.2, ...]  ← 다름!

"king - man + woman ≈ queen"
→ 의미적 관계가 벡터 연산으로 표현됨
</div>

<h3>PyTorch 임베딩 레이어</h3>
<pre class="bg-gray-900 text-green-300 text-xs rounded-xl p-3 font-mono">
import torch.nn as nn

# vocab_size=50257, d_model=768 (GPT-2 small)
embedding = nn.Embedding(50257, 768)

token_ids = torch.tensor([15496, 995])  # "Hello world"
vectors = embedding(token_ids)
# shape: [2, 768] — 각 토큰 → 768차원 벡터
</pre>`,
        keyPoints: ["임베딩 = 토큰 ID → 의미 벡터 변환", "유사한 의미 = 벡터 공간에서 가까운 위치", "nn.Embedding = 학습 가능한 룩업 테이블"],
      },
      {
        id: "llm4-2", title: "4-2 위치 인코딩: 순서를 벡터에",
        duration: "20분", difficulty: 3,
        diagramType: "token-embedding",
        content: `
<h2>왜 위치 인코딩이 필요한가?</h2>
<p>트랜스포머의 어텐션은 위치 개념이 없습니다. "cat sat on mat"과 "mat on sat cat"을 구별 못합니다. 위치 인코딩으로 순서 정보를 추가합니다.</p>

<div class="highlight-box">
<strong>절대 위치 인코딩 (GPT 방식):</strong>
pos_embedding = nn.Embedding(max_len, d_model)

입력 = 토큰 임베딩 + 위치 임베딩
→ 같은 단어도 위치에 따라 다른 벡터

<strong>상대 위치 인코딩 (RoPE, ALiBi):</strong>
어텐션 스코어에 직접 위치 정보 주입
→ 학습 길이보다 긴 시퀀스도 처리 가능
</div>

<h3>사인파 위치 인코딩 (원논문)</h3>
<div class="example-box">
PE(pos, 2i)   = sin(pos / 10000^(2i/d_model))
PE(pos, 2i+1) = cos(pos / 10000^(2i/d_model))

• 각 차원마다 다른 주파수의 사인/코사인
• 위치 간 상대적 거리를 내적으로 표현 가능
</div>`,
        keyPoints: ["위치 인코딩 없으면 순서 정보 완전 소실", "절대 위치: nn.Embedding으로 학습 / 상대 위치: RoPE 등", "현대 모델은 RoPE 방식 사용 (LLaMA, Mistral 등)"],
      },
    ],
    quizId: "quiz-llm04",
  },

  // ═══════════════════════════════════
  // PART 2 — 트랜스포머 아키텍처 구현
  // ═══════════════════════════════════

  {
    id: 'llm5', partId: 2,
    title: "CH 05 — 어텐션 메커니즘",
    description: "셀프 어텐션부터 멀티 헤드 어텐션까지 트랜스포머의 핵심을 구현합니다.",
    icon: "👁️", color: "indigo", estimatedTime: "60분",
    difficulty: 4,
    lessons: [
      {
        id: "llm5-1", title: "5-1 셀프 어텐션과 인과적 마스킹",
        duration: "35분", difficulty: 4,
        diagramType: "self-attention",
        content: `
<h2>셀프 어텐션(Self-Attention)이란?</h2>
<p>입력 시퀀스의 모든 토큰이 <strong>서로 얼마나 관련 있는지</strong> 계산해 문맥을 이해합니다.</p>

<div class="highlight-box">
<strong>어텐션 공식:</strong>
Attention(Q, K, V) = softmax(QKᵀ / √d_k) × V

Q = 현재 토큰의 "질문" (Query)
K = 모든 토큰의 "색인" (Key)
V = 모든 토큰의 "정보" (Value)
</div>

<h3>인과적 마스킹 (Causal Masking)</h3>
<div class="example-box">
GPT 디코더는 미래를 볼 수 없음:
position 2가 보는 것: [token0, token1, token2, MASK, MASK]

훈련 시 답안 미리 보기 방지
→ 추론 시에도 자연스럽게 왼쪽→오른쪽 생성
</div>

<pre class="bg-gray-900 text-green-300 text-xs rounded-xl p-3 font-mono">
import torch
import torch.nn.functional as F

def causal_attention(Q, K, V):
    d_k = Q.size(-1)
    scores = Q @ K.transpose(-2, -1) / d_k**0.5  # [T,T]

    # 상삼각 마스크 (미래 차단)
    mask = torch.triu(torch.ones(T, T), diagonal=1).bool()
    scores = scores.masked_fill(mask, float('-inf'))

    attn = F.softmax(scores, dim=-1)
    return attn @ V
</pre>`,
        keyPoints: ["Q·K 내적으로 관련성 점수 → Softmax → V 가중 합산", "인과적 마스킹으로 미래 토큰 차단 (GPT 필수)", "√d_k로 나누는 이유: 차원이 커질수록 내적값 폭발 방지"],
      },
      {
        id: "llm5-2", title: "5-2 멀티 헤드 어텐션",
        duration: "25분", difficulty: 4,
        diagramType: "transformer-arch",
        content: `
<h2>왜 헤드가 여러 개인가?</h2>
<p>하나의 어텐션은 한 관점만 봅니다. 멀티 헤드는 <strong>다양한 관점으로 동시에 분석</strong>합니다.</p>

<div class="highlight-box">
헤드 1: 문법적 관계 (주어-동사)
헤드 2: 대명사 해소 (it → cat)
헤드 3: 위치 관계 (앞에 오는 단어)
헤드 4~N: 기타 의미 패턴

→ 각 헤드가 d_model/num_heads 차원 공간에서 학습
→ 결과를 concat → 선형 변환
</div>

<pre class="bg-gray-900 text-green-300 text-xs rounded-xl p-3 font-mono">
class MultiHeadAttention(nn.Module):
    def __init__(self, d_model, num_heads):
        super().__init__()
        self.h = num_heads
        self.d_k = d_model // num_heads
        self.W_q = nn.Linear(d_model, d_model)
        self.W_k = nn.Linear(d_model, d_model)
        self.W_v = nn.Linear(d_model, d_model)
        self.W_o = nn.Linear(d_model, d_model)

    def forward(self, x):
        B, T, C = x.shape
        Q = self.W_q(x).view(B, T, self.h, self.d_k).transpose(1,2)
        K = self.W_k(x).view(B, T, self.h, self.d_k).transpose(1,2)
        V = self.W_v(x).view(B, T, self.h, self.d_k).transpose(1,2)
        out = causal_attention(Q, K, V)  # [B,h,T,d_k]
        out = out.transpose(1,2).contiguous().view(B, T, C)
        return self.W_o(out)
</pre>`,
        keyPoints: ["헤드 수만큼 다양한 패턴을 병렬로 학습", "각 헤드는 d_model/h 차원의 독립 어텐션 수행", "결과를 concat 후 W_o로 최종 변환"],
      },
    ],
    quizId: "quiz-llm05",
  },

  {
    id: 'llm6', partId: 2,
    title: "CH 06 — 트랜스포머 블록 조립",
    description: "층 정규화, 피드포워드 네트워크를 결합해 GPT 형태의 모델을 완성합니다.",
    icon: "🏗️", color: "cyan", estimatedTime: "50분",
    difficulty: 4,
    lessons: [
      {
        id: "llm6-1", title: "6-1 층 정규화와 잔차 연결",
        duration: "25분", difficulty: 4,
        diagramType: "transformer-arch",
        content: `
<h2>층 정규화 (Layer Normalization)</h2>
<p>각 층의 활성화값을 정규화해 학습을 안정시킵니다. <strong>배치 정규화와 달리</strong> 시퀀스 방향이 아닌 특성 방향으로 정규화합니다.</p>

<div class="highlight-box">
LayerNorm(x) = γ × (x - μ) / (σ + ε) + β
• μ, σ: 특성 차원에서의 평균, 표준편차
• γ, β: 학습 가능한 스케일·편향
• Pre-LN (GPT): Attn 앞에 적용 → 더 안정적 학습
</div>

<h3>잔차 연결 (Residual/Shortcut)</h3>
<div class="example-box">
출력 = x + Sublayer(LayerNorm(x))

왜 필요한가?
• 깊은 네트워크에서 Gradient Vanishing 방지
• 학습 초기에 원본 신호 그대로 통과
• 100층 이상 트랜스포머 학습 가능

GPT-3: 96층 × (Attention + FFN) = 192개 잔차 연결
</div>`,
        keyPoints: ["Pre-LN: 어텐션 전 층 정규화로 안정적 학습", "잔차 연결: 입력을 바이패스해 그래디언트 소실 방지", "두 기법 조합으로 수백 층 깊이도 학습 가능"],
      },
      {
        id: "llm6-2", title: "6-2 피드포워드 네트워크와 GPT 완성",
        duration: "25분", difficulty: 4,
        diagramType: "transformer-arch",
        content: `
<h2>피드포워드 네트워크 (FFN)</h2>
<p>어텐션이 "어디를 볼지" 결정한다면, FFN은 "무엇을 저장할지" 결정합니다. <strong>사실 지식의 주요 저장소</strong>입니다.</p>

<div class="highlight-box">
FFN(x) = GELU(x × W₁ + b₁) × W₂ + b₂

• 내부 차원은 d_model의 4배 (GPT: 768→3072→768)
• GELU: ReLU보다 부드러운 활성화 함수
  GELU(x) ≈ x × σ(1.702x) — 음수도 일부 통과
</div>

<h3>GPT 최종 구조</h3>
<div class="example-box">
Input → TokenEmb + PosEmb
→ [×N] TransformerBlock:
    LayerNorm → MultiHeadAttn → Residual
    LayerNorm → FFN → Residual
→ Final LayerNorm
→ Linear(d_model → vocab_size) + Softmax
→ 다음 토큰 확률 분포
</div>

<pre class="bg-gray-900 text-green-300 text-xs rounded-xl p-3 font-mono">
class GPT(nn.Module):
    def forward(self, idx):
        tok_emb = self.token_emb(idx)
        pos_emb = self.pos_emb(positions)
        x = tok_emb + pos_emb
        for block in self.blocks:    # N번 반복
            x = block(x)
        x = self.ln_f(x)
        logits = self.lm_head(x)     # → vocab_size
        return logits
</pre>`,
        keyPoints: ["FFN = 트랜스포머의 사실 지식 저장소", "GELU 활성화로 음수 정보도 일부 보존", "Token/Pos 임베딩 → N×TransformerBlock → LM Head"],
      },
    ],
    quizId: "quiz-llm06",
  },

  // ═══════════════════════════════════
  // PART 3 — 사전 학습과 응답 제어
  // ═══════════════════════════════════

  {
    id: 'llm7', partId: 3,
    title: "CH 07 — LLM 사전 학습 훈련 루프",
    description: "역전파와 손실 함수로 모델에 지식을 주입하는 사전 학습 과정을 실습합니다.",
    icon: "🔥", color: "red", estimatedTime: "55분",
    difficulty: 4,
    lessons: [
      {
        id: "llm7-1", title: "7-1 손실 함수와 역전파",
        duration: "30분", difficulty: 4,
        diagramType: "neural-network",
        content: `
<h2>Cross-Entropy Loss: 예측이 얼마나 틀렸나</h2>
<div class="highlight-box">
모델 예측: [the: 0.35, a: 0.22, some: 0.15, ...]
정답 토큰: "the" (one-hot: [1, 0, 0, ...])

Loss = -log(0.35) = 1.05  ← 낮을수록 좋음

퍼플렉서티(PPL) = exp(Loss)
• GPT-3 수준: ~20 (낮을수록 언어 이해력 ↑)
</div>

<h3>역전파(Backpropagation)</h3>
<div class="example-box">
Forward:  입력 → 예측 → Loss 계산
Backward: Loss → ∂Loss/∂W 계산 → 가중치 업데이트

Adam 옵티마이저:
W = W - lr × m̂ / (√v̂ + ε)
• m̂: 1차 모멘텀 (방향)
• v̂: 2차 모멘텀 (크기 조절)
→ 각 파라미터마다 개별 학습률 적용
</div>

<pre class="bg-gray-900 text-green-300 text-xs rounded-xl p-3 font-mono">
optimizer = torch.optim.AdamW(model.parameters(), lr=3e-4)

for batch_x, batch_y in loader:
    logits = model(batch_x)           # Forward
    loss = F.cross_entropy(
        logits.view(-1, vocab_size),
        batch_y.view(-1)
    )
    optimizer.zero_grad()
    loss.backward()                    # Backward
    torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0)
    optimizer.step()                   # 가중치 업데이트
</pre>`,
        keyPoints: ["Cross-Entropy Loss = 정답 토큰 확률의 -log", "역전파로 손실 기울기를 모든 파라미터에 전파", "AdamW = Adam + Weight Decay (L2 정규화)"],
      },
      {
        id: "llm7-2", title: "7-2 Softmax와 Logit 이해",
        duration: "20분", difficulty: 3,
        diagramType: "sigmoid",
        content: `
<h2>Logit → Softmax → 확률 분포</h2>
<p>모델의 마지막 레이어는 <strong>logit</strong>(원시 점수)을 출력합니다. Softmax가 이를 확률로 변환합니다.</p>

<div class="highlight-box">
Logit:    [2.1, 0.3, -1.2, 0.8, ...]  (vocab_size개)
Softmax:  exp(xᵢ) / Σexp(xⱼ)

결과:
  "the":  0.35  (35% 확률)
  "a":    0.22  (22% 확률)
  "some": 0.08  ...

가장 높은 확률 토큰 선택 = Greedy Decoding
</div>

<h3>학습 중 softmax vs 추론 중 softmax</h3>
<div class="example-box">
학습: softmax + cross-entropy (수치 안정성 위해 결합)
추론: softmax + temperature 조절

Temperature=0.1: 확률이 가장 높은 토큰에 집중
Temperature=2.0: 낮은 확률 토큰도 선택 가능 → 다양성
</div>`,
        keyPoints: ["Logit = 모델 원시 출력, Softmax로 확률 변환", "Cross-Entropy = -log(정답 확률), 낮을수록 좋음", "Perplexity = exp(loss), 언어 모델 성능 표준 지표"],
      },
    ],
    quizId: "quiz-llm07",
  },

  {
    id: 'llm8', partId: 3,
    title: "CH 08 — 텍스트 생성과 디코딩 전략",
    description: "Temperature, Top-K, Top-P 샘플링으로 생성 품질과 창의성을 제어합니다.",
    icon: "🎲", color: "orange", estimatedTime: "45분",
    difficulty: 3,
    lessons: [
      {
        id: "llm8-1", title: "8-1 Temperature와 Top-K/Top-P 샘플링",
        duration: "30분", difficulty: 3,
        diagramType: "decoding-strategies",
        content: `
<h2>왜 항상 가장 높은 확률 단어를 선택하면 안될까?</h2>
<div class="highlight-box">
Greedy Decoding (항상 최고 확률 선택):
• 반복적이고 단조로운 텍스트 생성
• "The cat sat on the mat. The cat sat on the mat. ..."

해결: 확률적 샘플링 + 조절 파라미터
</div>

<h3>Temperature</h3>
<div class="example-box">
logit / Temperature → softmax

T=0: Greedy (항상 최고 확률)
T=1: 원래 분포 그대로
T=2: 균등에 가까워짐 (더 다양)

코드: p_adjusted = softmax(logit / temperature)
</div>

<h3>Top-K vs Top-P (Nucleus)</h3>
<div class="example-box">
Top-K: 상위 K개만 선택 풀에 포함
  K=5: 5개 단어 중 샘플링 (항상 고정 크기)

Top-P: 누적 확률 p까지의 단어만 포함
  P=0.9: 확률 합이 90% 될 때까지 포함
  → 상황에 따라 후보 수 동적 변화 (더 자연스러움)

실전: temperature=0.7 + top_p=0.9 조합 권장
</div>`,
        keyPoints: ["Temperature: 낮으면 결정론적, 높으면 창의적", "Top-K: 고정 개수 / Top-P: 동적 개수 (더 권장)", "실전: T=0.7 + Top-P=0.9 조합이 일반적으로 최적"],
      },
    ],
    quizId: "quiz-llm08",
  },

  // ═══════════════════════════════════
  // PART 4 — 미세 조정과 얼라인먼트
  // ═══════════════════════════════════

  {
    id: 'llm9', partId: 4,
    title: "CH 09 — 지도 미세 조정(SFT)과 지시 튜닝",
    description: "특정 태스크에 맞게 모델을 미세 조정하고 분류 헤드를 추가하는 방법을 배웁니다.",
    icon: "🎓", color: "green", estimatedTime: "50분",
    difficulty: 4,
    lessons: [
      {
        id: "llm9-1", title: "9-1 SFT: 태스크 맞춤 미세 조정",
        duration: "30분", difficulty: 4,
        diagramType: "ml-pipeline",
        content: `
<h2>사전 학습 모델을 원하는 태스크에 맞추기</h2>
<p>사전 학습된 LLM은 텍스트 생성 전문가입니다. SFT(Supervised Fine-Tuning)로 <strong>요약, 번역, Q&A 등 특정 태스크</strong>에 최적화합니다.</p>

<div class="highlight-box">
<strong>Instruction Tuning 데이터 형식:</strong>
{
  "instruction": "다음 텍스트를 한 문장으로 요약하세요.",
  "input": "기후 변화는 지구 온난화로 인해...",
  "output": "기후 변화는 전 지구적 위협입니다."
}

→ 이런 쌍 수만~수십만 개로 미세 조정
</div>

<h3>LoRA: 효율적 미세 조정</h3>
<div class="example-box">
전체 파라미터 업데이트 vs LoRA:

기존: 전체 W (d×d = 수십억 파라미터) 업데이트
LoRA: W = W₀ + ΔW = W₀ + A×B
  A: d×r (r=4~64, 매우 작음)
  B: r×d
→ 학습 파라미터 99% 감소
→ 원본 가중치 유지 → 원래 능력 보존

실용 도구: Hugging Face PEFT 라이브러리
</div>`,
        keyPoints: ["SFT = (지시, 정답) 쌍 데이터로 미세 조정", "LoRA = 행렬 분해로 파라미터 1% 학습 → 99% 비용 절감", "Instruction Tuning = ChatGPT 같은 대화 능력의 핵심"],
      },
      {
        id: "llm9-2", title: "9-2 분류 헤드와 태스크별 적용",
        duration: "20분", difficulty: 3,
        diagramType: "decision-tree",
        content: `
<h2>텍스트 분류: LLM + 분류 헤드</h2>
<div class="highlight-box">
기본 LLM: 토큰 → 다음 토큰 예측 (language model head)
분류 모델: [CLS] 토큰 → 클래스 확률 (classification head)

Linear(d_model → num_classes) 레이어 추가
→ 감성 분석, 스팸 분류, 의도 분류 등
</div>

<h3>주요 NLP 태스크별 접근법</h3>
<div class="example-box">
요약:        Seq2Seq Fine-tuning (BART, T5)
번역:        동일한 Seq2Seq 구조
감성 분석:   BERT + CLS 토큰 분류
질의응답:    Start/End 위치 예측 (BERT)
생성형 Q&A:  Instruction Tuned GPT 계열
코드 생성:   Code 코퍼스로 SFT (CodeLLaMA)
</div>`,
        keyPoints: ["분류 헤드 = nn.Linear(d_model, num_classes) 추가", "BERT 계열: 이해 태스크 / GPT 계열: 생성 태스크", "LoRA로 7B 모델도 단일 GPU에서 미세 조정 가능"],
      },
    ],
    quizId: "quiz-llm09",
  },

  {
    id: 'llm10', partId: 4,
    title: "CH 10 — 인간 피드백 기반 강화 학습(RLHF)",
    description: "인간 선호도를 학습해 환각을 줄이고 유용한 AI를 만드는 RLHF 파이프라인을 이해합니다.",
    icon: "🏆", color: "yellow", estimatedTime: "50분",
    difficulty: 5,
    lessons: [
      {
        id: "llm10-1", title: "10-1 RLHF 파이프라인: SFT → RM → PPO",
        duration: "35분", difficulty: 5,
        diagramType: "rlhf",
        content: `
<h2>왜 SFT만으로는 부족한가?</h2>
<div class="highlight-box">
SFT 문제점:
• 사람이 작성한 "좋은 답변" 데이터 구하기 어려움
• 유해 콘텐츠 차단 불완전
• 할루시네이션 여전히 발생

RLHF 해결책:
• "어느 답변이 더 좋나?" 비교만 수집 (쉬움)
• 보상 모델로 품질 자동 평가
• PPO 강화학습으로 지속 최적화
</div>

<h3>3단계 파이프라인</h3>
<div class="example-box">
<strong>Step 1 SFT:</strong>
(질문, 좋은 답변) 쌍으로 초기 미세 조정

<strong>Step 2 Reward Model:</strong>
같은 질문에 여러 답변 → 인간 순위 매기기
Bradley-Terry 모델로 보상 점수 학습

<strong>Step 3 PPO (Proximal Policy Optimization):</strong>
보상 모델 피드백으로 LLM 파라미터 업데이트
KL Divergence 제약 → 너무 변하지 않게 안정화
</div>`,
        keyPoints: ["RLHF = SFT → 보상 모델 → PPO 강화학습 3단계", "비교 데이터 수집이 핵심 (절대 평가보다 쉬움)", "ChatGPT, Claude, Gemini 모두 RLHF 계열 사용"],
      },
    ],
    quizId: "quiz-llm10",
  },

  // ═══════════════════════════════════
  // PART 5 — RAG와 지식 저장소 구축
  // ═══════════════════════════════════

  {
    id: 'llm11', partId: 5,
    title: "CH 11 — 검색 증강 생성(RAG)의 기본과 한계",
    description: "벡터 DB로 실시간 지식을 LLM에 주입하는 RAG 파이프라인을 구축합니다.",
    icon: "🔍", color: "blue", estimatedTime: "55분",
    difficulty: 4,
    lessons: [
      {
        id: "llm11-1", title: "11-1 RAG 파이프라인 구현",
        duration: "35분", difficulty: 4,
        diagramType: "rag-pipeline",
        content: `
<h2>RAG가 해결하는 문제</h2>
<div class="highlight-box">
LLM의 두 가지 치명적 한계:
① 정보 단절: 학습 컷오프 이후 정보 없음
② 환각: 모르는 정보를 지어냄

RAG 해결책:
쿼리 → 관련 문서 검색 → 컨텍스트 주입 → 답변 생성
→ 최신 정보 + 출처 근거 + 환각 감소
</div>

<h3>벡터 DB 활용</h3>
<pre class="bg-gray-900 text-green-300 text-xs rounded-xl p-3 font-mono">
from openai import OpenAI
import chromadb

# 1. 문서 청킹 + 임베딩 + 저장
client = chromadb.Client()
collection = client.create_collection("docs")
collection.add(
    documents=chunks,
    embeddings=embed_model.encode(chunks),
    ids=[f"chunk_{i}" for i in range(len(chunks))]
)

# 2. 검색
query_embedding = embed_model.encode([query])
results = collection.query(
    query_embeddings=query_embedding, n_results=3
)

# 3. 컨텍스트 주입
context = "\\n".join(results['documents'][0])
prompt = f"Context: {context}\\n\\nQ: {query}\\nA:"
</pre>`,
        keyPoints: ["청킹 → 임베딩 → 벡터 DB 저장 → 쿼리 검색 → 주입", "코사인 유사도로 의미적으로 유사한 청크 검색", "Chroma, Pinecone, Weaviate, pgvector 등 활용"],
      },
      {
        id: "llm11-2", title: "11-2 RAG의 구조적 한계",
        duration: "20분", difficulty: 4,
        diagramType: "rag-limits",
        content: `
<h2>RAG의 구조적 문제들</h2>
<div class="highlight-box">
<strong>청킹 문제:</strong>
문단 중간에서 잘리면 의미 단절
→ Semantic Chunking으로 개선

<strong>검색 실패:</strong>
"ML 모델 성능"으로 검색 vs "정확도 향상"으로 저장
→ 어휘 불일치 → HyDE (가상 답변 생성 후 검색)

<strong>컨텍스트 과부하:</strong>
관련성 낮은 청크 주입 → 오히려 성능 저하
→ Re-ranking 모델로 필터링

<strong>장기 메모리 부재:</strong>
대화 이력 전체 보관 불가
→ 요약 + 압축 전략 필요
</div>

<h3>GraphRAG: 다음 세대</h3>
<div class="example-box">
기존 RAG: 벡터 유사도만으로 검색
GraphRAG: 개체 간 관계 그래프 + 지식 커뮤니티
→ "A가 B에 영향을 주는 C는?"
  같은 다단계 추론 질문에 강함
</div>`,
        keyPoints: ["청킹·검색실패·컨텍스트 과부하가 주요 한계", "HyDE, Re-ranking, Hybrid Search로 개선 가능", "GraphRAG로 관계 기반 복잡한 질문 처리 가능"],
      },
    ],
    quizId: "quiz-llm11",
  },

  {
    id: 'llm12', partId: 5,
    title: "CH 12 — AI 시대의 운영 체제: LLM Wiki",
    description: "Obsidian과 연동해 AI가 지식 그래프를 구성·유지하는 LLM Wiki를 구현합니다.",
    icon: "🧩", color: "purple", estimatedTime: "50분",
    difficulty: 4,
    lessons: [
      {
        id: "llm12-1", title: "12-1 AI 지식 그래프 구축",
        duration: "30분", difficulty: 4,
        diagramType: "llm-wiki",
        content: `
<h2>단순 저장 vs 능동적 지식 연결</h2>
<div class="highlight-box">
<strong>기존 방식 (단순 RAG):</strong>
문서 → 청킹 → 임베딩 → 저장 → 검색

<strong>LLM Wiki (능동적 연결):</strong>
AI가 직접:
• 요약 (Summary)
• 인덱싱 (Index)
• 교차 참조 (Cross-Reference)
• 개념 연결 (Concept Linking)
→ 지식이 서로 연결된 그래프 형성
</div>

<h3>Obsidian + LLM 연동</h3>
<div class="example-box">
마크다운 파일 + [[Wiki Links]] → 지식 그래프
AI 역할:
① 새 문서 추가 → 요약 + 태그 자동 생성
② 기존 문서와 유사도 계산 → [[링크]] 자동 제안
③ 정기적으로 중복 문서 감지·병합
④ 질문 시: 관련 노드 클러스터 검색

→ 조직의 암묵지를 자산화
</div>`,
        keyPoints: ["LLM Wiki = AI가 능동적으로 유지하는 지식 그래프", "Obsidian [[Wiki Link]]로 개념 간 관계 표현", "단순 저장이 아닌 요약·인덱싱·교차참조로 지식 자산화"],
      },
    ],
    quizId: "quiz-llm12",
  },

  // ═══════════════════════════════════
  // PART 6 — AI 에이전트와 MCP
  // ═══════════════════════════════════

  {
    id: 'llm13', partId: 6,
    title: "CH 13 — AI 에이전트의 구조",
    description: "ReAct 루프로 스스로 생각하고 도구를 사용하는 자율 에이전트를 구현합니다.",
    icon: "🤖", color: "indigo", estimatedTime: "55분",
    difficulty: 4,
    lessons: [
      {
        id: "llm13-1", title: "13-1 ReAct 루프: 추론 → 행동 → 관찰",
        duration: "35분", difficulty: 4,
        diagramType: "react-agent",
        content: `
<h2>에이전트 = LLM + 도구 + 루프</h2>
<p>단순 챗봇과 달리 에이전트는 <strong>스스로 계획을 세우고 도구를 사용해 목표를 달성</strong>합니다.</p>

<div class="highlight-box">
<strong>ReAct (Reasoning + Acting):</strong>
Thought: "이 질문에 답하려면 웹 검색이 필요하다"
Action:  web_search("2024년 AI 반도체 시장 규모")
Observation: "글로벌 AI 반도체 시장은 2024년 xx억 달러..."
Thought: "데이터를 얻었다. 답변을 작성하자."
Answer:  "2024년 AI 반도체 시장은 ..."
</div>

<h3>에이전트 vs 단순 LLM</h3>
<div class="example-box">
단순 LLM:
• 학습 데이터 기반으로만 답변
• 실시간 정보 없음
• 한 번의 추론으로 끝

에이전트:
• 외부 도구로 실시간 정보 획득
• 결과를 보고 다음 행동 결정
• 목표 달성까지 자율 반복
</div>`,
        keyPoints: ["ReAct = Thought → Action → Observation 반복 루프", "외부 도구(웹검색, 계산기, DB)와 LLM 결합", "자율 루프로 복잡한 다단계 작업 처리 가능"],
      },
      {
        id: "llm13-2", title: "13-2 멀티 에이전트 아키텍처",
        duration: "20분", difficulty: 5,
        diagramType: "agent-team",
        content: `
<h2>역할 분담: 멀티 에이전트</h2>
<div class="highlight-box">
Planner: 전체 작업을 하위 작업으로 분해
Researcher: 웹, DB에서 정보 수집
Executor: 코드 실행, API 호출
Critic: 결과 품질 검토, 오류 수정

→ 각자 특화된 역할 → 복잡한 작업 가능
</div>

<h3>AutoGPT / CrewAI / LangGraph</h3>
<div class="example-box">
LangGraph:
• 에이전트 흐름을 그래프로 정의
• 조건부 분기, 루프, 병렬 실행
• 상태 공유 메커니즘

CrewAI:
• 역할(Role), 목표(Goal), 배경(Backstory)로 에이전트 정의
• 팀 협업 패턴 내장
</div>`,
        keyPoints: ["멀티 에이전트 = Planner·Researcher·Executor 역할 분담", "LangGraph로 에이전트 흐름을 DAG로 정의", "단일 에이전트보다 복잡한 장기 작업 처리에 유리"],
      },
    ],
    quizId: "quiz-llm13",
  },

  {
    id: 'llm14', partId: 6,
    title: "CH 14 — 함수 호출(Function Calling)과 도구 사용",
    description: "LLM이 외부 API와 도구를 직접 호출하는 Function Calling을 구현합니다.",
    icon: "🔧", color: "green", estimatedTime: "45분",
    difficulty: 4,
    lessons: [
      {
        id: "llm14-1", title: "14-1 Function Calling 구현",
        duration: "30분", difficulty: 4,
        diagramType: "function-calling",
        content: `
<h2>LLM이 API를 직접 호출한다</h2>
<div class="highlight-box">
기존: 사람이 API 호출 → 결과를 LLM에 전달
Function Calling: LLM이 직접 API 사양 이해 → 호출 결정
</div>

<pre class="bg-gray-900 text-green-300 text-xs rounded-xl p-3 font-mono">
tools = [{
    "type": "function",
    "function": {
        "name": "get_weather",
        "description": "특정 도시의 현재 날씨를 반환",
        "parameters": {
            "type": "object",
            "properties": {
                "city": {"type": "string", "description": "도시명"},
                "unit": {"type": "string", "enum": ["celsius", "fahrenheit"]}
            },
            "required": ["city"]
        }
    }
}]

response = client.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": "서울 날씨는?"}],
    tools=tools,
    tool_choice="auto"  # LLM이 알아서 도구 선택
)

# LLM이 도구 호출 결정 → 개발자가 실행 → 결과 다시 전달
</pre>`,
        keyPoints: ["LLM이 JSON 스키마로 함수 명세 이해 → 자율 호출", "tool_choice='auto': LLM이 직접 도구 필요성 판단", "웹 검색·계산기·DB·이메일 등 어떤 API든 연결 가능"],
      },
    ],
    quizId: "quiz-llm14",
  },

  {
    id: 'llm15', partId: 6,
    title: "CH 15 — AI 연결 표준 프로토콜: MCP",
    description: "다양한 외부 환경과 AI를 USB-C처럼 표준으로 연결하는 MCP를 실습합니다.",
    icon: "🔌", color: "cyan", estimatedTime: "40분",
    difficulty: 3,
    lessons: [
      {
        id: "llm15-1", title: "15-1 MCP 개념과 연동 실습",
        duration: "30분", difficulty: 3,
        diagramType: "mcp-integration",
        content: `
<h2>MCP: AI 연결의 새로운 표준</h2>
<div class="highlight-box">
기존 문제: 각 AI 도구마다 다른 API, 다른 인증, 다른 방식
MCP 해결: 표준 프로토콜로 어떤 AI든 어떤 도구든 연결

USB-C 비유:
• 노트북(AI) + USB-C 포트(MCP)
• 충전기(Google Drive), 모니터(Slack), SSD(Notion)
→ 어떤 기기도 같은 포트로 연결
</div>

<h3>MCP 서버 연동 예시</h3>
<pre class="bg-gray-900 text-green-300 text-xs rounded-xl p-3 font-mono">
# .mcp.json (Claude Code / 클라이언트 설정)
{
  "mcpServers": {
    "google-drive": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-gdrive"],
      "env": { "GDRIVE_TOKEN": "$GDRIVE_TOKEN" }
    },
    "notion": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-notion"],
      "env": { "NOTION_KEY": "$NOTION_KEY" }
    }
  }
}
</pre>

<div class="example-box">
MCP 서버 생태계:
• 공식: GitHub, PostgreSQL, Filesystem, Slack
• 커뮤니티: Notion, Jira, Figma, Stripe, Twilio
• 커스텀: 사내 시스템 → 직접 개발 가능
</div>`,
        keyPoints: ["MCP = AI와 외부 도구를 연결하는 USB-C 표준 프로토콜", "서버-클라이언트 구조로 AI와 도구 분리", "공식/커뮤니티 MCP 서버 → 즉시 연결 가능"],
      },
    ],
    quizId: "quiz-llm15",
  },

  // ═══════════════════════════════════
  // PART 7 — 경량화·멀티모달·월드 모델
  // ═══════════════════════════════════

  {
    id: 'llm16', partId: 7,
    title: "CH 16 — 경량화와 양자화(Quantization)",
    description: "32비트 모델을 4비트로 압축해 소비자 GPU에서 LLM을 구동하는 기술을 배웁니다.",
    icon: "⚡", color: "red", estimatedTime: "45분",
    difficulty: 4,
    lessons: [
      {
        id: "llm16-1", title: "16-1 양자화: 가중치 압축 기술",
        duration: "30분", difficulty: 4,
        diagramType: "quantization",
        content: `
<h2>왜 양자화가 필요한가?</h2>
<div class="highlight-box">
LLaMA-2 70B FP32: 약 280GB VRAM 필요
→ 일반 개발자가 사용 불가!

양자화 후:
INT8: 140GB → 고급 서버
INT4: 70GB  → A100 4장
NF4:  35GB  → RTX 4090 2장 (소비자 GPU!)
</div>

<h3>양자화 방법론</h3>
<div class="example-box">
GPTQ (Post-Training Quantization):
학습 완료 후 가중치를 4비트로 압축
→ Hessian 행렬로 오차 보정

bitsandbytes INT8/NF4:
Hugging Face 통합, 한 줄 코드로 적용

GGUF (llama.cpp):
CPU 추론에 최적화된 양자화 포맷
→ MacBook에서 7B 모델 구동 가능!
</div>

<pre class="bg-gray-900 text-green-300 text-xs rounded-xl p-3 font-mono">
from transformers import AutoModelForCausalLM, BitsAndBytesConfig

# 4-bit 양자화 설정
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_compute_dtype=torch.float16,
    bnb_4bit_use_double_quant=True,
    bnb_4bit_quant_type="nf4"  # Normal Float 4
)

# 단 이것만으로 4배 메모리 절감!
model = AutoModelForCausalLM.from_pretrained(
    "meta-llama/Llama-2-70b-hf",
    quantization_config=bnb_config,
    device_map="auto"
)
</pre>`,
        keyPoints: ["NF4 양자화로 70B 모델을 RTX 4090 2장에서 구동", "품질 손실 5% 이하로 대부분 작업에서 충분", "bitsandbytes, GPTQ, GGUF 3가지 주요 양자화 도구"],
      },
    ],
    quizId: "quiz-llm16",
  },

  {
    id: 'llm17', partId: 7,
    title: "CH 17 — 멀티모달(Multimodal) LLM",
    description: "CLIP 모델과 비전 인코더로 텍스트와 이미지를 함께 이해하는 모델을 구현합니다.",
    icon: "👁️", color: "purple", estimatedTime: "55분",
    difficulty: 5,
    lessons: [
      {
        id: "llm17-1", title: "17-1 CLIP과 대조 학습",
        duration: "30분", difficulty: 5,
        diagramType: "multimodal",
        content: `
<h2>CLIP: 이미지와 텍스트를 같은 공간으로</h2>
<div class="highlight-box">
<strong>대조 학습 (Contrastive Learning):</strong>
4억 개 (이미지, 텍스트) 쌍으로 학습
• 올바른 쌍: 유사도 ↑
• 잘못된 쌍: 유사도 ↓

결과: "a photo of cat" ↔ 고양이 사진이 같은 공간에!
→ Zero-shot 이미지 분류 가능
</div>

<h3>CLIP 아키텍처</h3>
<div class="example-box">
이미지 인코더: ViT (Vision Transformer)
  이미지 → 패치 분할 → 트랜스포머 → 이미지 임베딩

텍스트 인코더: 표준 Transformer
  텍스트 → 토큰화 → 트랜스포머 → 텍스트 임베딩

공유 벡터 공간에서 코사인 유사도 계산
</div>

<pre class="bg-gray-900 text-green-300 text-xs rounded-xl p-3 font-mono">
import clip
import torch

model, preprocess = clip.load("ViT-B/32")

image = preprocess(Image.open("cat.jpg")).unsqueeze(0)
texts = clip.tokenize(["a cat", "a dog", "a car"])

with torch.no_grad():
    image_feat = model.encode_image(image)
    text_feat  = model.encode_text(texts)

# 코사인 유사도
similarity = (image_feat @ text_feat.T).softmax(dim=-1)
print(similarity)  # [0.92, 0.06, 0.02] → "a cat" 선택!
</pre>`,
        keyPoints: ["CLIP = 4억 쌍 대조 학습으로 이미지-텍스트 공간 정렬", "ViT로 이미지를 패치 단위 토큰으로 처리", "Zero-shot 분류: 레이블 없이 텍스트 설명만으로 분류"],
      },
      {
        id: "llm17-2", title: "17-2 멀티모달 LLM: LLaVA, GPT-4V",
        duration: "25분", difficulty: 5,
        diagramType: "multimodal",
        content: `
<h2>비전 LLM 아키텍처</h2>
<div class="highlight-box">
핵심 문제: ViT 출력 공간 ≠ LLM 텍스트 공간
해결: Projection Layer (MLP)로 연결

LLaVA 구조:
이미지 → ViT → [패치 벡터들] → MLP → LLM 토큰 공간
텍스트 → 토크나이저 → 토큰 임베딩

→ 이미지 패치 + 텍스트 토큰을 함께 처리
</div>

<h3>학습 2단계</h3>
<div class="example-box">
<strong>Phase 1: 정렬 학습 (Alignment)</strong>
MLP만 학습, ViT와 LLM은 freeze
→ 비전 피처를 LLM 공간에 정렬

<strong>Phase 2: 지시 튜닝 (Instruction Tuning)</strong>
MLP + LLM 함께 미세 조정
→ (이미지, 질문, 답변) 쌍으로 학습

대표 모델:
• LLaVA-1.6: 오픈소스 멀티모달 LLM
• GPT-4V: OpenAI 시각 이해 모델
• Gemini: Google 멀티모달 통합
</div>`,
        keyPoints: ["Projection Layer가 비전-언어 공간 간극 연결", "Phase 1 정렬 → Phase 2 지시 튜닝 2단계 학습", "이미지 패치를 텍스트 토큰처럼 처리해 통합"],
      },
    ],
    quizId: "quiz-llm17",
  },

  {
    id: 'llm18', partId: 7,
    title: "CH 18 — 물리적 세계의 이해: 월드 모델",
    description: "비디오와 공간 데이터로 현실 세계 규칙을 시뮬레이션하는 차세대 AI를 탐구합니다.",
    icon: "🌍", color: "indigo", estimatedTime: "40분",
    difficulty: 5,
    lessons: [
      {
        id: "llm18-1", title: "18-1 월드 모델: 행동 결과 예측",
        duration: "30분", difficulty: 5,
        diagramType: "world-model",
        content: `
<h2>텍스트 패턴 인식을 넘어서</h2>
<div class="highlight-box">
<strong>현재 LLM의 한계:</strong>
• 텍스트의 통계적 패턴만 학습
• "공을 던지면 포물선을 그린다" 이해 못 함
• 물리 법칙, 인과관계, 공간 추론 부족

<strong>월드 모델의 목표:</strong>
비디오, 센서, 시뮬레이터 데이터로
현실 세계의 물리 법칙을 내재화
→ 행동 결과 예측 가능!
</div>

<h3>대표 사례</h3>
<div class="example-box">
Sora (OpenAI, 2024):
텍스트 → 물리적으로 일관된 비디오 생성
→ 물리 법칙을 어느 정도 내재화한 증거

Genie (Google DeepMind):
비디오에서 인터랙티브 환경 자동 생성
→ 플레이어 행동 → 결과 예측

V-JEPA (Meta):
비디오 예측으로 물리적 세계 표현 학습
→ 레이블 없이 자기 지도 학습
</div>

<h3>로보틱스와의 연결</h3>
<div class="example-box">
월드 모델 + 강화학습:
• 실제 로봇 없이 시뮬레이터에서 먼저 학습
• 현실 세계 물리 법칙 사전 습득
• 실제 로봇 전이 학습 비용 대폭 감소

Tesla FSD, Figure AI 등 활용
</div>`,
        keyPoints: ["월드 모델 = 텍스트 넘어 물리 세계 규칙 학습", "Sora·Genie·V-JEPA가 초기 구현 사례", "로보틱스 AI의 핵심 기술로 부상 중"],
      },
    ],
    quizId: "quiz-llm18",
  },
];

export const getLlmModuleById  = (id) => llmModules.find(m => m.id === id);
export const getLlmLessonById  = (lessonId) => {
  for (const module of llmModules) {
    const lesson = module.lessons.find(l => l.id === lessonId);
    if (lesson) return { lesson, module };
  }
  return null;
};

export const LLM_PART_LABELS = {
  1: 'PART 1 — LLM 원리와 텍스트 데이터 준비',
  2: 'PART 2 — 트랜스포머 아키텍처 구현',
  3: 'PART 3 — 사전 학습과 응답 제어',
  4: 'PART 4 — 미세 조정과 얼라인먼트',
  5: 'PART 5 — RAG와 지식 저장소 구축',
  6: 'PART 6 — AI 에이전트와 MCP',
  7: 'PART 7 — 경량화·멀티모달·월드 모델',
};
