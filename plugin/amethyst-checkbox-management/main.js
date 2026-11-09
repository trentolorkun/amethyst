/*
 * Amethyst Checkbox Management
 *
 * - Clic derecho sobre un checkbox → menú con los estados del tema Amethyst.
 *   Cada opción muestra el checkbox tal y como lo dibuja el tema (es un
 *   <input data-task="…"> real) y el estado actual aparece marcado.
 * - Clic izquierdo → avanza por el ciclo de estados elegido en los ajustes.
 * - En los ajustes: orden de los estados, separadores, carpetas (submenús),
 *   estados ocultos y ciclo de clics.
 *
 * Funciona en Live Preview y en modo lectura.
 */
const { Plugin, Menu, Notice, TFile, PluginSettingTab, Setting } = require("obsidian");
const { EditorView } = require("@codemirror/view");

/* ───────────── Estados y ciclos ───────────── */

const STATE_LIST = [
  [" ", "Pendiente"],
  ["/", "En curso"],
  ["x", "Hecho"],
  ["v", "Revisado"],
  ["-", "Cancelado"],
  [">", "Reenviado"],
  ["<", "Programado"],
  ["?", "Pregunta"],
  ["!", "Importante"],
  ['"', "Cita"],
  ["*", "Destacado"],
  ["i", "Información"],
  ["I", "Idea"],
  ["l", "Ubicación"],
  ["S", "Ahorro / dinero"],
  ["b", "Marcador"],
  ["k", "Clave"],
  ["f", "Urgente"],
  ["w", "Logro"],
  ["u", "Sube"],
  ["d", "Baja"],
  ["p", "A favor"],
  ["c", "En contra"],
  ["P", "Pull request abierta"],
  ["M", "Pull request mergeada"],
  ["D", "Pull request en borrador"],
];
const LABELS = new Map(STATE_LIST);

const CYCLES = {
  "hecho": { name: "Pendiente → Hecho", states: [" ", "x"] },
  "curso-hecho": { name: "Pendiente → En curso → Hecho", states: [" ", "/", "x"] },
  "hecho-revisado": { name: "Pendiente → Hecho → Revisado", states: [" ", "x", "v"] },
  "curso-hecho-revisado": {
    name: "Pendiente → En curso → Hecho → Revisado",
    states: [" ", "/", "x", "v"],
  },
};
const DEFAULT_CYCLE = "hecho";

/* ───────────── Distribución del menú ─────────────
 * Lista de entradas del menú principal:
 *   { type: "state", char, hidden? }
 *   { type: "separator" }
 *   { type: "folder", name, items: [state | separator] }   (un solo nivel)
 */

function defaultLayout() {
  const s = (char) => ({ type: "state", char });
  const sep = () => ({ type: "separator" });
  return [
    s(" "), s("/"), s("x"), s("v"), s("-"),
    sep(),
    s(">"), s("<"),
    sep(),
    { type: "folder", name: "Etiquetas", items: ["?", "!", '"', "*", "i", "I", "l", "S", "b", "k", "f", "w"].map(s) },
    { type: "folder", name: "Valoración", items: ["u", "d", "p", "c"].map(s) },
    { type: "folder", name: "Git", items: ["P", "M", "D"].map(s) },
  ];
}

// Limpia la distribución guardada: quita duplicados y estados desconocidos,
// y añade al final del menú principal los estados que falten (p. ej. nuevos).
function normalizeLayout(layout) {
  const seen = new Set();
  const clean = (items, allowFolders) => {
    const out = [];
    for (const e of Array.isArray(items) ? items : []) {
      if (!e || typeof e !== "object") continue;
      if (e.type === "separator") {
        out.push({ type: "separator" });
      } else if (e.type === "state" && LABELS.has(e.char) && !seen.has(e.char)) {
        seen.add(e.char);
        out.push(e.hidden ? { type: "state", char: e.char, hidden: true } : { type: "state", char: e.char });
      } else if (e.type === "folder" && allowFolders) {
        out.push({ type: "folder", name: String(e.name || "Carpeta"), items: clean(e.items, false) });
      }
    }
    return out;
  };
  const out = clean(layout, true);
  for (const [char] of STATE_LIST) if (!seen.has(char)) out.push({ type: "state", char });
  return out;
}

