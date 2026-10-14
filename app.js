/**
 * PA & PG LAB - Laboratório Interativo de Progressões
 * Implementação em JavaScript Moderno (ES6+)
 * 
 * Regra da Etapa 3: A sequência é construída termo a termo através de um
 * loop iterativo com cálculo simultâneo da soma acumulada.
 */

// Estado Global da Aplicação
const state = {
  type: 'pa',              // 'pa' | 'pg'
  mode: 'standard',        // 'standard' (por n) | 'goal' (alcançar meta)
  a1: 5,                   // Primeiro termo
  ratio: 3,                // Razão (r para PA, q para PG)
  n: 6,                    // Quantidade de termos
  goal: 1000,              // Meta de soma (Etapa 6)
  theme: 'theme-dark',     // 'theme-dark' | 'theme-light'
  
  // Resultados da última computação
  results: {
    terms: [],             // Array de números [a1, a2, ..., an]
    cumulativeSums: [],    // Array de somas acumuladas [S1, S2, ..., Sn]
    lastTerm: 0,           // an
    totalSum: 0,           // Sn
    classification: '',    // 'Crescente', 'Decrescente', 'Constante', 'Oscilante'
    termsNeeded: 0,        // Para o modo meta
    targetReached: false   // Se a meta foi atingida
  }
};

// Elementos do DOM
const elements = {
  body: document.body,
  typePaBtn: document.getElementById('typePaBtn'),
  typePgBtn: document.getElementById('typePgBtn'),
  formulaTermoGeral: document.getElementById('formulaTermoGeral'),
  formulaSoma: document.getElementById('formulaSoma'),
  
  modeStandardBtn: document.getElementById('modeStandardBtn'),
  modeGoalBtn: document.getElementById('modeGoalBtn'),
  termsCountGroup: document.getElementById('termsCountGroup'),
  goalGroup: document.getElementById('goalGroup'),
  
  inputA1: document.getElementById('inputA1'),
  inputRatio: document.getElementById('inputRatio'),
  ratioSymbol: document.getElementById('ratioSymbol'),
  ratioLabelText: document.getElementById('ratioLabelText'),
  ratioHint: document.getElementById('ratioHint'),
  inputN: document.getElementById('inputN'),
  sliderN: document.getElementById('sliderN'),
  termsBadge: document.getElementById('termsBadge'),
  inputGoal: document.getElementById('inputGoal'),
  calculateBtn: document.getElementById('calculateBtn'),
  resetFormBtn: document.getElementById('resetFormBtn'),
  
  // Bento Cards
  statLastTerm: document.getElementById('statLastTerm'),
  lastTermIndexBadge: document.getElementById('lastTermIndexBadge'),
  lastTermFormulaTip: document.getElementById('lastTermFormulaTip'),
  statSum: document.getElementById('statSum'),
  sumIndexBadge: document.getElementById('sumIndexBadge'),
  statClassification: document.getElementById('statClassification'),
  behaviorIcon: document.getElementById('behaviorIcon'),
  statRatioExplanation: document.getElementById('statRatioExplanation'),
  countCardLabel: document.getElementById('countCardLabel'),
  statTermsCount: document.getElementById('statTermsCount'),
  statGoalDifference: document.getElementById('statGoalDifference'),
  
  // Sequência e chips
  plainSequenceText: document.getElementById('plainSequenceText'),
  sequenceChipsList: document.getElementById('sequenceChipsList'),
  chipsSummaryInfo: document.getElementById('chipsSummaryInfo'),
  copySequenceBtn: document.getElementById('copySequenceBtn'),
  
  // Canvas de Análise
  progressionCanvas: document.getElementById('progressionCanvas'),
  chartTooltip: document.getElementById('chartTooltip'),
  
  // Tabela
  calculationTableBody: document.getElementById('calculationTableBody'),
  toggleTableBtn: document.getElementById('toggleTableBtn'),
  tableWrapper: document.getElementById('tableWrapper'),
  
  // Tema & Modal
  themeToggleBtn: document.getElementById('themeToggleBtn'),
  openInfoModalBtn: document.getElementById('openInfoModalBtn'),
  closeInfoModalBtn: document.getElementById('closeInfoModalBtn'),
  closeInfoModalFooterBtn: document.getElementById('closeInfoModalFooterBtn'),
  infoModal: document.getElementById('infoModal'),
  modalTabBtns: document.querySelectorAll('.modal-tab-btn'),
  modalTabContents: document.querySelectorAll('.modal-tab-content'),
  
  // Toast
  toastNotification: document.getElementById('toastNotification'),
  toastMessage: document.getElementById('toastMessage')
};

