# 🖋️ Manga — temas para Kino TV

Plugin de **temas de la app** (`appThemes`, apiVersion 18) con estética de manga: tinta negra, papel crema, trama de puntos, paneles con borde grueso y un logo propio dibujado en vectores.

Un tema son **datos en el manifiesto**: no ejecuta código, no usa red y no pide ninguna capacidad. El `plugin.js` solo agrega una pantalla de presentación con botones para activar cada tema.

## Temas incluidos

| ID | Nombre | Fondo | Acento | Estilo |
|---|---|---|---|---|
| `manga-ink` | Manga · Tinta | Negro tinta | Rojo `#E63946` | Esquinas rectas, bordes blancos, sin sombras |
| `manga-papel` | Manga · Papel | Crema `#F4F1EA` (claro) | Rojo `#C8102E` | Como un tomo impreso: texto negro y bordes de tinta |
| `manga-shonen` | Manga · Shōnen | Azul noche | Naranja `#FF9F1C` | Bordes dorados, zoom fuerte al enfocar |
| `manga-sakura` | Manga · Sakura | Violeta nocturno | Rosa `#FF7EB6` | Formas suaves y una flor de cerezo sobre la «o» del logo |

**Logo propio** (solo vectores, sigue los colores del tema y los ajustes de la persona):

- `manga-ink`, `manga-papel`, `manga-shonen`: wordmark «KINO» en itálica con líneas de velocidad, «o» como sol rojo, destello o sello con botón de play; y una marca cuadrada (disco con «K») para el riel cerrado de la TV.
- `manga-sakura`: usa `decor`, que se dibuja encima del logo de Kino y cubre la «o» con un sakura.

## Qué puede personalizar la persona

En **Ajustes ▸ Apariencia ▸ Personalizar** (solo lo marcado como `adjustable`):

- Color de acento, con muestras (funciona con control remoto).
- Redondeo de las tarjetas y grosor de su borde.
- Tamaño del texto (1.0 – 1.3).
- Fondo (en los temas oscuros).

Cada tema declara la experiencia sugerida (`experience`: ligera en Tinta y Papel, completa en Shōnen y Sakura); Kino pregunta antes de cambiarla y no cambia nada sin el sí de la persona.

## Archivos

```
kino-plugin.json   Manifiesto: metadatos, icono y los 4 temas (≈15 KB de los 16 KB permitidos)
plugin.js          Pantalla de presentación con botones go.useTheme
icon.png           Icono 512×512 (≈60 KB; el máximo es 128 KB)
README.md          Este archivo
```

### Sobre el icono

El manifiesto lo referencia con una **ruta relativa**, sin `./` (Kino 0.9.45 y anteriores no lo aceptan):

```json
"icon": "icon.png"
```

El campo `icon` solo admite una ruta a un `.png` cuadrado de máximo 128 KB; no admite datos incrustados (base64). Si falta o pesa demasiado, Kino lo omite sin que falle la instalación.

La propuesta visual: papel crema con **líneas de velocidad** y trama de puntos (*screentone*), un disco rojo —el sol de los efectos manga— con una **«K» itálica** con borde de tinta, un globo de diálogo con botón de **play** (es una app de video) y destellos. Todo dentro de un marco de panel negro.

## Requisitos de Kino

| Función | Kino mínimo |
|---|---|
| Temas (`appThemes`, `go.useTheme`) | 0.9.81 (`apiVersion: 18`) |
| Fondo **claro** (`manga-papel`), bordes (`*Border`, `colors.border`) y `logo.decor` (`manga-sakura`) | 0.9.82 |

Con 0.9.81 el plugin se instala, pero Kino ignora los bordes y `decor`, y descarta el fondo claro de `manga-papel` (usa el suyo, con una advertencia). Con una versión anterior a 0.9.81 la instalación se rechaza con «Este plugin necesita una versión más nueva de Kino».

## Probar en local

Con el kit de plugins de Kino:

```bash
node sdk/validate.mjs .                                        # formato y advertencias de cada tema (celular y TV)
node sdk/run.mjs --context '{"activeTheme":"manga-ink"}' . screen   # la pantalla de presentación
```

El kit no dibuja colores: revisa el resultado en la app, en **Ajustes ▸ Apariencia** (hay una vista previa antes de **Usar este tema**).

## Publicar

1. Cambia `"author"` en `kino-plugin.json` por tu nombre o usuario (y agrega `"homepage"` o `"creator"` si quieres).
2. Sube la carpeta a un repositorio de GitHub.
3. Instálalo desde su dirección `owner/repo` o sigue la guía de [Publicar](https://kinotvapp.github.io/kino-plugins/publish/).

`"categories": ["themes", "anime"]` lo lista en **Temas** en la tienda de plugins de Kino.

## Notas de diseño

- **Legibilidad primero.** Cada par de colores se probó contra las protecciones de Kino (texto 4,5:1; acento, foco 3:1; fondos oscuros con luminancia ≤ 0,05; el fondo claro de `manga-papel` trae su propio `textPrimary` y `textSecondary`). Si un par fallara, Kino vuelve a sus valores en ese lado.
- **Estilo panel.** Radios de 0–4 y bordes de 2–3 dp en los temas «duros»; radios altos y bordes de 1 dp en Sakura.
- **Los IDs son definitivos.** No cambies `manga-ink`, `manga-papel`, `manga-shonen` ni `manga-sakura` después de publicar: de ellos cuelgan la elección y los ajustes de cada persona.
- Kino siempre dibuja con su propio aspecto sus pantallas de decisión (consentimientos, bloqueo +18, compras) y mantiene su logo en la pantalla de inicio.

## Licencia

Elige la que prefieras (por ejemplo MIT). El icono y el logo son originales de este plugin.
