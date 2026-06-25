# Aline Simulator — Contexto Geral do Projeto

## Objetivo

O projeto Aline Simulator é uma aplicação React + TypeScript destinada ao ensino de Cinemática através de simulações visuais e interativas.

O usuário configura os parâmetros físicos de um movimento e acompanha simultaneamente:

* a animação da personagem Aline;
* a evolução temporal do movimento;
* um gráfico posição × tempo atualizado em tempo real.

O projeto foi concebido para ser extensível, permitindo a implementação de múltiplos tipos de movimento utilizando a mesma infraestrutura de animação e visualização.

Atualmente existem três módulos planejados:

* MRU (Movimento Retilíneo Uniforme)
* MUV (Movimento Uniformemente Variado)
* QL (Queda Livre)

---

# Estrutura do Projeto

```txt
src/
├─ assets/
│  └─ aline.png
│
├─ components/
│  └─ charts/
│     └─ PositionTimeChart.tsx
│
├─ hooks/
│  └─ useAnimation.ts
│
├─ pages/
│  ├─ MainPage.tsx
│  └─ Credits.tsx
│
├─ simulations/
│  ├─ types.ts
│  ├─ utils.ts
│  │
│  ├─ mru/
│  │  ├─ MRUSimulator.tsx
│  │  ├─ formulas.ts
│  │  ├─ graph.ts
│  │  └─ animate.ts
│  │
│  ├─ muv/
│  │  └─ MUVSimulator.tsx
│  │
│  └─ ql/
│     └─ QLSimulator.tsx
```

---

# Responsabilidades Gerais

## useAnimation.ts

Responsável exclusivamente pela execução da animação utilizando:

```ts
requestAnimationFrame
```

Fornece:

```ts
start()
reset()
```

A lógica de física não pertence ao hook.

O hook apenas controla o tempo e o progresso da animação.

---

## PositionTimeChart.tsx

Componente reutilizável baseado em Recharts.

Recebe:

```ts
{
  data,
  maxTime,
  minDistance,
  maxDistance
}
```

e desenha um gráfico:

```txt
posição × tempo
```

independente do tipo de movimento.

MRU, MUV e Queda Livre reutilizam este mesmo componente.

---

## simulations/utils.ts

Contém funcionalidades compartilhadas entre todas as simulações.

Exemplos:

* conversão metros → pixels;
* cálculo de escala visual;
* renderização da imagem;
* validações genéricas.

Nenhuma fórmula física específica deve ficar aqui.

---

## simulations/types.ts

Contém tipos compartilhados.

Atualmente:

```ts
export type MoveStatus =
  | "start"
  | "moving"
  | "paused"
  | "end";
```

---

# Sistema de Estados

Todas as simulações utilizam:

```ts
type MoveStatus =
  | "start"
  | "moving"
  | "paused"
  | "end";
```

## start

Estado inicial.

Características:

* usuário pode editar inputs;
* imagem posicionada na configuração atual;
* botão "Iniciar".

---

## moving

Simulação em execução.

Características:

* animação ativa;
* inputs bloqueados;
* botão "Pausar".

---

## paused

Simulação interrompida.

Características:

* progresso preservado;
* botão "Continuar";
* botão "Voltar ao início".

---

## end

Simulação finalizada.

Características:

* movimento concluído;
* botão "Voltar ao início".

---

# Conversão Física → Visual

Todas as simulações utilizam uma pista visual.

A posição física precisa ser convertida para pixels.

Processo:

```txt
metros
↓
pixels por metro
↓
posição em pixels
↓
translateX(...)
```

Funções responsáveis:

```ts
getPixelsPerMeter()
metersToPixels()
renderPosition()
```

---

# Sistema de Animação

A animação trabalha com:

```ts
progress
```

onde:

```txt
0 → início
1 → destino
```

O controlador da animação nunca calcula física.

Ele apenas informa:

```ts
elapsedSeconds
progress
```

A física de cada movimento é responsável por converter:

```txt
tempo
↓
posição
```

