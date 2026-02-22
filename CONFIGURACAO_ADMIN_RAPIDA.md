# 🔧 CONFIGURAÇÃO RÁPIDA DO ADMIN LOGIN

## Problema
O login admin não funciona porque as variáveis do Supabase não estão configuradas.

## Solução - Passos Rápidos

### 1. Configurar Supabase (5 minutos)

1. Abra o arquivo `.env.local` que acabei de criar
2. Vá ao seu painel do Supabase
3. Em **Project Settings** > **API**
4. Copie os dois valores:
   - **Project URL** (ex: https://abcdefgh.supabase.co)
   - **anon public** key

5. No arquivo `.env.local`, substitua:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_aqui
   ```
   
   Por:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://SEU-PROJETO-REAL.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=SUA_CHAVE_REAL_AQUI
   ```

### 2. Criar Usuário Admin

1. No painel Supabase, vá em **Authentication** > **Users**
2. Clique **"Add user"**
3. Preencha:
   - **Email**: `admin@teresasalon.com`
   - **Password**: `TeresaAdmin2024!` (ou outra senha forte)
   - **Auto confirm**: ✅ marcado
4. Clique **"Save"**

### 3. Adicionar à Tabela Admin

1. Em **Table Editor**, selecione a tabela `admin_users`
2. Clique **"Insert row"**
3. Preencha:
   - **id**: Copie o ID do usuário que você criou (em Authentication > Users)
   - **email**: `admin@teresasalon.com`
4. Clique **"Save"**

### 4. Testar

1. Reinicie o servidor: `npm run dev`
2. Acesse: `http://localhost:3000/auth/login`
3. Use as credenciais que você criou

## Se Ainda Não Funcionar

### Verificar no Console do Navegador:
1. Abra F12
2. Vá para aba **Console**
3. Tente fazer login
4. Veja se há erros vermelhos

### Erros Comuns:

**"Network error"**: Verifique se as URLs do Supabase estão corretas

**"Invalid credentials"**: Verifique email e senha no painel Supabase

**"Not authorized"**: O usuário não está na tabela admin_users

### Solução Alternativa (Temporária)
Se precisar testar urgentemente, posso reverter para o sistema antigo de localStorage enquanto você configura o Supabase.

---

**Depois de configurar, o login admin funcionará corretamente com segurança total!**
