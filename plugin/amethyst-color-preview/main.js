/*
 * Amethyst Color Preview
 * Como en GitHub: si un código en línea contiene solo un color
 * (`#0969DA`, `rgb(9, 105, 218)`, `hsl(212, 92%, 45%)`), muestra un cuadrado de ese color.
 * Funciona en modo lectura (incluidas las tablas de Live Preview) y en el editor.
 *
 * No se inserta ningún elemento dentro del código: se marca con la clase
 * .amethyst-color-code y la variable --amethyst-swatch, y el cuadrado lo dibuja
 * CSS con ::after. Así otros plugins que reescriben el contenido del código en
 * línea (p. ej. Code Styler) no lo borran, y en el editor queda dentro del código.
 */
const { Plugin } = require("obsidian");
const { ViewPlugin, Decoration } = require("@codemirror/view");
const { RangeSetBuilder, Prec } = require("@codemirror/state");
const { syntaxTree } = require("@codemirror/language");

const COLOR_RE = /^(#[0-9a-f]{3,8}|(?:rgb|hsl)a?\([^()`]*\))$/i;
const INLINE_CODE_RE = /(?<!`)`([^`\n]+)`(?!`)/g;

function asColor(text) {
  const value = text.trim();
  return COLOR_RE.test(value) && CSS.supports("color", value) ? value : null;
}

function buildDecorations(view) {
  const builder = new RangeSetBuilder();
  const tree = syntaxTree(view.state);
  for (const { from, to } of view.visibleRanges) {
    const text = view.state.doc.sliceString(from, to);
    INLINE_CODE_RE.lastIndex = 0;
    let match;
    while ((match = INLINE_CODE_RE.exec(text))) {
      const color = asColor(match[1]);
      if (!color) continue;
      const contentStart = from + match.index + 1;
      const contentEnd = contentStart + match[1].length;
      // Ignorar bloques de código, comentarios y fórmulas
      const node = tree.resolveInner(contentEnd, -1);
      if (/codeblock|comment|math/i.test(node.name)) continue;
      builder.add(
        contentStart,
        contentEnd,
        Decoration.mark({
          class: "amethyst-color-code",
          attributes: { style: `--amethyst-swatch: ${color}` },
        })
      );
    }
  }
  return builder.finish();
}

// Prec.lowest: nuestra marca queda DENTRO del span de código en línea de Obsidian,
// así el cuadrado aparece dentro de la "píldora" del código.
const swatchViewPlugin = Prec.lowest(
  ViewPlugin.fromClass(
    class {
      constructor(view) {
        this.decorations = buildDecorations(view);
      }
      update(update) {
        if (update.docChanged || update.viewportChanged) {
          this.decorations = buildDecorations(update.view);
        }
      }
    },
    { decorations: (plugin) => plugin.decorations }
  )
);

module.exports = class AmethystColorPreview extends Plugin {
  onload() {
    // Modo lectura y celdas de tablas en Live Preview
    this.registerMarkdownPostProcessor((el) => {
      el.querySelectorAll("code").forEach((code) => {
        if (code.closest("pre")) return;
        const color = asColor(code.textContent || "");
        if (!color) return;
        code.classList.add("amethyst-color-code");
        code.style.setProperty("--amethyst-swatch", color);
      });
    });

    // Editor
    this.registerEditorExtension(swatchViewPlugin);
  }
};
