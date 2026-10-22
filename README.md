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
