# 🛡️ Guia de Segurança - Teresa Salon

## 🔐 Variáveis de Ambiente

### Configuração Obrigatória
1. Copie `.env.example` para `.env.local`
2. Configure as variáveis com valores reais
3. **NUNCA** faita commit do arquivo `.env.local`

### Variáveis Críticas
- `NEXT_PUBLIC_SUPABASE_URL`: URL do seu projeto Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Chave pública do Supabase
- `STRIPE_SECRET_KEY`: Chave secreta do Stripe (modo teste)
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Chave pública do Stripe
- `STRIPE_WEBHOOK_SECRET`: Secret para webhooks do Stripe

## 👥 Acesso Admin

### Criação de Usuário Admin
1. Acesse Supabase Dashboard > Authentication > Users
2. Crie usuário com email `admin@teresasalon.com`
3. Use senha forte (mínimo 12 caracteres)
4. Marque "Auto confirm"
5. O usuário será automaticamente admin pelo trigger

### Segurança de Senha
- Mínimo 12 caracteres
- Inclua números, letras maiúsculas e símbolos
- Troque regularmente
- Não compartilhe credenciais

## 🚨 Regras de Segurança

### No Código
- ✅ Middleware protege rotas `/admin`
- ✅ Validação de sessão server-side
- ✅ RLS (Row Level Security) no Supabase
- ❌ Senhas nunca hardcoded
- ❌ Chaves sensíveis apenas em variáveis de ambiente

### No Git
- ✅ `.gitignore` atualizado para bloquear arquivos sensíveis
- ✅ Arquivos de configuração removidos do repositório
- ✅ Apenas `.env.example` no versionamento

### No Deploy (Vercel)
- Configure variáveis de ambiente no painel Vercel
- Use modo teste para Stripe em desenvolvimento
- Ative monitoramento e alertas

## 🔍 Verificações de Segurança

### Antes do Deploy
1. [ ] Remover arquivos sensíveis
2. [ ] Configurar `.env.local` corretamente
3. [ ] Testar autenticação admin
4. [ ] Verificar RLS no Supabase
5. [ ] Configurar webhooks Stripe

### Monitoramento
- Logs de acesso admin
- Tentativas de login falhas
- Transações Stripe suspeitas
- Acesso não autorizado

## 📞 Contato de Segurança
Se encontrar vulnerabilidades, reporte imediatamente.
