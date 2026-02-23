# 🎯 GUIA - ALTERAR PREÇOS E FUNDO PRETO

## 📋 **O QUE ESTÁ PRONTO:**

✅ **Sistema de Preços Local**
- Preços salvos em localStorage
- Alteração via painel admin
- Atualização automática no site

✅ **Fundo do Site**
- Tema escuro já configurado
- Fundo preto em todo o site
- Interface elegante e profissional

---

## 🚀 **COMO ALTERAR PREÇOS**

### **Método 1: Painel Admin (Recomendado)**

1. **Faça login no admin:**
   - Acesse: `http://localhost:3000/auth/login`
   - Email: `admin@teresasalon.com`
   - Senha: `TeresaAdmin2024!`

2. **Vá para Services:**
   - No menu lateral, clique em "Services"

3. **Edite os preços:**
   - Clique no botão "Edit" de qualquer serviço
   - Altere o preço no campo "Price ($)"
   - Clique em "Update Service"

4. **Confirme as alterações:**
   - Os preços serão atualizados automaticamente
   - Recarregue a página principal para ver

### **Método 2: Script Automático**

1. **Execute o script de preços:**
   - Acesse o site: `http://localhost:3000`
   - Abra o console (F12)
   - Copie e cole o conteúdo do arquivo `alterar-precos.js`
   - Pressione Enter para executar

2. **Use as funções disponíveis:**
   ```javascript
   alterarPrecos()              // Altera para preços sugeridos
   reverterPrecos()             // Reverte para preços originais
   definirPrecosPersonalizados() // Define preços personalizados
   ```

3. **Exemplo de uso:**
   ```javascript
   // Para preços personalizados
   definirPrecosPersonalizados()
   // Digite: Knotless Braids:180,Box Braids:140,Cornrows:100
   ```

---

## 🎨 **SOBRE O FUNDO DO SITE**

### **Cores Configuradas:**
- **Fundo principal:** `oklch(0.08_0_0)` (preto quase puro)
- **Texto principal:** `oklch(0.98_0_0)` (branco)
- **Cards:** `oklch(0.1_0_0)` (branco)
- **Destaques:** `oklch(0.78_0.12_85)` (dourado)

### **Estrutura de Temas:**
```css
:root {
  --background: oklch(0.08_0_0);        /* Preto */
  --foreground: oklch(0.98_0_0);      /* Branco */
  --primary: oklch(0.78_0.12_85);    /* Dourado */
}

.dark {
  --background: oklch(0.145_0_0);      /* Preto escuro */
  --foreground: oklch(0.985_0_0);    /* Branco suave */
}
```

---

## 📊 **PREÇOS CONFIGURADOS**

### **Preços Padrão:**
- **Knotless Braids:** $120
- **Box Braids:** $100
- **Cornrows:** $60
- **Fulani Braids:** $90
- **Twist Braids:** $80

### **Preços Sugeridos (para aumento):**
- **Knotless Braids:** $150 (+25%)
- **Box Braids:** $120 (+20%)
- **Cornrows:** $80 (+33%)
- **Fulani Braids:** $110 (+22%)
- **Twist Braids:** $100 (+25%)

---

## 🔧 **ONDE OS PREÇOS SÃO USADOS**

### **1. Componente de Services (Site Principal)**
- Arquivo: `components/services.tsx`
- Busca do localStorage
- Exibição automática das atualizações

### **2. Painel Admin de Services**
- Arquivo: `app/admin/services/page.tsx`
- CRUD completo via localStorage
- Validação e persistência automática

### **3. Formulário de Agendamento**
- Arquivo: `components/booking.tsx`
- Usa os preços mais recentes do localStorage
- Cálculo automático do total

---

## 🎯 **FUNCIONALIDADES DISPONÍVEIS**

### **No Painel Admin:**
✅ **Adicionar Serviços** - Novos serviços com preço e descrição  
✅ **Editar Preços** - Alterar preço de qualquer serviço existente  
✅ **Ativar/Desativar** - Controle de visibilidade dos serviços  
✅ **Excluir Serviços** - Remover serviços indesejados  
✅ **Reordenar** - Organizar ordem de exibição  

### **No Site Principal:**
✅ **Atualização Automática** - Preços atualizados em tempo real  
✅ **Interface Responsiva** - Funciona em todos os dispositivos  
✅ **Tema Escuro** - Fundo preto elegante e moderno  
✅ **Cálculo Automático** - Totais atualizados nos formulários  

---

## 🔄 **FLUXO COMPLETO DE ATUALIZAÇÃO**

1. **Acessar painel admin**
2. **Editar serviço desejado**
3. **Alterar preço**
4. **Salvar alterações**
5. **Recarregar site principal**
6. **Verificar novo preço**

---

## 📱 **TESTE RÁPIDO**

### **Para Testar Preços:**
1. Execute o script `alterar-precos.js` no console
2. Vá para a página de serviços
3. Verifique se os preços foram atualizados
4. Tente fazer um agendamento

### **Para Testar Fundo:**
1. Acesse qualquer página do site
2. Verifique se o fundo está preto
3. Teste em diferentes seções
4. Verifique contraste e legibilidade

---

## 🚨 **SOLUÇÃO DE PROBLEMAS**

### **Preços não atualizam:**
- Verifique se não há erros no console
- Recarregue a página após alterações
- Limpe o cache do navegador

### **Fundo não está preto:**
- Verifique o arquivo `app/globals.css`
- Recarregue o servidor
- Limpe o cache do navegador

### **Alterações não persistem:**
- Verifique se o localStorage está funcionando
- Teste em navegador diferente
- Verifique permissões do navegador

---

## 🎉 **RESULTADO ESPERADO**

Após seguir este guia você terá:

🌟 **Site Profissional:**
- Fundo preto elegante e moderno
- Preços facilmente configuráveis
- Interface intuitiva e responsiva

💰 **Sistema de Preços Flexível:**
- Alteração via painel admin
- Atualização automática no site
- Scripts para alteração em lote

🎨 **Design Agradável:**
- Tema escuro consistente
- Cores harmoniosas e profissionais
- Ótima legibilidade e contraste

---

**🎯 SEU SITE ESTÁ PRONTO COM PREÇOS ALTERÁVEIS E FUNDO PRETO!**

Siga este guia passo a passo para personalizar completamente o seu site Teresa Salon!
