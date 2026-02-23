-- Limpar serviços duplicados e manter apenas os originais

-- Deletar todos os serviços
DELETE FROM services;

-- Reiniciar a sequência de IDs
TRUNCATE TABLE services RESTART IDENTITY;

-- Inserir apenas os 5 serviços corretos
INSERT INTO services (name, description, price, duration_minutes, sort_order) VALUES
  ('Knotless Braids', 'Seamless, lightweight braids that start with your natural hair for a more natural look and less tension on the scalp.', 120.00, 180, 1),
  ('Box Braids', 'Classic protective style with individual braids sectioned into square-shaped parts.', 100.00, 150, 2),
  ('Cornrows', 'Traditional braids that are braided flat to the scalp in straight lines or intricate designs.', 60.00, 90, 3),
  ('Fulani Braids', 'Elegant style featuring a unique pattern of braids with beads and accessories.', 90.00, 120, 4),
  ('Twist Braids', 'Two-strand twists that create a beautiful, natural-looking protective style.', 80.00, 120, 5);

-- Verificar resultado
SELECT COUNT(*) as total_servicos FROM services;