// ==========================================================================
// 1. INICIALIZAÇÃO E EVENT LISTENERS
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  setupEventListeners();
  setupPresets();
  calculateProgression(); // Executa o cálculo inicial (Exemplo 1 da apostila)
});

function setupEventListeners() {
  // Alternância de Tipo (PA vs PG)
  elements.typePaBtn.addEventListener('click', () => switchProgressionType('pa'));
  elements.typePgBtn.addEventListener('click', () => switchProgressionType('pg'));

  // Alternância de Modo (Padrão vs Meta)
  elements.modeStandardBtn.addEventListener('click', () => switchMode('standard'));
  elements.modeGoalBtn.addEventListener('click', () => switchMode('goal'));

  // Sincronização Input N e Slider
  elements.inputN.addEventListener('input', (e) => {
    const val = parseInt(e.target.value) || 1;
    elements.sliderN.value = Math.min(val, 50);
    elements.termsBadge.textContent = `${val} termo${val > 1 ? 's' : ''}`;
  });

  elements.sliderN.addEventListener('input', (e) => {
    elements.inputN.value = e.target.value;
    elements.termsBadge.textContent = `${e.target.value} termos`;
    calculateProgression();
  });

  // Botões de incremento rápido (+/-)
  document.querySelectorAll('.stepper-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetInput = document.getElementById(btn.dataset.stepTarget);
      const step = parseFloat(btn.dataset.step);
      let currentVal = parseFloat(targetInput.value) || 0;
      targetInput.value = (currentVal + step).toFixed(2).replace(/\.00$/, '');
      calculateProgression();
    });
  });

  // Botão de Calcular Principal
  elements.calculateBtn.addEventListener('click', calculateProgression);

  // Recalcular com Enter em qualquer campo
  [elements.inputA1, elements.inputRatio, elements.inputN, elements.inputGoal].forEach(input => {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        calculateProgression();
      }
    });
  });

  // Botão Limpar / Reset
  elements.resetFormBtn.addEventListener('click', resetDefaults);

  // Botão Copiar Sequência
  elements.copySequenceBtn.addEventListener('click', copySequenceToClipboard);

  // Alternar visualização da tabela detalhada
  elements.toggleTableBtn.addEventListener('click', () => {
    elements.tableWrapper.classList.toggle('collapsed');
    elements.toggleTableBtn.textContent = elements.tableWrapper.classList.contains('collapsed')
      ? 'Expandir Detalhes'
      : 'Ocultar Detalhes';
  });

  // Alternar Tema
  elements.themeToggleBtn.addEventListener('click', toggleTheme);

  // Modal de Informações e Critérios
  elements.openInfoModalBtn.addEventListener('click', () => elements.infoModal.classList.remove('hidden'));
  elements.closeInfoModalBtn.addEventListener('click', () => elements.infoModal.classList.add('hidden'));
  elements.closeInfoModalFooterBtn.addEventListener('click', () => elements.infoModal.classList.add('hidden'));
  elements.infoModal.addEventListener('click', (e) => {
    if (e.target === elements.infoModal) elements.infoModal.classList.add('hidden');
  });

  // Abas do Modal
  elements.modalTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      elements.modalTabBtns.forEach(b => b.classList.remove('active'));
      elements.modalTabContents.forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(btn.dataset.modalTab).classList.add('active');
    });
  });

  // Redimensionamento de Canvas
  window.addEventListener('resize', debounce(renderChart, 150));
}

