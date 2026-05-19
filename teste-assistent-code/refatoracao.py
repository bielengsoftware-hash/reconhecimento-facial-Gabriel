def calcular_estatisticas(lista):
    """
    Calcula estatísticas básicas de uma lista de números.
    
    Args:
        lista: Lista de números
        
    Returns:
        Tupla com: (total, média, máximo, mínimo)
    """
    if not lista:
        raise ValueError("A lista não pode estar vazia")
    
    total = sum(lista)
    media = total / len(lista)
    maximo = max(lista)
    minimo = min(lista)
    
    return total, media, maximo, minimo


# Teste
numeros = [23, 7, 45, 2, 67, 12, 89, 34, 56, 11]
total, media, maximo, minimo = calcular_estatisticas(numeros)

print("total:", total)
print("media:", media)
print("maior:", maximo)
print("menor:", minimo)