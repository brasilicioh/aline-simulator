# Aline's Simulator

Projeto escolar desenvolvido para a disciplina de Física (Mecânica Clássica e Termodinâmica) no IFRN — Parnamirim.

**Professora:** Aline Gomes

**Autores:**

| Aluno               | GitHub                                          |
| ------------------- | ----------------------------------------------- |
| Brasilicio Henrique | [brasilicioh](https://github.com/brasilicioh)   |
| Guilherme Aleixo    | [G-Aleixo](https://github.com/G-Aleixo)         |
| Jade Raquel         | [JadeRaquel](https://github.com/JadeRaquel) |
| Kaio Henrique       | [PC123456789N](https://github.com/PC123456789N) |
| Talita Kauane       | [TalitaKauane](https://github.com/TalitaKauane) |

## Descrição

Simulador educativo de cinemática que permite calcular e visualizar movimentos básicos: Movimento Retilíneo Uniforme (MRU), Movimento Uniformemente Variado (MUV) e Queda Livre. O objetivo é apoiar o aprendizado com entradas controláveis (posições, velocidades, acelerações, gravidade) e mostrar resultados numéricos e gráficos.

## Objetivos

- Fornecer cálculo automático das grandezas envolvidas em MRU, MUV e Queda Livre.
- Permitir alterar a aceleração da gravidade para simular diferentes planetas ou ambientes.
- Ser uma ferramenta didática clara e de fácil uso para estudantes.

## Funcionalidades

- Cálculo de velocidade média e posição no MRU.
- Cálculo de aceleração, velocidade e posição no MUV.
- Cálculo do tempo de queda, velocidade e distância na Queda Livre com gravidade configurável.
- Interface web leve construída com Vite + React + TypeScript.

## Fórmulas

As fórmulas principais utilizadas no simulador são apresentadas abaixo.

### MRU (Movimento Retilíneo Uniforme)

- Velocidade média (constante): $v = \dfrac{\Delta S}{\Delta t}$
- Posição em função do tempo (função horária):
  $$S(t) = S_0 + V\,t$$

Onde $S_0$ é a posição inicial, $V$ é a velocidade (constante) e $t$ é o tempo.

### MUV (Movimento Uniformemente Variado)

- Aceleração média (constante): $a = \dfrac{\Delta V}{\Delta t}$
- Velocidade em função do tempo:
  $$V(t) = V_0 + a\,t$$
- Posição em função do tempo (função horária):
  $$S(t) = S_0 + V_0\,t + \tfrac{1}{2}a\,t^2$$
- Relação de Torricelli (sem tempo):
  $$V^2 = V_0^2 + 2a\Delta S$$

Onde $V_0$ e $S_0$ são velocidade e posição iniciais, $a$ é a aceleração constante e $\Delta s = s - s_0$.

### Queda Livre

Assumindo aceleração vertical constante igual a $g$ (positiva em módulo):

- Altura/posição em função do tempo (partindo do repouso vertical inicial $V_{0y}=0$):
  $$H(t) = H_0 - \tfrac{1}{2}g\,t^2$$
- Tempo de queda a partir de uma altura $H$ (sem velocidade inicial vertical):
  $$t = \sqrt{\dfrac{2H}{g}}$$
- Velocidade ao atingir o solo:
  $$v = g\,t = \sqrt{2gH}$$

Observação: sinais e convenções (para cima/para baixo) dependem da implementação; no simulador permitimos alterar o valor de $g$ para simular diferentes planetas.

## Tecnologias

- Vite
- React
- TypeScript
- HTML / CSS

## Como rodar o projeto

1. Clone o repositório:

```bash
git clone https://github.com/brasilicioh/aline-simulator.git
```

2. Acesse o repositório:

```bash
cd aline-simulator
```

3. Instale as dependências:

```bash
npm install
```

4. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

5. Abra o navegador em `http://localhost:5173` (ou na porta indicada no terminal).

## Observações

- Este projeto foi produzido como trabalho escolar e tem finalidade pedagógica.
