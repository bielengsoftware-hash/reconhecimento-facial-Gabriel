# Reconhecimento Facial Gabriel

Um projeto de estudo com exemplos de scripts Python e documentação explicativa. O foco está em pequenos programas didáticos: cálculo de itens com imposto e desconto, verificação de números primos e cálculo de estatísticas básicas.

## Estrutura do projeto

- `index.html` - Página HTML estática de apresentação.
- `teste-assistent-code/` - Pasta contendo os exemplos Python e suas explicações.
  - `debug.py` - Programa que calcula o total de uma compra com imposto e desconto.
  - `num_primos.py` - Função para verificar números primos e testes associados.
  - `refatoracao.py` - Função para calcular total, média, máximo e mínimo de uma lista de números.
  - `explicacao_num_primo.md` - Explicação linha a linha do código de números primos.
  - `explicacao_refatoracao.md` - Explicação linha a linha do código de refatoração.
  - `explicacao-debug.md` - Explicação de erros corrigidos e boas práticas aplicadas no código `debug.py`.

## Descrição dos arquivos

### `debug.py`
Script interativo que:
- pergunta o nome do cliente;
- lê quantidade e preço de três itens;
- calcula subtotal, imposto de 10% e desconto baseado em cupom percentual;
- exibe um recibo formatado no terminal.

### `num_primos.py`
Contém a função `e_primo(n)` que:
- valida se `n` é primo;
- usa otimização testando apenas divisores até a raiz quadrada de `n`;
- evita verificar todos os números pares maiores que 2.

Também inclui um bloco de teste que imprime o resultado para vários números.

### `refatoracao.py`
Define a função `calcular_estatisticas(lista)` que retorna:
- total (`sum`);
- média;
- valor máximo;
- valor mínimo.

O arquivo também demonstra o uso dessa função com uma lista de exemplo.

### Arquivos de explicação

- `explicacao_num_primo.md` - Explica passo a passo a lógica do `num_primos.py`.
- `explicacao_refatoracao.md` - Explica o funcionamento do `refatoracao.py` incluindo cálculo de métricas.
- `explicacao-debug.md` - Aponta erros originais e como foram corrigidos em `debug.py`.

## Como executar

Certifique-se de ter Python 3 instalado.

No terminal, execute:

```bash
python teste-assistent-code/debug.py
python teste-assistent-code/num_primos.py
python teste-assistent-code/refatoracao.py
```

## Observações

- Os scripts são independentes e não requerem bibliotecas externas.
- O projeto é voltado para aprendizado e revisão de lógica básica em Python.
- `index.html` é uma página de apresentação que pode ser aberta em qualquer navegador.

## Recomendações

- Para melhorar a legibilidade e reutilização, considere adicionar funções auxiliares em `debug.py`.
- Para tornar `num_primos.py` mais completo, adicione tratamento de entrada do usuário e validação de dados.
- Para tornar `refatoracao.py` mais robusto, adicione testes unitários com `unittest` ou `pytest`.
