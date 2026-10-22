# Amethyst

Tema personal para [Obsidian](https://obsidian.md): la base limpia y los checkboxes especiales de **Things**, con los acentos de **Obsidianite** (degradados, fades) y una paleta **morado · amarillo · azul cielo**.

## Qué incluye

- **Fondos y texto** de Things, sin cambios.
- **Checkboxes especiales** de Things (`[!]`, `[?]`, `[*]`, `[i]`, `[>]`, `[-]`…).
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

## Instalación

### Manual

Copia `theme.css` y `manifest.json` en:

```
<tu-vault>/.obsidian/themes/Amethyst/
```

y selecciónalo en **Ajustes → Apariencia → Temas**.

### Desde este repo (con git)

```bash
cd "<tu-vault>/.obsidian/themes"
git clone https://github.com/<tu-usuario>/Amethyst.git
```

Para actualizar después: `git pull` dentro de esa carpeta.

## Personalizar

Toda la capa propia está en la **PARTE 2** de `theme.css`. La paleta está en variables al principio de esa sección (`--to-purple`, `--to-yellow`, `--to-sky`, `--to-orchid`, `--to-code`, `--to-comment`): cambiando una línea cambia el color en todo el tema.

## Créditos

- [Things](https://github.com/colineckert/obsidian-things) de @colineckert (MIT) — base del tema.
- [Obsidianite](https://github.com/bennyxguo/Obsidian-Obsidianite) de @bennyxguo (MIT) — inspiración de los acentos.
- [Minimal](https://github.com/kepano/obsidian-minimal) de @kepano — estilos originales de los checkboxes.
