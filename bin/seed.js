const mongoose = require('mongoose');
const User = require('../models/User.model');
const Recipe = require('../models/Recipe.model');

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/booking-home-chef";

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });


const users = [
  {
    name: "Laurent Coutantic",
    email: "Laurent@Coutantic.com",
    specialities: "fusion cuisine",
    image_Url: "/images/chef-image/laurent-coutantic.jpeg",
    isProfilePublic: true,
    catchPhrase:"Modern and traditional cuisine without borders.",
    aboutMe: "Cooking is like a love story: sharing, the pleasure of giving pleasure and being authentic. This passion was transmitted to me by my parents and grandparents with whom I discovered the flavors synonymous with childhood memories and good times shared with our loved ones. I also had the privilege of perfecting myself with chefs such as: Christophe Michalak, Thierry Marx, Cyril Lignac, Antoine Heerah, Mikula Flora, Lionel Levy, Nicolas Masse. That is why, today I propose to you to transmit my passion and tips of leaders during workshops (adults and children), dinners and evenings private or professional (seminars, animations, .) realized at your place (Paris / Paris region and province) depending on the season and your budget.",
  },
  {
    name: "Daniele Ferro",
    email: "Daniele@Ferro.com",
    specialities: "french",
    image_Url: "/images/chef-image/daniele-ferro.jpg",
    isProfilePublic: true,
    catchPhrase:"Creative and passionate Chef that will surprise you",
    aboutMe: "I am a professional and passionate Chef, actually in Paris. I have 13 years experience. I am experienced in Italian, French and South american cuisine. I have worked in the main European cities : Rome, Montecarlo, London and Paris. I am Italian, born and grew up in Rome, during my culinary studies I was an intership cook to Antico Bottaro Restaurant, famous Roman gastronomic kitchen. Another experience has been in Restaurant Mirabelle, one Michelin Star, situated into Hotel Splendid Royal Roma, has been a good place where to learn during my studies I have worked in Montecarlo at the Beef Bar with Chef Thierry Paludetto (10 years former Chef cuisine Robuchon). I have learned a lot about meat through each process even to treat at its best Australian, Wagyu or Kobe. One of my best experience has been working with Chef Carlo Scotto (Xier Restaurant London), former Gordon Ramsay sous chef. In Paris I have earned l'assiette Michelin while I was working as Chef at Anahi Restaurant. Feel free to contact me for any question or curiosity.",
  },
  {
    name: "Marco Silvetti",
    email: "Marco@Silvetti.com",
    specialities: "italian",
    image_Url: "/images/chef-image/marco-silvetti.jpg",
    isProfilePublic: true,
    catchPhrase:"Cooking is my way of living",
    aboutMe: "Chef Marco is originally from Italy. His culinary passion began at a really young age. He has build an impressive culinary career around different countries starting in Italy in a Michelin Star Restaurant, then opening his own restaurant in Paris, France, bringing the real Italian cuisine to the French capital; being sous chef in Ardoise restaurant in Saint Barthélémy; working in Calanque de Figuerolles in La Ciotat and in the restaurant A Volta in Corse, France. Chef Marco started been a private chef in 2002 in Rome where he had the opportunity to cook for Fendi and Lou Reed among others. He continued being a private chef while he was in Paris in 2008, cooking for musicians, actors; always providing a high quality service, being punctual, curious and discreet. Chef Marco is specialized in Italian, Mediterranean, traditional and modern French cuisine among others. Nowadays, chef Marco moved to the French Riviera, next to Marseille to start his new experience as a private chef. Chef Marco provides a high-quality service to your table using local products and combining traditional and modern culinary techniques. He will provide a unique, delicate and personalized service in every occasion. Outside the kitchen, he is always looking to find new tastes and flavors, putting all his daily effort and dedication to accomplish his clients needs and surpass their expectations.",
  },
  {
    name: "Christo Pretorius",
    email: "Christo@Pretorius.com",
    specialities: "african",
    image_Url: "/images/chef-image/christo-petrorius.jpg",
    isProfilePublic: true,
    catchPhrase:"Passion, flavours, aromas and colours all coming together to tell a beautiful story on the plate.",
    aboutMe: "Chef Christo obtained his Diploma in Food Preparation and Culinary Arts at Capsicum Culinary Studio in Pretoria, one of the greatest culinary schools the country has to offer. During his studies, he had the opportunity to showcase his skills on national television with South African celebrity chef, Reuben Riffel. Mentored by chef Genghis San, he found a love for Asian cuisine in the prestigious Protea Hotel: Fire & Ice. He secured an internship at one of the capital's top 10 restaurants, Fermier, where he perfected African-French fusion cuisine and practiced farm to fork concept innovation. In the private chef industry he has been using his knowledge, passion and creativity to produce delectable menus that portray the essence of South African culture and cuisine with flair! An entertainer at heart and a wizard in the kitchen, chef Christo will certainly leave you and your guests satisfied. and yet wanting more.",
  },
  {
    name: "Akhil Bt",
    email: "Akhil@Bt.com",
    specialities: "Indian",
    image_Url: "/images/chef-image/akhil-Bt.jpg",
    isProfilePublic: true,
    aboutMe: "I’m a professional chef , with 13 years of experience mainly in Michelin starred kitchen across Europe , world renowned restaurants . I currently works as a private chef . I love the challenge to exceed the expectation of every palate I cook for and its a beautiful journey filled with excitement and adventure. I enjoy cooking fine dinning with Michelin star standard , Modern bistro style cuisine , Scandinavian , Indian , Asian and also Japanese cuisine (I’m not a sushi or hand made Sobha master) . I look forward to cook for you with your family and friends !!!!",
  },
  {
    name: "Daniel Morgan",
    email: "Daniel@Morgan.com",
    specialities: "british",
    image_Url: "/images/chef-image/daniel-morgan.jpeg",
    isProfilePublic: true,
    catchPhrase:"Chef with big respect for seasonal natural produce",
    aboutMe: "Head Chef at Robert Paris. My career as a chef began in London, where I earned my stripes as a commis in some of the cities most well-established fine dining institutions such as; The Ritz, The Square, Sketch, and Maze by Gordon Ramsay. After 7 years of honing classical techniques and learning the fundamentals of cooking, I embarked on an international culinary trip which would see me visit, work, and live, in India, Japan, Colombia, Sweden, and Denmark, culminating in my eventual arrival to Paris where I would open and cook at my first restaurant as Head Chef - Salt. I believe intuition is a key element of my cooking and my travels have allowed me to have a varied repertoire that can be adapted to many environments, allowing me to utilise fresh local ingredients and produce. I have been honoured to accept accolades such as The Lebey guide 2016 best British Chef in Paris, as well as second place at The UK National Chef of the year award. More recently, I was voted Chef of the year 2021 by Lefooding. For the past three years, I have worked more autonomously adapting ideas and hosting private dinners is in gallery spaces, as well as collaborating with other well-established restaurants and Chefs on many projects. Wine is a big part of my DNA, and I have a keen interest in fermentation. I can offer tastings in both natural wine and beer too. All my menus can be adapted to lifestyles. My time in India and Southern America has given me a vast knowledge in flavours and spices, which lends itself to my Vegan and Vegetarian dishes.",
  },
  {
    name: "Alya Ben Hamza",
    email: "Alya@BenHamza.com",
    specialities: "fusion cuisine",
    image_Url: "/images/chef-image/alya-ben-hamza.jpg",
    isProfilePublic: true,
    catchPhrase:"a passionate in my work",
    aboutMe: "My site can talk about me :)but i can say i love to please people by making them the best i can .in my dishes i give my knowledges ;all i had learn in my long experience in this field,but not only ,making a good meal is a part of the culture of the countries !having a sushi is different than having a foie-gras it tells you different things and its also different in your palet or in your mouth !!!i have to make people say waw when they eat my dish!",
  }
];

