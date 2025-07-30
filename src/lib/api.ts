import { Profile } from "@/store/slices/profilesSlice";

type RandomUser = {
  login: { uuid: string };
  name: { first: string; last: string };
  dob: { age: number };
  location: { city: string; country: string };
  picture: { large: string };
  email: string;
  phone: string;
  nat: string;
};

export async function fetchRandomUsers(count = 10): Promise<Profile[]> {
  const res = await fetch(`https://randomuser.me/api/?results=${count}&nat=us,gb,ca,au`);
  const data = await res.json();

  return data.results.map((u: RandomUser) => {
    // Generate a random match percentage between 60-95%
    const matchPercentage = Math.floor(Math.random() * 36) + 60;

    // Generate some interests based on age and location
    const interests = generateInterests(u.dob.age, u.location.country);

    return {
      id: u.login.uuid,
      name: `${u.name.first} ${u.name.last}`,
      age: u.dob.age,
      location: `${u.location.city}, ${u.location.country}`,
      picture: u.picture.large,
      email: u.email,
      bio: generateBio(u.name.first, u.dob.age, interests),
      matchPercentage,
      interests,
      phone: u.phone,
      nationality: u.nat,
    };
  });
}

function generateInterests(age: number, country: string): string[] {
  const allInterests = [
    'Travel', 'Music', 'Reading', 'Cooking', 'Photography', 'Gaming',
    'Fitness', 'Art', 'Movies', 'Dancing', 'Hiking', 'Technology',
    'Fashion', 'Sports', 'Writing', 'Pets', 'Food', 'Nature'
  ];

  // (Optional) Personalize based on age & country
  if (age < 25) allInterests.push('Partying');
  if (country === 'United States') allInterests.push('Baseball');
  if (country === 'India') allInterests.push('Cricket');

  // Select 3–5 random interests
  const numInterests = Math.floor(Math.random() * 3) + 3;
  const shuffled = allInterests.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numInterests);
}

function generateBio(name: string, age: number, interests: string[]): string {
  const bios = [
    `Hi! I'm ${name} and I love ${interests[0].toLowerCase()}. Looking for someone to share adventures with!`,
    `${name} here! I'm passionate about ${interests[0].toLowerCase()} and ${interests[1].toLowerCase()}. Let's connect!`,
    `Hey, I'm ${name}! I enjoy ${interests[0].toLowerCase()}, ${interests[1].toLowerCase()}, and meeting new people.`,
    `${name} - ${age} years young and always up for trying new things. Love ${interests[0].toLowerCase()}!`,
    `Hi, I'm ${name}! I'm into ${interests[0].toLowerCase()} and ${interests[1].toLowerCase()}. Looking for someone special.`
  ];

  return bios[Math.floor(Math.random() * bios.length)];
}
