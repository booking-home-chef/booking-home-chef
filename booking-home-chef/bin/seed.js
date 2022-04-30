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
      email: "Laurent Coutantic",
      specialities: "fusion cuisine",
      image_Url: "../images/chef-image/laurent-coutantic.jpeg",
      isProfilePublic:true,
      aboutMe: "Modern and traditional cuisine without borders. Cooking is like a love story: sharing, the pleasure of giving pleasure and being authentic. This passion was transmitted to me by my parents and grandparents with whom I discovered the flavors synonymous with childhood memories and good times shared with our loved ones. I also had the privilege of perfecting myself with chefs such as: Christophe Michalak, Thierry Marx, Cyril Lignac, Antoine Heerah, Mikula Flora, Lionel Levy, Nicolas Masse. That is why, today I propose to you to transmit my passion and tips of leaders during workshops (adults and children), dinners and evenings private or professional (seminars, animations, ...) realized at your place (Paris / Paris region and province) depending on the season and your budget.",
    },
    {
      email: "Marco Silvetti",
      specialities: "italian",
      image_Url: "../images/chef-image/marco-silvetti.webp.jpg",
      isProfilePublic:true,
      aboutMe: "Chef Marco is originally from Italy. His culinary passion began at a really young age. He has build an impressive culinary career around different countries starting in Italy in a Michelin Star Restaurant, then opening his own restaurant in Paris, France, bringing the real Italian cuisine to the French capital; being sous chef in Ardoise restaurant in Saint Barthélémy; working in Calanque de Figuerolles in La Ciotat and in the restaurant A Volta in Corse, France. Chef Marco started been a private chef in 2002 in Rome where he had the opportunity to cook for Fendi and Lou Reed among others. He continued being a private chef while he was in Paris in 2008, cooking for musicians, actors; always providing a high quality service, being punctual, curious and discreet. Chef Marco is specialized in Italian, Mediterranean, traditional and modern French cuisine among others. Nowadays, chef Marco moved to the French Riviera, next to Marseille to start his new experience as a private chef. Chef Marco provides a high-quality service to your table using local products and combining traditional and modern culinary techniques. He will provide a unique, delicate and personalized service in every occasion. Outside the kitchen, he is always looking to find new tastes and flavors, putting all his daily effort and dedication to accomplish his clients needs and surpass their expectations.",
    },
    {
      email: "Akhil Bt",
      specialities: "Indian",
      image_Url: "../images/chef-image/akhil-Bt.jpg",
      isProfilePublic:true,
      aboutMe: "I’m a professional chef , with 13 years of experience mainly in Michelin starred kitchen across Europe , world renowned restaurants . I currently works as a private chef . I love the challenge to exceed the expectation of every palate I cook for and its a beautiful journey filled with excitement and adventure. I enjoy cooking fine dinning with Michelin star standard , Modern bistro style cuisine , Scandinavian , Indian , Asian and also Japanese cuisine (I’m not a sushi or hand made Sobha master) . I look forward to cook for you with your family and friends !!!!",
    },
    {
      email: "Daniele Ferro",
      specialities: "South american cuisine",
      image_Url: "../images/chef-image/daniele-ferro.jpg",
      isProfilePublic:true,
      aboutMe: "I am a professional and passionate Chef, actually in Paris. I have 13 years experience. I am experienced in Italian, French and South american cuisine. I have worked in the main European cities : Rome, Montecarlo, London and Paris. I am Italian, born and grew up in Rome, during my culinary studies I was an intership cook to Antico Bottaro Restaurant, famous Roman gastronomic kitchen. Another experience has been in Restaurant Mirabelle, one Michelin Star, situated into Hotel Splendid Royal Roma, has been a good place where to learn during my studies.. I have worked in Montecarlo at the Beef Bar with Chef Thierry Paludetto (10 years former Chef cuisine Robuchon). I have learned a lot about meat through each process even to treat at its best Australian, Wagyu or Kobe. One of my best experience has been working with Chef Carlo Scotto (Xier Restaurant London), former Gordon Ramsay sous chef. In Paris I have earned l'assiette Michelin while I was working as Chef at Anahi Restaurant. Feel free to contact me for any question or curiosity.",
    },
    {
      email: "Alya Ben Hamza",
      specialities: "fusion cuisine",
      image_Url: "../images/chef-image/alya-ben-hamza.jpg",
      isProfilePublic:true,
      aboutMe: "My site can talk about me :)but i can say i love to please people by making them the best i can .in my dishes i give my knowledges ;all i had learn in my long experience in this field,but not only ,making a good meal is a part of the culture of the countries !having a sushi is different than having a foie-gras it tells you different things and its also different in your palet or in your mouth !!!i have to make people say waw when they eat my dish!",
    },
    {
      email: "Daniel Morgan",
      specialities: "british",
      image_Url: "United States",
      isProfilePublic:true,
      aboutMe: "Head Chef at Robert Paris. My career as a chef began in London, where I earned my stripes as a commis in some of the cities most well-established fine dining institutions such as; The Ritz, The Square, Sketch, and Maze by Gordon Ramsay. After 7 years of honing classical techniques and learning the fundamentals of cooking, I embarked on an international culinary trip which would see me visit, work, and live, in India, Japan, Colombia, Sweden, and Denmark, culminating in my eventual arrival to Paris where I would open and cook at my first restaurant as Head Chef - Salt. I believe intuition is a key element of my cooking and my travels have allowed me to have a varied repertoire that can be adapted to many environments, allowing me to utilise fresh local ingredients and produce. I have been honoured to accept accolades such as The Lebey guide 2016 best British Chef in Paris, as well as second place at The UK National Chef of the year award. More recently, I was voted Chef of the year 2021 by Lefooding. For the past three years, I have worked more autonomously adapting ideas and hosting private dinners is in gallery spaces, as well as collaborating with other well-established restaurants and Chefs on many projects. Wine is a big part of my DNA, and I have a keen interest in fermentation. I can offer tastings in both natural wine and beer too. All my menus can be adapted to lifestyles. My time in India and Southern America has given me a vast knowledge in flavours and spices, which lends itself to my Vegan and Vegetarian dishes.",
    },
  ];



  // const recipes = [
    
  // ];


// User.create(users)
//   .then(usersFromDB => {
//     console.log(`Created ${usersFromDB.length} users`);
//     return Book.create(recipes);
//   })
//   .then(recipesFromDB => {
//     console.log(`Created ${recipesFromDB.length} recipes`);

//     // Once created, close the DB connection
//     mongoose.connection.close();
//   })

User.create(users)
  .then(usersFromDB => {
    console.log(`Created ${usersFromDB.length} users`);
    // Once created, close the DB connection
    mongoose.connection.close();
  })
  .catch(err => console.log(`An error occurred seeding data in DB: ${err}`));