// ==========================================================================
// 2. CONFIGURAÇÃO DE PRESETS DA ETAPA 4 (TESTES)
// ==========================================================================
function setupPresets() {
  const presets = {
    'pa-crescente': { type: 'pa', a1: 5, ratio: 3, n: 6 },
    'pa-decrescente': { type: 'pa', a1: 20, ratio: -3, n: 6 },
    'pg-crescente': { type: 'pg', a1: 2, ratio: 3, n: 5 },
    'pg-decrescente': { type: 'pg', a1: 64, ratio: 0.5, n: 6 }
  };

  document.querySelectorAll('.preset-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const presetKey = pill.dataset.preset;
      const data = presets[presetKey];
      if (!data) return;

      switchProgressionType(data.type);
      elements.inputA1.value = data.a1;
      elements.inputRatio.value = data.ratio;
      elements.inputN.value = data.n;
      elements.sliderN.value = data.n;
      elements.termsBadge.textContent = `${data.n} termos`;
      switchMode('standard');
      calculateProgression();

      showToast(`Preset carregado: ${pill.textContent.trim()}`);
    });
  });
}

// ==========================================================================
// 3. ALTERNÂNCIA DE TIPO (PA vs PG) E MODO
// ==========================================================================
function switchProgressionType(type) {
  state.type = type;
  elements.body.setAttribute('data-progression', type);

  if (type === 'pa') {
    elements.typePaBtn.classList.add('active');
    elements.typePaBtn.setAttribute('aria-selected', 'true');
    elements.typePgBtn.classList.remove('active');
    elements.typePgBtn.setAttribute('aria-selected', 'false');

    elements.formulaTermoGeral.textContent = 'aₙ = a₁ + (n - 1) · r';
    elements.formulaSoma.textContent = 'Sₙ = (a₁ + aₙ) · n / 2';

    elements.ratioSymbol.textContent = 'r';
    elements.ratioLabelText.textContent = 'Razão da PA (r)';
    elements.ratioHint.textContent = 'Valor somado a cada passo';
  } else {
    elements.typePgBtn.classList.add('active');
    elements.typePgBtn.setAttribute('aria-selected', 'true');
    elements.typePaBtn.classList.remove('active');
    elements.typePaBtn.setAttribute('aria-selected', 'false');

    elements.formulaTermoGeral.textContent = 'aₙ = a₁ · qⁿ⁻¹';
    elements.formulaSoma.textContent = 'Sₙ = a₁ · (qⁿ - 1) / (q - 1)';

    elements.ratioSymbol.textContent = 'q';
    elements.ratioLabelText.textContent = 'Razão da PG (q)';
    elements.ratioHint.textContent = 'Fator multiplicado a cada passo';
  }

  calculateProgression();
}

function switchMode(mode) {
  state.mode = mode;
  if (mode === 'standard') {
    elements.modeStandardBtn.classList.add('active');
    elements.modeGoalBtn.classList.remove('active');
    elements.termsCountGroup.classList.remove('hidden');
    elements.goalGroup.classList.add('hidden');
    elements.countCardLabel.textContent = 'Total de Termos';
  } else {
    elements.modeGoalBtn.classList.add('active');
    elements.modeStandardBtn.classList.remove('active');
    elements.termsCountGroup.classList.add('hidden');
    elements.goalGroup.classList.remove('hidden');
    elements.countCardLabel.textContent = 'Termos p/ Superar Meta';
  }
  calculateProgression();
}

