const flicks = [
  {
    description:
      "Just released a new paper on Ephemeral Rollups. Our novel approach to rollups allows for rollups that are spin up and then torn down as needed, making them great for use cases like gaming! Check it out here:",
    username: "gabrielepicco",
  },
  {
    username: "anatoly",
    description:
      "Solana is a blockchain platform that allows for fast, secure, and scalable transactions. It is a decentralized platform that allows for the creation of new applications and services. It is a platform that allows for the creation of new applications and services.",
  },
  {
    username: "spacemandev",
    description: `with respect, let me offer a counter view to the thesis that speculation is the end all be all of crypto. 
    
    unfortunately i see a lot of founders in crypto fall into this trap in crypto, that PMF has only been achieved on speculative products.`,
  },
  {
    username: "rawlo",
    description: "Sky Yaknow",
  },
  {
    username: "barrett",
    description: `.eth cope about solana is incredible

you’ve had 4-5 years and you’ve done very little about it

the tears are so tasty`,
  },
];

export const bobResponse =
  "Hey Alice, would love to dive into this! I am just getting into crypto and would love the help of someone with more experience!";

export const aliceResponse =
  "Welcome to the wild west of crypto. Glad to have you here! Let's learn together!";

export const seedFlick = async (mutation: any) => {
  for (const flick of flicks) {
    const flickResponse = await mutation.mutateAsync(flick);
  }
};
