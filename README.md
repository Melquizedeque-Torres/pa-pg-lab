# 📐 PA & PG LAB — Laboratório Interativo de Progressões

> **Projeto 1: Explorando Progressões Aritméticas (PA) e Progressões Geométricas (PG)**  
> **Disciplina:** Pensamento Computacional e Algoritmos  
> 🌐 **Link da Aplicação Online (Live Demo):** [https://melquizedeque-torres.github.io/pa-pg-lab/](https://melquizedeque-torres.github.io/pa-pg-lab/)  
> **Tecnologias Frontend:** HTML5 Semântico, CSS3 Moderno (Glassmorphism + Bento Grid) e JavaScript Puro (ES6+)  
> **Tecnologia Backend/CLI:** Python 3 (.py)  

---

## 💡 1. Brainstorming de Design (Desafio Extra — Etapa 7)

Para atender com excelência ao **desafio extra da Etapa 7** e garantir a pontuação máxima (3,0 pontos no critério de frontend), foi conduzido um brainstorming detalhado explorando três vertentes de design visual para ferramentas matemáticas educativas:

```
                                  ┌────────────────────────────────────────┐
                                  │      BRAINSTORM DE DESIGN (ETAPA 7)    │
                                  └──────────────────┬─────────────────────┘
                                                     │
         ┌───────────────────────────────────────────┼──────────────────────────────────────────┐
         │                                           │                                          │
         ▼                                           ▼                                          ▼
┌─────────────────────────┐               ┌─────────────────────────┐                ┌─────────────────────────┐
│ DIREÇÃO 1:              │               │ DIREÇÃO 2:              │                │ DIREÇÃO 3:              │
│ Scientific Glassmorphism│               │ Academic Neo-Brutalism  │                │ Clean Bento Grid        │
│ & Modern Math Lab       │               │ (Estilo Figma/Notion)   │                │ (Apple Dashboard)       │
├─────────────────────────┤               ├─────────────────────────┤                ├─────────────────────────┤
│ • Dark Mode profundo    │               │ • Bordas pretas 3px     │                │ • Módulos retangulares  │
│ • Cartões translúcidos  │               │ • Sombras duras 4px 4px │                │ • Cantos arredondados   │
│ • Ciano (PA) / Roxo (PG)│               │ • Amarelo/pastel        │                │ • Minimalismo extremo   │
│ • Tipografia mono Jet   │               │ • Lúdico / infantil     │                │ • Discreto e polido     │
└────────────┬────────────┘               └─────────────┬───────────┘                └────────────┬────────────┘
             │                                          │                                         │
             └──────────────────────────────────────────┼─────────────────────────────────────────┘
                                                        │
                                                        ▼
                                    ┌───────────────────────────────────────┐
                                    │    SOLUÇÃO HÍBRIDA ADOTADA (VENCEDORA)│
                                    │  Glassmorphism + Bento Grid Modular   │
                                    │  com seletor Dark Lab / Light Minimal │
                                    └───────────────────────────────────────┘
```

### Detalhamento das Opções Analisadas:

1. **Direção 1: Scientific Glassmorphism & Math Tech Lab (Adotada como Base)**:
   - **Conceito:** Fundo escuro imersivo (`#080c16`), cartões foscos com efeito de desfoque (`backdrop-filter: blur(16px)`), luzes de ambiente dinâmicas e diferenciação cromática expressiva:
     - **PA:** Paleta Ciano Elétrico & Azul Frio (`#06b6d4` a `#3b82f6`), transmitindo constância, estabilidade e incremento linear.
     - **PG:** Paleta Violeta Neon & Rosa Magenta (`#8b5cf6` a `#ec4899`), transmitindo aceleração, calor e expansão exponencial.
   - **Tipografia:** `Outfit` (sans-serif geométrica para títulos e interface) aliada a `JetBrains Mono` (monospace para precisão nos termos e fórmulas).
   - **Vantagem:** Cria um impacto visual profissional imediato ("WOW factor") sem parecer infantil, apropriado tanto para estudantes quanto para bancas avaliadoras.

2. **Direção 2: Academic Neo-Brutalism**:
   - **Conceito:** Bordas marcadas em preto puro, sombras duras e tipografia serifada retrô.
   - **Avaliação:** Embora moderno no design editorial, cansa a leitura em sequências longas e desvia a atenção da precisão matemática dos gráficos.

3. **Direção 3: Clean Bento Grid Minimalista**:
   - **Conceito:** Organização em blocos independentes (estilo Apple Dashboard), priorizando métricas e legibilidade.
   - **Incorporação:** Foi combinada com o Glassmorphism, estruturando os resultados em cards Bento (`stat-card`), sequência em chips e memória de cálculo em tabela responsiva.

4. **Tema Alternativo Integrado:**
   - Foi implementado um botão no topo para alternar instantaneamente entre o **Dark Lab** e o **Light Minimalist Dashboard**, preservando a preferência no `localStorage`.

---

## 🚀 2. Recursos Implementados na Interface (Etapa 7 + Bônus)

| Funcionalidade | Requisito da Apostila | Implementação no Projeto |
| :--- | :--- | :--- |
| **Escolha PA / PG** | Obrigatório (Etapa 2 e 7) | Segmented switch animado que altera paleta de cores, ícones ($\Sigma$ vs $\Pi$) e fórmulas ativas em tempo real. |
| **Entradas de Parâmetros** | Obrigatório ($a_1$, $r$, $n$) | Inputs numéricos com botões de incremento passo a passo (+/-) e slider fluido sincronizado para $n$. |
| **Geração Termo a Termo** | **Regra da Etapa 3** | Algoritmo iterativo `for` que gera cada termo com base no anterior e acumula a soma simultaneamente. |
| **Visualização da Sequência** | Obrigatório | Apresentação em formato de texto idêntico ao modelo da apostila (`5, 8, 11, 14, 17, 20`) + chips interativos com índices ($a_1, a_2 \dots$). |
| **Destaque do Último Termo** | Obrigatório | Card de destaque no Bento Grid com badge dinâmico do índice ($a_n$). |
| **Destaque da Soma dos Termos** | Obrigatório | Card de destaque no Bento Grid com valor formatado ($S_n$). |
| **Desafio "Alcançando a Meta"** | **Etapa 6 (1,0 ponto)** | Modo exclusivo com laço `while` que descobre quantos termos ultrapassam a meta informada. |
| **Presets Rápidos de Teste** | **Etapa 4 (0,5 ponto)** | 4 botões de 1 clique para carregar PA Crescente, PA Decrescente, PG Crescente e PG Decrescente. |
| **Gráfico da Curva (Canvas)** | Bônus visual | Canvas HTML5 nativo renderizando a evolução da progressão com gradiente e eixos. |
| **Memória de Cálculo (Tabela)** | Bônus didático | Tabela detalhando a operação exata executada em cada iteração $k$. |
| **Cópia Rápida** | Bônus de usabilidade | Botão "Copiar" com notificação Toast para transferir a sequência para relatórios. |

---

## 📊 3. Verificação dos 4 Testes da Etapa 4

Os testes foram executados e validados tanto no frontend quanto no script Python:

### Teste 1: PA Crescente
- **Entradas:** $a_1 = 5$, Razão $r = 3$, Quantidade $n = 6$
- **Sequência Gerada:** `5, 8, 11, 14, 17, 20`
- **Último Termo ($a_6$):** `20` *(Fórmula: $5 + (6-1) \cdot 3 = 20$)*  
- **Soma dos Termos ($S_6$):** `75` *(Fórmula: $\frac{(5 + 20) \cdot 6}{2} = 75$)*  
- **Comportamento:** Crescente ($r > 0$)  

### Teste 2: PA Decrescente
- **Entradas:** $a_1 = 20$, Razão $r = -3$, Quantidade $n = 6$
- **Sequência Gerada:** `20, 17, 14, 11, 8, 5`
- **Último Termo ($a_6$):** `5` *(Fórmula: $20 + (6-1) \cdot (-3) = 5$)*  
- **Soma dos Termos ($S_6$):** `75` *(Fórmula: $\frac{(20 + 5) \cdot 6}{2} = 75$)*  
- **Comportamento:** Decrescente ($r < 0$)  

### Teste 3: PG Crescente
- **Entradas:** $a_1 = 2$, Razão $q = 3$, Quantidade $n = 5$
- **Sequência Gerada:** `2, 6, 18, 54, 162`
- **Último Termo ($a_5$):** `162` *(Fórmula: $2 \cdot 3^{5-1} = 2 \cdot 81 = 162$)*  
- **Soma dos Termos ($S_5$):** `242` *(Fórmula: $\frac{2 \cdot (3^5 - 1)}{3 - 1} = 242$)*  
- **Comportamento:** Crescente ($a_1 > 0$ e $q > 1$)  

### Teste 4: PG Decrescente
- **Entradas:** $a_1 = 64$, Razão $q = 0.5$, Quantidade $n = 6$
- **Sequência Gerada:** `64, 32, 16, 8, 4, 2`
- **Último Termo ($a_6$):** `2` *(Fórmula: $64 \cdot (0.5)^5 = 64 \cdot \frac{1}{32} = 2$)*  
- **Soma dos Termos ($S_6$):** `126` *(Fórmula: $\frac{64 \cdot (1 - 0.5^6)}{1 - 0.5} = 126$)*  
- **Comportamento:** Decrescente ($a_1 > 0$ e $0 < q < 1$)  

---

## 📝 4. Respostas às Questões da Etapa 5 (Reflexão)

1. **Qual foi a principal diferença entre o algoritmo utilizado para gerar uma PA e o utilizado para gerar uma PG?**  
   *Resposta:* A diferença reside na operação aritmética da relação de recorrência. Na PA, o próximo termo é obtido pela **adição** da razão constante ao termo anterior (`termo = termo + razao`), gerando uma taxa de variação linear. Na PG, o próximo termo é obtido pela **multiplicação** do termo anterior pela razão (`termo = termo * razao`), gerando uma taxa de variação exponencial ou geométrica.

2. **Qual foi a função da estrutura de repetição no seu programa?**  
   *Resposta:* A estrutura de repetição (`for` ou `while`) serviu como motor iterativo do algoritmo para cumprir a regra da Etapa 3: em vez de computar valores diretamente por fórmulas analíticas fechadas, o loop constrói a sequência elemento por elemento a partir de $a_1$ e, em cada passo do laço, alimenta uma variável acumuladora (`soma += termo`), garantindo o rastreamento passo a passo.

3. **Qual foi a maior dificuldade encontrada durante a programação?**  
   *Resposta:* A gestão de casos especiais (edge cases) e números de ponto flutuante, tais como razões fracionárias (que geram imprecisões binárias periódicas em JS/Python), razões negativas na PG (que oscilam em sinal) e a condição de parada exata da Etapa 6 para evitar laços infinitos em sequências que não atingem a meta.

4. **Como você resolveu essa dificuldade?**  
   *Resposta:* Aplicando funções de arredondamento controlado (`round(..., 6)`), travas de segurança de iterações máximas no modo meta, validações rigorosas de entrada e checagem de tipos de progressão antes da renderização.

---

## 🧠 Etapa 1 — Planejamento e Pseudocódigo

As respostas de planejamento, o **pseudocódigo** e os **fluxogramas** (Etapas 2/3 e Etapa 6) estão em [PSEUDOCODIGO.md](PSEUDOCODIGO.md).

Resumo do algoritmo central:

```
termo <- primeiro_termo ; soma <- 0
PARA i DE 1 ATÉ n:
    soma <- soma + termo
    SE PA: termo <- termo + razao
    SENÃO: termo <- termo * razao
```

---

## 🗂️ 5. Estrutura dos Arquivos Criados

```
pa-pg-lab/
├── index.html         # Estrutura semântica principal e templates
├── style.css          # Design System completo (Glassmorphism, Bento, temas)
├── app.js             # Lógica matemática, Canvas, manipuladores de evento
├── standalone.html    # Versão auto-contida em arquivo único (execução offline direta)
├── PSEUDOCODIGO.md    # Etapa 1: pseudocódigo e fluxogramas
├── pa_pg_lab.py       # Código em Python para atender ao entregável 1 (.py)
└── README.md          # Documentação acadêmica completa e relatórios
```

