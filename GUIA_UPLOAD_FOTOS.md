# 📸 GUIA - UPLOAD DE FOTOS LOCAL

## 🎯 **NOVO SISTEMA DE UPLOAD**

Agora você pode adicionar fotos diretamente do seu computador! Sem precisar de links externos.

---

## 🚀 **COMO USAR**

### **Método 1: Upload Direto (Recomendado)**

1. **Faça login no admin**
   - Acesse: `http://localhost:3000/auth/login`
   - Email: `admin@teresasalon.com`
   - Senha: `TeresaAdmin2024!`

2. **Vá para a Galeria**
   - Clique em "Gallery" no menu lateral

3. **Adicione uma nova imagem**
   - Clique em "Add Image"
   - Clique no botão "Enviar Foto"
   - Selecione a imagem do seu computador
   - Aguarde o upload (aparecerá "enviado com sucesso!")

4. **Preencha os detalhes**
   - Title: Nome do estilo
   - Description: Descrição opcional
   - Display Order: Ordem de exibição
   - Active: Deixe marcado

5. **Salve**
   - Clique em "Add to Gallery"

### **Método 2: URL Manual (Alternativa)**

1. **Copie a imagem para a pasta**
   - Vá para: `public/gallery-uploads/`
   - Copie suas fotos lá

2. **Use a URL no formulário**
   - No campo de URL, digite: `/gallery-uploads/nome-da-foto.jpg`
   - Exemplo: `/gallery-uploads/style1.jpg`

---

## ✅ **O QUE O SISTEMA FAZ**

### **Upload Automático:**
- ✅ Valida tipo de arquivo (só imagens)
- ✅ Limita tamanho (máximo 5MB)
- ✅ Gera nome único para não sobrescrever
- ✅ Salva na pasta correta
- ✅ Mostra preview da imagem

### **Segurança:**
- ✅ Apenas usuários logados podem fazer upload
- ✅ Validação de arquivo no servidor
- ✅ Proteção contra arquivos maliciosos

---

## 📁 **ONDE AS FOTOS FICAM**

As fotos enviadas ficam em:
```
public/gallery-uploads/
├── 1708451234567.jpg
├── 1708451234568.png
└── 1708451234569.webp
```

No site, as URLs serão:
- `/gallery-uploads/1708451234567.jpg`
- `/gallery-uploads/1708451234568.png`
- `/gallery-uploads/1708451234569.webp`

---

## 🎨 **FORMATOS SUPORTADOS**

- **JPEG** (.jpg, .jpeg) - Melhor qualidade
- **PNG** (.png) - Com transparência
- **WebP** (.webp) - Mais moderno
- **GIF** (.gif) - Animações

---

## 💡 **DICAS**

### **Para melhores resultados:**
1. **Use imagens quadradas** (800x800px ideal)
2. **Comprima antes de enviar** (menos de 2MB)
3. **Nomes descritivos** (ex: "knotless-braids-1.jpg")
4. **Fotos de boa qualidade** (bem iluminadas)

### **Organização:**
- Use Display Order para organizar
- Descrições ajudam no SEO
- Mantenha as imagens "Active" para aparecerem

---

## 🚨 **SOLUÇÃO DE PROBLEMAS**

### **Upload não funciona:**
- Verifique se a imagem é menor que 5MB
- Confirme se é um formato suportado
- Tente recarregar a página

### **Imagem não aparece:**
- Verifique se "Active" está marcado
- Confirme o Display Order
- Recarregue a página

### **Erro no upload:**
- Verifique o console do navegador (F12)
- Tente outra imagem
- Reinicie o servidor

---

## 🎯 **EXEMPLOS DE USO**

### **Para Salão de Beleza:**
```
Title: "Knotless Braids Elegantes"
Description: "Tranças nó-less modernas e leves"
Imagem: Foto do trabalho final
Display Order: 1
Active: ✅
```

### **Para Portfólio:**
```
Title: "Urban Style Braids"
Description: "Estilo urbano com detalhes em beads"
Imagem: Foto close-up do trabalho
Display Order: 2
Active: ✅
```

---

## 🔄 **FLUXO COMPLETO**

1. **Tirar foto profissional** do trabalho
2. **Editar se necessário** (crop, brilho)
3. **Fazer upload** pelo painel admin
4. **Preencher detalhes** (título, descrição)
5. **Organizar ordem** de exibição
6. **Publicar** marcando "Active"

---

## 🎉 **RESULTADO**

Seu site terá uma galeria profissional com:
- ✅ Upload direto do computador
- ✅ Preview em tempo real
- ✅ Organização fácil
- ✅ Mudanças instantâneas
- ✅ Sem dependências externas

---

**🎯 AGORA VOCÊ PODE ADICIONAR FOTOS DIRETAMENTE DO SEU COMPUTADOR!**

Só fazer login, ir em Gallery e clicar "Enviar Foto"!
