const users = [
  {
    name: "Gabriele Picco",
    username: "gabrielepicco",
    email: "gabrielepicco@example.com",
    bio: "I am a Cofounder of Magic Block",
    image: "/gabi.png",
  },
  {
    name: "Alice Anonymous",
    username: "aliceanonymous",
    email: "aliceanonymous@example.com",
    bio: "I am a researcher with a background in Ethereum",
    image: "/alice.png",
  },
  {
    name: "Bob Builder",
    username: "bobbuilder",
    email: "bobbuilder@example.com",
    bio: "I am a builder with a background in Web2",
    image: "/bob.png",
  },
  {
    name: "Anatoly Yakovenko",
    username: "anatoly",
    email: "anatoly@solana.com",
    bio: "Cofounder of Solana",
    image: "/anatoly.png",
  },
  {
    name: "Spaceman Dev",
    username: "spacemandev",
    email: "spacemandev@example.com",
    bio: "Founder of Spaceman Gaming",
    image: "/spacemandev.png",
  },
  {
    name: "Rawlo Dawgins",
    username: "rawlo",
    email: "rawlo@dawgins.com",
    bio: "Founder of Banger",
    image: "/rawlo.png",
  },
  {
    name: "Barrett Williams",
    username: "barrett",
    email: "barrett@williams.com",
    bio: "Cofounder of Ranger Finance",
    image: "/barrett.png",
  },
];

export const seedUser = async (mutation: any) => {
  for (const user of users) {
    const userResponse = await mutation.mutateAsync({
      name: user.name,
      username: user.username,
      email: user.email,
      bio: user.bio,
      image: user.image,
    });
  }
};
