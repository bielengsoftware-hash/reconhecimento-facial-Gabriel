# Depuração do Código debug.py

## Erros Identificados e Corrigidos

### Erro 1: String sem aspas (Linha 7)
**Código original:**
```python
item1 = float(input(Preço do item 1? ))
```

**Problema:** A mensagem do `input()` estava sem aspas, causando erro de sintaxe.

**Código corrigido:**
```python
item1 = float(input("Preço do item 1? "))
```

---

### Erro 2: Tipo de dado incorreto (Linha 22)
**Código original:**
```python
desconto_cupom = (input("Você tem um cupom de desconto? (Digite o percentual ou 0): "))
```

**Problema:** O `input()` retorna uma string, mas o código tentava fazer cálculos matemáticos com ela. Isso causaria erro ao tentar dividir uma string por 100.

**Código corrigido:**
```python
desconto_cupom = float(input("Você tem um cupom de desconto? (Digite o percentual ou 0): "))
```

---

### Erro 3: F-string faltando (Linha 35)
**Código original:**
```python
print(" Item 2:        R$ {total_item2:.2f}")
```

**Problema:** A string não tinha o prefixo `f`, então as variáveis não eram interpretadas e apareciam literalmente.

**Código corrigido:**
```python
print(f" Item 2:        R$ {total_item2:.2f}")
```

---

### Erro 4: Indentação do if (Linha 40)
**Código original:**
```python
if desconto_cupom > 0: 
print(f" Desconto ({desconto_cupom:.0f}%): -R$ {desconto:.2f}")
```

**Problema:** O `print` dentro do `if` não estava indentado, causando erro de indentação.

**Código corrigido:**
```python
if desconto_cupom > 0: 
    print(f" Desconto ({desconto_cupom:.0f}%): -R$ {desconto:.2f}")
```

---

## Resumo dos Erros

| Linha | Erro | Tipo |
|-------|------|------|
| 7 | String sem aspas | Sintaxe |
| 22 | `input()` sem conversão para float | Tipo |
| 35 | F-string faltando | Sintaxe |
| 40 | Indentação incorreta | Indentação |

## Boas Práticas Aplicadas na Correção

1. **Conversão de tipos**: Sempre converter `input()` para o tipo adequado (`int()` ou `float()`)
2. **F-strings**: Usar prefixo `f` em todas as strings que contêm variáveis
3. **Indentação**: Manter consistência na indentação (4 espaços)
4. **Mensagens**: Colocar todas as mensagens entre aspas
5. **Comentário**: Atualizar o comentário do cabeçalho para "CÓDIGO CORRIGIDO"