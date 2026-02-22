# 🎯 GUIA COMPLETO - LOGIN ADMIN FUNCIONAL

## ✅ **O QUE JÁ ESTÁ PRONTO**

Seu sistema de login administrativo está **100% funcional** com:

### 🔐 **Sistema de Login**
- **Página de Login:** `/auth/login`
- **Proteção de Rotas:** Middleware que redireciona para login se não autenticado
- **Painel Admin Completo:** Dashboard com estatísticas e gerenciamento

### 📸 **Galeria de Fotos**
- **Upload via URL:** Adicione fotos facilmente
- **Gerenciamento Completo:** Editar, deletar, reordenar
- **Controle de Visibilidade:** Ativar/desativar fotos

### 📅 **Appointments**
- **Visualização Completa:** Todos os agendamentos
- **Gerenciamento de Status:** Pending, Confirmed, Completed, Cancelled
- **Informações do Cliente:** Nome, email, telefone, serviço

---

## 🚀 **PASSO 1: CONFIGURAR SUPABASE**

### **1. Criar Projeto Supabase**
1. Acesse [supabase.com](https://supabase.com)
2. Faça login ou crie conta
3. Clique em **"New Project"**
4. Escolha organização e nome do projeto (ex: "teresa-salon")
5. Aguarde a criação (2-3 minutos)

### **2. Obter Credenciais**
1. No seu projeto, vá em **Settings** → **API**
2. Copie os dois valores:
   - **Project URL:** `https://xxxxxxxx.supabase.co`
   - **anon public key:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### **3. Configurar Arquivo .env.local**
1. Abra o arquivo `.env.local` na pasta do projeto
2. Substitua as credenciais:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://SEU-PROJETO.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=SUA_CHAVE_ANONIMA_AQUI
   ```

---

## 🗄️ **PASSO 2: CONFIGURAR BANCO DE DADOS**

### **Executar Scripts SQL**
No Supabase Dashboard, vá em **SQL Editor** e execute em ordem:

1. **script 001:** `scripts/001_create_tables.sql`
2. **script 002:** `scripts/002_fix_rls_policies.sql`
3. **script 003:** `scripts/003_auto_admin_trigger.sql`
4. **script 004:** `scripts/004_create_admin_user.sql`

### **Criar Usuário Admin**
1. Vá em **Authentication** → **Users**
2. Clique em **"Add user"**
3. Preencha:
   - **Email:** `admin@teresasalon.com`
   - **Password:** `TeresaAdmin2024!`
   - ✅ Marque **"Auto confirm"**
4. Clique em **"Save"**

> **Importante:** O trigger automático vai adicionar este usuário à tabela `admin_users`

---

## 🏃‍♂️ **PASSO 3: INICIAR O SITE**

### **Usar o Script Criado**
1. **Clique com o direito** no arquivo `iniciar.ps1`
2. Selecione **"Run with PowerShell"**
3. Siga as instruções

### **Ou Manualmente**
```powershell
# Instalar dependências
npm install

# Iniciar servidor
npm run dev
```

### **Acessar o Site**
- **Site Principal:** http://localhost:3000
- **Login Admin:** http://localhost:3000/auth/login

---

## 🔐 **CREDENCIAIS DE ACESSO**

### **Login Administrativo**
- **Email:** `admin@teresasalon.com`
- **Senha:** `TeresaAdmin2024!`

### **Funcionalidades do Painel Admin**

#### 📊 **Dashboard** (`/admin`)
- Estatísticas em tempo real
- Appointments recentes
- Revenue, gallery items, messages

#### 📅 **Appointments** (`/admin/appointments`)
- Lista completa de agendamentos
- Filtros por status
- Ações rápidas (confirmar, cancelar, completar)
- Informações detalhadas dos clientes

#### 📸 **Gallery** (`/admin/gallery`)
- Adicionar novas fotos
- Editar títulos e descrições
- Reordenar fotos
- Ativar/desativar fotos

#### 📧 **Messages** (`/admin/messages`)
- Visualizar mensagens de contato
- Marcar como lidas/não lidas
- Gerenciar comunicação com clientes

---

## 📸 **COMO ADICIONAR FOTOS**

### **Método 1: Upload via URL**
1. Faça upload das fotos para um serviço como [Imgur](https://imgur.com/upload)
2. Copie as URLs das imagens
3. No painel admin → Gallery → "Add Image"
4. Preencha:
   - **Title:** Ex: "Urban Braided Elegance"
   - **Image URL:** Cole a URL da imagem
   - **Description:** Descrição opcional
   - **Display Order:** Ordem de exibição

### **Método 2: Usar Script Local**
1. Execute o arquivo `adicionar-fotos.bat`
2. Ele criará a pasta `public/gallery`
3. Adicione suas fotos nessa pasta
4. As fotos aparecerão automaticamente

---

## 🎯 **TESTE FINAL**

### **Verifique se tudo funciona:**

1. ✅ **Site abre** em localhost:3000
2. ✅ **Login admin** funciona com as credenciais
3. ✅ **Dashboard** mostra estatísticas
4. ✅ **Appointments** lista os agendamentos
5. ✅ **Gallery** permite adicionar/editar fotos
6. ✅ **Messages** mostra contatos recebidos

---

## 🚨 **SOLUÇÃO DE PROBLEMAS**

### **Login não funciona:**
- Verifique se o `.env.local` está configurado corretamente
- Confirme se executou todos os scripts SQL
- Verifique se o usuário admin foi criado no Supabase

### **Fotos não aparecem:**
- Verifique se as URLs estão corretas e acessíveis
- Confirme se as fotos estão marcadas como "active"
- Teste as URLs diretamente no navegador

### **Appointments não aparecem:**
- Verifique se as políticas RLS foram aplicadas
- Confirme se a tabela appointments tem dados
- Verifique o console do navegador por erros

---

## 🎉 **RESULTADO ESPERADO**

Após seguir este guia você terá:

🌟 **Site Profissional Completo:**
- Design moderno e responsivo
- Sistema de agendamento funcional
- Galeria de imagens gerenciável
- Sistema de pagamento integrado

🔧 **Painel Admin Poderoso:**
- Login seguro com credenciais próprias
- Gerenciamento completo de appointments
- Sistema de galeria com upload fácil
- Comunicação centralizada com clientes

💼 **Funcionalidades Empresariais:**
- Dashboard com métricas importantes
- Gestão de status de appointments
- Controle total sobre conteúdo
- Interface intuitiva e profissional

---

## 📞 **SUPORTE RÁPIDO**

### **Arquivos Importantes:**
- `iniciar.ps1` - Script para iniciar tudo
- `.env.local` - Configurações do Supabase
- `GUIA_ADMIN_COMPLETO.md` - Este guia

### **Comandos Úteis:**
```powershell
# Verificar se Node.js está instalado
node --version

# Instalar dependências
npm install

# Iniciar desenvolvimento
npm run dev

# Construir para produção
npm run build
```

---

**🎯 SEU SISTEMA ADMIN ESTÁ 100% PRONTO!**

Siga este guia passo a passo e você terá um sistema administrativo completo e profissional funcionando em minutos!