// ==========================================================================
// 4. ALGORITMO TERMO A TERMO (REGRA DA ETAPA 3 & ETAPA 6)
// ==========================================================================
function calculateProgression() {
  const a1 = parseFloat(elements.inputA1.value);
  const ratio = parseFloat(elements.inputRatio.value);

  if (isNaN(a1) || isNaN(ratio)) {
    showToast('Por favor, informe valores numéricos válidos!');
    return;
  }

  state.a1 = a1;
  state.ratio = ratio;

  const isPA = state.type === 'pa';
  const terms = [];
  const cumulativeSums = [];

  // MODO 1: QUANTIDADE DE TERMOS (n)
  if (state.mode === 'standard') {
    let n = parseInt(elements.inputN.value);
    if (isNaN(n) || n < 1) n = 1;
    if (n > 1000) n = 1000;
    state.n = n;

    let currentTerm = a1;
    let accumulatedSum = 0;

    /**
     * REGRA ESTRITA DA ETAPA 3:
     * A sequência é construída termo a termo utilizando for,
     * calculando simultaneamente a soma acumulada passo a passo.
     */
    for (let k = 1; k <= n; k++) {
      if (k === 1) {
        currentTerm = a1;
      } else {
        if (isPA) {
          currentTerm = currentTerm + ratio;
        } else {
          currentTerm = currentTerm * ratio;
        }
      }

      // Arredondamento para evitar dízimas de ponto flutuante do JS
      currentTerm = roundNumber(currentTerm, 6);
      accumulatedSum = roundNumber(accumulatedSum + currentTerm, 6);

      terms.push(currentTerm);
      cumulativeSums.push(accumulatedSum);
    }

    state.results.terms = terms;
    state.results.cumulativeSums = cumulativeSums;
    state.results.lastTerm = terms[terms.length - 1];
    state.results.totalSum = accumulatedSum;
    state.results.termsNeeded = n;
    state.results.targetReached = true;
  }
  // MODO 2: ALCANÇANDO A META (ETAPA 6)
  else {
    const goal = parseFloat(elements.inputGoal.value);
    if (isNaN(goal)) {
      showToast('Informe um valor de meta válido!');
      return;
    }
    state.goal = goal;

    let currentTerm = a1;
    let accumulatedSum = 0;
    let count = 0;
    const MAX_ITERATIONS = 500; // Trava de segurança para evitar loops infinitos

    /**
     * ETAPA 6: O próprio programa descobre quando a soma ultrapassará a meta.
     * Itera até que accumulatedSum > goal
     */
    while (accumulatedSum <= goal && count < MAX_ITERATIONS) {
      count++;
      if (count === 1) {
        currentTerm = a1;
      } else {
        if (isPA) {
          currentTerm = currentTerm + ratio;
        } else {
          currentTerm = currentTerm * ratio;
        }
      }

      currentTerm = roundNumber(currentTerm, 6);
      accumulatedSum = roundNumber(accumulatedSum + currentTerm, 6);

      terms.push(currentTerm);
      cumulativeSums.push(accumulatedSum);

      // Verificação para casos impossíveis (ex: razão 0 com soma que não cresce)
      if (count > 2 && Math.abs(currentTerm) === 0 && accumulatedSum <= goal) {
        break;
      }
    }

    state.results.terms = terms;
    state.results.cumulativeSums = cumulativeSums;
    state.results.lastTerm = terms[terms.length - 1];
    state.results.totalSum = accumulatedSum;
    state.results.termsNeeded = count;
    state.results.targetReached = accumulatedSum > goal;
    state.n = count;
  }

  // Classificação do Comportamento
  state.results.classification = classifyProgression(isPA, a1, ratio);

  // Renderizar Todos os Componentes
  renderSummaryCards();
  renderSequenceOutput();
  renderCalculationTable();
  renderChart();
}

// ==========================================================================
// 5. CLASSIFICAÇÃO MATEMÁTICA DA PROGRESSÃO
// ==========================================================================
function classifyProgression(isPA, a1, ratio) {
  if (isPA) {
    if (ratio > 0) return { label: 'Crescente', icon: '↗', desc: 'Razão r > 0' };
    if (ratio < 0) return { label: 'Decrescente', icon: '↘', desc: 'Razão r < 0' };
    return { label: 'Constante', icon: '→', desc: 'Razão r = 0' };
  } else {
    if (ratio === 1) return { label: 'Constante', icon: '→', desc: 'Razão q = 1' };
    if (ratio === 0) return { label: 'Nula', icon: '∅', desc: 'Razão q = 0' };
    if (ratio < 0) return { label: 'Oscilante / Alternada', icon: '∿', desc: 'Razão q < 0' };
    if (a1 > 0 && ratio > 1) return { label: 'Crescente', icon: '↗', desc: 'a₁ > 0 e q > 1' };
    if (a1 > 0 && ratio > 0 && ratio < 1) return { label: 'Decrescente', icon: '↘', desc: 'a₁ > 0 e 0 < q < 1' };
    if (a1 < 0 && ratio > 1) return { label: 'Decrescente', icon: '↘', desc: 'a₁ < 0 e q > 1' };
    if (a1 < 0 && ratio > 0 && ratio < 1) return { label: 'Crescente', icon: '↗', desc: 'a₁ < 0 e 0 < q < 1' };
    return { label: 'Geométrica', icon: '↗', desc: `q = ${ratio}` };
  }
}

