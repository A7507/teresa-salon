-- Corrigir constraint da tabela appointments
-- Adicionar 'pending_payment' aos valores permitidos

-- Primeiro, remover a constraint antiga
ALTER TABLE appointments DROP CONSTRAINT IF EXISTS appointments_status_check;

-- Adicionar a constraint correta com todos os status
ALTER TABLE appointments ADD CONSTRAINT appointments_status_check 
  CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled', 'pending_payment'));

-- Verificar estrutura da tabela
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'appointments' 
ORDER BY ordinal_position;