---

# Módulo MRU

## Conceito

Movimento Retilíneo Uniforme.

Velocidade constante durante toda a execução.

---

## Entradas

* velocidade
* posição inicial da pista
* posição final da pista
* posição inicial da personagem

---

## Equação

```txt
S = S₀ + v·t
```

---

## Destino

Se:

```txt
v > 0
```

então:

```txt
destino = posição final da pista
```

Se:

```txt
v < 0
```

então:

```txt
destino = posição inicial da pista
```

---

## Tempo total

```txt
t = ΔS / |v|
```

---

## Gráfico

Posição × Tempo

Linha reta.

---

# Módulo MUV

## Conceito

Movimento Uniformemente Variado.

A aceleração permanece constante.

A velocidade varia ao longo do tempo.

---

## Entradas

* aceleração
* velocidade inicial
* posição inicial da pista
* posição final da pista
* posição inicial da personagem

---

## Direção do Movimento

Semelhante ao MRU.

O movimento pode ocorrer:

```txt
esquerda → direita
```

ou

```txt
direita → esquerda
```

dependendo do sinal da velocidade inicial.

---

## Equação Horária da Posição

```txt
S = S₀ + V₀·t + (a·t²)/2
```

---

## Equação da Velocidade

```txt
V = V₀ + a·t
```

---

## Destino

O destino continua sendo um dos extremos da pista:

```txt
posição inicial
ou
posição final
```

dependendo do sentido do movimento.

---

## Tempo Total

O tempo deverá ser calculado resolvendo:

```txt
S = S₀ + V₀·t + (a·t²)/2
```

para o ponto de destino.

Ou seja:

```txt
(a/2)t² + V₀t + (S₀ - destino) = 0
```

utilizando Bhaskara.

Deve ser utilizada a menor raiz positiva válida.

---

## Gráfico

Posição × Tempo

Curva parabólica.

---

## Estrutura Esperada

```txt
muv/
├─ MUVSimulator.tsx
├─ formulas.ts
├─ graph.ts
└─ animate.ts
```

Seguindo exatamente o padrão do MRU.

---

# Módulo Queda Livre

## Conceito

Movimento vertical sob aceleração constante da gravidade.

Sempre ocorre:

```txt
de cima para baixo
```

---

## Entradas

Modo manual:

* altura inicial
* gravidade

Modo simplificado:

* altura inicial
* corpo celeste

Exemplos:

* Terra
* Lua
* Mercúrio
* Vênus
* Marte
* Júpiter
* Saturno
* Urano
* Netuno
* Sol

A seleção automática define:

```txt
g
```

correspondente ao corpo escolhido.

---

## Referencial

Topo:

```txt
altura inicial
```

Base:

```txt
0 m
```

---

## Equação

Considerando:

```txt
V₀ = 0
```

```txt
h = h₀ - (g·t²)/2
```

---

## Tempo Total da Queda

Quando:

```txt
h = 0
```

obtém-se:

```txt
t = √(2h₀/g)
```

---

## Destino

Sempre:

```txt
altura = 0
```

---

## Gráfico

Altura × Tempo

Parábola decrescente.

---

## Representação Visual

Diferente de MRU e MUV.

Enquanto MRU e MUV utilizam:

```txt
translateX(...)
```

a Queda Livre utilizará:

```txt
translateY(...)
```

A conversão continuará utilizando:

```txt
metros → pixels
```

mas aplicada ao eixo vertical.

---

# Objetivo Arquitetural

Todos os módulos devem seguir o mesmo padrão:

```txt
simulação
├─ simulator
├─ formulas
├─ graph
└─ animate
```

onde:

* simulator controla a interface;
* formulas contém a física;
* graph gera dados para o gráfico;
* animate integra a física ao hook de animação.

A infraestrutura compartilhada deve permanecer em:

```txt
useAnimation.ts
utils.ts
PositionTimeChart.tsx
types.ts
```

permitindo reutilização máxima entre MRU, MUV e Queda Livre.