// ==========================================================================
// 6. RENDERIZAÇÃO DOS CARDS BENTO DE RESULTADOS
// ==========================================================================
function renderSummaryCards() {
  const { results, n, mode, goal } = state;

  // 1. Último Termo (aₙ)
  elements.statLastTerm.textContent = formatDisplayNumber(results.lastTerm);
  elements.lastTermIndexBadge.textContent = `a${subscript(n)}`;
  elements.lastTermFormulaTip.textContent = state.type === 'pa' 
    ? `Calculado via iteração (a₁ + ${(n - 1)} · r)` 
    : `Calculado via iteração (a₁ · q${superscript(n - 1)})`;

  // 2. Soma dos Termos (Sₙ)
  elements.statSum.textContent = formatDisplayNumber(results.totalSum);
  elements.sumIndexBadge.textContent = `S${subscript(n)}`;

  // 3. Classificação
  elements.statClassification.textContent = results.classification.label;
  elements.behaviorIcon.textContent = results.classification.icon;
  elements.statRatioExplanation.textContent = results.classification.desc;

  // 4. Quantidade / Meta
  elements.statTermsCount.textContent = results.termsNeeded;
  if (mode === 'standard') {
    elements.statGoalDifference.textContent = `${n} termos gerados pelo laço`;
  } else {
    if (results.targetReached) {
      elements.statGoalDifference.textContent = `Soma (${formatDisplayNumber(results.totalSum)}) superou meta (${formatDisplayNumber(goal)})`;
    } else {
      elements.statGoalDifference.textContent = `Meta não alcançada no limite de iterações`;
    }
  }
}

// ==========================================================================
// 7. RENDERIZAÇÃO DA SEQUÊNCIA (TEXTO PADRÃO APOSTILA & CHIPS)
// ==========================================================================
function renderSequenceOutput() {
  const { terms } = state.results;

  // Texto formatado idêntico aos Exemplos 1 e 2 da apostila (ex: "5, 8, 11, 14, 17, 20")
  const formattedString = terms.map(t => formatDisplayNumber(t)).join(', ');
  elements.plainSequenceText.textContent = formattedString;

  // Renderizar chips individuais interativos
  elements.chipsSummaryInfo.textContent = `${terms.length} termo${terms.length > 1 ? 's' : ''}`;
  elements.sequenceChipsList.innerHTML = '';

  const fragment = document.createDocumentFragment();
  terms.forEach((term, index) => {
    const isLast = index === terms.length - 1;
    const chip = document.createElement('div');
    chip.className = `term-chip ${isLast ? 'is-last' : ''}`;
    chip.style.animationDelay = `${Math.min(index * 20, 400)}ms`;

    chip.innerHTML = `
      <span class="chip-index">a${subscript(index + 1)}</span>
      <span class="chip-value">${formatDisplayNumber(term)}</span>
    `;

    chip.title = `Termo a${index + 1} = ${term} | Clique para ver na tabela`;
    chip.addEventListener('click', () => {
      highlightTableRow(index);
    });

    fragment.appendChild(chip);
  });

  elements.sequenceChipsList.appendChild(fragment);
}

