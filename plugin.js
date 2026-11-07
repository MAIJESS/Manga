// Manga — temas de la app para Kino (apiVersion 18)
//
// Los temas viven como DATOS en kino-plugin.json (campo "appThemes"): no hace
// falta código para que funcionen. Este archivo solo agrega una pantalla de
// presentación (capacidad "screen") con un botón por tema, que usa
// go.useTheme igual que Ajustes ▸ Apariencia. Se abre desde la página de
// ajustes del plugin ("Ver temas").
//
// IDs de tema: NO los cambies después de publicar. De ellos cuelgan la elección
// y los ajustes de cada persona.

const THEMES = [
  {
    id: "manga-ink",
    name: "Manga · Tinta", nameEn: "Manga · Ink",
    text: "Negro tinta, blanco papel y rojo de efecto de sonido. Paneles con borde blanco y esquinas rectas.",
    textEn: "Ink black, paper white and sound-effect red. White panel borders and sharp corners.",
  },
  {
    id: "manga-papel",
    name: "Manga · Papel", nameEn: "Manga · Paper",
    text: "El tomo impreso: fondo de papel crema, texto negro y bordes de tinta gruesos. Fondo claro (Kino 0.9.82+).",
    textEn: "The printed volume: cream paper, black text and thick ink borders. Light background (Kino 0.9.82+).",
  },
  {
    id: "manga-shonen",
    name: "Manga · Shōnen", nameEn: "Manga · Shonen",
    text: "Azul noche con acento naranja de acción, bordes dorados y zoom marcado al enfocar.",
    textEn: "Night blue with action-orange accent, golden borders and a punchy focus zoom.",
  },
  {
    id: "manga-sakura",
    name: "Manga · Sakura", nameEn: "Manga · Sakura",
    text: "Violeta nocturno con rosa sakura, formas suaves y una flor de cerezo sobre la «o» del logo.",
    textEn: "Midnight violet with sakura pink, soft shapes and a cherry blossom over the logo's “o”.",
  },
];

export async function screen({ activeTheme }) {
  const mine = THEMES.some((t) => t.id === activeTheme);

  const cards = THEMES.map((t) => {
    const on = activeTheme === t.id;
    return {
      type: "Card",
      key: "card-" + t.id,
      children: [
        {
          type: "Column",
          padding: 16,
          gap: 8,
          children: [
            { type: "Text", text: t.name, textEn: t.nameEn, style: "h3", color: on ? "primary" : undefined },
            { type: "Text", text: t.text, textEn: t.textEn, style: "caption", color: "muted" },
            on
              ? { type: "Badge", text: "Activo", textEn: "Active" }
              : {
                  type: "ElevatedButton",
                  key: "use-" + t.id,
                  labelText: "Usar este tema",
                  labelTextEn: "Use this theme",
                  onPressed: { go: { useTheme: { theme: t.id } } },
                },
          ],
        },
      ],
    };
  });

  const children = [
    { type: "Text", text: "Manga", textEn: "Manga", style: "h1" },
    {
      type: "Text",
      text: "Cuatro temas estilo manga con logo propio. También puedes elegirlos en Ajustes ▸ Apariencia y ajustar el acento, las esquinas y el tamaño del texto.",
      textEn: "Four manga-style themes with their own logo. You can also pick them in Settings ▸ Appearance and tweak the accent, corners and text size.",
      style: "p",
      color: "muted",
    },
    ...cards,
  ];

  // Solo mientras uno de MIS temas está activo se puede volver al tema de Kino.
  if (mine) {
    children.push({
      type: "TextButton",
      key: "use-kino",
      labelText: "Volver al tema de Kino",
      labelTextEn: "Back to the Kino theme",
      onPressed: { go: { useTheme: { theme: null } } },
    });
  }

  return {
    type: "SingleChildScrollView",
    children: [
      { type: "Column", padding: { compact: 16, expanded: 32 }, gap: 12, children },
    ],
  };
}

// Los botones usan go.useTheme directamente; no hay eventos propios.
export async function screenEvent() {
  return null;
}
