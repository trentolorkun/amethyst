# Amethyst

🇬🇧 [English](#english) · 🇪🇸 [Español](#espanol) · [Galego](#galego)

---

<a id="english"></a>

## 🇬🇧 English

A personal theme for [Obsidian](https://obsidian.md): the clean base and special checkboxes of **Things**, with the accents of **Obsidianite** (gradients, fades) and a **purple · yellow · sky blue** palette.

### What's included

- **Backgrounds and text** from Things, unchanged.
- **Special checkboxes** from Things (see the [list below](#checkboxes-en)).
- **Headings** with a bottom line that fades out in their own colour:
  H1 white · H2 purple · H3 yellow · H4 sky blue · H5 orchid · H6 grey.
- **Bold** with a sky blue → lilac gradient, **italics** in yellow.
- **Completed tasks and strikethrough** in grey.
- **Links** with an underline bar that fills up on hover.
- **Separators** `---` as a continuous line that fades out at both ends.
- **Blockquotes** with gradient background and borders.
- **`Inline code`** in red on a soft grey background.
- **Code comments** in green.
- **Tabs**: the active one in white, the rest in grey.
- Tweaks for the **Code Styler** plugin: small language icon and language tag without background.
- **GitHub-style alerts** (`> [!NOTE]`, `[!TIP]`, `[!IMPORTANT]`, `[!WARNING]`, `[!CAUTION]`) — see [below](#alerts-en).
- **Colour preview** for `#RRGGBB`, `rgb(…)` and `hsl(…)` in inline code, with the companion plugin — see [below](#color-preview-en).

<a id="checkboxes-en"></a>

### Supported checkboxes

| Syntax | Meaning | Icon |
|---|---|---|
| `- [ ]` | To do | empty box |
| `- [x]` | Done | check (struck through in grey) |
| `- [/]` | In progress | half-filled box |
| `- [-]` | Cancelled | dash (struck through in grey) |
| `- [>]` | Forwarded | paper plane (grey) |
| `- [<]` | Scheduled | calendar (grey) |
| `- [?]` | Question | question mark (yellow) |
| `- [!]` | Important | warning sign (orange) |
| `- ["]` | Quote | quotation marks (cyan) |
| `- [*]` | Star | star (yellow) |
| `- [i]` | Information | "i" (sky blue) |
| `- [I]` | Idea | light bulb (yellow) |
| `- [l]` | Location | map pin (red) |
| `- [S]` | Savings / money | dollar sign (green) |
| `- [b]` | Bookmark | bookmark (orange) |
| `- [k]` | Key | key (yellow) |
| `- [f]` | Fire | flame (red) |
| `- [w]` | Win | cake (purple) |
| `- [u]` | Up | upward trend (green) |
| `- [d]` | Down | downward trend (red) |
| `- [p]` | Pro | thumbs up (green) |
| `- [c]` | Con | thumbs down (orange) |
| `- [P]` | Open pull request | PR icon (green) |
| `- [M]` | Merged pull request | merge icon (purple) |
| `- [D]` | Draft pull request | draft PR icon (grey) |

<a id="alerts-en"></a>

### GitHub-style alerts

Written exactly as on GitHub. Obsidian already recognises them as callouts; Amethyst gives them GitHub's icons and look (coloured left border and a soft background that fades out on the right).

```markdown
> [!WARNING]
> Alert text.
```

| Alert | Colour | Icon |
|---|---|---|
| `[!NOTE]` | Amethyst sky blue | information |
| `[!TIP]` | GitHub green (`#3fb950`; `#1a7f37` in light mode) | light bulb |
| `[!IMPORTANT]` | Amethyst purple | speech bubble with ! |
| `[!WARNING]` | Amethyst yellow | warning triangle |
| `[!CAUTION]` | GitHub red (`#f85149`; `#d1242f` in light mode) | stop octagon |

<a id="color-preview-en"></a>

### Colour preview (companion plugin)

As on GitHub, inline code that contains only a colour shows a small square with that colour: `#0969DA`, `rgb(9, 105, 218)`, `hsl(212, 92%, 45%)` (also `rgba`/`hsla` and 3–8 digit hex). It works in reading view, Live Preview (tables included) and Source mode.

A theme can only style existing content, so this part is a small plugin, **Amethyst Color Preview**, included in this repo under `plugin/amethyst-color-preview/`. To install it:

1. Copy the `plugin/amethyst-color-preview` folder into `<your-vault>/.obsidian/plugins/`.
2. Enable it in **Settings → Community plugins**.

The square is drawn by the theme; the plugin also ships its own `styles.css`, so it works with other themes too.

### Installation

#### Manual

Copy `theme.css` and `manifest.json` into:

```
<your-vault>/.obsidian/themes/Amethyst/
```

and select it in **Settings → Appearance → Themes**.

#### From this repo (with git)

```bash
cd "<your-vault>/.obsidian/themes"
git clone https://github.com/trentolorkun/amethyst.git Amethyst
```

To update later, run `git pull` inside that folder.

### Customising

All of Amethyst's own layer lives in **PART 2** (`PARTE 2`) of `theme.css`. The palette is defined as variables at the start of that section (`--to-purple`, `--to-yellow`, `--to-sky`, `--to-orchid`, `--to-code`, `--to-comment`): changing one line changes that colour across the whole theme.

### Credits

- [Things](https://github.com/colineckert/obsidian-things) by @colineckert (MIT) — base of the theme.
- [Obsidianite](https://github.com/bennyxguo/Obsidian-Obsidianite) by @bennyxguo (MIT) — inspiration for the accents.
- [Minimal](https://github.com/kepano/obsidian-minimal) by @kepano — original checkbox styles.

---

<a id="espanol"></a>

## 🇪🇸 Español

Tema personal para [Obsidian](https://obsidian.md): la base estéticamente limpia y los checkboxes especiales de **Things**, con los acentos de **Obsidianite** (degradados, fades) y una paleta **morado · amarillo · azul cielo**.

### Qué incluye

- **Fondos y texto** de Things, sin cambios.
- **Checkboxes especiales** de Things (ver el [listado más abajo](#checkboxes-es)).
- **Headers** con línea inferior en degradado de su propio color:
  H1 blanco · H2 morado · H3 amarillo · H4 azul cielo · H5 orquídea · H6 gris.
- **Negrita** con degradado cielo → lila, **cursiva** en amarillo.
- **Tareas completadas y tachados** en gris.
- **Links** con barra inferior que se rellena al pasar el ratón.
- **Separadores** `---` en línea continua que se desvanece en los extremos.
- **Citas** con fondo y bordes en degradado.
- **`Código en línea`** en rojizo sobre fondo gris suave.
- **Comentarios** de código en verde.
- **Pestañas**: la activa en blanco, el resto en gris.
- Ajustes para el plugin **Code Styler**: icono de lenguaje pequeño y etiqueta sin fondo.
- **Alertas estilo GitHub** (`> [!NOTE]`, `[!TIP]`, `[!IMPORTANT]`, `[!WARNING]`, `[!CAUTION]`) — ver [más abajo](#alerts-es).
- **Vista previa de colores** para `#RRGGBB`, `rgb(…)` y `hsl(…)` en código en línea, con el plugin complementario — ver [más abajo](#color-preview-es).

<a id="checkboxes-es"></a>

### Checkboxes soportados

| Sintaxis | Significado | Icono |
|---|---|---|
| `- [ ]` | Pendiente | casilla vacía |
| `- [x]` | Hecho | check (tachado en gris) |
| `- [/]` | En curso | casilla a medio rellenar |
| `- [-]` | Cancelado | guion (tachado en gris) |
| `- [>]` | Reenviado | avión de papel (gris) |
| `- [<]` | Programado | calendario (gris) |
| `- [?]` | Pregunta | interrogación (amarillo) |
| `- [!]` | Importante | señal de aviso (naranja) |
| `- ["]` | Cita | comillas (cian) |
| `- [*]` | Destacado | estrella (amarillo) |
| `- [i]` | Información | "i" (azul cielo) |
| `- [I]` | Idea | bombilla (amarillo) |
| `- [l]` | Ubicación | chincheta de mapa (rojo) |
| `- [S]` | Ahorro / dinero | símbolo de dólar (verde) |
| `- [b]` | Marcador | marcador (naranja) |
| `- [k]` | Clave | llave (amarillo) |
| `- [f]` | Urgente | llama (rojo) |
| `- [w]` | Logro | tarta (morado) |
| `- [u]` | Sube | tendencia al alza (verde) |
| `- [d]` | Baja | tendencia a la baja (rojo) |
| `- [p]` | A favor | pulgar arriba (verde) |
| `- [c]` | En contra | pulgar abajo (naranja) |
| `- [P]` | Pull request abierta | icono de PR (verde) |
| `- [M]` | Pull request mergeada | icono de merge (morado) |
| `- [D]` | Pull request en borrador | icono de PR borrador (gris) |

<a id="alerts-es"></a>

### Alertas estilo GitHub

Se escriben igual que en GitHub. Obsidian ya las reconoce como callouts; Amethyst les da los iconos y el aspecto de GitHub (borde izquierdo de color y fondo suave que se desvanece a la derecha).

```markdown
> [!WARNING]
> Texto de la alerta.
```

| Alerta | Color | Icono |
|---|---|---|
| `[!NOTE]` | azul cielo Amethyst | información |
| `[!TIP]` | verde GitHub (`#3fb950`; `#1a7f37` en modo claro) | bombilla |
| `[!IMPORTANT]` | morado Amethyst | bocadillo con ! |
| `[!WARNING]` | amarillo Amethyst | triángulo de aviso |
| `[!CAUTION]` | rojo GitHub (`#f85149`; `#d1242f` en modo claro) | octógono de stop |

<a id="color-preview-es"></a>

### Vista previa de colores (plugin complementario)

Como en GitHub, un código en línea que contenga solo un color muestra un pequeño cuadrado con ese color: `#0969DA`, `rgb(9, 105, 218)`, `hsl(212, 92%, 45%)` (también `rgba`/`hsla` y hex de 3 a 8 dígitos). Funciona en modo lectura, en Live Preview (tablas incluidas) y en modo Source.

Un tema solo puede dar estilo a lo que ya existe, así que esta parte es un pequeño plugin, **Amethyst Color Preview**, incluido en este repo en `plugin/amethyst-color-preview/`. Para instalarlo:

1. Copia la carpeta `plugin/amethyst-color-preview` en `<tu-vault>/.obsidian/plugins/`.
2. Actívalo en **Ajustes → Plugins de la comunidad**.

El cuadrado lo dibuja el tema; el plugin trae también su propio `styles.css`, así que funciona con otros temas.

### Instalación

#### Manual

Copia `theme.css` y `manifest.json` en:

```
<tu-vault>/.obsidian/themes/Amethyst/
```

y selecciónalo en **Ajustes → Apariencia → Temas**.

#### Desde este repo (con git)

```bash
cd "<tu-vault>/.obsidian/themes"
git clone https://github.com/trentolorkun/amethyst.git Amethyst
```

Para actualizar después, ejecuta `git pull` dentro de esa carpeta.

### Personalizar

Toda la capa propia de Amethyst está en la **PARTE 2** de `theme.css`. La paleta está en variables al principio de esa sección (`--to-purple`, `--to-yellow`, `--to-sky`, `--to-orchid`, `--to-code`, `--to-comment`): cambiando una línea cambia ese color en todo el tema.

### Créditos

- [Things](https://github.com/colineckert/obsidian-things) de @colineckert (MIT) — base del tema.
- [Obsidianite](https://github.com/bennyxguo/Obsidian-Obsidianite) de @bennyxguo (MIT) — inspiración de los acentos.
- [Minimal](https://github.com/kepano/obsidian-minimal) de @kepano — estilos originales de los checkboxes.

---

<a id="galego"></a>

## Galego

Tema persoal para [Obsidian](https://obsidian.md): a base estéticamente limpa e as caixas de verificación especiais de **Things**, cos detalles de **Obsidianite** (degradados, fades) e unha paleta **morado · amarelo · azul ceo**.

### Que inclúe

- **Fondos e texto** de Things, sen cambios.
- **Caixas de verificación especiais** de Things (ver a [listaxe máis abaixo](#checkboxes-gl)).
- **Cabeceiras** cunha liña inferior en degradado da súa propia cor:
  H1 branco · H2 morado · H3 amarelo · H4 azul ceo · H5 orquídea · H6 gris.
- **Negra** con degradado ceo → lila, **cursiva** en amarelo.
- **Tarefas completadas e riscados** en gris.
- **Ligazóns** cunha barra inferior que se enche ao pasar o rato.
- **Separadores** `---` nunha liña continua que se esvaece nos extremos.
- **Citas** con fondo e bordos en degradado.
- **`Código en liña`** en vermello sobre fondo gris suave.
- **Comentarios** de código en verde.
- **Lapelas**: a activa en branco, o resto en gris.
- Axustes para o complemento **Code Styler**: icona de linguaxe pequena e etiqueta sen fondo.
- **Alertas estilo GitHub** (`> [!NOTE]`, `[!TIP]`, `[!IMPORTANT]`, `[!WARNING]`, `[!CAUTION]`) — ver [máis abaixo](#alerts-gl).
- **Vista previa de cores** para `#RRGGBB`, `rgb(…)` e `hsl(…)` en código en liña, co complemento adicional — ver [máis abaixo](#color-preview-gl).

<a id="checkboxes-gl"></a>

### Caixas de verificación soportadas

| Sintaxe | Significado | Icona |
|---|---|---|
| `- [ ]` | Pendente | caixa baleira |
| `- [x]` | Feito | visto (riscado en gris) |
| `- [/]` | En curso | caixa medio enchida |
| `- [-]` | Cancelado | guión (riscado en gris) |
| `- [>]` | Reenviado | avión de papel (gris) |
| `- [<]` | Programado | calendario (gris) |
| `- [?]` | Pregunta | interrogación (amarelo) |
| `- [!]` | Importante | sinal de aviso (laranxa) |
| `- ["]` | Cita | comiñas (cian) |
| `- [*]` | Destacado | estrela (amarelo) |
| `- [i]` | Información | "i" (azul ceo) |
| `- [I]` | Idea | lámpada (amarelo) |
| `- [l]` | Localización | chincheta de mapa (vermello) |
| `- [S]` | Aforro / diñeiro | símbolo de dólar (verde) |
| `- [b]` | Marcador | marcador (laranxa) |
| `- [k]` | Clave | chave (amarelo) |
| `- [f]` | Urxente | lapa (vermello) |
| `- [w]` | Logro | torta (morado) |
| `- [u]` | Sobe | tendencia á alza (verde) |
| `- [d]` | Baixa | tendencia á baixa (vermello) |
| `- [p]` | A favor | polgar arriba (verde) |
| `- [c]` | En contra | polgar abaixo (laranxa) |
| `- [P]` | Pull request aberta | icona de PR (verde) |
| `- [M]` | Pull request fusionada | icona de merge (morado) |
| `- [D]` | Pull request en borrador | icona de PR borrador (gris) |

<a id="alerts-gl"></a>

### Alertas estilo GitHub

Escríbense igual que en GitHub. Obsidian xa as recoñece como callouts; Amethyst dálles as iconas e o aspecto de GitHub (bordo esquerdo de cor e fondo suave que se esvaece á dereita).

```markdown
> [!WARNING]
> Texto da alerta.
```

| Alerta | Cor | Icona |
|---|---|---|
| `[!NOTE]` | azul ceo Amethyst | información |
| `[!TIP]` | verde GitHub (`#3fb950`; `#1a7f37` en modo claro) | lámpada |
| `[!IMPORTANT]` | morado Amethyst | globo de diálogo con ! |
| `[!WARNING]` | amarelo Amethyst | triángulo de aviso |
| `[!CAUTION]` | vermello GitHub (`#f85149`; `#d1242f` en modo claro) | octógono de stop |

<a id="color-preview-gl"></a>

### Vista previa de cores (complemento adicional)

Como en GitHub, un código en liña que conteña só unha cor mostra un pequeno cadrado con esa cor: `#0969DA`, `rgb(9, 105, 218)`, `hsl(212, 92%, 45%)` (tamén `rgba`/`hsla` e hex de 3 a 8 díxitos). Funciona no modo lectura, en Live Preview (táboas incluídas) e no modo Source.

Un tema só pode dar estilo ao que xa existe, así que esta parte é un pequeno complemento, **Amethyst Color Preview**, incluído neste repositorio en `plugin/amethyst-color-preview/`. Para instalalo:

1. Copia o cartafol `plugin/amethyst-color-preview` en `<o-teu-vault>/.obsidian/plugins/`.
2. Actívao en **Axustes → Complementos da comunidade**.

O cadrado debúxao o tema; o complemento trae tamén o seu propio `styles.css`, así que funciona con outros temas.

### Instalación

#### Manual

Copia `theme.css` e `manifest.json` en:

```
<o-teu-vault>/.obsidian/themes/Amethyst/
```

e selecciónao en **Axustes → Aparencia → Temas**.

#### Desde este repositorio (con git)

```bash
cd "<o-teu-vault>/.obsidian/themes"
git clone https://github.com/trentolorkun/amethyst.git Amethyst
```

Para actualizar despois, executa `git pull` dentro desa carpeta.

### Personalizar

Toda a capa propia de Amethyst está na **PARTE 2** de `theme.css`. A paleta está en variables ao comezo desa sección (`--to-purple`, `--to-yellow`, `--to-sky`, `--to-orchid`, `--to-code`, `--to-comment`): cambiando unha liña cambia esa cor en todo o tema.

### Créditos

- [Things](https://github.com/colineckert/obsidian-things) de @colineckert (MIT) — base do tema.
- [Obsidianite](https://github.com/bennyxguo/Obsidian-Obsidianite) de @bennyxguo (MIT) — inspiración dos acentos.
- [Minimal](https://github.com/kepano/obsidian-minimal) de @kepano — estilos orixinais das caixas de verificación.
