const { client } = require("./client");
const uuid = require("uuid");
const { createUser, fetchUsers, createBusiness, fetchBusinesses, createReview, fetchReviews } = require("./index.js");

const createTables = async () => {
  const SQL = `
    DROP TABLE IF EXISTS users CASCADE;
    DROP TABLE IF EXISTS businesses CASCADE;
    DROP TABLE IF EXISTS reviews CASCADE;
    
    CREATE TABLE users(
      id UUID PRIMARY KEY,
      username VARCHAR(20) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      "isAdmin" BOOLEAN DEFAULT FALSE
    );

    CREATE TABLE businesses(
      id UUID PRIMARY KEY,
      businessname_full VARCHAR(255) NOT NULL,
      street_address VARCHAR(255) NOT NULL,
      city VARCHAR(64) NOT NULL,
      state VARCHAR(64) NOT NULL,
      zip VARCHAR(64) NOT NULL,
      price_range VARCHAR(5) CHECK (price_range IN ('$','$$','$$$','$$$$'))
    );

    CREATE TABLE reviews(
      id UUID PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description VARCHAR(1056) NOT NULL,
      user_id UUID REFERENCES users(id), 
      business_id UUID REFERENCES businesses(id), 
      rating INT CHECK (rating >= 1 AND rating <= 5),
      UNIQUE (user_id, business_id)
    );
  `;
  await client.query(SQL);
};

const init = async () => {
  try {
    console.log("Connecting to database...");
    await client.connect();
    console.log("Connected to the database");

    await createTables();
    console.log("Tables created");

    const users = await Promise.all([
      createUser({ username: "moe", password: "m_pw" }),
      createUser({ username: "lucy", password: "l_pw" }),
      createUser({ username: "ethyl", password: "e_pw" }),
      createUser({ username: "curly", password: "c_pw" }),
      createUser({ username: "john", password: "j_pw" }),
      createUser({ username: "mary", password: "m_pw" }),
      createUser({ username: "susan", password: "s_pw" }),
      createUser({ username: "rachel", password: "r_pw" }),
    ]);

    console.log("Users created:", users);  // Debugging statement

    const usersMap = users.reduce((acc, user) => {
      acc[user.username] = user;
      return acc;
    }, {});

    console.log("Users Map:", usersMap);  // Debugging statement

    const businesses = await Promise.all([
      createBusiness({
        businessname_full: "Clinique",
        street_address: "5767 Fifth Avenue", 
        city: "New York", 
        state: "New York", 
        zip: "10153", 
        price_range: "$$$"
      }),
      createBusiness({
        businessname_full: "Dior",
        street_address: "30 Avenue Montaigne", 
        city: "New York", 
        state: "New York", 
        zip: "10153", 
        price_range: "$$$$"
      }),
      createBusiness({
        businessname_full: "MAC",
        street_address: "One East 57th Street",
        city: "New York", 
        state: "New York", 
        zip: "10022", 
        price_range: "$$$"
      }),
      createBusiness({
        businessname_full: "NARS",
        street_address: "233 Spring Street", 
        city: "New York", 
        state: "New York", 
        zip: "10013", 
        price_range: "$$"
      })
    ]);

    console.log("Businesses created:", await fetchBusinesses());

    await Promise.all([
      createReview({
        title: "Perfect for sensitive skin",
        description: "Clinique makeup is perfect for sensitive skin! It offers great coverage, blends easily, and lasts all day without irritation. Highly recommend for a lightweight, skin-friendly option.",
        user_id: usersMap.moe.id,
        business_id: businesses[0].id,
        rating: 5
      }),
      createReview({
        title: "Flawless finish",
        description: "Dior makeup delivers a flawless, luxurious finish with great coverage and lasting power. The formulas feel lightweight yet buildable, and they stay fresh throughout the day. Perfect for special occasions.",
        user_id: usersMap.lucy.id,
        business_id: businesses[1].id,
        rating: 4
      }),
      createReview({
        title: "Bold and Beautiful",
        description: "MAC makeup is perfect for bold, vibrant looks. The products offer excellent pigmentation, blend effortlessly, and stay put all day. A must-have for anyone who loves high-impact, dramatic makeup.",
        user_id: usersMap.ethyl.id,
        business_id: businesses[2].id,
        rating: 4
      }),
      createReview({
        title: "Radiant and Refreshing",
        description: "NARS makeup delivers a stunning, natural glow with great buildable coverage. The products blend beautifully and last all day, making it perfect for a flawless, radiant look.",
        user_id: usersMap.curly.id,
        business_id: businesses[3].id,
        rating: 4
      })
    ]);

    console.log("Reviews created:", await fetchReviews());

    client.end();
  } catch (error) {
    console.error('Error seeding the database:', error);
  }
};

init();
