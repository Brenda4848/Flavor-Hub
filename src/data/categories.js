const categories = [
  {
    id: "pizza",
    label: "Pizza",
    image: "/pizza.png",
    count: 58,
    dishes: [
      { id: "Margherita-p1", name: "Margherita", price: 52.99, description: "Classic tomato, mozzarella & basil", image: "/Margherita.png" },
      { id: "Pepperoni-p2", name: "Pepperoni", price: 55.99, description: "Loaded with spicy pepperoni slices", image: "/peperoni.png" },
      { id: "BBQ Chicken-p3", name: "BBQ Chicken", price: 50.99, description: "Smoky BBQ sauce with grilled chicken", image: "/bbq.png" },
      { id: "Veggie Supreme-p4", name: "Veggie Supreme", price: 52.99, description: "Seasonal veggies on garlic base", image: "/veggie.png" },
    ],
  },
  {
    id: "burger",
    label: "Burgers",
    image:"/burgers.png",
    count: 42,
     dishes: [
      { id: "Classic Smash-p1", name: "Classic Smash", price: 23.99, description: "Double smash patty, American cheese", image: "/smash.png" },
      { id: "Spicy Crispy-p2", name: "Spicy Crispy", price: 29.99, description: "Crispy fried chicken, sriracha mayo", image: "/spicy.png" },
      { id: "Mushroom Swiss-p3", name: "Mushroom Swiss", price: 20.49, description: "Sautéed mushrooms, Swiss cheese", image: "/mushroom.png" },
    ],
  },
  {
    id: "pasta",
    label: "Pasta",
    image: "/pasta.png",
    count: 35,
    dishes: [
      { id: "Spaghetti-p1", name: "Spaghetti", price: 60.99, description: "Long, thin, cylindrical strands. The classic twirl with a fork pasta", image: "/Spaghetti.png" },
      { id: "Penne-p2", name: "Penne", price: 54.99, description: "Loaded with spicy pepperoni slices", image: "/Penne.png" },
      { id: "Fettuccine-p3", name: "Fettuccine", price: 45.99, description: "Smoky BBQ sauce with grilled chicken", image: "/Fettuccine.png" },
      { id: "Fusilli-p4", name: "Fusilli", price: 53.99, description: "Seasonal veggies on garlic base", image: "/Fusilli.png" },
    ],
  },
  {
    id: "desserts",
    label: "Desserts",
    image: "/dessert.png",
    count: 41,
    dishes: [
      { id: "Tiramisu-p1", name: "Tiramisu", price: 112.99, description: "Italian classic, Layers of coffe-soaked biscuits + creamy cheese", image: "/tiramisu.png" },
      { id: "Churros with Chocolate-p2", name: "Churros with Chocolate", price: 114.99, description: "Fried dough sticks, crispy outside + soft inside, rolled in cinnamon suger", image: "/churros.png" },
      { id: "Pavlova-p3", name: "Pavlova", price: 99.99, description: "Meringue base that's crips on the outside, marshmallowy soft inside", image: "/pavlova.png" },
      { id: "Baklava-p4", name: "Baklava", price: 97.99, description: "Layers of thin phyllo paystry with chopped nuts + honey syrup", image: "/baklava.png" },
    ],
  },
  {
    id: "seafood",
    label: "Seafood",
    image: "/seafood.png",
    count: 27,
    dishes: [
      { id: "Salmon-p1", name: "Salmon", price: 99.99, description: "Grilled salmon with lemon butter sauce", image: "/salmon.png" },
      { id: "Shrimp/Prawns-p2", name: "Shrimp/Prawns", price: 94.99, description: "small crustaceans with a sweet, mild taste and firm bite", image: "/shrimp.png" },
      { id: "Tuna-p3", name: "Tuna", price: 92.99, description: "Meaty, steak-like fish with a rich, distinctive flavor", image: "/tuna.png" },
      { id: "Scallops-p4", name: "Scallops", price: 87.99, description: "Round, tender shellfish with a sweet, delicate taste ", image: "/scallops.png" },
    ],
  },
  {
    id: "drinks",
    label: "Drinks",
    image: "/drinks.png",
    count: 88,
    dishes: [
      { id: "Milkshake-p1", name: "Milkshake", price: 37.99, description: "Creamy blended drink with milk and flavoring", image: "/milkshake.png" },
      { id: "iced coffee-p2", name: "iced coffee", price: 28.99, description: "Coffee brewed strong, cooled down, poured over ice", image: "/iced.png" },
      { id: "smoothie-p3", name: "smoothie", price: 25.99, description: "Blended drink with fruits and yogurt/milk", image: "/smoothie.png" },
      { id: "Chapman-p4", name: "Chapman", price: 23.99, description: "Nigerians favorite cocktail/mocktail", image: "/chapman.png" },
    ],
  },
  {
    id: "african",
    label: "African",
    image: "/african.png",
    count: 28,
    dishes: [
      { id: "Jasmine Rice-p1", name: "Jasmine Rice", price: 75.99, description: "Long-grain of rice from Thiland with a delicate aroma", image: "/jasmine.png" },
      { id: "Basmatic Rice-p2", name: "Basmatic Rice", price: 94.99, description: "Long, slender grain from india/pakistain", image: "/basmatic.png" },
      { id: "Fried Rice-p3", name: "Fried Rice", price: 97.99, description: "loving rice dish with vegetables and chicken", image: "/fried-rice.png" },
      { id: "Jollof Rice-p4", name: "Jollof Rice", price: 99.99, description: "Seasonal veggies on garlic base", image: "/jollof-rice.png" },
    ],
  },
  {
    id: "chef sepicals",
    label: "Chef Specials",
    image: "/chef-specials.png",
    count: 26,
    dishes: [
      { id: "Surf & Turf-p1", name: "Surf & Turf", price: 182.99, description: "Premium cut of rear steak and fresh seafood", image: "/surf.png" },
      { id: "Chefs Seafood Paella-p2", name: "Chefs Seafood Paella", price: 154.99, description: "Spanish-style rice dish with assorted seafood", image: "/paella.png" },
      { id: "Wagyu Beef Tenderloin-p3", name: "Wagyu Beef Tenderloin", price: 195.99, description: "Premium cut of beef with a rich, buttery flavor", image: "/wagyu.png" },
      { id: "Deconstructed Chocolate lava Cake-p4", name: "Deconstructed Chocolate lava Cake", price: 180.99, description: "Modern take on the classic chocolate lava cake", image: "/lava.png" },
    ],
  },
]

export default categories