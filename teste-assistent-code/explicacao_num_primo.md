# Explicação Linha a Linha do Código de Números Primos

## Código Python

```python
def e_primo(n):
    """Verifica se um número é primo."""
    if n < 2:
        return False
    if n == 2:
        return True
    if n % 2 == 0:
        return False
    
    for i in range(3, int(n**0.5) + 1, 2):
        if n % i == 0:
            return False
    return True


# Testes
if __name__ == "__main__":
    numeros = [1, 2, 3, 4, 5, 17, 18, 19, 20, 100]
    for num in numeros:
        print(f"{num} é primo? {e_primo(num)}")
```

---

## Explicação Detalhada

### Linha 1: `def e_primo(n):`
- Define uma função chamada `e_primo` que recebe um parâmetro `n`
- `n` é o número que será verificado se é primo ou não

### Linha 2: `"""Verifica se um número é primo."""`
- Docstring (documentação) da função
- Explica brevemente o propósito da função
- Usada para documentação e não afeta a execução do código

### Linha 3: `if n < 2:`
- Verifica se o número é menor que 2
- Números menores que 2 (0 e 1) não são considerados primos por definição

### Linha 4: `return False`
- Retorna `False` (falso) se o número for menor que 2
- Isso encerra a função imediatamente

### Linha 5: `if n == 2:`
- Verifica se o número é exatamente igual a 2

### Linha 6: `return True`
- Retorna `True` (verdadeiro) porque 2 é o único número primo par
- 2 é especial porque é divisível apenas por 1 e por ele mesmo

### Linha 7: `if n % 2 == 0:`
- Verifica se o número é par (divisível por 2)
- O operador `%` retorna o resto da divisão

### Linha 8: `return False`
- Retorna `False` se o número for par (maior que 2)
- Todos os números pares maiores que 2 não são primos

### Linha 10: `for i in range(3, int(n**0.5) + 1, 2):`
- Loop que iterage sobre números ímpares a partir de 3
- `range(3, int(n**0.5) + 1, 2)` gera: 3, 5, 7, 9, ... até a raiz quadrada de n
- `int(n**0.5)` calcula a raiz quadrada inteira de n
- O `+ 1` garante que a raiz quadrada seja incluída no intervalo
- O passo `2` garante que apenas números ímpares sejam testados

### Linha 11: `if n % i == 0:`
- Verifica se `n` é divisível pelo número atual `i`
- Se o resto da divisão for 0, significa que `i` é um divisor de `n`

### Linha 12: `return False`
- Retorna `False` se encontrar um divisor
- Isso significa que o número não é primo

### Linha 13: `return True`
- Retorna `True` se o loop terminar sem encontrar divisores
- O número é primo

### Linha 16: `# Testes`
- Comentário indicando a seção de testes

### Linha 17: `if __name__ == "__main__":`
- Verifica se o arquivo está sendo executado diretamente
- Evita que o código de teste seja executado quando importado como módulo

### Linha 18: `numeros = [1, 2, 3, 4, 5, 17, 18, 19, 20, 100]`
- Cria uma lista com números para testar a função
- Inclui números primos (2, 3, 5, 17, 19) e não primos (1, 4, 18, 20, 100)

### Linha 19: `for num in numeros:`
- Loop que iterage sobre cada número na lista

### Linha 20: `print(f"{num} é primo? {e_primo(num)}")`
- Imprime o resultado de cada verificação
- Usa f-string para formatar a saída
- Chama a função `e_primo(num)` para cada número

---

## Resumo da Lógica

1. **Casos especiais**: 0, 1 não são primos; 2 é primo
2. **Números pares**: Qualquer número par > 2 não é primo
3. **Divisores até raiz quadrada**: Se não há divisor até √n, o número é primo
4. **Otimização**: Testa apenas números ímpares (3, 5, 7, ...) porque já eliminamos os pares