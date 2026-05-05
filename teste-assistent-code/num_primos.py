def e_primo(n):
    """Verifica se um número é primo.

    Args:
        n (int): Número inteiro a ser verificado.

    Returns:
        bool: True se o número for primo, False caso contrário.
    """
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