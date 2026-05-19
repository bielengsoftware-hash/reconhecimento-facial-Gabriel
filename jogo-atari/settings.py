# settings.py
# Configurações gerais do jogo

# Dimensões da tela
WIDTH = 800
HEIGHT = 600
FPS = 60

# Cores (R, G, B)
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
RED = (255, 0, 0)
GREEN = (0, 255, 0)
BLUE = (0, 0, 255)
YELLOW = (255, 255, 0)

# Configurações do jogador
PLAYER_SPEED = 5
PLAYER_WIDTH = 50
PLAYER_HEIGHT = 40
SHOOT_DELAY = 250 # Milissegundos entre cada tiro

# Configurações do asteroide
ASTEROID_MIN_SPEED = 1
ASTEROID_MAX_SPEED = 4
ASTEROID_SPAWN_TIME = 1500 # em milissegundos
ASTEROID_WIDTH = 40
ASTEROID_HEIGHT = 40

# Configurações do projétil
BULLET_SPEED = -10 # Negativo porque vai para cima (eixo y inverte)
BULLET_WIDTH = 5
BULLET_HEIGHT = 15
