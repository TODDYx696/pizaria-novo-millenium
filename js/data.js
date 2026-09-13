/* Pizzaria Novo Milenium — Cardápio oficial
   Preços de ALHO e LARICA: confirmar (não inventar)
   Fotos: Unsplash (fotos reais, não geradas por IA) — substituir pelas oficiais quando disponíveis */

window.STORE = {
  name: "Pizzaria Novo Milenium",
  phone: "5511962248186",
  phoneDisplay: "(11) 96224-8186",
  address: "R. Paim, 211 - Lj 19 - Bela Vista, São Paulo - SP, 01306-010",
  whatsappMsgPrefix: "Olá! Gostaria de fazer um pedido:"
};

window.PRODUCTS = [
  { id: 1, number: "01", name: "Abobrinha", desc: "Mussarela, Abobrinha e Alho", category: "pizzas", tags: ["salgadas"], priceG: 51.9, priceB: 36.9, img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=400&fit=crop" },
  { id: 2, number: "02", name: "Alho", desc: "Tomate, Alho e Mussarela", category: "pizzas", tags: ["salgadas"], priceG: null, priceB: null, img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d264?w=400&h=400&fit=crop" },
  { id: 3, number: "03", name: "Aliche com Mussarela", desc: "Aliche, Rodelas de Tomate e Mussarela", category: "pizzas", tags: ["salgadas"], priceG: 51.9, priceB: 36.9, img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=400&fit=crop" },
  { id: 4, number: "04", name: "Aliche", desc: "Molho de Tomate, Aliche, Alho Frito e Parmesão", category: "pizzas", tags: ["salgadas"], priceG: 51.9, priceB: 36.9, img: "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400&h=400&fit=crop" },
  { id: 5, number: "05", name: "A Moda da Casa", desc: "Frango, Champignon, Molho, Catupiry e Milho", category: "pizzas", tags: ["salgadas", "mais-pedidas"], priceG: 61.9, priceB: 41.9, img: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400&h=400&fit=crop" },
  { id: 6, number: "06", name: "A Moda do Chefe", desc: "Provolone, Presunto, Tomate e Parmesão", category: "pizzas", tags: ["salgadas"], priceG: 51.9, priceB: 36.9, img: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=400&h=400&fit=crop" },
  { id: 7, number: "07", name: "Atum", desc: "Atum coberto com Cebolas", category: "pizzas", tags: ["salgadas"], priceG: 56.9, priceB: 39.9, img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=400&fit=crop" },
  { id: 8, number: "08", name: "Atum Sólido Especial", desc: "Atum, Mussarela, Cebola e Tomate", category: "pizzas", tags: ["salgadas"], priceG: 61.9, priceB: 41.9, img: "https://images.unsplash.com/photo-1588315029754-2dd089d39a1a?w=400&h=400&fit=crop" },
  { id: 9, number: "09", name: "Bacon", desc: "Mussarela, Bacon e Cebola", category: "pizzas", tags: ["salgadas", "mais-pedidas"], priceG: 51.9, priceB: 36.9, img: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=400&h=400&fit=crop" },
  { id: 10, number: "10", name: "Baiana", desc: "Calabresa Moída, Pimenta, Ovos e Cebola", category: "pizzas", tags: ["salgadas"], priceG: 51.9, priceB: 36.9, img: "https://images.unsplash.com/photo-1571407970349-4367e0b0c2c6?w=400&h=400&fit=crop" },
  { id: 11, number: "11", name: "Batata Palha", desc: "Mussarela e Batata Palha", category: "pizzas", tags: ["salgadas"], priceG: 51.9, priceB: 36.9, img: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=400&h=400&fit=crop" },
  { id: 12, number: "12", name: "Bauru", desc: "Presunto, Mussarela e Tomate", category: "pizzas", tags: ["salgadas"], priceG: 43.9, priceB: 31.9, img: "https://images.unsplash.com/photo-1601924582970-9238bcb495d2?w=400&h=400&fit=crop" },
  { id: 13, number: "13", name: "Brócolis", desc: "Brócolis Temperado e Mussarela", category: "pizzas", tags: ["salgadas"], priceG: 51.9, priceB: 36.9, img: "https://images.unsplash.com/photo-1528137871618-79d2761e3fd5?w=400&h=400&fit=crop" },
  { id: 14, number: "14", name: "Caipira", desc: "Frango, Mussarela e Milho", category: "pizzas", tags: ["salgadas"], priceG: 53.9, priceB: 41.9, img: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=400&h=400&fit=crop" },
  { id: 15, number: "15", name: "Calabresa", desc: "Calabresa coberta com Cebola", category: "pizzas", tags: ["salgadas", "mais-pedidas"], priceG: 43.9, priceB: 31.9, img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=400&fit=crop" },
  { id: 16, number: "16", name: "Calzone Novo Milênio", desc: "Lombo Canadense, Ovo, Palmito e Mussarela", category: "pizzas", tags: ["salgadas"], priceG: 51.9, priceB: 36.9, img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d264?w=400&h=400&fit=crop" },
  { id: 17, number: "17", name: "Camarão com Catupiry", desc: "Camarão com Catupiry ou Mussarela", category: "pizzas", tags: ["salgadas"], priceG: 101.9, priceB: 80.9, img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=400&fit=crop" },
  { id: 18, number: "18", name: "Carne de Sol", desc: "Carne de Sol, Mussarela, Cebola e Brócolis", category: "pizzas", tags: ["salgadas"], priceG: 56.9, priceB: 36.9, img: "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400&h=400&fit=crop" },
  { id: 19, number: "19", name: "Cinco Queijos", desc: "Mussarela, Gorgonzola, Catupiry, Provolone e Parmesão", category: "pizzas", tags: ["salgadas", "mais-pedidas"], priceG: 61.9, priceB: 41.9, img: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400&h=400&fit=crop" },
  { id: 20, number: "20", name: "Costela", desc: "Molho de tomate, Mussarela, Costela desfiada e Cebola", category: "pizzas", tags: ["salgadas"], priceG: 56.9, priceB: 42.9, img: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=400&h=400&fit=crop" },
  { id: 21, number: "21", name: "Costela Especial", desc: "Molho de tomate, Mussarela, Costela desfiada, Cebola e Catupiry", category: "pizzas", tags: ["salgadas"], priceG: 61.9, priceB: 46.9, img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=400&fit=crop" },
  { id: 22, number: "22", name: "Escarola", desc: "Escarola temperada coberta com Mussarela", category: "pizzas", tags: ["salgadas"], priceG: 43.9, priceB: 31.9, img: "https://images.unsplash.com/photo-1588315029754-2dd089d39a1a?w=400&h=400&fit=crop" },
  { id: 23, number: "23", name: "Frango Especial", desc: "Frango e Catupiry Original", category: "pizzas", tags: ["salgadas", "mais-pedidas"], priceG: 61.9, priceB: 46.9, img: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=400&h=400&fit=crop" },
  { id: 24, number: "24", name: "Gorgonzola", desc: "Queijo Gorgonzola", category: "pizzas", tags: ["salgadas"], priceG: 51.9, priceB: 36.9, img: "https://images.unsplash.com/photo-1571407970349-4367e0b0c2c6?w=400&h=400&fit=crop" },
  { id: 25, number: "25", name: "Larica", desc: "Frango, Catupiry, Presunto, Mussarela e Calabresa", category: "pizzas", tags: ["salgadas"], priceG: null, priceB: null, img: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=400&h=400&fit=crop" },
  { id: 26, number: "26", name: "Lombo", desc: "Lombo Canadense coberto com Catupiry ou Mussarela", category: "pizzas", tags: ["salgadas"], priceG: 51.9, priceB: 36.9, img: "https://images.unsplash.com/photo-1601924582970-9238bcb495d2?w=400&h=400&fit=crop" },
  { id: 27, number: "27", name: "Mussarela", desc: "Molho de Tomate e Mussarela", category: "pizzas", tags: ["salgadas", "mais-pedidas"], priceG: 43.9, priceB: 31.9, img: "https://images.unsplash.com/photo-1528137871618-79d2761e3fd5?w=400&h=400&fit=crop" }
];

window.CATEGORIES = [
  { id: "todas", label: "Todas" },
  { id: "mais-pedidas", label: "Mais pedidas" },
  { id: "salgadas", label: "Salgadas" }
];
