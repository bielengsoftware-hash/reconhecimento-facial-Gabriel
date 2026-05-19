# sprites.py
import pygame
import random
from settings import *

class Player(pygame.sprite.Sprite):
    def __init__(self, all_sprites, bullets):
        super().__init__()
        # Cria uma superfície com fundo transparente (SRCALPHA)
        self.image = pygame.Surface((PLAYER_WIDTH, PLAYER_HEIGHT), pygame.SRCALPHA)
        # Desenha um triângulo verde apontando para cima
        pygame.draw.polygon(self.image, GREEN, [(PLAYER_WIDTH // 2, 0), (0, PLAYER_HEIGHT), (PLAYER_WIDTH, PLAYER_HEIGHT)])
        self.rect = self.image.get_rect()
        self.rect.centerx = WIDTH // 2
        self.rect.bottom = HEIGHT - 20
        self.speedx = 0
        self.all_sprites = all_sprites
        self.bullets = bullets
        self.last_shot = pygame.time.get_ticks()

    def update(self):
        self.speedx = 0
        keystate = pygame.key.get_pressed()
        if keystate[pygame.K_LEFT]:
            self.speedx = -PLAYER_SPEED
        if keystate[pygame.K_RIGHT]:
            self.speedx = PLAYER_SPEED
        # Permite atirar segurando a barra de espaço ou seta para cima
        if keystate[pygame.K_SPACE] or keystate[pygame.K_UP]:
            self.shoot()
        
        self.rect.x += self.speedx
        
        # Limita o movimento às bordas da tela
        if self.rect.right > WIDTH:
            self.rect.right = WIDTH
        if self.rect.left < 0:
            self.rect.left = 0

    def shoot(self):
        now = pygame.time.get_ticks()
        # Só atira se o tempo decorrido desde o último tiro for maior que o SHOOT_DELAY
        if now - self.last_shot > SHOOT_DELAY:
            self.last_shot = now
            bullet = Bullet(self.rect.centerx, self.rect.top)
            self.all_sprites.add(bullet)
            self.bullets.add(bullet)


class Asteroid(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        self.image = pygame.Surface((ASTEROID_WIDTH, ASTEROID_HEIGHT))
        self.image.fill(RED)
        self.rect = self.image.get_rect()
        # Nasce em algum lugar aleatório no topo
        self.rect.x = random.randrange(0, WIDTH - ASTEROID_WIDTH)
        self.rect.y = random.randrange(-100, -40)
        self.speedy = random.randrange(ASTEROID_MIN_SPEED, ASTEROID_MAX_SPEED)

    def update(self):
        self.rect.y += self.speedy
        # Se passar da tela e não houver colisão (que encerra o jogo), destruímos por segurança
        # (A lógica de fim de jogo por passar da tela ficará no main loop)
        if self.rect.top > HEIGHT + 10:
            self.kill()


class Bullet(pygame.sprite.Sprite):
    def __init__(self, x, y):
        super().__init__()
        self.image = pygame.Surface((BULLET_WIDTH, BULLET_HEIGHT))
        self.image.fill(YELLOW)
        self.rect = self.image.get_rect()
        self.rect.bottom = y
        self.rect.centerx = x
        self.speedy = BULLET_SPEED

    def update(self):
        self.rect.y += self.speedy
        # Destrói se sair pelo topo da tela
        if self.rect.bottom < 0:
            self.kill()
