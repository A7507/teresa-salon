# Acesso Admin - Teresa Salon

## 🔐 Credenciais de Acesso

**Email:** `admin@teresasalon.com`  
**Senha:** `TeresaAdmin2024!`

## 📋 Como Configurar o Acesso Admin

### Método 1: Via Supabase Dashboard (Recomendado)

1. **Acessar o Supabase Dashboard**
   - Vá para [supabase.com](https://supabase.com)
   - Faça login com suas credenciais do Supabase
   - Selecione seu projeto do Teresa Salon

2. **Criar Usuário Admin**
   - No menu lateral, vá para **Authentication** → **Users**
   - Clique no botão **"Add user"**
   - Preencha os dados:
     - **Email:** `admin@teresasalon.com`
     - **Password:** `TeresaAdmin2024!`
     - ✅ Marque **"Auto confirm"**
   - Clique em **"Save"**

3. **Verificar Tabela Admin**
   - Vá para **Table Editor** → **admin_users**
   - Verifique se o usuário foi adicionado automaticamente
   - O trigger automático deve ter criado o registro

### Método 2: Via SQL

Execute o script `scripts/004_create_admin_user.sql` no SQL Editor do Supabase.

## 🚀 Como Acessar o Painel Admin

1. **Acessar a página de login**
   - Vá para: `http://localhost:3000/auth/login`
   - Ou no seu domínio: `https://seusite.com/auth/login`

2. **Fazer login**
   - Email: `admin@teresasalon.com`
   - Senha: `TeresaAdmin2024!`
   - Clique em "Sign In with Email"

3. **Acessar o Dashboard**
   - Após login, você será redirecionado para `/admin`
   - Terá acesso completo ao painel administrativo

## 🛡️ Segurança

### 🔒 O Sistema Já Protege Automaticamente:

- **Autenticação obrigatória:** Apenas usuários logados podem acessar `/admin`
- **Verificação de admin:** O layout admin verifica se o usuário está autenticado
- **Redirecionamento automático:** Usuários não autenticados são redirecionados para login
- **Row Level Security:** Políticas de segurança no banco de dados

### 📝 Recursos do Painel Admin:

- **Dashboard:** Estatísticas gerais do salão
- **Appointments:** Gerenciar agendamentos
- **Services:** Editar serviços e preços
- **Gallery:** Gerenciar fotos da galeria
- **Messages:** Ver mensagens de contato

## 🔧 Solução de Problemas

### ❌ "Acesso negado" ou "Não autorizado"
- Verifique se executou o script SQL para criar o usuário
- Confirme se o usuário foi criado no Supabase Authentication
- Verifique se o trigger automático está funcionando

### ❌ "Usuário não encontrado"
- Execute o script `003_auto_admin_trigger.sql` para garantir que o trigger está ativo
- Verifique na tabela `admin_users` se o email está registrado

### ❌ "Erro de autenticação"
- Verifique se as credenciais estão corretas
- Confirme se o usuário está confirmado (auto confirm deve estar marcado)

## 📁 Scripts Relevantes

- `scripts/001_create_tables.sql` - Cria estrutura do banco
- `scripts/002_fix_rls_policies.sql` - Configura políticas de segurança
- `scripts/003_auto_admin_trigger.sql` - Trigger automático para admin
- `scripts/004_create_admin_user.sql` - Cria usuário admin padrão

## 🔄 Fluxo de Autenticação

1. **Login:** Usuário faz login em `/auth/login`
2. **Verificação:** Sistema autentica via Supabase Auth
3. **Trigger:** Automaticamente adiciona usuário à tabela `admin_users`
4. **Acesso:** Usuário ganha acesso ao painel admin
5. **Proteção:** Layout admin verifica autenticação em cada acesso

---

## 🎯 Próximos Passos

1. ✅ Configure o usuário admin no Supabase
2. ✅ Teste o acesso em `/auth/login`
3. ✅ Explore o painel administrativo
4. ✅ Personalize serviços e galeria
5. ✅ Monitore agendamentos e mensagens

**Suporte:** Se tiver problemas, verifique os logs do console e o SQL Editor do Supabase.
