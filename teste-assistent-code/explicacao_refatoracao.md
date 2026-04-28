# Explicação Linha a Linha do Código refatoracao.py

## Código Python

```python
def c(l):
    t=0
    for i in range(len(l)):
        t=t+l[i]
    m=t/len(l)
    mx=l[0]
    mn=l[0]
    for i in range(len(l)):
        if l[i]>mx:
            mx=l[i]
        if l[i]<mn:
            mn=l[i]
    return t,m,mx,mn

x=[23,7,45,2,67,12,89,34,56,11]
a,b,c2,d=c(x)
print("total:",a)
print("media:",b)
print("maior:",c2)
print("menor:",d)
```

---

## Explicação Detalhada

### Linha 1: `def c(l):`
- Define uma função chamada `c` (abreviação de "calcular")
- Recebe um parâmetro `l` que é uma lista de números
- A função calcula várias estatísticas da lista

### Linha 2: `t=0`
- Inicializa a variável `t` (total) com valor 0
- Esta variável armazenará a soma de todos os elementos

### Linha 3: `for i in range(len(l)):`
- Inicia um loop que iterage sobre os índices da lista
- `len(l)` retorna o tamanho da lista
- `range(len(l))` gera índices de 0 até tamanho-1

### Linha 4: `t=t+l[i]`
- A cada iteração, adiciona o elemento da posição `i` ao total
- Equivalente a: `t += l[i]`
- Ao final do loop, `t` contém a soma de todos os elementos

### Linha 5: `m=t/len(l)`
- Calcula a média (`m`) dividindo o total pelo número de elementos
- `t` é o total e `len(l)` é a quantidade de elementos

### Linha 6: `mx=l[0]`
- Inicializa a variável `mx` (máximo) com o primeiro elemento da lista
- Assume que o primeiro elemento é o maior inicialmente

### Linha 7: `mn=l[0]`
- Inicializa a variável `mn` (mínimo) com o primeiro elemento da lista
- Assume que o primeiro elemento é o menor inicialmente

### Linha 8: `for i in range(len(l)):`
- Segundo loop que iterage sobre todos os índices da lista
- Este loop encontra o maior e menor valor

### Linha 9: `if l[i]>mx:`
- Verifica se o elemento atual é maior que o máximo atual

### Linha 10: `mx=l[i]`
- Atualiza o valor máximo se encontrou um maior

### Linha 11: `if l[i]<mn:`
- Verifica se o elemento atual é menor que o mínimo atual

### Linha 12: `mn=l[i]`
- Atualiza o valor mínimo se encontrou um menor

### Linha 13: `return t,m,mx,mn`
- Retorna 4 valores: total, média, máximo e mínimo
- Python permite retornar múltiplos valores como uma tupla

### Linha 15: `x=[23,7,45,2,67,12,89,34,56,11]`
- Cria uma lista `x` com 10 números para testar
- Números: 23, 7, 45, 2, 67, 12, 89, 34, 56, 11

### Linha 16: `a,b,c2,d=c(x)`
- Chama a função `c` passando a lista `x`
- Desempacota os 4 valores retornados em variáveis separadas:
  - `a` = total (344)
  - `b` = média (34.4)
  - `c2` = máximo (89)
  - `d` = mínimo (2)

### Linha 17: `print("total:",a)`
- Imprime o valor total

### Linha 18: `print("media:",b)`
- Imprime o valor da média

### Linha 19: `print("maior:",c2)`
- Imprime o valor máximo

### Linha 20: `print("menor:",d)`
- Imprime o valor mínimo

---

## Resumo da Lógica

A função `c(l)` calcula 4 estatísticas de uma lista:
1. **Total (`t`)**: Soma de todos os elementos
2. **Média (`m`)**: Total dividido pela quantidade de elementos
3. **Máximo (`mx`)**: Maior valor da lista
4. **Mínimo (`mn`)**: Menor valor da lista

O código usa dois loops:
- Primeiro loop: calcula a soma
- Segundo loop: encontra máximo e mínimo

**Resultado esperado:**
```
total: 344
media: 34.4
maior: 89
menor: 2
```