// ==========================================================================
// 8. RENDERIZAÇÃO DA TABELA DE MEMÓRIA DE CÁLCULO (ETAPA 3)
// ==========================================================================
function renderCalculationTable() {
  const { terms, cumulativeSums, totalSum } = state.results;
  const isPA = state.type === 'pa';
  const ratio = state.ratio;
  const a1 = state.a1;

  elements.calculationTableBody.innerHTML = '';
  const fragment = document.createDocumentFragment();

  // Se a lista de termos for muito grande, exibe os 100 primeiros para desempenho
  const maxDisplay = Math.min(terms.length, 100);

  for (let i = 0; i < maxDisplay; i++) {
    const row = document.createElement('tr');
    row.id = `table-row-${i}`;

    let operacao = '';
    if (i === 0) {
      operacao = `Termo inicial (a₁ = ${a1})`;
    } else {
      const prev = formatDisplayNumber(terms[i - 1]);
      if (isPA) {
        operacao = `${prev} + (${ratio}) = ${formatDisplayNumber(terms[i])}`;
      } else {
        operacao = `${prev} · (${ratio}) = ${formatDisplayNumber(terms[i])}`;
      }
    }

    const percent = totalSum !== 0 
      ? ((cumulativeSums[i] / totalSum) * 100).toFixed(1) + '%' 
      : '-';

    row.innerHTML = `
      <td><strong>a${subscript(i + 1)}</strong></td>
      <td><code>${operacao}</code></td>
      <td><strong>${formatDisplayNumber(terms[i])}</strong></td>
      <td>${formatDisplayNumber(cumulativeSums[i])}</td>
      <td>${percent}</td>
    `;

    fragment.appendChild(row);
  }

  elements.calculationTableBody.appendChild(fragment);
}

function highlightTableRow(index) {
  if (index >= 100) return;
  const row = document.getElementById(`table-row-${index}`);
  if (!row) return;

  // Garante que a tabela está expandida
  elements.tableWrapper.classList.remove('collapsed');
  elements.toggleTableBtn.textContent = 'Ocultar Detalhes';

  row.scrollIntoView({ behavior: 'smooth', block: 'center' });
  row.style.background = 'var(--theme-badge-bg)';
  setTimeout(() => {
    row.style.background = '';
  }, 1400);
}

// ==========================================================================
// 9. RENDERIZADOR DO GRÁFICO (CANVAS HTML5 NATIVO)
// ==========================================================================
function renderChart() {
  const canvas = elements.progressionCanvas;
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();

  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  const width = rect.width;
  const height = rect.height;
  const terms = state.results.terms;

  ctx.clearRect(0, 0, width, height);

  if (terms.length === 0) return;

  // Margens
  const padding = { top: 25, right: 30, bottom: 35, left: 55 };
  const graphWidth = width - padding.left - padding.right;
  const graphHeight = height - padding.top - padding.bottom;

  // Escala dos eixos
  const minVal = Math.min(0, ...terms);
  const maxVal = Math.max(0, ...terms);
  const range = maxVal - minVal || 1;

  const getX = (index) => {
    if (terms.length === 1) return padding.left + graphWidth / 2;
    return padding.left + (index / (terms.length - 1)) * graphWidth;
  };

  const getY = (val) => {
    return padding.top + graphHeight - ((val - minVal) / range) * graphHeight;
  };

  // 1. Grade de fundo e Eixos
  ctx.strokeStyle = state.theme === 'theme-dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)';
  ctx.lineWidth = 1;

  // Linhas horizontais (4 divisões)
  const gridLines = 4;
  for (let i = 0; i <= gridLines; i++) {
    const yVal = minVal + (range / gridLines) * i;
    const y = getY(yVal);

    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(width - padding.right, y);
    ctx.stroke();

    // Rótulos do eixo Y
    ctx.fillStyle = state.theme === 'theme-dark' ? '#94a3b8' : '#64748b';
    ctx.font = '10px JetBrains Mono';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillText(formatCompact(yVal), padding.left - 8, y);
  }

  // Linha do zero (se dentro do range)
  if (minVal < 0 && maxVal > 0) {
    const zeroY = getY(0);
    ctx.strokeStyle = 'rgba(239, 68, 68, 0.35)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(padding.left, zeroY);
    ctx.lineTo(width - padding.right, zeroY);
    ctx.stroke();
  }

  // 2. Desenho da Área com Gradiente
  const isPA = state.type === 'pa';
  const primaryColor = isPA ? '#06b6d4' : '#8b5cf6';
  const secondaryColor = isPA ? '#3b82f6' : '#ec4899';

  const gradient = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom);
  gradient.addColorStop(0, isPA ? 'rgba(6, 182, 212, 0.35)' : 'rgba(139, 92, 246, 0.35)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.beginPath();
  terms.forEach((val, i) => {
    const x = getX(i);
    const y = getY(val);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });

  const lastX = getX(terms.length - 1);
  const firstX = getX(0);
  const baseY = getY(Math.max(0, minVal));
  ctx.lineTo(lastX, baseY);
  ctx.lineTo(firstX, baseY);
  ctx.closePath();
  ctx.fillStyle = gradient;
  ctx.fill();

  // 3. Linha dos Termos (aₖ)
  ctx.beginPath();
  terms.forEach((val, i) => {
    const x = getX(i);
    const y = getY(val);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });

  ctx.strokeStyle = primaryColor;
  ctx.lineWidth = 2.5;
  ctx.lineJoin = 'round';
  ctx.stroke();

  // 4. Pontos / Nós da sequência
  terms.forEach((val, i) => {
    const x = getX(i);
    const y = getY(val);

    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fillStyle = primaryColor;
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Rótulos do eixo X (índices aₖ)
    if (terms.length <= 15 || i === 0 || i === terms.length - 1 || i % Math.ceil(terms.length / 10) === 0) {
      ctx.fillStyle = state.theme === 'theme-dark' ? '#94a3b8' : '#64748b';
      ctx.font = '10px JetBrains Mono';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText(`a${i + 1}`, x, height - padding.bottom + 8);
    }
  });
}