const recipes = [
  {
    name: "Briouat",
    image_Url:"/images/recipe-image/briouat.jpg",
    type: ["starter"],
    ingredient: "1/2 kilogram (1 pound - 3 ounces) ground meat - beef - lamb - or a combo | 1 medium onion - finely chopped | 1 teaspoon paprika | 1 teaspoon cumin | 1 teaspoon pepper | 1 1/2 teaspoons salt | 1 teaspoon cinnamon | 8 tablespoons butter - divided | Handful fresh parsley leaves - chopped | 3 large eggs - lightly beaten | About 1 1/10 pound (1/2 kilogram) warqa - or filo dough - or large spring roll wrappers | 1 egg yolk - lightly beaten - for folding the briouats | Oil - for frying",
    description: "Briouats are small Moroccan pastries which are stuffed with a variety of fillings and then fried. This recipe features ground meat (kefta, kofta or kufta) enclosed in crisp, paper-thin Moroccan pastry called warqa. Phyllo (fillo) dough or spring roll wrappers can be substituted for the warqa. Kefta briouats are usually served as a finger food or appetizer, but they can also be served as an entrée. This filling is mildly seasoned. Also try Spicy Kefta Briouats.",
    dietary: ["Kosher"],
    
  },
  {
    name: "Chicken Yakitori",
    image_Url:"/images/recipe-image/chicken-yakitori.jpeg",
    type: ["starter","cocktail piece"],
    ingredient: "⅔ cup soy sauce | ½ cup water | 2 tablespoons mirin rice wine | 2 tablespoons rice vinegar | ⅔ cup light brown sugar | 1 teaspoon ginger, minced | 1 clove garlic, minced | 5 teaspoons cornstarch | 2 pounds chicken thighs, boneless, skinless, cut into 1” by 1 ¼” pieces | 8 bamboo skewers, or metal skewers | kosher salt, as needed for seasoing | black pepper, as needed for seasoning | 2 tablspoons vegetable oil | 1 teaspoon sesame seeds",
    description: "Chicken yakitori is an easy Japanese grilled recipe served on skewers. The meat is basted with a savory-sweet sauce as it cooks over a hot barbecue grill. A quick appetizer for a crowd or dinner served with a few extra sides.",
    // dietary: [""],
    
  },
  {
    name: "Burger Campagne",
    image_Url:"/images/recipe-image/burger-campagne.jpeg",
    type: ["main dish"],
    ingredient: "2 burger buns | 2 minced beef steaks of 150g | 2 burger buns | 2 minced beef steaks of 150g | 1 tomato | 2 cl of sunflower oil | 15 g unsalted butter | 2 pinches of powdered sugar | 2 button mushrooms | 30g of gruyère | 1 new onion | 2 cl of balsamic vinegar | 2 pinches of fine salt | For the sauce: | 1 egg yolk | sunflower oil | 1 pinch of fleur de sel | 10 g of honey",
    description: "Taste this quality burger that will surprise you with its original country sauce that you will want more.",
    dietary: ["Lactose intolerance"],
    
  },
   {
    name: "Compote of citrus supremes with whipped cream with Earl Gray tea and an oatmeal crumble, honey and pecan nuts (Recipe Christophe Michalak)",
    image_Url:"/images/recipe-image/compote-of-citrus.jpeg",
    type: ["dessert"],
    ingredient: "Crumble: | 125 g flour | 75 g brown sugar | 25 g rolled oats (or müesliou cereals) | 75 g butter | 1 g salt | 20 g honey | 30 g pecans | Citrus compote: | 2 oranges | 1 grapefruit | 2 lemons | 1 jar of citrus jam | 1 lime | Chantilly Earl Gray tea: | 600 g of liquid cream 35% UHT (no light, no light) cold | 60 g of powdered tea | 60 g of brown sugar | a few drops of orange blossom",
    description: "Compote of citrus supremes with whipped cream with Earl Gray tea and an oatmeal crumble, honey and pecan nuts (Recipe Christophe Michalak)",
    // dietary: [""],
    
  },
  {
    name: "Rib of beef and porcini mushrooms with parsley",
    image_Url:"/images/recipe-image/rib-of-beef-and-porcini-mushrooms.jpeg",
    type: ["main dish"],
    ingredient: "1 rib of beef weighing 1.5 kg | 4 cl of peanut oil | 1 clove of garlic | 1 leaf of thyme | 1 leaf bay leaf | 25 g unsalted butter | fleur de sel (2 to 3 pinches of fleur de sel) 650 g of porcini mushrooms | 1⁄2 bunch of flat-leaf parsley | 1 to 2 cloves of garlic | 3 to 4 pinches of fleur de sel | 3 to 4 turns of the pepper mill | 2 cl of olive oil | 25 g of unsalted butter",
    description: "The terroir of the south-west in all its splendour, with a rib of beef roasted in the oven with thyme, garlic, bay leaf and fresh butter, accompanied by porcini mushrooms seasoned with garlic and parsley. We already believe it!",
    // dietary: [""],
   
  },
  {
    name: "Coulant salted butter caramel muffin",
    image_Url:"/images/recipe-image/coulant-salted-butter-caramel-muffin.jpeg",
    type: ["dessert"],
    ingredient: "For the caramel sauce: 225 powdered sugar | 23 g unsalted butter | 7 cl whole liquid cream (no light, no light) | 4.5 cl of semi-skimmed milk | For the rest of the recipe: | 20 g unsalted butter | 40 g salted butter | 2 eggs whole | 60 g caster sugar | 70 g flour",
    description: "Let yourself be tempted by this simple and gourmet recipe for salted butter caramel coulant.",
    // dietary: [""],
    
  },
  {
    name: "Coulant chocolate and fleur de sel muffin",
    image_Url:"/images/recipe-image/coulant-chocolate-and-fleur-de-sel-muffin.jpeg",
    type: ["dessert"],
    ingredient: "110g dark chocolate | 115g butter | 2 whole eggs | 80g caster sugar | 60g of flour | a few shavings or pieces of crushed dark chocolate | a few grains of fleur de sel",
    description: "The chocolate coulant… How can you resist it? Its powerful taste, its flowing heart, its little fleur de sel that tickles the tongue. It's a recipe from Philippe Conticini that is simply perfect: quick, easy, delicious. For the very gray days, for the very cold days, for the days when your morale is at its lowest… a little chocolate coulant, it feels so good.",
    // dietary: [""],
    
  },
  {
    name: "Craquelin",
    image_Url:"/images/recipe-image/craquelin.jpg",
    type: ["dessert"],
    ingredient: "150 g butter | 185 g brown sugar | 185 g flour",
    description: "The craquelin, a simple cookie-like dough consisting of sugar, butter, flour, and a pinch of salt, is rolled out, cut, and perched on top of piped choux and the two are baked together, producing pastry puffs with a crackly appearance, crunchy texture, and a buttery, sweet bite.",
    dietary: ["Lactose intolerance"],
    
  },
  {
    name: "Croque mozzarella, ham and basil",
    image_Url:"/images/recipe-image/croque-mozzarella-ham-and-basil.jpeg",
    type: ["cocktail piece"],
    ingredient: "8 slices of sandwich bread | 2 mozzarella | 4 slices of raw or white ham | 2 tomatoes | 1⁄2bunch of basil | 2 cl of olive oil | 2 turns of the pepper mill",
    description: "roques that will delight the whole family: tomatoes, mozzarella, serrano ham and a hint of basil, guaranteed success!",
    // dietary: [""],
    
  },
  {
    name: "Crispy prawns with ginger",
    image_Url:"/images/recipe-image/crispy-prawns-with-ginger.jpeg",
    type: ["cocktail piece"],
    ingredient: "18 large prawns  | 9 sheets of brick pastry | 2 onions | 5 cm of fresh ginger | 1 organic lime | 5 cl of dry white wine | 1 tbsp. fish stock | 1 tbsp. nuoc-mâm | 2 tbsp. olive oil | Tabasco | frying oil",
    description: "King prawns lightly seasoned in a gourmet and crispy pastry sheet.",
    // dietary: [""],
    
  },
  {
    name: "Ratatouille flans",
    image_Url:"/images/recipe-image/ratatouille-flans.jpeg",
    type: ["main dish"],
    ingredient: "One 630g jar of ratatouille | 20g butter | 4 eggs | 12 stalks of chives | 6 cherry tomatoes | 100 g of sugar | 1 pod of saffron | 1 tbsp. teaspoon of thyme | salt and pepper",
    description: "Combination of two French recipes, flan and seasonal vegetable ratatouille, which will please parents and children alike.",
    dietary: ["Lactose intolerance"],
    
  },
  {
    name: "Pumpkin gratin with gingerbread",
    image_Url:"/images/recipe-image/pumpkin-gratin-with-gingerbread.jpeg",
    type: ["main dish"],
    ingredient: "500g pumpkin | 3 medium potatoes | 4 slices of gingerbread | 80 g grated emmental cheese | 1 tbsp. tablespoon heavy cream | 20 cl milk | 60 g butter | salt | pepper",
    description: "You have never tasted pumpkin recipe from a Chef",
    dietary: ["Lactose intolerance"],
    
  },
  {
    name: "Armorica Lobster",
    image_Url:"/images/recipe-image/armorica-lobster.jpeg",
    type: ["main dish"],
    ingredient: "1 large live lobster or if the price is too high, frozen lobster tails | 3 shallots | 1 clove of garlic | 3 sprigs of tarragon | 1 small can of peeled tomatoes | 4 tablespoons heavy cream | 1 glass of white wine | 1 glass of cognac or brandy | 150 g butter | 1/2 teaspoon cayenne pepper",
    description: "Armorican lobster, sometimes also called American lobster, is a very old recipe from French gastronomy. Discover this really tasty and refined dish, ideal for your festive meals and for the transition to the New Year.",
    dietary: ["Food allergies"],
    
  },
  {
    name: "Sicilian salad",
    image_Url:"/images/recipe-image/sicilian-salad.jpg",
    type: ["starter"],
    ingredient: "1 small watermelon | 2 small heads red chicory | 50ml moscatel vinegar | 65g pistachios | 150g aged pecorino | 70ml groundnut oil | a handful fennel fronds, fennel herb or dill",
    description: "This watermelon, chicory and salty pecorino salad with toasted pistachios and fennel herb is typical of the way Sicilians put things together, with seasonal produce at its best.",
    // dietary: [""],
    
  },
  {
    name: "Ricotta gnudi with sage butter",
    image_Url:"/images/recipe-image/ricotta-gnudi.jpg",
    type: ["starter"],
    ingredient: "500g ricotta | 75g parmesan, grated | a good grating of fresh nutmeg | white pepper | 500g semolina | 150g butter | 1 bunch sage",
    description: "These delicate, light-as-air ricotta dumplings are a bit of a leap of faith but will make you travel to Italy",
    // dietary: [""],
    
  },
  {
    name: "Torta Barozzi",
    image_Url:"/images/recipe-image/torta-barozzi.jpeg",
    type: ["dessert"],
    ingredient: "230g of dark chocolate, broken into pieces | 150g of butter, diced | 4 eggs | 160g of sugar | 70g of blanched peanuts, unsalted | 30g of blanched almonds | 20ml of rum | 10g of coffee granules",
    description: "The original recipe for this classic Italian dessert has been kept secret since it was first created in 1886. However, our chef have tried to recreate it and this recipe is one interpretation. And one I think you’ll find hard to resist. It’s made of almonds, peanuts, coffee, and dark chocolate. Both decadent and delightful.",
    dietary: ["Food allergies"],
    
  },
  {
    name: "Tiramisu-with-chocolate-and-mint",
    image_Url:"/images/recipe-image/tiramisu-with-chocolate-and-mint.jpg",
    type: ["dessert"],
    ingredient: "300 g (10,5 oz) Savoiardi Ladyfingers | 500 g (1,1 lb) of mascarpone cheese | 4 medium eggs (about 220 g/7,7 oz without shells) | 100 g (1/2 cup) of granulated sugar | 300 ml (1 ¼ cup) of coffee (better if espresso) | 2 tablespoons of Rum or Marsala | unsweetened cocoa powder,mint leafs",
    description: "Here is Authentic Italian Tiramisu Recipe, an Italian dessert made of savoiardi ladyfingers soaked in coffee, arranged in layers and filled with a cream made with mascarpone and eggs. Tiramisu is one of the most famous and delicious Italian dessert in the world, born in Treviso (a lovely town near Venice).",
    dietary: ["Lactose intolerance"],
    
  },
  {
    name: "Green asparagus risotto",
    image_Url:"/images/recipe-image/green-asparagus-risotto.jpeg",
    type: ["main dish"],
    ingringredient: "400 g arborio or carnarolli rice | 3 chicken stock tablets | 12 asparagusgreen | 1 large onion | 80 g of parmesan | 100 g of butter | 15 cl of dry white wine | salt | pepper | olive oil",
    description: "The chef has developed a recipe for Creamy Green Asparagus Risotto for you.",
    dietary: ["Vegan","Vegetarian"],
    
  },
  {
    name: "Chakalaka",
    image_Url:"/images/recipe-image/chakalaka.jpeg",
    type: ["starter"],
    ingredient: "1/4 cup cooking oil | 1 medium onion diced | 1-2 teaspoon curry powder | 2 teaspoons garlic minced | ½ teaspoon thyme | ½ teaspoon smoked paprika | 1 teaspoon cayenne pepper | ½ teaspoon ginger minced | 1-2 tomatoes | 3-4 cups sliced cabbage | 1 -2 Chili peppers diced seeds removed for less heat | 1 large carrot grated on the large side or sliced thinly | 1 medium green pepper diced | 1 medium red pepper diced | 1 14 ounce baked beans | 1 teaspoons bouillon powder optional",
    description: "Chakalaka is a South African vegetable relish made with onions, tomatoes, peppers, carrots, beans, and spices. It pairs well with bread, stews, meat, and many other dishes.",
    dietary: ["Vegetarian","Vegan"],
    
  },
  {
    name: "Bunny chow",
    image_Url:"/images/recipe-image/bunny-chow.jpeg",
    type: ["starter"],
    ingredient: "1 pound chicken thighs or breast cut in bite-sized pieces | 1/2 cup canola or cooking oil | 2-3 Curry leaves | 1 teaspoons minced ginger | 2 teaspoons minced garlic | 1 Tablespoon curry powder or more | 1 medium onion diced | 2 medium tomatoes diced | 1 cinnamon stick | 1 1/2 teaspoon paprika | 3 green cardamom pods lightly crushed | 8 ounce or less potatoes cleaned and cut into cubes | 1 15 ounce can chickpeas rinsed and drained | ½ teaspoon cayenne pepper optional | 11/2 cup or more chicken broth or water | salt and pepper to taste",
    description: "Bunny chow is a flavorful South African food made with aromatic spices, meat, chickpeas, and potatoes. It is usually served in a hollowed-out loaf of white bread. It is wildly popular throughout South Africa and beyond because of its delicious taste and easy preparation.",
    // dietary: [""],
    
  },
  {
    name: "Malva pudding",
    image_Url:"/images/recipe-image/malva-pudding.jpg",
    type: ["dessert"],
    ingredient: "THE PUDDING: | 6 1⁄2 ounces sugar (3/4 cup, 200 ml, or 180 g) | 2 large eggs | 1 tablespoon apricot jam | 5 ounces all-purpose flour (150 g) | 1 teaspoon baking soda | 1⁄2 teaspoon salt | 1 tablespoon butter (a generous tablespoon) | 1 teaspoon vinegar | 1⁄3 cup milk | FOR THE SAUCE: | 3⁄4 cup fresh cream (200 ml) | 3 1⁄2 ounces butter (100 g) | 3 -5 ounces sugar (90 - 150 g) | 1⁄3 cup hot water (90 ml) | 2 teaspoons vanilla essence",
    description: "A Dutch import, malva pudding is a sweet and sticky baked sponge pudding made with apricot jam and served smothered in a hot cream sauce. This is South Africa's answer to the British sticky toffee pudding, served in many restaurants but mainly baked at home for Sunday lunch.",
    // dietary: [""],
    
  },
  {
    name: "Melktert tartlet",
    image_Url:"/images/recipe-image/melktert-tartlet_.jpg",
    type: ["dessert"],
    ingredient: "3 tablespoons butter, melted | 1 cup white sugar | 3 egg yolks | 1 cup cake flour | 1 teaspoon baking powder | ¼ teaspoon salt | 1 teaspoon vanilla extract | 4 cups milk | 3 egg white | 1 tablespoon cinnamon sugar",
    description:"Similar to the British custard tart or Portuguese pasteis de nata, melktert consists of a pastry case filled with milk, eggs and sugar, which is usually thickened with flour. The finished tart is traditionally dusted with cinnamon. A real South African comfort food, it is served as a dessert, and also available in many bakeries.",
    // dietary: [""],
    
  },
  {
    name: "Slow cooked veal with lemongrass",
    image_Url:"/images/recipe-image/slow-cooked-veal-with-lemongrass.jpg",
    type: ["main dish"],
    ingredient: "1.5 kg veal shoulder cut into 80 g cubes | 2 large yellow onions | 2 stalks of lemongrass | 1 glass of white wine | 12 cl of sunflower oil | 1 cube of stock veal | 100 g of tomato puree",
    description: "When the calf goes to the exotic lands of Thailand! The nut is given pride of place here and sautéed wok style with Thai rice, lemongrass, ginger, spring onion, soy sauce, chilli and fresh coriander for a light but incredibly fragrant result.",
    // dietary: [""],
    
  },
  {
    name: "Sea bass with coconut milk and combawa with plantain gratin",
    image_Url:"/images/recipe-image/sea-bass-swith-coconut-milk-and-combawa-with-plantain-gratin.jpeg",
    type: ["main dish"],
    ingredient: "For the filling: | 6 plantains | 15 cl 1⁄2 skimmed milk | 15 cl vegetable broth | 20 g unsalted butter | 20 g wheat flour | 100 g Parmesan cheese | Parmigiano Reggiano | 2 l of water | 20 g of coarse salt | 6 pinches of fine salt | 6 turns of the pepper mill | For the fish | 6 boned sea bass fillets | 40 cl unsweetened coconut milk | 1 combawa | 3 new onions | 6 pinches of fine salt | 1⁄2 bird's eye chili",
    description: "A fillet of sea bass cooked en papillote with milk and combawa, served with a plantain gratin.",
    // dietary: [""],
    
  },
  {
    name: "New potato & tamarind salad",
    image_Url:"/images/recipe-image/new-potato-and-tamarind-salad.jpg",
    type: ["main dish"],
    ingredient: "1 ½ tbsp tamarind pulp or paste | 50g golden muscovado sugar | 1 tbsp ground cumin | thumb-sized piece ginger chopped | 1.2kg new potato | 3 tbsp natural low-fat yogurt | 4 tbsp chopped coriander",
    description: "Tamarind is commonly used to flavour potatoes in India, and makes this low-fat salad authentic and punchy",
    dietary: ["Vegetarian","Vegan"],
    
  },
  {
    name: "Gujiya",
    image_Url:"/images/recipe-image/gujiya.jpg",
    type: ["dessert"],
    ingredient: "For the pastry: | 275g flour | 35g ghee, melted and cooled | sunflower oil, for kneading and deep-frying | For the filling: | 1 litre whole milk (we used Jersey milk) | 125g caster sugar | 200g frozen grated coconut, defrosted | 50g blanched almonds, finely chopped | 50g raisins | ½ tsp ground cardamom | ¼ tsp grated nutmeg",
    description: "Popular Indian sweet filled with gently spiced coconut, almonds and raisins. They're usually made to celebrate the festival of Holi",
    // dietary: [""],
    
  },
  {
    name: "Goan prawn & coconut curry with cumin rice",
    image_Url:"/images/recipe-image/goan-prawn-coconut-curry-with-cumin-rice.jpg",
    type: ["main dish"],
    ingredient: "1 tbsp sunflower oil | 1 onion , thinly sliced | 1 tbsp freshly grated ginger | 2 garlic cloves , crushed | 1 red chilli , deseeded and sliced | ½ tsp turmeric | ½ tsp chilli powder | 1 tsp ground coriander | 10 curry leaves | 1 large potato , diced | 400ml can half-fat coconut milk | 8 cherry tomatoes , halved | handful baby spinach | 200g pack raw peeled prawn | For the cumin rice | 1 tsp cumin seed | 175g basmati rice",
    description: "Indian meals with a curry in a hurry - throw in a handful of spices with shellfish, tomatoes, and spinach",
    dietary: ["Vegetarian","Vegan"],
    
  },
  {
    name: "Fruity coconut creams",
    image_Url:"/images/recipe-image/fruity-coconut-creams.jpg",
    type: ["dessert"],
    ingredient: "1 x 50g/2oz sachet coconut cream | 500g 0% Greek yogurt or tub quark | 85g icing sugar , sieved | few drops vanilla extract | 2 kiwi fruit | 400g can pineapple chunks",
    description: "A quick low-fat pud the Chef will spice up to you liking.",
    dietary: ["Lactose intolerance"],
    
  },
  {
    name: "Indian summer salad",
    image_Url:"/images/recipe-image/indian-summer-salad.jpg",
    type: ["starter"],
    ingredient: "3 carrots | bunch radishes | 2 courgettes | half a small red onion | small handful mint leaves, roughly torn | For the dressing | 1 tbsp white wine vinegar | 1 tsp Dijon mustard | 1 tbsp mayonnaise | 2 tbsp olive oil",
    description: "Packed with antioxidants, this superhealthy, colourful salad",
    dietary: ["Vegetarian","Vegan"],
    
  },
  {
    name: "Indian roasted butternut squash soup with seeded naan",
    image_Url:"/images/recipe-image/indian-roasted-butternut-squash-soup.jpeg",
    type: ["starter"],
    ingredient: "about 1kg butternut squash , cut into chunks | 2 carrots , chopped | 3 tbsp korma paste | small pack coriander , stalks and leaves chopped but separated | 1 large onion , chopped | 1.2l vegetable stock½ x 400g can reduced-fat coconut milk | 2 reduced-fat naan bread | 2 tsp garlic-flavoured oil | 2 tsp poppy seed",
    description: "This substantial and nourishing soup is flavoured with mild korma curry paste and mellowed by sweet coconut milk",
    dietary: ["Vegetarian","Vegan"],
    
  },
  {
    name: "Crab & ginger tart with a chilli dressing",
    image_Url:"/images/recipe-image/crab-and-ginger.jpg",
    type: ["starter"],
    ingredient: "500g pack shortcrust pastry | 10cm piece fresh root ginger , peeled and roughly chopped | 20g pack fresh parsley , preferably flat leaf | 2 tbsp sunflower oil | 250g fresh white crabmeat | 2 eggs , plus 2 egg yolks | 300ml crème fraîche | For the chilli dressing | 4 spring onions , finely chopped | 1 lime , juice only | 1 red chilli , seeded and finely chopped | 3 tbsp light soy sauce | 6 tbsp sunflower oil | 1 tsp golden caster sugar",
    description: "Modern, British take on quiche",
    dietary: ["Lactose intolerance","Gluten intolerance or sensitivity"],
    
  },
  {
    name: "Summer pudding",
    image_Url:"/images/recipe-image/summer-pudding.jpg",
    type: ["dessert"],
    ingredient: "300g strawberry | 250g blackberry | 100g redcurrant | 500g raspberry | OR | 1.25kg/2lb 12oz mixed berries and currants of your choice | 175g golden caster sugar | 7 slices day-old white bread, from a square, medium-cut loaf",
    description: "This quintessentially British pud, packed with juicy summer berries.",
    // dietary: [""],
    
  },
  {
    name: "Sausages with sticky onion gravy",
    image_Url:"/images/recipe-image/sausages-with-sticky-onion-gravy.jpg",
    type: ["main dish"],
    ingredient: "400g pack sausages | 1 batch Basic sticky onions (see recipe underneath) | 1 tbsp plain flour | 1 sprig thyme, leaves picked | 400ml beef stock | splash Worcestershire sauce | 50g butter | 12 medium onion | 1 tsp sugar",
    description: "A classic British recipe, cooked to perfection.",
    // dietary: [""],
    
  },
  {
    name: "Spring salad with watercress dressing",
    image_Url:"/images/recipe-image/spring-salad-with-watercress.jpg",
    type: ["starter"],
    ingredient: "550g new potato , scrubbed | 800g young broad beans in the pod (to give about 200g/8oz shelled beans) | 200g fresh young asparagus | 400g young peas in the pod (to give about 100g/4oz shelled peas) | 90g pack prosciutto , sliced into ribbons | 125g bag mixed salad leaves | 100g pecorino cheese, shaved | 50g fresh watercress , roughly chopped | 6 tbsp extra-virgin olive oil | 2 tbsp cider vinegar | pinch sugar",
    description: "Savour all the flavours of an Italian spring with this salad with a British twist",
    // dietary: [""],
    
  },
  {
    name: "Grilled lemon sole with dumplings & lemon sauce",
    image_Url:"/images/recipe-image/grilled-lemon-sole.jpg",
    type: ["main dish"],
    ingredient: "4 small lemon sole , trimmed and washed, left whole with head off | 200g samphire , to serve | For the dumplings | 2 large baking potatoes , about 600g (you'll need 300g cooked potato flesh) | 1 head garlic | 2 tsp lemon or olive oil , plus extra olive oil for frying and brushing | 1½ tbsp grated parmesan | 1 egg yolk | 65g pasta flour | 2 tbsp small capers in vinegar, drained, finely chopped | 3 tbsp chopped flat-leaf parsley | For the lemon sauce | 1 egg yolk | finely grated zest , 1 tbsp juice of 1 lemon | 200ml light olive oil | 3 tbsp double cream | about 75ml fish stock | 4 handfuls baby spinach | 1 tbsp chopped flat-leaf parsley",
    description: "Our Chef creates a wonderfully light but full-flavoured dish using the best Cornish produce",
    // dietary: [""],
    
  },
  {
    name: "Knickerbocker glory",
    image_Url:"/images/recipe-image/knickerbocker-glory.jpeg",
    type: ["dessert"],
    ingredient: "450g/1lb fresh raspberries | 2 tbsp icing sugar | 1 ripe mango, peeled, stone removed, diced | 150g/5½oz fresh blueberries | 12 scoops vanilla ice cream | 25g/1oz pistachios, coarsely chopped",
    description: "Knickerbocker glory, the dessert of childhood dreams! This traditional ice cream sundae is revisited by our chef.",
    dietary: ["Lactose intolerance"],
    
  },
  {
    name: "Pea and mint soup",
    image_Url:"/images/recipe-image/pea-and-mint-soup.jpg",
    type: ["starter"],
    ingredient: "1 bunch spring onions, trimmed and roughly chopped | 1 medium potato, peeled and diced | 1 garlic clove, crushed | 850ml vegetable or chicken stock | 900g young pea in the pod (to give about 250g/9oz shelled peas) | 4tbsp chopped fresh mint | large pinch caster sugar | 1 tbsp fresh lemon or lime juice | 150ml buttermilk or soured cream",
    description:"A superhealthy starter or snack that's great hot or cold",
    // dietary: [""],
    
  },
  {
    name: "Vegetable samosas",
    image_Url:"/images/recipe-image/vegetable-samosas.jpg",
    type: ["starter","cocktail piece"],
    ingredient: "1 tbsp vegetable oil | 1 onion, finely chopped | 2 garlic cloves, crushed | 1 potato (about 150g) finely diced | 1 carrot (about 100g) finely diced | 100g frozen peas | 2 tsp curry powder or your own spices according to taste | 100ml vegetable stock | For the pastry: | 225g plain flour | 2 tsp sea salt | 2 tbsp vegetable oil | 2l vegetable oil to deep fry",
    description:"Serve up these crisp vegan samosas as a tasty starter or side dish with your favourite curry. They also make great buffet food for your next party.",
    dietary: ["Vegetarian", "Vegan"],
    
  },
  {
    name: "Moroccan roast lamb with roasted roots & coriander",
    image_Url:"/images/recipe-image/moroccan-roast-lamb-with-roasted-roots-coriander.jpg",
    type: ["main dish"],
    ingredient: "½ leg of lamb , around 800g | 2 red onions | 1 butternut squash | 1 celeriac | 2½ tbsp cold pressed rapeseed oil | 2 tbsp ras el hanout | 8 garlic cloves | 1 small bunch coriander | ½ tsp cumin seeds | 1 lemon , zested and juiced | ½ green chilli",
    description:"This tasty Moroccan roast lamb dish is a low-calorie main that delivers stacks of flavour.",
    // dietary: [""],
    
  },
  {
    name: "Ojja (Shakshuka)",
    image_Url:"/images/recipe-image/ojja.jpeg",
    type: ["main dish"],
    ingredient: "2-4 tbs olive or vegetable oil | ½ cup yellow onion | 3 garlic cloves | ½ cup green onions | 2 roma tomatoes | 1 tbs tomato paste | 1 chilli pepper | ½ cup parsley, coarsely | 1 tsp salt | 2 tbs our homemade harissa | 1 tsp paprika | 2-3 dried red chilli peppers | 5 eggs | ½ cup water",
    description:'This delicious tomato and egg dish is a popular Tunisian breakfast. While it’s eaten across North Africa, it’s believed to have been created in either Tunisia or Yemen. The name comes from the Tunisian Arabic slang for “mixture.” The tomato sauce is flavored with garlic, chili peppers, and spices, and the eggs are poached. You will typically find it served in either a skillet or in a tagine',
    // dietary: [""],
    
  },
  {
    name: "Tunisian Pastries",
    image_Url:"/images/recipe-image/tunisian-pastry.jpeg",
    type: ["dessert"],
    ingredient: "Home made by the chef",
    description:"Tunisian pastries have been influenced by the powers that controlled Tunisia over the centuries. You’ll find varieties of baklava from the Ottoman Empire. Make sure to try the Tunisian almond baklava. You’ll also find pastries with French influence. Make sure to try bambalouni, yoyos, kaak warka, and zgougou. Tunisian cuisine is blessed with many amazing pastries to sample!",
    // dietary: [""],
    
  },
  {
    name: "Makroud el louse",
    image_Url:"/images/recipe-image/makroud-el-louse.jpeg",
    type: ["dessert"],
    ingredient: "1 1⁄4lbs almonds, whole, blanched | 1cup sugar | 2eggs | 2cups water | 1⁄2cup sugar | 1tablespoon orange flower water | 3cups confectioners' sugar",
    description:"Makroud el louse are flourless Algerian cookies consisting of almonds, eggs, sugar, and a flavoring of orange flower water. Baked until lightly browned, these cookies are typically tossed in powdered sugar in order to be completely coated. Once consumed, makroud el louse should melt in the mouth.",
    // dietary: [""],
    
  }
];

let userInfo;

User.create(users)
  .then(usersFromDB => {
    console.log(`Created ${usersFromDB.length} users`);
    // return Recipe.create(recipes);
    userInfo = usersFromDB

    for (let i = 0; i<recipes.length; i++){
      if(i<6){
        recipes[i].owner = userInfo[0]._id
      } else if(i<12){
        recipes[i].owner = userInfo[1]._id
      }else if(i<18){
        recipes[i].owner = userInfo[2]._id
      }else if(i<24){
        recipes[i].owner = userInfo[3]._id
      }else if(i<30){
        recipes[i].owner = userInfo[4]._id
      }else if(i<36){
        recipes[i].owner = userInfo[5]._id
      }else{
        recipes[i].owner = userInfo[6]._id
      }
    }
    return Recipe.create(recipes);
  })
  .then(recipesFromDB => {
    console.log(`Created ${recipesFromDB.length} recipes`);

    // Once created, close the DB connection
    mongoose.connection.close();
  })

  .catch(err => console.log(`An error occurred seeding data in DB: ${err}`));

