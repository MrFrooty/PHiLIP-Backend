import React from 'react';
import '@/app/pages/marquee.css'; // Import the CSS file for styling

const ArtStylesMarquee: React.FC = () => {
  const artStyles = [
    'Anime',
    'Cartoon',
    'Oil Painting',
    'Watercolor',
    'Pop Art',
    'Cubism',
    'Art Nouveau',
    'Surrealism',
    'Japanese Ukiyo-e',
    'Abstract Expressionism',
    'Art Deco',
    'Gothic',
    'Minimalism',
    'Pointillism',
    'Baroque',
    'Fauvism',
    'Digital Pixel Art',
    'Renaissance',
    'Impressionism',
    'Art Brut',
    'Constructivism',
    'Rococo',
    'De Stijl',
    'Futurism',
    'Post-Impressionism',
    'Bauhaus',
    'Precisionism',
    'Symbolism',
    'Neo-Expressionism',
    'Suprematism',
    'Mannerism',
    'Color Field Painting',
    'Tonalism',
    'Photorealism',
    'Analytical Cubism',
    'Synthetism',
    'Naive Art',
    'Op Art',
    'Cloisonnism',
    'Hyperrealism',
    'Lyrical Abstraction',
    'Neo-Romanticism',
    'Metaphysical Painting',
    'Vorticism',
    'Neo-Plasticism',
    'New Objectivity',
    'Kinetic Art',
    'Tachisme',
    'Regionalism',
    'Rayonism',
    'Neue Sachlichkeit',
    'International Style',
    'Steampunk',
    'Cyberpunk',
    'Fantasy',
    'Sci-Fi',
    'Retro',
    'Vaporwave',
    'Graffiti',
    'Pin-Up',
    'Tattoo',
    'Chibi',
    'Comic Book',
    'Manga',
    'Retro Futurism',
    'Kawaii',
    'Doodle',
    'Whimsical',
    'Pop Surrealism',
    'Memphis',
  ];

  const doubledArtStyles = artStyles.concat(artStyles);

  const splitIntoRows = (arr: string[], rowCount: number) => {
    const rows = [];
    const itemsPerRow = Math.ceil(arr.length / rowCount);
    for (let i = 0; i < rowCount; i++) {
      rows.push(arr.slice(i * itemsPerRow, (i + 1) * itemsPerRow));
    }
    return rows;
  };

  const rows = splitIntoRows(doubledArtStyles, 3);

  return (
    <div className="py-6 marquee-container">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className={`marquee-row row-${rowIndex % 3}`}>
          <div className="marquee">
            {row.map((style, index) => (
              <button key={index} className="marquee-button">
                {style}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArtStylesMarquee;
