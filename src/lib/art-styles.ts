export type ArtStyleOption = string | { label: string; options: string[] };
export type ArtStyles = Record<string, ArtStyleOption[]>;

export const artStyles: ArtStyles = {
  traditional: [
    {
      label: 'Classical and Renaissance',
      options: ['Renaissance', 'Mannerism', 'Baroque', 'Rococo', 'Gothic'],
    },
    {
      label: 'Other Traditional Styles',
      options: [
        'Cubism',
        'Art Deco',
        'Minimalism',
        'Pointillism',
        'Suprematism',
        'Precisionism',
        'Cloisonnism',
        'Synthetism',
        'Neo-Plasticism',
        'Bauhaus',
      ],
    },
  ],
  traditional_19th_century_movements: [
    {
      label: '19th Century Art Movements',
      options: [
        'Neoclassicism',
        'Romanticism',
        'Realism',
        'Impressionism',
        'Post-Impressionism',
        'Symbolism',
        'Tonalism',
        'Art Nouveau',
        'Fauvism',
        'Analytical Cubism',
        'Abstract Expressionism',
        'Color Field Painting',
      ],
    },
  ],
  popArt: [
    {
      label: 'Pop Art Styles',
      options: ['Pop Art', 'Pop Surrealism', 'Graffiti', 'Memphis'],
    },
  ],
  specialized: [
    {
      label: 'Specialized Art Styles',
      options: [
        'Fantasy',
        'Sci-Fi',
        'Steampunk',
        'Cyberpunk',
        'Retro',
        'Vaporwave',
        'Pin-Up',
        'Tattoo',
        'Chibi',
        'Comic Book',
        'Manga',
        'Retro Futurism',
        'Kawaii',
        'Doodle',
        'Whimsical',
        'Lyrical Abstraction',
        'Neo-Romanticism',
        'Metaphysical Painting',
        'Neo-Expressionism',
        'Neue Sachlichkeit',
        'Kinetic Art',
        'Tachisme',
        'Regionalism',
        'Vorticism',
        'Hyperrealism',
        'New Objectivity',
        'Rayonism',
        'Art Brut',
      ],
    },
  ],
  contemporary: [
    'Anime',
    'Cartoon',
    'Digital Pixel Art',
  ],
};
