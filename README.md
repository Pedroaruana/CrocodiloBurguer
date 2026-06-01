# 🐊 Crocodilo Burguer

> App de delivery temático inspirado no Goomer — cardápio digital mobile-first para portfólio.
---

## 📱 Sobre o projeto

Cardápio digital para a lanchonete fictícia **Crocodilo Burguer**, desenvolvido como projeto de portfólio com foco em UI/UX mobile. A aplicação simula a experiência de um app de delivery real — sem banco de dados, 100% front-end.

---

## ✨ Funcionalidades

| Feature | Descrição |
|---|---|
| 🐊 **Logo SVG** | Crocodilo com hamburguer na boca, desenhado em SVG puro |
| 🎠 **Banner promocional** | Slides auto-rotativos (4s) com promoções e dots de navegação |
| 🔍 **Busca em tempo real** | Filtra produtos por nome e descrição instantaneamente |
| 📂 **Categorias com scroll-spy** | Nav trava no topo e destaca a categoria conforme o scroll |
| ⭐ **Avaliações** | Estrelas e contagem de reviews em todos os produtos |
| 🛒 **Carrinho completo** | Adicionar, remover, ajustar quantidade, subtotal e taxa |
| 💾 **Persistência** | Carrinho salvo no `localStorage` entre sessões |
| 🚀 **Animação voadora** | Emoji do produto voa até o carrinho ao adicionar |
| 📋 **Modal de produto** | Bottom sheet com hero, reviews e seletor de quantidade |
| 📦 **Checkout completo** | Formulário de endereço, 4 formas de pagamento e tela de sucesso |
| 📱 **Mobile-first** | Layout max 480px, idêntico ao Goomer no celular |

---

## 🚀 Como rodar

### Pré-requisitos
- [Node.js](https://nodejs.org/) v18+

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/crocodilo-burguer.git

# Entre na pasta
cd crocodilo-burguer

# Instale as dependências
npm install

# Rode em modo desenvolvimento
npm run dev
```

Acesse: **http://localhost:5173**

### Ver no celular (mesma rede Wi-Fi)

```bash
npm run dev -- --host
```

Abra o IP que aparecer no terminal no navegador do celular.


## 🛠️ Tecnologias

- **React 18** — Componentes funcionais, hooks, Context API
- **Vite 5** — Build tool e dev server com HMR
- **CSS puro** — Custom properties, animações, mobile-first
- **LocalStorage** — Persistência do carrinho sem backend


---

## 👤 Autor

Feito com 🐊 por **Pedro**

