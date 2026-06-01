# 🐊 Crocodilo Burguer

> Cardápio digital mobile-first estilo Goomer — React, carrinho com persistência, checkout e animações. Sem backend.

![React](https://img.shields.io/badge/React-18.3-61dafb?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.4-646cff?style=flat-square&logo=vite)
![CSS3](https://img.shields.io/badge/CSS3-Variables-1572b6?style=flat-square&logo=css3)
![Status](https://img.shields.io/badge/status-online-2d6a4f?style=flat-square)

---

## 📱 Sobre o projeto

Cardápio digital para a lanchonete fictícia **Crocodilo Burguer**, desenvolvido como projeto de portfólio com foco em UI/UX mobile. A aplicação simula a experiência de um app de delivery real — com login, carrinho, checkout, pagamento via PIX e cartão, acompanhamento de pedidos em tempo real e muito mais. Tudo isso sem banco de dados, 100% front-end.

---

## 📸 Screenshots

<div align="center">
  <img src="screenshots/cardapio.png" width="30%" alt="Cardápio" />
  <img src="screenshots/carrinho.png" width="30%" alt="Carrinho" />
  <img src="screenshots/checkout.png" width="30%" alt="Checkout" />
  <img src="screenshots/pix.png" width="30%" alt="PIX QR Code" />
  <img src="screenshots/pedidos.png" width="30%" alt="Meus Pedidos" />
  <img src="screenshots/aviso.png" width="30%" alt="Aviso IBAMA" />
</div>

---

## ✨ Funcionalidades

### 🏠 Interface & Navegação
| Feature | Descrição |
|---|---|
| 🐊 **Logo SVG** | Crocodilo com hambúrguer na boca, desenhado 100% em SVG puro |
| 🎠 **Banner promocional** | Carrossel auto-rotativo (4s) com 3 promoções e dots de navegação |
| 🔍 **Busca em tempo real** | Filtra produtos por nome e descrição instantaneamente |
| 📂 **Categorias sticky** | Nav fixa no topo com scroll-spy — destaca a categoria conforme a rolagem |
| 📱 **Mobile-first** | Layout max 480px idêntico ao Goomer no celular |

### 🛒 Cardápio & Carrinho
| Feature | Descrição |
|---|---|
| ⭐ **Avaliações** | Estrelas e contagem de reviews em todos os produtos |
| 🚀 **Animação voadora** | Emoji do produto voa até o carrinho ao clicar em adicionar |
| 📋 **Modal de produto** | Bottom sheet com hero, reviews de clientes e seletor de quantidade |
| 🛒 **Carrinho completo** | Adicionar, remover, ajustar quantidade, subtotal e taxa de entrega |
| 💾 **Persistência** | Carrinho salvo no `localStorage` — mantido ao fechar o navegador |

### 🦎 Cardápio Exótico
| Feature | Descrição |
|---|---|
| 🐊 **Yacaré Selvagem** | Blend de *Caiman crocodilus yacare* com queijo brie e maionese de tucupi |
| 🦆 **Pato Real** | Peito de pato confitado com camembert, geleia de laranja e brioche |
| 🐟 **Pirarucu da Amazônia** | Hambúrguer de pirarucu defumado na lenha com pão de tapioca artesanal |
| 🛡️ **Aviso legal animado** | Banner com ticker rolante, selo pulsante e texto oficial IBAMA/MAPA/SIF |

### 👤 Autenticação
| Feature | Descrição |
|---|---|
| 🔐 **Login / Cadastro** | Modal com abas, validação de campos e mensagens de erro claras |
| 👁️ **Mostrar/ocultar senha** | Toggle de visibilidade da senha |
| 🟡 **Avatar com inicial** | Exibe a inicial do nome do usuário logado no header |
| 💾 **Sessão persistente** | Usuário continua logado após fechar e reabrir o app |

### 💳 Checkout & Pagamento
| Feature | Descrição |
|---|---|
| 📝 **Formulário de entrega** | Nome, telefone, CEP, rua, número, bairro e complemento |
| ⚡ **PIX com QR Code** | QR Code gerado em SVG com countdown de 5 minutos e botão "Já Paguei!" |
| 📋 **Copiar código PIX** | Copia o código EMV para a área de transferência |
| 💳 **Cartão com bandeira** | Detecta Visa, Mastercard, Amex, Elo e Hipercard ao digitar |
| 🎴 **Preview do cartão** | Card visual animado que muda de cor conforme a bandeira detectada |
| 💵 **Pagamento em dinheiro** | Campo de troco opcional |
| ✅ **Tela de sucesso** | Confirmação com tempo estimado e resumo do pagamento |

### 📦 Acompanhamento de Pedidos
| Feature | Descrição |
|---|---|
| 📦 **Histórico de pedidos** | Lista todos os pedidos vinculados ao usuário logado |
| 🔄 **Status em tempo real** | Progresso automático: Confirmado → Preparando → A caminho → Entregue |
| ⏱️ **Stepper animado** | Indicador visual do passo atual com animação pulsante em amarelo |
| 🕐 **Previsão de entrega** | Tempo estimado atualizado automaticamente a cada 30 segundos |

---

## 🚀 Como rodar

### Pré-requisitos
- [Node.js](https://nodejs.org/) v18+

### Instalação

```bash
# Clone o repositório
git clone https://github.com/Pedroaruana/CrocodiloBurguer.git

# Entre na pasta
cd CrocodiloBurguer

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

### Build de produção

```bash
npm run build
npm run preview
```

---

## 🗂️ Estrutura do projeto

```
src/
├── components/
│   ├── Logo.jsx              # SVG do crocodilo com hambúrguer
│   ├── Header.jsx            # Banner com stats, login e pedidos
│   ├── SearchBar.jsx         # Busca em tempo real
│   ├── CategoryNav.jsx       # Nav sticky com scroll-spy
│   ├── ProductCard.jsx       # Card horizontal estilo Goomer + estrelas
│   ├── ProductModal.jsx      # Bottom sheet com detalhes e reviews
│   ├── PromoBanner.jsx       # Carrossel de promoções animado
│   ├── LegalBanner.jsx       # Aviso legal IBAMA com ticker e selo
│   ├── FlyingItem.jsx        # Animação item voando até o carrinho
│   ├── CartBar.jsx           # Barra flutuante do carrinho
│   ├── CartDrawer.jsx        # Drawer completo do carrinho
│   ├── CheckoutPage.jsx      # Formulário de pedido completo
│   ├── PixQRSection.jsx      # QR Code PIX com countdown
│   ├── CardFormSection.jsx   # Formulário de cartão com detecção de bandeira
│   ├── AuthModal.jsx         # Modal de login e cadastro
│   └── OrdersPage.jsx        # Página de acompanhamento de pedidos
├── context/
│   ├── CartContext.jsx       # Estado global do carrinho (useReducer)
│   └── AuthContext.jsx       # Autenticação com localStorage
├── data/
│   └── menu.js               # Dados estáticos: 31 produtos em 7 categorias
├── App.jsx
├── App.css
└── index.css                 # Design system com CSS custom properties
```

---

## 🛠️ Tecnologias

- **React 18** — Componentes funcionais, hooks, Context API, useReducer
- **Vite 5** — Build tool e dev server ultrarrápido com HMR
- **CSS puro** — Custom properties, animações keyframe, mobile-first
- **LocalStorage** — Persistência de carrinho, sessão e histórico de pedidos
- **SVG** — Logo, QR Code PIX e bandeiras de cartão gerados programaticamente

---

## 🎨 Design System

| Token | Valor | Uso |
|---|---|---|
| `--croco-green` | `#1a472a` | Cor principal |
| `--croco-mid` | `#2d6a4f` | Botões e destaques |
| `--croco-light` | `#52b788` | Hover e acentos |
| `--accent-yellow` | `#f9c74f` | Destaques quentes |
| `--accent-orange` | `#f4a261` | Thumbnails dos produtos |
| `--accent-red` | `#e63946` | Badges e alertas |

---

## 👤 Autor

Feito com 🐊 por **Pedro Aruanã**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-blue?style=flat-square&logo=linkedin)](https://linkedin.com/in/seu-perfil)
[![GitHub](https://img.shields.io/badge/GitHub-black?style=flat-square&logo=github)](https://github.com/Pedroaruana)

---

## 📄 Licença

MIT — fique à vontade para usar como base para seus projetos.
