# 📐 PA & PG LAB — Projeto 1: Explorando PA e PG

> **Disciplina:** Matemática Discreta  
> 🌐 **Aplicação online (Etapa 7):** [https://melquizedeque-torres.github.io/pa-pg-lab/](https://melquizedeque-torres.github.io/pa-pg-lab/)

## Objetivo

Programa em **Python** que gera e analisa Progressões Aritméticas (PA) e Geométricas (PG), transformando padrões matemáticos em algoritmos. Também há um frontend em HTML/CSS/JavaScript.

---

## Etapa 1 — Planejamento

1. **Informações para construir uma PA:** primeiro termo, razão e quantidade de termos.
2. **Informações para construir uma PG:** primeiro termo, razão e quantidade de termos.
3. **Próximo termo da PA:** `termo = termo + razao`.
4. **Próximo termo da PG:** `termo = termo * razao`.
5. **Soma dos termos:** acumulador iniciado em 0, com `soma = soma + termo` a cada termo gerado.
6. **Pseudocódigo e fluxogramas:** em [PSEUDOCODIGO.md](PSEUDOCODIGO.md). Resumo:

```
termo <- primeiro_termo ; soma <- 0
PARA i DE 1 ATÉ n:
    soma <- soma + termo
    SE PA: termo <- termo + razao
    SENÃO: termo <- termo * razao
```

---

## Etapa 2 — Construindo o programa

Arquivo [pa_pg_lab.py](pa_pg_lab.py). Execute com `python pa_pg_lab.py`: o menu permite escolher PA (1) ou PG (2) e pede primeiro termo, razão e quantidade de termos, exibindo a sequência, o último termo e a soma.

## Etapa 3 — Regra de implementação

A sequência é construída **termo a termo** com laço de repetição, e a soma é acumulada durante a geração, sem usar as fórmulas prontas do termo geral ou da soma.

---

## Etapa 4 — Testando o programa

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

## Etapa 5 — Reflexão

1. **Qual foi a principal diferença entre o algoritmo utilizado para gerar uma PA e o utilizado para gerar uma PG?**  
   *Resposta:* A diferença reside na operação aritmética da relação de recorrência. Na PA, o próximo termo é obtido pela **adição** da razão constante ao termo anterior (`termo = termo + razao`), gerando uma taxa de variação linear. Na PG, o próximo termo é obtido pela **multiplicação** do termo anterior pela razão (`termo = termo * razao`), gerando uma taxa de variação exponencial ou geométrica.

2. **Qual foi a função da estrutura de repetição no seu programa?**  
   *Resposta:* A estrutura de repetição (`for` ou `while`) serviu como motor iterativo do algoritmo para cumprir a regra da Etapa 3: em vez de computar valores diretamente por fórmulas analíticas fechadas, o loop constrói a sequência elemento por elemento a partir de $a_1$ e, em cada passo do laço, alimenta uma variável acumuladora (`soma += termo`), garantindo o rastreamento passo a passo.

3. **Qual foi a maior dificuldade encontrada durante a programação?**  
   *Resposta:* A gestão de casos especiais (edge cases) e números de ponto flutuante, tais como razões fracionárias (que geram imprecisões binárias periódicas em JS/Python), razões negativas na PG (que oscilam em sinal) e a condição de parada exata da Etapa 6 para evitar laços infinitos em sequências que não atingem a meta.

4. **Como você resolveu essa dificuldade?**  
   *Resposta:* Aplicando funções de arredondamento controlado (`round(..., 6)`), travas de segurança de iterações máximas no modo meta, validações rigorosas de entrada e checagem de tipos de progressão antes da renderização.

---

## Etapa 6 — Alcançando a Meta

O programa recebe tipo (PA/PG), primeiro termo, razão e meta, e descobre com um laço `while` quantos termos são necessários para a soma ultrapassar a meta. Exemplo: PG, `a1 = 2`, `q = 2`, meta `1000` → **9 termos**, soma **1022**. Disponível no Python e no modo "Alcançando a Meta" do frontend.

---

## Etapa 7 — Frontend

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

## Entregáveis

| # | Entregável | Onde está |
| :-- | :--- | :--- |
| 1 | Código-fonte Python | [pa_pg_lab.py](pa_pg_lab.py) |
| 2 | Pseudocódigo / fluxograma (Etapa 1) | [PSEUDOCODIGO.md](PSEUDOCODIGO.md) |
| 3 | Quatro testes (Etapa 4) | seção Etapa 4 acima |
| 4 | Respostas da Etapa 5 | seção Etapa 5 acima |
| 5 | Frontend | [index.html](index.html), [style.css](style.css), [app.js](app.js), [standalone.html](standalone.html) |

---

## Anexo — Notas de design do frontend

Foi adotado um estilo *Scientific Glassmorphism* com cards em Bento Grid, fundo escuro (`#080c16`), ciano/azul para a PA e violeta/magenta para a PG, tipografia `Outfit` + `JetBrains Mono`, e alternância entre tema escuro (Dark Lab) e claro, com preferência salva em `localStorage`.
