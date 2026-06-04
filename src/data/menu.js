export const restaurant = {
  name: 'Crocodilo Burguer',
  tagline: 'Mordida que deixa marca!',
  address: 'Av. das Garças, 42 — Centro',
  phone: '(11) 98765-4321',
  rating: 4.8,
  reviewCount: 1247,
  deliveryTime: '30-45',
  deliveryFee: 5.99,
  minOrder: 25.0,
  isOpen: true,
  openHours: '11h às 23h',
  category: 'Hambúrgueres',
}

export const categories = [
  { id: 'destaques',   label: 'Destaques',   emoji: '⭐' },
  { id: 'exoticos',   label: 'Exóticos',    emoji: '🦎' },
  { id: 'burgers',     label: 'Burgers',      emoji: '🍔' },
  { id: 'combos',      label: 'Combos',       emoji: '🍟' },
  { id: 'bebidas',     label: 'Bebidas',      emoji: '🥤' },
  { id: 'sobremesas',  label: 'Sobremesas',   emoji: '🍦' },
  { id: 'extras',      label: 'Adicionais',   emoji: '🧀' },
]

// Imagens reais do Unsplash — URLs estáveis com ID fixo
const IMG = (id) => `https://images.unsplash.com/${id}?w=400&h=400&fit=crop&q=80&auto=format`

