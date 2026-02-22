# 💇‍♀️ Teresa Salon - Site Profissional

Site moderno e seguro para salon de cabeleireiro com sistema de agendamentos online.

## 🚀 Tecnologias

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: TailwindCSS, Radix UI
- **Backend**: Supabase (PostgreSQL + Auth)
- **Pagamentos**: Stripe
- **Deploy**: Vercel

## 📋 Funcionalidades

- ✅ Galeria de fotos administrável
- ✅ Sistema de agendamentos online
- ✅ Pagamentos integrados com Stripe
- ✅ Painel admin seguro
- ✅ Formulário de contato
- ✅ Design responsivo

## 🔧 Setup Rápido

### 1. Clonar e Instalar
```bash
git clone <seu-repositorio>
cd site-para-mae
npm install
```

### 2. Configurar Variáveis de Ambiente
```bash
cp .env.example .env.local
```

Configure no `.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL`: URL do projeto Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Chave pública Supabase
- `STRIPE_SECRET_KEY`: Chave secreta Stripe (modo teste)
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Chave pública Stripe
- `STRIPE_WEBHOOK_SECRET`: Secret webhook Stripe

### 3. Configurar Supabase
1. Crie projeto em [supabase.com](https://supabase.com)
2. Execute os scripts SQL da pasta `/scripts`
3. Configure RLS policies
4. Crie usuário admin

### 4. Executar
```bash
npm run dev
```

Acesse `http://localhost:3000`

## 🔐 Segurança

- ✅ Middleware de proteção admin
- ✅ Row Level Security (RLS)
- ✅ Headers de segurança HTTP
- ✅ Variáveis de ambiente protegidas
- ✅ Validação server-side

Leia [SECURITY.md](./SECURITY.md) para detalhes.

## 📱 Acesso Admin

1. Acesse `/admin`
2. Login com email admin
3. Gerencie galeria, agendamentos e mensagens

## 🚀 Deploy

### Vercel (Recomendado)
1. Conecte repositório ao Vercel
2. Configure variáveis de ambiente
3. Deploy automático

### Variáveis de Ambiente no Vercel
- Configure todas as variáveis do `.env.local`
- Use environment variables para produção

## 🛠️ Desenvolvimento

### Estrutura de Pastas
```
├── app/              # Rotas Next.js
├── components/       # Componentes React
├── lib/             # Utilitários e configs
├── public/          # Arquivos estáticos
├── scripts/         # Scripts SQL
└── styles/          # Estilos globais
```

### Comandos Úteis
```bash
npm run dev      # Servidor desenvolvimento
npm run build    # Build produção
npm run start    # Servidor produção
npm run lint     # Linting
```

## 📞 Suporte

Para dúvidas ou suporte técnico, consulte:
- [GUIA_ADMIN_COMPLETO.md](./GUIA_ADMIN_COMPLETO.md)
- [SECURITY.md](./SECURITY.md)

---

**Desenvolvido com ❤️ para Teresa Salon**