// ==========================================================================
// 10. FUNÇÕES AUXILIARES & UTILITÁRIOS
// ==========================================================================
function resetDefaults() {
  elements.inputA1.value = '5';
  elements.inputRatio.value = '3';
  elements.inputN.value = '6';
  elements.sliderN.value = '6';
  elements.termsBadge.textContent = '6 termos';
  elements.inputGoal.value = '1000';
  switchProgressionType('pa');
  switchMode('standard');
  calculateProgression();
  showToast('Valores restaurados para o padrão.');
}

function copySequenceToClipboard() {
  const text = elements.plainSequenceText.textContent;
  if (!text) return;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast('Sequência copiada para a área de transferência!');
    }).catch(() => fallbackCopy(text));
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);
  showToast('Sequência copiada!');
}

function showToast(msg) {
  elements.toastMessage.textContent = msg;
  elements.toastNotification.classList.remove('hidden');
  clearTimeout(elements.toastNotification._timer);
  elements.toastNotification._timer = setTimeout(() => {
    elements.toastNotification.classList.add('hidden');
  }, 2800);
}

function initTheme() {
  const saved = localStorage.getItem('pa_pg_lab_theme') || 'theme-dark';
  state.theme = saved;
  elements.body.className = saved;
}

function toggleTheme() {
  state.theme = state.theme === 'theme-dark' ? 'theme-light' : 'theme-dark';
  elements.body.className = state.theme;
  localStorage.setItem('pa_pg_lab_theme', state.theme);
  renderChart();
}

function roundNumber(num, decimals = 4) {
  return Number(Math.round(num + 'e' + decimals) + 'e-' + decimals);
}

function formatDisplayNumber(num) {
  if (num === undefined || num === null) return '0';
  if (Math.abs(num) >= 1e12 || (Math.abs(num) < 1e-4 && num !== 0)) {
    return num.toExponential(4);
  }
  return num.toLocaleString('pt-BR', { maximumFractionDigits: 6 });
}

function formatCompact(num) {
  if (Math.abs(num) >= 1e6) return (num / 1e6).toFixed(1) + 'M';
  if (Math.abs(num) >= 1e3) return (num / 1e3).toFixed(1) + 'k';
  return roundNumber(num, 1).toString();
}

function subscript(n) {
  const subs = { '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄', '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉' };
  return String(n).split('').map(d => subs[d] || d).join('');
}

function superscript(n) {
  const sups = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '-': '⁻' };
  return String(n).split('').map(d => sups[d] || d).join('');
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
