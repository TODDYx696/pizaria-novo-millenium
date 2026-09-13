/* Dados da Pizzaria Novo Milenium.
   As fotos abaixo são apenas DEMONSTRAÇÃO e não representam necessariamente a receita real de cada sabor.
   Antes da publicação comercial, substituir pelas fotos autorizadas da pizzaria.
*/
window.STORE = {
  name: "Pizzaria Novo Milenium",
  phone: "5511962248186",
  phoneDisplay: "(11) 96224-8186",
  address: "R. Paim, 211 - Lj 19 - Bela Vista, São Paulo - SP, 01306-010"
};

const demoPizza = "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=1200&auto=format&fit=crop";
const demoCheese = "https://images.unsplash.com/photo-1579751626657-72bc17010498?q=80&w=1200&auto=format&fit=crop";
const demoPizza2 = "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?q=80&w=1200&auto=format&fit=crop";
const demoCalabresa = "https://images.pexels.com/photos/30504705/pexels-photo-30504705.jpeg?auto=compress&cs=tinysrgb&w=1200";
const demoBroccoli = "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=1200&auto=format&fit=crop";
const demoShrimp = "https://images.unsplash.com/photo-1579751626657-72bc17010498?q=80&w=1200&auto=format&fit=crop";

const pizza = (id, number, name, desc, priceG, priceB, img = demoPizza) => ({ id, number, name, desc, category: "pizzas", priceG, priceB, img });

window.PRODUCTS = [
  pizza(1,"01","Abobrinha","Mussarela, Abobrinha e Alho",51.90,36.90,demoPizza2),
  pizza(2,"02","Alho","Tomate, Alho e Mussarela",null,null,demoCheese),
  pizza(3,"03","Aliche com Mussarela","Aliche, Rodelas de Tomate e Mussarela",51.90,36.90,demoPizza),
  pizza(4,"04","Aliche","Molho de Tomate, Aliche, Alho Frito e Parmesão",51.90,36.90,demoCheese),
  pizza(5,"05","A Moda da Casa","Frango, Champignon, Molho, Catupiry e Milho",61.90,41.90,demoPizza2),
  pizza(6,"06","A Moda do Chefe","Provolone, Presunto, Tomate e Parmesão",51.90,36.90,demoCheese),
  pizza(7,"07","Atum","Atum coberto com Cebolas",56.90,39.90,demoPizza),
  pizza(8,"08","Atum Sólido Especial","Atum, Mussarela, Cebola e Tomate",61.90,41.90,demoPizza2),
  pizza(9,"09","Bacon","Mussarela, Bacon e Cebola",51.90,36.90,demoPizza),
  pizza(10,"10","Baiana","Calabresa Moída, Pimenta, Ovos e Cebola",51.90,36.90,demoPizza2),
  pizza(11,"11","Batata Palha","Mussarela e Batata Palha",51.90,36.90,demoCheese),
  pizza(12,"12","Bauru","Presunto, Mussarela e Tomate",43.90,31.90,demoPizza),
  pizza(13,"13","Brócolis","Brócolis Temperado e Mussarela",51.90,36.90,demoBroccoli),
  pizza(14,"14","Caipira","Frango, Mussarela e Milho",53.90,41.90,demoPizza2),
  pizza(15,"15","Calabresa","Calabresa coberta com Cebola",43.90,31.90,demoCalabresa),
  pizza(16,"16","Calzone Novo Milênio","Lombo Canadense, Ovo, Palmito e Mussarela",51.90,36.90,demoPizza),
  pizza(17,"17","Camarão com Catupiry","Camarão com Catupiry ou Mussarela",101.90,80.90,demoShrimp),
  pizza(18,"18","Carne de Sol","Carne de Sol, Mussarela, Cebola e Brócolis",56.90,36.90,demoPizza2),
  pizza(19,"19","Cinco Queijos","Mussarela, Gorgonzola, Catupiry, Provolone e Parmesão",61.90,41.90,demoCheese),
  pizza(20,"20","Costela","Molho de tomate, Mussarela, Costela desfiada e Cebola",56.90,42.90,demoPizza),
  pizza(21,"21","Costela Especial","Molho de tomate, Mussarela, Costela desfiada, Cebola e Catupiry",61.90,46.90,demoPizza2),
  pizza(22,"22","Escarola","Escarola temperada coberta com Mussarela",43.90,31.90,demoBroccoli),
  pizza(23,"23","Frango Especial","Frango e Catupiry Original",61.90,46.90,demoPizza2),
  pizza(24,"24","Gorgonzola","Queijo Gorgonzola",51.90,36.90,demoCheese),
  pizza(25,"25","Larica","Frango, Catupiry, Presunto, Mussarela e Calabresa",null,null,demoPizza),
  pizza(26,"26","Lombo","Lombo Canadense coberto com Catupiry ou Mussarela",51.90,36.90,demoPizza2),
  pizza(27,"27","Mussarela","Molho de Tomate e Mussarela",43.90,31.90,demoCheese)
];

window.CATEGORIES = [
  { id: "todas", label: "Todas" },
  { id: "pizzas", label: "Pizzas" }
];