export const products = [
  // ── DESTAQUES ──────────────────────────────────────────────────────────────
  { id: 1,  category: 'destaques', name: 'Croco Smash',       image: IMG('photo-1568901346375-23c9450c58cd'), rating: 4.9, reviewCount: 847,  description: 'Dois smash burgers 120g, queijo americano duplo, cebola caramelizada, picles crocante e molho secreto da jaula', price: 42.90, badge: '🔥 Mais pedido', badgeColor: '#e63946', gradient: 'linear-gradient(145deg, #1a472a 0%, #f4a261 100%)', emoji: '🍔' },
  { id: 2,  category: 'destaques', name: 'Combo Croco Smash', image: IMG('photo-1561758033-d89a9ad46330'),    rating: 4.8, reviewCount: 523,  description: 'Croco Smash + batata crinkle G + bebida 400ml à escolha', price: 59.90, badge: '⭐ Favorito', badgeColor: '#d4a017', gradient: 'linear-gradient(145deg, #2d6a4f 0%, #e76f51 100%)', emoji: '🍔🍟' },
  { id: 3,  category: 'destaques', name: 'Jacarezão',         image: IMG('photo-1572802419224-296b0aeee0d9'), rating: 4.7, reviewCount: 312,  description: 'Blend artesanal 220g, bacon duplo, queijo gouda, rúcula, geleia de pimenta e maionese trufada', price: 49.90, badge: '🌶️ Novo', badgeColor: '#e63946', gradient: 'linear-gradient(145deg, #5c1a1a 0%, #f9c74f 100%)', emoji: '🍔' },

  // ── EXÓTICOS ───────────────────────────────────────────────────────────────
  {
    id: 29, category: 'exoticos', name: 'Yacaré Selvagem',
    image: IMG('photo-1551782450-a2132b4ba21d'),
    description: 'Blend 180g de carne de Caiman crocodilus yacare (Yacaré-do-Pantanal) — criação IBAMA autorizada. Queijo brie, rúcula, tomate seco, geleia de pimenta e maionese de tucupi',
    price: 64.90, badge: '🐊 Exclusivo', badgeColor: '#1a472a',
    rating: 4.9, reviewCount: 134,
    gradient: 'linear-gradient(145deg, #0d2b1a 0%, #52b788 100%)', emoji: '🐊',
  },
  {
    id: 30, category: 'exoticos', name: 'Pato Real',
    image: IMG('photo-1561429743-6ed153ad7071'),
    description: 'Blend artesanal 180g de peito de pato confitado, queijo camembert, geleia de laranja, rúcula selvagem, cebola caramelizada no vinho tinto e brioche artesanal',
    price: 58.90, badge: '🦆 Chef\'s Pick', badgeColor: '#7b4f00',
    rating: 4.8, reviewCount: 89,
    gradient: 'linear-gradient(145deg, #3b1a0a 0%, #d4a017 100%)', emoji: '🦆',
  },
  {
    id: 31, category: 'exoticos', name: 'Pirarucu da Amazônia',
    image: IMG('photo-1617199045294-8053ccfa6f61'),
    description: 'Hambúrguer de pirarucu 160g defumado na lenha, queijo coalho grelhado, vinagrete de manga, pimenta-de-cheiro, coentro fresco e pão de tapioca artesanal',
    price: 56.90, badge: '🐟 Amazônia', badgeColor: '#1565c0',
    rating: 4.7, reviewCount: 76,
    gradient: 'linear-gradient(145deg, #0d3b6e 0%, #48cae4 100%)', emoji: '🐟',
  },

  // ── BURGERS ────────────────────────────────────────────────────────────────
  { id: 4,  category: 'burgers',   name: 'Croco Classic',     image: IMG('photo-1571091718767-18b5b1457add'), rating: 4.6, reviewCount: 1203, description: 'Blend angus 180g, queijo cheddar, alface americana, tomate, cebola roxa e molho especial da casa', price: 32.90, gradient: 'linear-gradient(145deg, #2d6a4f 0%, #95d5b2 100%)', emoji: '🍔' },
  { id: 5,  category: 'burgers',   name: 'Croco Smash',       image: IMG('photo-1568901346375-23c9450c58cd'), rating: 4.9, reviewCount: 847,  description: 'Dois smash burgers 120g, queijo americano duplo, cebola caramelizada, picles crocante e molho secreto da jaula', price: 42.90, badge: '🔥 Mais pedido', badgeColor: '#e63946', gradient: 'linear-gradient(145deg, #1a472a 0%, #f4a261 100%)', emoji: '🍔' },
  { id: 6,  category: 'burgers',   name: 'Jacarezão',         image: IMG('photo-1572802419224-296b0aeee0d9'), rating: 4.7, reviewCount: 312,  description: 'Blend artesanal 220g, bacon crocante, queijo gouda, rúcula, geleia de pimenta e maionese trufada', price: 49.90, badge: '🌶️ Picante', badgeColor: '#e63946', gradient: 'linear-gradient(145deg, #5c1a1a 0%, #f9c74f 100%)', emoji: '🍔' },
  { id: 7,  category: 'burgers',   name: 'Croco Veggie',      image: IMG('photo-1465799411029-5a317ff17837'), rating: 4.5, reviewCount: 189,  description: 'Blend de grão-de-bico e beterraba, queijo brie, espinafre, tomate seco e molho de ervas frescas', price: 36.90, badge: '🌿 Veggie', badgeColor: '#40916c', gradient: 'linear-gradient(145deg, #40916c 0%, #d8f3dc 100%)', emoji: '🥗' },
  { id: 8,  category: 'burgers',   name: 'Croco Duplo',       image: IMG('photo-1586190848861-99aa4a171e90'), rating: 4.6, reviewCount: 443,  description: 'Dois blends angus 150g, queijo cheddar duplo, bacon, picles, cebola caramelizada, mostarda e ketchup artesanal', price: 47.90, gradient: 'linear-gradient(145deg, #2d6a4f 0%, #f4a261 100%)', emoji: '🍔' },
  { id: 9,  category: 'burgers',   name: 'Filhote da Lagoa',  image: IMG('photo-1550317138-10000687a72b'),    rating: 4.8, reviewCount: 267,  description: 'Blend 150g, queijo prato, ovo caipira frito, bacon canadense, alface crespa e maionese defumada', price: 39.90, gradient: 'linear-gradient(145deg, #1a472a 0%, #f9c74f 100%)', emoji: '🍳' },
  { id: 10, category: 'burgers',   name: 'BBQ da Selva',      image: IMG('photo-1551782450-a2132b4ba21d'),    rating: 4.7, reviewCount: 198,  description: 'Blend angus 200g, queijo emmental, cebola crispy, molho BBQ defumado e pimenta calabresa', price: 44.90, gradient: 'linear-gradient(145deg, #3b1a0a 0%, #f4a261 100%)', emoji: '🍖' },

  // ── COMBOS ─────────────────────────────────────────────────────────────────
  { id: 11, category: 'combos',    name: 'Combo Classic',     image: IMG('photo-1561758033-d89a9ad46330'),    rating: 4.6, reviewCount: 334,  description: 'Croco Classic + batata crinkle M + refrigerante 350ml', price: 49.90, gradient: 'linear-gradient(145deg, #2d6a4f 0%, #f9c74f 100%)', emoji: '🍔🍟' },
  { id: 12, category: 'combos',    name: 'Combo Croco Smash', image: IMG('photo-1606755962773-d324e0a13086'), rating: 4.8, reviewCount: 523,  description: 'Croco Smash + batata crinkle G + bebida 400ml à escolha', price: 59.90, badge: '⭐ Favorito', badgeColor: '#d4a017', gradient: 'linear-gradient(145deg, #1a472a 0%, #e76f51 100%)', emoji: '🍔🍟' },
  { id: 13, category: 'combos',    name: 'Combo Jacarezão',   image: IMG('photo-1550547660-d9450f859349'),    rating: 4.7, reviewCount: 201,  description: 'Jacarezão + batata crinkle G + refrigerante 500ml', price: 64.90, badge: '🏆 Premium', badgeColor: '#d4a017', gradient: 'linear-gradient(145deg, #5c1a1a 0%, #f9c74f 100%)', emoji: '🍔🍟🥤' },
  { id: 14, category: 'combos',    name: 'Combo Duplo',       image: IMG('photo-1568901346375-23c9450c58cd'), rating: 4.8, reviewCount: 176,  description: 'Croco Duplo + batata crinkle G + milk shake 400ml', price: 72.90, gradient: 'linear-gradient(145deg, #1a472a 0%, #e76f51 100%)', emoji: '🍔🥛' },
  { id: 15, category: 'combos',    name: 'Combo Família 🎉',  image: IMG('photo-1565299507177-b0ac66763828'), rating: 4.9, reviewCount: 312,  description: '2× Croco Classic + 2× Croco Smash + batata crinkle GG + 4 refrigerantes 350ml', price: 159.90, badge: '👨‍👩‍👧‍👦 Família', badgeColor: '#2d6a4f', gradient: 'linear-gradient(145deg, #2d6a4f 0%, #95d5b2 100%)', emoji: '🎉' },

  // ── BEBIDAS ────────────────────────────────────────────────────────────────
  { id: 16, category: 'bebidas',   name: 'Refrigerante 350ml',      image: IMG('photo-1581636625402-29b2a704ef13'), rating: 4.3, reviewCount: 892, description: 'Coca-Cola, Coca Zero, Sprite, Guaraná Antarctica ou Fanta Laranja', price: 7.90, gradient: 'linear-gradient(145deg, #c1121f 0%, #f9c74f 100%)', emoji: '🥤' },
  { id: 17, category: 'bebidas',   name: 'Milk Shake Artesanal',    image: IMG('photo-1572490122747-3968b75cc699'), rating: 4.9, reviewCount: 634, description: 'Chocolate belga, morango, baunilha ou ovomaltine — 400ml cremoso e gelado', price: 22.90, badge: '❤️ Favorito', badgeColor: '#e63946', gradient: 'linear-gradient(145deg, #5c1a1a 0%, #f4a261 100%)', emoji: '🥛' },
  { id: 18, category: 'bebidas',   name: 'Suco Natural 400ml',      image: IMG('photo-1546171753-97d7676e4602'),    rating: 4.7, reviewCount: 289, description: 'Laranja, limão, maracujá, abacaxi com hortelã ou morango com acerola', price: 14.90, gradient: 'linear-gradient(145deg, #40916c 0%, #f9c74f 100%)', emoji: '🍊' },
  { id: 19, category: 'bebidas',   name: 'Água Mineral 500ml',      image: IMG('photo-1675914861279-921639cd47e1'), rating: 4.1, reviewCount: 156, description: 'Com ou sem gás, gelada', price: 5.90, gradient: 'linear-gradient(145deg, #48cae4 0%, #90e0ef 100%)', emoji: '💧' },
  { id: 20, category: 'bebidas',   name: 'Cerveja Artesanal 355ml', image: IMG('photo-1535958636474-b021ee887b13'), rating: 4.8, reviewCount: 421, description: 'IPA, Weiss, Pilsen ou Red Ale — rótulos selecionados pelo chef', price: 18.90, gradient: 'linear-gradient(145deg, #7b4f00 0%, #f9c74f 100%)', emoji: '🍺' },

  // ── SOBREMESAS ─────────────────────────────────────────────────────────────
  { id: 21, category: 'sobremesas', name: 'Brownie da Lagoa',  image: IMG('photo-1606313564200-e75d5e30476c'), rating: 4.9, reviewCount: 378, description: 'Brownie de chocolate belga 70% com sorvete de creme, calda quente de chocolate e farofa de amendoim', price: 19.90, badge: '🍫 Irresistível', badgeColor: '#5c1a1a', gradient: 'linear-gradient(145deg, #2d0a0a 0%, #f4a261 100%)', emoji: '🍫' },
  { id: 22, category: 'sobremesas', name: 'Sorvete Artesanal', image: IMG('photo-1563805042-7684c019e1cb'),    rating: 4.7, reviewCount: 234, description: '2 bolas à escolha: chocolate, morango, baunilha, açaí ou doce de leite', price: 16.90, gradient: 'linear-gradient(145deg, #c1121f 0%, #f9c74f 100%)', emoji: '🍦' },
  { id: 23, category: 'sobremesas', name: 'Torta Croco',       image: IMG('photo-1571115177098-24ec42ed204d'), rating: 4.8, reviewCount: 167, description: 'Fatia de torta de limão com merengue tostado e raspas de limão siciliano', price: 18.90, gradient: 'linear-gradient(145deg, #40916c 0%, #f9c74f 100%)', emoji: '🍰' },

  // ── EXTRAS / ADICIONAIS ────────────────────────────────────────────────────
  { id: 24, category: 'extras', name: 'Batata Crinkle P', image: IMG('photo-1573080496219-bb080dd4f877'), rating: 4.6, reviewCount: 512, description: 'Batata crinkle crocante temperada com ervas — porção pequena (~200g)', price: 14.90, gradient: 'linear-gradient(145deg, #7b4f00 0%, #f9c74f 100%)', emoji: '🍟' },
  { id: 25, category: 'extras', name: 'Batata Crinkle G', image: IMG('photo-1576107232684-1279f390859f'), rating: 4.7, reviewCount: 489, description: 'Batata crinkle crocante temperada com ervas — porção grande (~380g)', price: 22.90, gradient: 'linear-gradient(145deg, #7b4f00 0%, #f9c74f 100%)', emoji: '🍟' },
  { id: 26, category: 'extras', name: 'Queijo Extra',     image: IMG('photo-1486297678162-eb2a19b0a32d'), rating: 4.5, reviewCount: 203, description: 'Fatia extra de queijo cheddar, gouda ou americano', price: 3.90, gradient: 'linear-gradient(145deg, #d4a017 0%, #f9c74f 100%)', emoji: '🧀' },
  { id: 27, category: 'extras', name: 'Bacon Crocante',   image: IMG('photo-1528607929212-2636ec44253e'), rating: 4.8, reviewCount: 341, description: 'Tiras de bacon canadense extra crocante', price: 5.90, gradient: 'linear-gradient(145deg, #8b0000 0%, #f4a261 100%)', emoji: '🥓' },
  { id: 28, category: 'extras', name: 'Molho Especial',   image: IMG('photo-1638697586690-37f66f05083a'), rating: 4.7, reviewCount: 178, description: 'Maionese trufada, molho da casa, BBQ defumado ou aioli de alho negro', price: 4.90, gradient: 'linear-gradient(145deg, #2d6a4f 0%, #f9c74f 100%)', emoji: '🫙' },
]
