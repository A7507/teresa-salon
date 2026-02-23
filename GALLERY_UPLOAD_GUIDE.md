# Como Adicionar Fotos à Galeria - Teresa Salon

## 📸 Fotos para Adicionar

Você enviou 4 fotos lindas de modelos com tranças que precisam ser adicionadas à galeria:

1. **Foto 1:** Mulher com tranças finas, top estampado verde/amarelo/preto, colar dourado
2. **Foto 2:** Mesma modelo, ângulo diferente
3. **Foto 3:** Mesma modelo, outra pose
4. **Foto 4:** Mesma modelo, pose final

## 🚀 Método 1: Usar o Painel Admin (Recomendado)

### Passo 1: Fazer Upload das Imagens
1. **Escolha um serviço de hospedagem:**
   - **Imgur:** Gratuito, fácil de usar
   - **Supabase Storage:** Integrado ao seu sistema
   - **Cloudinary:** Recursos avançados
   - **Google Drive:** Com link público

2. **Upload para Imgur (mais fácil):**
   - Vá para [imgur.com/upload](https://imgur.com/upload)
   - Arraste e solte cada foto
   - Copie o link direto (termina em .jpg, .png, etc.)
   - Repita para as 4 fotos

### Passo 2: Acessar o Painel Admin
1. **Faça login no admin:**
   - URL: `http://localhost:3000/auth/login`
   - Email: `admin@teresasalon.com`
   - Senha: `TeresaAdmin2024!`

2. **Vá para Galeria:**
   - No menu lateral, clique em **"Gallery"**
   - Clique no botão **"Add Image"**

### Passo 3: Adicionar Cada Foto
Para cada uma das 4 fotos:

1. **Preencha o formulário:**
   - **Title:** Nome do estilo (ex: "Stylish Braided Look")
   - **Image URL:** Cole o link do Imgur
   - **Description:** Descrição breve
   - **Display Order:** Número sequencial (6, 7, 8, 9)
   - **Active:** ✅ Mantenha marcado

2. **Sugestões de títulos:**
   - Foto 1: "Stylish Urban Braids"
   - Foto 2: "Modern Braided Beauty"
   - Foto 3: "Chic City Style"
   - Foto 4: "Elegant Braided Look"

3. **Clique em "Add to Gallery"**
4. **Repita para as outras 3 fotos**

## 🔧 Método 2: Via SQL (Avançado)

Se preferir usar SQL direto:

1. **Faça upload das imagens** para um serviço e obtenha as URLs
2. **Vá ao Supabase Dashboard** → **SQL Editor**
3. **Execute o script:** `scripts/005_add_gallery_images.sql`
4. **Substitua as URLs** no script com as URLs reais

## 📁 Método 3: Supabase Storage (Profissional)

### Configurar Storage:
1. **No Supabase Dashboard:**
   - Vá para **Storage**
   - Crie um bucket chamado `gallery`
   - Configure como público

2. **Upload das imagens:**
   - Clique no bucket `gallery`
   - Upload das 4 fotos
   - Renomeie para: `braided-style-1.jpg`, `braided-style-2.jpg`, etc.

3. **Obter URLs públicas:**
   - Clique em cada imagem → "Get URL"
   - Copie os links para usar no admin

## ✅ Verificação

Após adicionar as fotos:

1. **Verifique no painel admin:**
   - As 4 fotos devem aparecer na lista
   - Todas devem estar "Active"

2. **Verifique no site:**
   - Vá para `http://localhost:3000/#gallery`
   - As novas fotos devem aparecer
   - Clique em cada foto para ver o lightbox

## 🎨 Dicas para Melhores Resultados

### Títulos Sugeridos:
- "Urban Braided Elegance"
- "Modern City Style Braids"
- "Chic Contemporary Braids"
- "Sophisticated Urban Look"

### Descrições Sugeridas:
- "Stunning braided style perfect for urban lifestyle"
- "Modern interpretation of classic braiding techniques"
- "Elegant braids with contemporary fashion accessories"
- "Professional braided design for the modern woman"

### Ordem de Exibição:
- Use display_order 6, 7, 8, 9
- Isso mantém as fotos existentes no início
- Novas fotos aparecem depois

## 🚨 Solução de Problemas

### Imagens não aparecem:
- Verifique se as URLs estão corretas e públicas
- Confirme se "Active" está marcado
- Recarregue a página do site

### URLs quebradas:
- Teste cada URL no navegador
- Verifique se termina em .jpg/.png
- Use links diretos, não de página

### Erro no upload:
- Verifique o tamanho da imagem (máx 10MB)
- Formatos suportados: JPG, PNG, WebP
- Nomes de arquivo sem espaços ou caracteres especiais

## 📱 Resultado Final

Após seguir esses passos, sua galeria terá:
- ✅ 4 novas fotos profissionais
- ✅ Títulos e descrições atraentes
- ✅ Layout responsivo
- ✅ Lightbox para visualização
- ✅ Integração completa com o site

---

**Próximo passo:** Acesse o painel admin e adicione essas fotos lindas à sua galeria! 🎉
