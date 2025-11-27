
export interface Chapter {
  id: string;
  title: string;
  content: string; // HTML or Markdown string
}

export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  headerImage: string;
  description: string;
  chapters: Chapter[];
}

const LOREM_IPSUM = `
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
  <p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>
  <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.</p>
  <p>Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.</p>
`;

const LONG_TEXT = LOREM_IPSUM.repeat(3);

const TITLES = [
  "The Republic", "Meditations", "Nicomachean Ethics", "Beyond Good and Evil",
  "The Symposium", "Critique of Pure Reason", "The Prince", "Tao Te Ching",
  "Confessions", "Leviathan", "The Social Contract", "Being and Time",
  "Phenomenology of Spirit", "The Art of War", "Letters from a Stoic", "Thus Spoke Zarathustra"
];

const AUTHORS = [
  "Plato", "Marcus Aurelius", "Aristotle", "Friedrich Nietzsche",
  "Plato", "Immanuel Kant", "Niccolò Machiavelli", "Laozi",
  "Augustine of Hippo", "Thomas Hobbes", "Jean-Jacques Rousseau", "Martin Heidegger",
  "G.W.F. Hegel", "Sun Tzu", "Seneca", "Friedrich Nietzsche"
];

const COVERS = [
  "/plato.png", "/marcus.png", "/aristotle.png", "/plato.png",
  "/plato.png", "/marcus.png", "/aristotle.png", "/plato.png",
  "/marcus.png", "/aristotle.png", "/plato.png", "/marcus.png",
  "/aristotle.png", "/plato.png", "/marcus.png", "/aristotle.png"
];

const generateChapters = (count: number): Chapter[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `chapter-${i + 1}`,
    title: `Chapter ${i + 1}`,
    content: `<h3>Chapter ${i + 1}</h3>${LONG_TEXT}`
  }));
};

export const books: Book[] = TITLES.map((title, index) => {
  let headerImage = "/images/greek.png";
  let coverUrl = "/images/greek_cover.png";

  // Header Image Logic
  if (["The Republic", "Nicomachean Ethics", "The Symposium"].includes(title)) {
    headerImage = "/images/greek.png";
  } else if (["Meditations", "Letters from a Stoic", "Confessions"].includes(title)) {
    headerImage = "/images/roman.png";
  } else if (["Tao Te Ching", "The Art of War"].includes(title)) {
    headerImage = "/images/eastern.png";
  } else {
    headerImage = "/images/modern.png";
  }

  // Unique Cover Logic
  switch (title) {
    // Batch 1 & 2 (Previously Generated)
    case "The Republic":
      coverUrl = "/images/cover_republic.png";
      break;
    case "Meditations":
      coverUrl = "/images/cover_meditations.png";
      break;
    case "Nicomachean Ethics":
      coverUrl = "/images/cover_ethics.png";
      break;
    case "Beyond Good and Evil":
      coverUrl = "/images/cover_beyond_good_evil.png";
      break;
    case "The Symposium":
      coverUrl = "/images/cover_symposium.png";
      break;
    case "Critique of Pure Reason":
      coverUrl = "/images/cover_critique.png";
      break;
    case "The Prince":
      coverUrl = "/images/cover_prince.png";
      break;

    // Batch 3 & 4 (Newly Generated)
    case "Tao Te Ching":
      coverUrl = "/images/cover_tao_te_ching.png";
      break;
    case "Confessions":
      coverUrl = "/images/cover_confessions.png";
      break;
    case "Leviathan":
      coverUrl = "/images/cover_leviathan.png";
      break;
    case "The Social Contract":
      coverUrl = "/images/cover_social_contract.png";
      break;
    case "Being and Time":
      coverUrl = "/images/cover_being_and_time.png";
      break;
    case "Phenomenology of Spirit":
      coverUrl = "/images/cover_phenomenology_of_spirit.png";
      break;
    case "The Art of War":
      coverUrl = "/images/cover_art_of_war.png";
      break;

    // Fallbacks (Rate Limit Hit)
    case "Letters from a Stoic":
      coverUrl = "/images/cover_meditations.png"; // Closest match (Stoicism)
      break;
    case "Thus Spoke Zarathustra":
      coverUrl = "/images/cover_beyond_good_evil.png"; // Closest match (Nietzsche)
      break;
    default:
      coverUrl = "/images/greek_cover.png";
  }

  return {
    id: title.toLowerCase().replace(/ /g, "-"),
    title,
    author: AUTHORS[index],
    coverUrl,
    headerImage,
    description: "A classic work of philosophy that explores the fundamental nature of knowledge, reality, and existence.",
    chapters: generateChapters(Math.floor(Math.random() * 10) + 15)
  };
});