// Lo que se ve en el menú: sin ocultos, sin carpetas vacías y sin separadores
// al principio, al final o repetidos.
function visibleEntries(items) {
  const out = [];
  for (const e of items) {
    if (e.type === "state" && e.hidden) continue;
    if (e.type === "folder") {
      const inner = visibleEntries(e.items);
      if (inner.length) out.push({ ...e, items: inner });
      continue;
    }
    if (e.type === "separator" && (!out.length || out[out.length - 1].type === "separator")) continue;
    out.push(e);
  }
  while (out.length && out[out.length - 1].type === "separator") out.pop();
  return out;
}

/* ───────────── Utilidades ───────────── */

// Línea de tarea: citas opcionales, viñeta o número, "[" + carácter de estado + "]".
// Grupo 1 = todo lo anterior al carácter; grupo 2 = el carácter.
const TASK_RE = /^((?:\s*>)*\s*(?:[-*+]|\d+[.)])\s+\[)([^\]])\]/;

function replaceStatus(lineText, ch) {
  const m = TASK_RE.exec(lineText);
  if (!m) return null;
  return lineText.slice(0, m[1].length) + ch + lineText.slice(m[1].length + 1);
}

// Checkbox real con el data-task correspondiente, para que lo pinte el tema
function makePreview(ch) {
  const cb = document.createElement("input");
  cb.type = "checkbox";
  cb.className = "task-list-item-checkbox amethyst-cbm-preview";
  cb.dataset.task = ch;
  cb.checked = ch !== " ";
  cb.tabIndex = -1;
  return cb;
}

// Emoji de carpeta, el mismo que en los ajustes
function makeFolderIcon() {
  const span = document.createElement("span");
  span.className = "amethyst-cbm-folder-emoji";
  span.textContent = "📁";
  return span;
}

// Pone un elemento propio como icono de una opción del menú
function setItemIcon(item, node) {
  const dom = item.dom;
  if (!dom) return;
  let iconEl = dom.querySelector(".menu-item-icon");
  if (!iconEl) {
    iconEl = document.createElement("div");
    iconEl.className = "menu-item-icon";
    dom.prepend(iconEl);
  }
  iconEl.replaceChildren(node);
}

// Obsidian reutiliza el <input> del checkbox al cambiar la línea, así que lo
// actualizamos a mano para que su dibujo coincida siempre con el nuevo estado.
function syncCheckbox(input, ch) {
  input.checked = ch !== " ";
  input.setAttribute("data-task", ch);
  const li = input.closest("li.task-list-item");
  if (li) {
    li.setAttribute("data-task", ch);
    li.classList.toggle("is-checked", ch !== " ");
  }
}

/* ───────────── Plugin ───────────── */

