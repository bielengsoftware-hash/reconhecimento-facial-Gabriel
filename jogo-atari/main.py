# main.py
import pygame
import sys
from settings import *
from sprites import Player, Asteroid, Bullet

def main():
    # Inicialização do pygame e criação da janela
    pygame.init()
    pygame.mixer.init() # Opcional: inicializa sons se formos adicionar
    screen = pygame.display.set_mode((WIDTH, HEIGHT))
    pygame.display.set_caption("Space Shooter Atari")
    clock = pygame.time.Clock()
    font_name = pygame.font.match_font('arial')

    def draw_text(surf, text, size, x, y):
        """Função auxiliar para desenhar textos na tela"""
        font = pygame.font.Font(font_name, size)
        text_surface = font.render(text, True, WHITE)
        text_rect = text_surface.get_rect()
        text_rect.topleft = (x, y)
        surf.blit(text_surface, text_rect)

    while True: # Loop Principal do App (Permite Reiniciar)
        # Grupos para gerenciar todos os sprites juntos
        all_sprites = pygame.sprite.Group()
        asteroids = pygame.sprite.Group()
        bullets = pygame.sprite.Group()

        # Instanciando o jogador
        player = Player(all_sprites, bullets)
        all_sprites.add(player)

        # Configurando um evento temporizado para nascer asteroides
        SPAWNASTEROID = pygame.USEREVENT + 1
        current_spawn_time = ASTEROID_SPAWN_TIME
        pygame.time.set_timer(SPAWNASTEROID, current_spawn_time)

        score = 0
        running = True
        level = 1

        # Game Loop
        while running:
            # Define a taxa de FPS
            clock.tick(FPS)
            
            # 1. Processamento de Eventos (Inputs)
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    pygame.quit()
                    sys.exit()
                
                elif event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_SPACE or event.key == pygame.K_UP:
                        player.shoot()
                
                # Evento temporizado
                elif event.type == SPAWNASTEROID:
                    asteroid = Asteroid()
                    # Aumenta a velocidade do asteroide baseado no nível
                    asteroid.speedy += (level - 1)
                    all_sprites.add(asteroid)
                    asteroids.add(asteroid)

            # 2. Atualização
            all_sprites.update()

            # Checando colisões - Tiro acerta Asteroide
            hits = pygame.sprite.groupcollide(asteroids, bullets, True, True)
            for hit in hits:
                score += 10 # Aumenta pontuação
                
                # Lógica de progressão de dificuldade
                new_level = (score // 100) + 1
                if new_level > level:
                    level = new_level
                    # Reduz o tempo de spawn em 10% a cada nível (até um mínimo de 400ms)
                    current_spawn_time = max(400, int(current_spawn_time * 0.9))
                    pygame.time.set_timer(SPAWNASTEROID, current_spawn_time)

            # Checando colisões - Asteroide atinge Jogador
            hits = pygame.sprite.spritecollide(player, asteroids, False)
            if hits:
                running = False # Fim de jogo
                
            # Condição de derrota: Asteroide chega ao fundo da tela
            for asteroid in asteroids:
                if asteroid.rect.top > HEIGHT:
                    running = False

            # 3. Renderização (Draw)
            screen.fill(BLACK)
            all_sprites.draw(screen)
            
            # Desenhando pontuação
            draw_text(screen, f"Score: {score}", 24, 10, 10)

            # Após desenhar tudo, inverte o display
            pygame.display.flip()

        # Loop do jogo acabou (GameOver) - Espera por input
        waiting_for_input = True
        while waiting_for_input:
            clock.tick(FPS)
            screen.fill(BLACK)
            draw_text(screen, "GAME OVER", 64, WIDTH // 2 - 170, HEIGHT // 2 - 80)
            draw_text(screen, f"Final Score: {score}", 22, WIDTH // 2 - 60, HEIGHT // 2)
            draw_text(screen, "Pressione 'R' para reiniciar", 22, WIDTH // 2 - 130, HEIGHT // 2 + 50)
            draw_text(screen, "Ou feche a janela para sair", 18, WIDTH // 2 - 110, HEIGHT // 2 + 90)
            pygame.display.flip()

            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    pygame.quit()
                    sys.exit()
                if event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_r:
                        waiting_for_input = False # Sai do loop de game over e recomeça o jogo

if __name__ == '__main__':
    main()
