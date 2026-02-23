# 🚀 Guia de Configuração - Teresa Salon

## 📋 O QUE JÁ ESTÁ PRONTO ✅

### ✅ **Sistema Completo:**
- 🔐 **Login Admin** com credenciais funcionais
- 📸 **Galeria** com upload de imagens
- 💳 **Pagamento** com Stripe + Transferência Bancária
- 📧 **Email Automático** com instruções de pagamento
- 📊 **Dashboard** para gerenciar tudo
- 📱 **Design Responsivo** e moderno

### ✅ **Arquivos Criados:**
- `ADMIN_ACCESS.md` - Guia de acesso admin
- `GALLERY_UPLOAD_GUIDE.md` - Como adicionar fotos
- `ENV_SETUP.txt` - Template de configuração
- Scripts SQL completos para o banco

---

## 🔧 **PASSO 1: Criar Arquivo .env.local**

### **O que fazer:**
1. **Crie o arquivo** `.env.local` na pasta raiz
2. **Copie e cole** o conteúdo do `ENV_SETUP.txt`
3. **Substitua** com suas credenciais reais

### **Onde obter credenciais:**

#### **Para Supabase:**
1. Vá para [supabase.com](https://supabase.com)
2. Faça login ou crie uma conta
3. Crie um novo projeto
4. Vá em **Project Settings** → **API**
5. Copie:
   - **Project URL**
   - **anon public** key

#### **Para Stripe (Opcional):**
1. Vá para [dashboard.stripe.com](https://dashboard.stripe.com)
2. Faça login ou crie conta
3. Vá em **Developers** → **API keys**
4. Copie as chaves de teste

### **Exemplo do arquivo .env.local:**
```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-aqui
```

---

## 🚀 **PASSO 2: Instalar Dependências**

### **Execute no terminal:**
```bash
cd "c:/Users/gleme/OneDrive/Desktop/Site para mae"
npm install
```

### **Se der erro:**
```bash
npm install --force
# ou
npm install --legacy-peer-deps
```

---

## 🗄️ **PASSO 3: Configurar Banco de Dados**

### **Execute os scripts SQL em ordem:**
1. `001_create_tables.sql`
2. `002_fix_rls_policies.sql` 
3. `003_auto_admin_trigger.sql`
4. `004_create_admin_user.sql`

### **Como executar:**
1. Vá ao **Supabase Dashboard**
2. **SQL Editor**
3. Cole e execute cada script

---

## 🏃‍♂️ **PASSO 4: Iniciar o Servidor**

### **Execute:**
```bash
npm run dev
```

### **Acesse:**
- **Site:** `http://localhost:3000`
- **Admin:** `http://localhost:3000/auth/login`

---

## 🔐 **CREDENCIAIS DE ACESSO**

### **Login Admin:**
- **Email:** `admin@teresasalon.com`
- **Senha:** `TeresaAdmin2024!`

### **Dados Bancários para Transferência:**
- **Account Holder:** Teresa Salon
- **Bank:** RBC Royal Bank
- **Transit Number:** 00352
- **Institution Number:** 003
- **Account Number:** 1001234
- **Valor:** $20 CAD

---

## 📸 **PASSO 5: Adicionar Fotos à Galeria**

### **Método Fácil (Painel Admin):**
1. Faça login no admin
2. Vá para **Gallery**
3. Clique em **Add Image**
4. Faça upload das 4 fotos para [Imgur](https://imgur.com/upload)
5. Cole as URLs no formulário
6. Preencha títulos e descrições
7. Salve

### **Títulos Sugeridos:**
- "Urban Braided Elegance"
- "Modern City Style Braids"
- "Chic Contemporary Braids"
- "Sophisticated Urban Look"

---

## 🧪 **TESTE FINAL**

### **Verifique se tudo funciona:**
1. ✅ **Site abre** em `localhost:3000`
2. ✅ **Login admin** funciona
3. ✅ **Galeria** mostra as fotos
4. ✅ **Booking** completo funciona
5. ✅ **Pagamento** via transferência funciona
6. ✅ **Email** com instruções é enviado

---

## 🚨 **SOLUÇÃO DE PROBLEMAS**

### **Erros TypeScript:**
- São normais sem o `.env.local`
- Desaparecem após configurar

### **Login não funciona:**
- Verifique se `.env.local` foi criado
- Confirme credenciais do Supabase
- Reinicie o servidor

### **Fotos não aparecem:**
- Verifique se as URLs estão corretas
- Confirme se as imagens estão públicas
- Teste as URLs no navegador

### **Pagamento não funciona:**
- Verifique configuração do Stripe (se usar)
- Confirme se os scripts SQL foram executados
- Teste com transferência bancária

---

## 🎯 **RESULTADO ESPERADO**

Após seguir todos os passos você terá:

🌟 **Site Profissional Completo:**
- Design moderno e responsivo
- Sistema de agendamento funcional
- Galeria de imagens bonita
- Sistema de pagamento completo

🔧 **Painel Admin Poderoso:**
- Gerencie agendamentos
- Adicione/edite serviços
- Gerencie galeria
- Veja mensagens de contato

💰 **Sistema de Pagamento:**
- Stripe para cartões
- Transferência bancária
- Email automático com instruções
- Status de pagamento no dashboard

---

## 📞 **SUPORTE**

### **Se precisar de ajuda:**
1. Verifique os logs no terminal
2. Confirme se todos os passos foram seguidos
3. Teste cada componente individualmente

### **Arquivos Importantes:**
- `ADMIN_ACCESS.md` - Detalhes do acesso
- `GALLERY_UPLOAD_GUIDE.md` - Guia de fotos
- `ENV_SETUP.txt` - Template de configuração

---

**🎉 SEU SITE ESTÁ PRONTO PARA USO!**

Siga este guia passo a passo e em 10 minutos você terá um site profissional completo funcionando!
