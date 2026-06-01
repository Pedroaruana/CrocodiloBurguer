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
  { id: 'burgers',     label: 'Burgers',      emoji: '🍔' },
  { id: 'combos',      label: 'Combos',       emoji: '🍟' },
  { id: 'bebidas',     label: 'Bebidas',      emoji: '🥤' },
  { id: 'sobremesas',  label: 'Sobremesas',   emoji: '🍦' },
  { id: 'extras',      label: 'Adicionais',   emoji: '🧀' },
]

export const products = [
  // ── DESTAQUES ──────────────────────────────────────────────────────────────
  { id: 1,  category: 'destaques', name: 'Croco Smash',       rating: 4.9, reviewCount: 847,  description: 'Dois smash burgers 120g, queijo americano duplo, cebola caramelizada, picles crocante e molho secreto da jaula', price: 42.90, badge: '🔥 Mais pedido', badgeColor: '#e63946', gradient: 'linear-gradient(145deg, #1a472a 0%, #f4a261 100%)', emoji: '🍔' },
  { id: 2,  category: 'destaques', name: 'Combo Croco Smash', rating: 4.8, reviewCount: 523,  description: 'Croco Smash + batata crinkle G + bebida 400ml à escolha', price: 59.90, badge: '⭐ Favorito', badgeColor: '#d4a017', gradient: 'linear-gradient(145deg, #2d6a4f 0%, #e76f51 100%)', emoji: '🍔🍟' },
  { id: 3,  category: 'destaques', name: 'Jacarezão',          rating: 4.7, reviewCount: 312,  description: 'Blend artesanal 220g, bacon duplo, queijo gouda, rúcula, geleia de pimenta e maionese trufada', price: 49.90, badge: '🌶️ Novo', badgeColor: '#e63946', gradient: 'linear-gradient(145deg, #5c1a1a 0%, #f9c74f 100%)', emoji: '🍔' },

  // ── BURGERS ────────────────────────────────────────────────────────────────
  { id: 4,  category: 'burgers',   name: 'Croco Classic',     rating: 4.6, reviewCount: 1203, description: 'Blend angus 180g, queijo cheddar, alface americana, tomate, cebola roxa e molho especial da casa', price: 32.90, gradient: 'linear-gradient(145deg, #2d6a4f 0%, #95d5b2 100%)', emoji: '🍔' },
  { id: 5,  category: 'burgers',   name: 'Croco Smash',       rating: 4.9, reviewCount: 847,  description: 'Dois smash burgers 120g, queijo americano duplo, cebola caramelizada, picles crocante e molho secreto da jaula', price: 42.90, badge: '🔥 Mais pedido', badgeColor: '#e63946', gradient: 'linear-gradient(145deg, #1a472a 0%, #f4a261 100%)', emoji: '🍔' },
  { id: 6,  category: 'burgers',   name: 'Jacarezão',          rating: 4.7, reviewCount: 312,  description: 'Blend artesanal 220g, bacon crocante, queijo gouda, rúcula, geleia de pimenta e maionese trufada', price: 49.90, badge: '🌶️ Picante', badgeColor: '#e63946', gradient: 'linear-gradient(145deg, #5c1a1a 0%, #f9c74f 100%)', emoji: '🍔' },
  { id: 7,  category: 'burgers',   name: 'Croco Veggie',      rating: 4.5, reviewCount: 189,  description: 'Blend de grão-de-bico e beterraba, queijo brie, espinafre, tomate seco e molho de ervas frescas', price: 36.90, badge: '🌿 Veggie', badgeColor: '#40916c', gradient: 'linear-gradient(145deg, #40916c 0%, #d8f3dc 100%)', emoji: '🥗' },
  { id: 8,  category: 'burgers',   name: 'Croco Duplo',       rating: 4.6, reviewCount: 443,  description: 'Dois blends angus 150g, queijo cheddar duplo, bacon, picles, cebola caramelizada, mostarda e ketchup artesanal', price: 47.90, gradient: 'linear-gradient(145deg, #2d6a4f 0%, #f4a261 100%)', emoji: '🍔' },
  { id: 9,  category: 'burgers',   name: 'Filhote da Lagoa',  rating: 4.8, reviewCount: 267,  description: 'Blend 150g, queijo prato, ovo caipira frito, bacon canadense, alface crespa e maionese defumada', price: 39.90, gradient: 'linear-gradient(145deg, #1a472a 0%, #f9c74f 100%)', emoji: '🍳' },
  { id: 10, category: 'burgers',   name: 'BBQ da Selva',      rating: 4.7, reviewCount: 198,  description: 'Blend angus 200g, queijo emmental, cebola crispy, molho BBQ defumado e pimenta calabresa', price: 44.90, gradient: 'linear-gradient(145deg, #3b1a0a 0%, #f4a261 100%)', emoji: '🍖' },

  // ── COMBOS ─────────────────────────────────────────────────────────────────
  { id: 11, category: 'combos',    name: 'Combo Classic',     rating: 4.6, reviewCount: 334,  description: 'Croco Classic + batata crinkle M + refrigerante 350ml', price: 49.90, gradient: 'linear-gradient(145deg, #2d6a4f 0%, #f9c74f 100%)', emoji: '🍔🍟' },
  { id: 12, category: 'combos',    name: 'Combo Croco Smash', rating: 4.8, reviewCount: 523,  description: 'Croco Smash + batata crinkle G + bebida 400ml à escolha', price: 59.90, badge: '⭐ Favorito', badgeColor: '#d4a017', gradient: 'linear-gradient(145deg, #1a472a 0%, #e76f51 100%)', emoji: '🍔🍟' },
  { id: 13, category: 'combos',    name: 'Combo Jacarezão',   rating: 4.7, reviewCount: 201,  description: 'Jacarezão + batata crinkle G + refrigerante 500ml', price: 64.90, badge: '🏆 Premium', badgeColor: '#d4a017', gradient: 'linear-gradient(145deg, #5c1a1a 0%, #f9c74f 100%)', emoji: '🍔🍟🥤' },
  { id: 14, category: 'combos',    name: 'Combo Duplo',       rating: 4.8, reviewCount: 176,  description: 'Croco Duplo + batata crinkle G + milk shake 400ml', price: 72.90, gradient: 'linear-gradient(145deg, #1a472a 0%, #e76f51 100%)', emoji: '🍔🥛' },
  { id: 15, category: 'combos',    name: 'Combo Família 🎉',  rating: 4.9, reviewCount: 312,  description: '2× Croco Classic + 2× Croco Smash + batata crinkle GG + 4 refrigerantes 350ml', price: 159.90, badge: '👨‍👩‍👧‍👦 Família', badgeColor: '#2d6a4f', gradient: 'linear-gradient(145deg, #2d6a4f 0%, #95d5b2 100%)', emoji: '🎉' },

  // ── BEBIDAS ────────────────────────────────────────────────────────────────
  { id: 16, category: 'bebidas',   name: 'Refrigerante 350ml',    rating: 4.3, reviewCount: 892, description: 'Coca-Cola, Coca Zero, Sprite, Guaraná Antarctica ou Fanta Laranja', price: 7.90, gradient: 'linear-gradient(145deg, #c1121f 0%, #f9c74f 100%)', emoji: '🥤' },
  { id: 17, category: 'bebidas',   name: 'Milk Shake Artesanal',  rating: 4.9, reviewCount: 634, description: 'Chocolate belga, morango, baunilha ou ovomaltine — 400ml cremoso e gelado', price: 22.90, badge: '❤️ Favorito', badgeColor: '#e63946', gradient: 'linear-gradient(145deg, #5c1a1a 0%, #f4a261 100%)', emoji: '🥛' },
  { id: 18, category: 'bebidas',   name: 'Suco Natural 400ml',    rating: 4.7, reviewCount: 289, description: 'Laranja, limão, maracujá, abacaxi com hortelã ou morango com acerola', price: 14.90, gradient: 'linear-gradient(145deg, #40916c 0%, #f9c74f 100%)', emoji: '🍊' },
  { id: 19, category: 'bebidas',   name: 'Água Mineral 500ml',    rating: 4.1, reviewCount: 156, description: 'Com ou sem gás, gelada', price: 5.90, gradient: 'linear-gradient(145deg, #48cae4 0%, #90e0ef 100%)', emoji: '💧' },
  { id: 20, category: 'bebidas',   name: 'Cerveja Artesanal 355ml', rating: 4.8, reviewCount: 421, description: 'IPA, Weiss, Pilsen ou Red Ale — rótulos selecionados pelo chef', price: 18.90, gradient: 'linear-gradient(145deg, #7b4f00 0%, #f9c74f 100%)', emoji: '🍺' },

  // ── SOBREMESAS ─────────────────────────────────────────────────────────────
  { id: 21, category: 'sobremesas', name: 'Brownie da Lagoa',  rating: 4.9, reviewCount: 378, description: 'Brownie de chocolate belga 70% com sorvete de creme, calda quente de chocolate e farofa de amendoim', price: 19.90, badge: '🍫 Irresistível', badgeColor: '#5c1a1a', gradient: 'linear-gradient(145deg, #2d0a0a 0%, #f4a261 100%)', emoji: '🍫' },
  { id: 22, category: 'sobremesas', name: 'Sorvete Artesanal', rating: 4.7, reviewCount: 234, description: '2 bolas à escolha: chocolate, morango, baunilha, açaí ou doce de leite', price: 16.90, gradient: 'linear-gradient(145deg, #c1121f 0%, #f9c74f 100%)', emoji: '🍦' },
  { id: 23, category: 'sobremesas', name: 'Torta Croco',       rating: 4.8, reviewCount: 167, description: 'Fatia de torta de limão com merengue tostado e raspas de limão siciliano', price: 18.90, gradient: 'linear-gradient(145deg, #40916c 0%, #f9c74f 100%)', emoji: '🍰' },

  // ── EXTRAS / ADICIONAIS ────────────────────────────────────────────────────
  { id: 24, category: 'extras', name: 'Batata Crinkle P', rating: 4.6, reviewCount: 512, description: 'Batata crinkle crocante temperada com ervas — porção pequena (~200g)', price: 14.90, gradient: 'linear-gradient(145deg, #7b4f00 0%, #f9c74f 100%)', emoji: '🍟' },
  { id: 25, category: 'extras', name: 'Batata Crinkle G', rating: 4.7, reviewCount: 489, description: 'Batata crinkle crocante temperada com ervas — porção grande (~380g)', price: 22.90, gradient: 'linear-gradient(145deg, #7b4f00 0%, #f9c74f 100%)', emoji: '🍟' },
  { id: 26, category: 'extras', name: 'Queijo Extra',     rating: 4.5, reviewCount: 203, description: 'Fatia extra de queijo cheddar, gouda ou americano', price: 3.90, gradient: 'linear-gradient(145deg, #d4a017 0%, #f9c74f 100%)', emoji: '🧀' },
  { id: 27, category: 'extras', name: 'Bacon Crocante',   rating: 4.8, reviewCount: 341, description: 'Tiras de bacon canadense extra crocante', price: 5.90, gradient: 'linear-gradient(145deg, #8b0000 0%, #f4a261 100%)', emoji: '🥓' },
  { id: 28, category: 'extras', name: 'Molho Especial',   rating: 4.7, reviewCount: 178, description: 'Maionese trufada, molho da casa, BBQ defumado ou aioli de alho negro', price: 4.90, gradient: 'linear-gradient(145deg, #2d6a4f 0%, #f9c74f 100%)', emoji: '🫙' },
]
