# 🐊 Crocodilo Burguer

> Cardápio digital mobile-first estilo Goomer. React + Vite, sem backend.

🌐 **[Ver projeto ao vivo](https://crocodilo-burguer.vercel.app)**

![React](https://img.shields.io/badge/React-18.3-61dafb?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.4-646cff?style=flat-square&logo=vite)
![Vercel](https://img.shields.io/badge/deploy-Vercel-black?style=flat-square&logo=vercel)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

---

## Sobre o projeto

Cardápio digital para a lanchonete fictícia **Crocodilo Burguer**, com foco em UI/UX mobile. A ideia foi simular a experiência de um app de delivery real (carrinho, checkout, PIX, cartão, acompanhamento de pedidos) sem precisar de backend — tudo roda no navegador.

> **Decisão técnica:** persistência feita via `localStorage` (carrinho, sessão e pedidos). Foi intencional para o projeto ficar 100% front-end e deployável em qualquer host estático. Em produção real, isso viraria uma API.

> **Nota sobre o histórico:** comecei o projeto, fiquei insatisfeito com a estrutura inicial e acabei apagando tudo pra recomeçar do zero. Por isso o primeiro commit traz a base já formada — os commits seguintes refletem a evolução real do projeto.

---

## Screenshots

<div align="center">
  <img src="screenshots/cardapio.png" width="30%" alt="Cardápio" />
  <img src="screenshots/carrinho.png" width="30%" alt="Carrinho" />
  <img src="screenshots/checkout.png" width="30%" alt="Checkout" />
  <img src="screenshots/pix.png" width="30%" alt="PIX QR Code" />
  <img src="screenshots/pedidos.png" width="30%" alt="Meus Pedidos" />
  <img src="screenshots/aviso.png" width="30%" alt="Aviso IBAMA" />
</div>

---

## Funcionalidades

### Interface & Navegação
| Feature | Descrição |
|---|---|
| Logo SVG | Crocodilo com hambúrguer na boca, feito em SVG puro |
| Banner promocional | Carrossel auto-rotativo (4s) com dots de navegação |
| Busca em tempo real | Filtra produtos por nome e descrição |
| Categorias sticky | Nav fixa no topo com scroll-spy |
| Mobile-first | Layout max 480px |

### Cardápio & Carrinho
| Feature | Descrição |
|---|---|
| Avaliações | Estrelas e contagem de reviews |
| Animação voadora | Emoji do produto voa até o carrinho ao adicionar |
| Modal de produto | Bottom sheet com reviews e seletor de quantidade |
| Carrinho | Adicionar, remover, ajustar quantidade, subtotal |
| Persistência | Carrinho salvo no `localStorage` |

### Cardápio Exótico
| Feature | Descrição |
|---|---|
| 🐊 Yacaré Selvagem | Blend de *Caiman crocodilus yacare* com queijo brie |
| 🦆 Pato Real | Peito de pato confitado com camembert e geleia de laranja |
| 🐟 Pirarucu da Amazônia | Hambúrguer de pirarucu defumado com pão de tapioca |
| Aviso legal animado | Banner com ticker rolante e texto oficial IBAMA/MAPA/SIF |

### Autenticação
| Feature | Descrição |
|---|---|
| Login / Cadastro | Modal com abas e validação de campos |
| Senhas hasheadas | SHA-256 via Web Crypto API (não armazena plaintext) |
| Avatar | Inicial do nome do usuário logado no header |
| Sessão persistente | Continua logado após fechar o app |

### Checkout & Pagamento
| Feature | Descrição |
|---|---|
| Formulário de entrega | Nome, telefone, CEP, endereço completo |
| PIX com QR Code | QR gerado em SVG com countdown de 5min e botão "Já paguei!" |
| Cartão com bandeira | Detecta Visa, Mastercard, Amex, Elo e Hipercard ao digitar |
| Validação Luhn | Algoritmo real de validação de número de cartão |
| Dinheiro | Campo de troco opcional |

### Acompanhamento de Pedidos
| Feature | Descrição |
|---|---|
| Histórico | Lista de pedidos vinculados ao usuário logado |
| Status em tempo real | Confirmado → Preparando → A caminho → Entregue |
| Stepper animado | Indicador visual do passo atual |
| Previsão de entrega | Atualizada a cada 30s |

---

## Como testar o checkout

O pagamento por cartão usa o **algoritmo de Luhn** (a mesma validação que os bancos usam), então números aleatórios são rejeitados.

> ⚠️ **Não use seu cartão real!** Os números abaixo são públicos, da indústria, usados para testes.

| Bandeira | Número | CVV | Validade |
|---|---|---|---|
| Visa | `4111 1111 1111 1111` | 3 dígitos | data futura |
| Mastercard | `5555 5555 5555 4444` | 3 dígitos | data futura |
| Amex | `3782 822463 10005` | 4 dígitos | data futura |
| Elo | `6362 9700 0045 7013` | 3 dígitos | data futura |
| Hipercard | `6062 8244 6453 6010` | 3 dígitos | data futura |

Para PIX, é só clicar em **"Já paguei!"** depois de gerar o QR Code.

---

## Como rodar

Pré-requisitos: [Node.js](https://nodejs.org/) v18 ou superior

```bash
git clone https://github.com/Pedroaruana/CrocodiloBurguer.git
cd CrocodiloBurguer
npm install
npm run dev
```

Acesse: `http://localhost:5173`

### Ver no celular (mesma rede Wi-Fi)

```bash
npm run dev -- --host
```

Abra o IP que aparecer no terminal.

---

## Tecnologias

- **React 18** — Componentes funcionais, hooks, Context API, useReducer
- **Vite 5** — Build e dev server com HMR
- **CSS puro** — Custom properties, animações, mobile-first
- **LocalStorage** — Persistência de carrinho, sessão e pedidos
- **SVG** — Logo, QR Code do PIX e bandeiras de cartão gerados via código
- **Web Crypto API** — Hash SHA-256 das senhas

---

## O que aprendi

Esse foi um dos projetos mais completos que fiz sozinho. Algumas coisas que valeu a pena aprender no caminho:

- **`useReducer` para carrinho** acabou sendo bem mais limpo do que `useState`, porque cada ação fica explícita no reducer.
- **`IntersectionObserver`** para o scroll-spy das categorias foi a parte mais difícil — testar com a busca ativa quebrou várias vezes até eu entender que o observer precisa ser recriado.
- **Validar cartão de verdade** com o algoritmo de Luhn deu um trabalho braboso, mas tirou aquele cheiro de "form fake" do checkout.
- **localStorage** é simples, mas exige cuidado: `try/catch` em todo lugar e migração quando o schema dos dados muda (passei do `v1` para `v2` no carrinho).
- **`crypto.subtle.digest()`** para hashear senhas — não é bcrypt, mas para um projeto front-end já é muito melhor que salvar plaintext.

---

## Próximos passos

Coisas que ficariam pra uma v2 com backend:

- API real (Node + Postgres) para usuários, pedidos e produtos
- Autenticação com JWT e refresh token
- Painel admin para gerenciar o cardápio
- Integração de pagamento de verdade (Stripe / Mercado Pago / Pix dinâmico)
- Notificações push quando o status do pedido mudar
- Testes automatizados (Vitest + Testing Library)
- PWA com cache offline

---

## Limitações conhecidas

- Os dados ficam só no navegador — se o usuário limpar o cache, perde tudo
- Sem rate limiting no login (precisaria de backend)
- O QR Code do PIX é decorativo (não gera código EMV real)
- Imagens dos produtos vêm do Unsplash — algumas podem não carregar se o CDN cair

---

## Autor

Feito por **Pedro Aruanã**

[![GitHub](https://img.shields.io/badge/GitHub-Pedroaruana-181717?style=flat-square&logo=github)](https://github.com/Pedroaruana)