module.exports = class AmethystCheckboxManagement extends Plugin {
  async onload() {
    await this.loadSettings();
    this.addSettingTab(new AmethystCbmSettingTab(this.app, this));

    // Modo lectura: guardamos el contexto de cada checkbox para saber a qué línea corresponde
    this.registerMarkdownPostProcessor((el, ctx) => {
      el.querySelectorAll("input.task-list-item-checkbox").forEach((input) => {
        input.amethystCbm = { el, ctx };
      });
    });

    // En fase de captura, para adelantarnos a Obsidian
    const capture = { capture: true };
    this.registerDomEvent(document, "contextmenu", (evt) => this.onContextMenu(evt), capture);
    this.registerDomEvent(document, "mousedown", (evt) => this.onLeftClick(evt, false), capture);
    this.registerDomEvent(document, "click", (evt) => this.onLeftClick(evt, true), capture);
  }

  async loadSettings() {
    const data = (await this.loadData()) || {};
    this.settings = {
      cycle: CYCLES[data.cycle] ? data.cycle : DEFAULT_CYCLE,
      layout: normalizeLayout(Array.isArray(data.layout) ? data.layout : defaultLayout()),
    };
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  /* ── Localizar la tarea de un checkbox ── */

  resolveTask(target) {
    if (!(target instanceof HTMLInputElement)) return null;
    if (!target.matches(".task-list-item-checkbox") || target.closest(".menu, .modal")) return null;
    const task = target.amethystCbm ? this.fromReadingView(target) : this.fromEditor(target);
    if (!task) return null;
    const apply = task.apply;
    task.apply = (ch) => {
      apply(ch);
      syncCheckbox(target, ch);
    };
    return task;
  }

  // Live Preview: el checkbox es un widget de CodeMirror
  fromEditor(target) {
    const editorEl = target.closest(".cm-editor");
    const cm = editorEl && EditorView.findFromDOM(editorEl);
    if (!cm) return null;
    let line;
    try {
      line = cm.state.doc.lineAt(cm.posAtDOM(target));
    } catch (e) {
      return null;
    }
    const m = TASK_RE.exec(line.text);
    if (!m) return null;
    const from = line.from + m[1].length;
    return {
      current: m[2],
      apply: (ch) => cm.dispatch({ changes: { from, to: from + 1, insert: ch } }),
    };
  }

  // Modo lectura: sección renderizada + data-line del <li>
  fromReadingView(target) {
    const { el, ctx } = target.amethystCbm;
    const info = ctx.getSectionInfo(el);
    const li = target.closest("li[data-line]");
    const file = this.app.vault.getAbstractFileByPath(ctx.sourcePath);
    if (!info || !li || !(file instanceof TFile)) return null;

    const lineNo = info.lineStart + Number(li.dataset.line);
    const m = TASK_RE.exec(info.text.split("\n")[lineNo] || "");
    if (!m) return null;
    return {
      current: m[2],
      apply: (ch) =>
        this.app.vault.process(file, (data) => {
          const lines = data.split("\n");
          const updated = replaceStatus(lines[lineNo] || "", ch);
          if (updated === null) {
            new Notice("Amethyst: la nota ha cambiado, no se pudo actualizar el checkbox.");
            return data;
          }
          lines[lineNo] = updated;
          return lines.join("\n");
        }),
    };
  }

  /* ── Clic izquierdo: ciclo de estados ── */

  onLeftClick(evt, isClick) {
    if (evt.button !== 0) return;
    // El ciclo por defecto es el comportamiento normal de Obsidian: no hace falta intervenir
    if (this.settings.cycle === DEFAULT_CYCLE) return;
    const cycle = CYCLES[this.settings.cycle].states;
    const task = this.resolveTask(evt.target);
    if (!task) return;
    const index = cycle.indexOf(task.current);
    if (index === -1) return; // Estado fuera del ciclo: comportamiento normal de Obsidian

    evt.preventDefault();
    evt.stopImmediatePropagation();
    if (!isClick) return;
    // Tras cancelar el clic, el navegador devuelve el checkbox a su estado anterior
    // al terminar el evento: aplicamos el cambio después, para que no lo pise.
    const next = cycle[(index + 1) % cycle.length];
    setTimeout(() => task.apply(next), 0);
  }

  /* ── Clic derecho: menú de estados ── */

  onContextMenu(evt) {
    const task = this.resolveTask(evt.target);
    if (!task) return; // No es una tarea que sepamos editar: menú normal de Obsidian

    evt.preventDefault();
    evt.stopPropagation();
    const menu = new Menu();
    this.fillMenu(menu, visibleEntries(this.settings.layout), task);
    menu.showAtMouseEvent(evt);
  }

  fillMenu(menu, entries, task) {
    for (const entry of entries) {
      if (entry.type === "separator") {
        menu.addSeparator();
      } else if (entry.type === "state") {
        menu.addItem((item) => this.stateItem(item, entry.char, task));
      } else {
        menu.addItem((item) => {
          item.setTitle(entry.name);
          setItemIcon(item, makeFolderIcon());
          if (typeof item.setSubmenu === "function") {
            this.fillMenu(item.setSubmenu(), entry.items, task);
          } else {
            // Versiones antiguas de Obsidian sin submenús: se abre un menú aparte
            item.onClick((evt) => {
              const sub = new Menu();
              this.fillMenu(sub, entry.items, task);
              sub.showAtMouseEvent(evt);
            });
          }
        });
      }
    }
  }

  stateItem(item, ch, task) {
    item
      .setTitle(`${LABELS.get(ch)}  [${ch}]`)
      .setChecked(ch === task.current)
      .onClick(() => {
        if (ch !== task.current) task.apply(ch);
      });
    setItemIcon(item, makePreview(ch));
  }
};

/* ───────────── Ajustes ───────────── */

function swap(list, a, b) {
  [list[a], list[b]] = [list[b], list[a]];
}

class AmethystCbmSettingTab extends PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  get layout() {
    return this.plugin.settings.layout;
  }

  // Aplica un cambio, lo guarda y vuelve a pintar sin perder el scroll
  async mutate(fn) {
    fn();
    this.plugin.settings.layout = normalizeLayout(this.plugin.settings.layout);
    await this.plugin.saveSettings();
    const scroll = this.containerEl.scrollTop;
    this.display();
    this.containerEl.scrollTop = scroll;
  }

  folders() {
    return this.layout.filter((e) => e.type === "folder");
  }

  uniqueFolderName() {
    const names = new Set(this.folders().map((f) => f.name));
    let name = "Nueva carpeta";
    for (let n = 2; names.has(name); n++) name = `Nueva carpeta ${n}`;
    return name;
  }

  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.addClass("amethyst-cbm-settings");

    /* Ciclo */
    new Setting(containerEl).setName("Clic izquierdo").setHeading();
    new Setting(containerEl)
      .setName("Ciclo de estados")
      .setDesc("Qué hace cada clic sobre un checkbox. Desde el último estado se vuelve a Pendiente. Los estados que no están en el ciclo se comportan como siempre en Obsidian.")
      .addDropdown((d) => {
        for (const [id, c] of Object.entries(CYCLES)) d.addOption(id, c.name);
        d.setValue(this.plugin.settings.cycle).onChange(async (v) => {
          this.plugin.settings.cycle = v;
          await this.plugin.saveSettings();
        });
      });

    /* Menú */
    new Setting(containerEl).setName("Menú del clic derecho").setHeading();
    new Setting(containerEl)
      .setDesc("Ordena con las flechas, usa «Ubicación» para meter un estado en una carpeta (submenú) y añade separadores donde quieras. El ojo oculta un estado del menú.")
      .addButton((b) =>
        b.setButtonText("Añadir separador").onClick(() =>
          this.mutate(() => this.layout.push({ type: "separator" }))
        )
      )
      .addButton((b) =>
        b.setButtonText("Añadir carpeta").onClick(() =>
          this.mutate(() => this.layout.push({ type: "folder", name: this.uniqueFolderName(), items: [] }))
        )
      )
      .addButton((b) =>
        b
          .setButtonText("Restablecer")
          .setWarning()
          .onClick(() =>
            this.mutate(() => {
              this.plugin.settings.layout = defaultLayout();
            })
          )
      );

    const listEl = containerEl.createDiv({ cls: "amethyst-cbm-layout" });
    this.layout.forEach((_, i) => this.renderEntry(listEl, this.layout, i, null));
  }

  renderEntry(parentEl, container, index, folder) {
    const entry = container[index];
    const setting = new Setting(parentEl);
    setting.settingEl.addClass("amethyst-cbm-row");
    if (folder) setting.settingEl.addClass("amethyst-cbm-nested");

    if (entry.type === "state") this.renderState(setting, container, index, folder);
    else if (entry.type === "separator") this.renderSeparator(setting);
    else this.renderFolder(setting, entry);

    this.addMoveButtons(setting, container, index);

    if (entry.type === "separator") {
      setting.addExtraButton((b) =>
        b.setIcon("trash-2").setTooltip("Quitar separador").onClick(() =>
          this.mutate(() => container.splice(index, 1))
        )
      );
    }

    if (entry.type === "folder") {
      setting.addExtraButton((b) =>
        b.setIcon("trash-2").setTooltip("Quitar carpeta (sus estados vuelven al menú principal)").onClick(() =>
          this.mutate(() => container.splice(index, 1, ...entry.items))
        )
      );
      const inner = parentEl.createDiv({ cls: "amethyst-cbm-folder-items" });
      if (!entry.items.length) {
        inner.createDiv({
          cls: "amethyst-cbm-empty",
          text: "Carpeta vacía: mete estados aquí con el desplegable «Ubicación». Las carpetas vacías no se muestran en el menú.",
        });
      }
      entry.items.forEach((_, i) => this.renderEntry(inner, entry.items, i, entry));
    }
  }

  renderState(setting, container, index, folder) {
    const entry = container[index];
    if (entry.hidden) setting.settingEl.addClass("amethyst-cbm-hidden");
    setting.nameEl.append(makePreview(entry.char));
    setting.nameEl.createSpan({ text: LABELS.get(entry.char) });
    setting.nameEl.createSpan({ cls: "amethyst-cbm-char", text: `[${entry.char}]` });

    // Ubicación: menú principal o una carpeta
    const folders = this.folders();
    setting.addDropdown((d) => {
      d.addOption("main", "Menú principal");
      folders.forEach((f, i) => d.addOption(String(i), `📁 ${f.name}`));
      d.setValue(folder ? String(folders.indexOf(folder)) : "main");
      d.onChange((v) =>
        this.mutate(() => {
          container.splice(index, 1);
          if (v === "main") {
            // Justo debajo de la carpeta de la que sale
            const at = folder ? this.layout.indexOf(folder) + 1 : this.layout.length;
            this.layout.splice(at, 0, entry);
          } else {
            folders[Number(v)].items.push(entry);
          }
        })
      );
    });

    setting.addExtraButton((b) =>
      b
        .setIcon(entry.hidden ? "eye-off" : "eye")
        .setTooltip(entry.hidden ? "Oculto en el menú: clic para mostrarlo" : "Visible: clic para ocultarlo del menú")
        .onClick(() =>
          this.mutate(() => {
            if (entry.hidden) delete entry.hidden;
            else entry.hidden = true;
          })
        )
    );
  }

  renderSeparator(setting) {
    setting.settingEl.addClass("amethyst-cbm-separator");
    setting.nameEl.createSpan({ text: "Separador" });
    setting.nameEl.createSpan({ cls: "amethyst-cbm-separator-line" });
  }

  renderFolder(setting, entry) {
    setting.settingEl.addClass("amethyst-cbm-folder");
    setting.nameEl.createSpan({ cls: "amethyst-cbm-folder-icon", text: "📁" });
    const input = setting.nameEl.createEl("input", { type: "text", cls: "amethyst-cbm-folder-name" });
    input.value = entry.name;
    input.placeholder = "Nombre de la carpeta";
    input.addEventListener("change", () =>
      this.mutate(() => {
        entry.name = input.value.trim() || "Carpeta";
      })
    );
    setting.addExtraButton((b) =>
      b.setIcon("separator-horizontal").setTooltip("Añadir separador dentro de la carpeta").onClick(() =>
        this.mutate(() => entry.items.push({ type: "separator" }))
      )
    );
  }

  addMoveButtons(setting, container, index) {
    setting
      .addExtraButton((b) =>
        b.setIcon("arrow-up").setTooltip("Subir").setDisabled(index === 0).onClick(() =>
          this.mutate(() => swap(container, index, index - 1))
        )
      )
      .addExtraButton((b) =>
        b.setIcon("arrow-down").setTooltip("Bajar").setDisabled(index === container.length - 1).onClick(() =>
          this.mutate(() => swap(container, index, index + 1))
        )
      );
  }
}
