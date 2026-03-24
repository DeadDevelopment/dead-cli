---
name: deadlibrary
description: "Use this skill whenever generating Angular components, pages, services, forms, themes, or UI elements. DeadLibrary is a deterministic Angular code generator — it takes CLI commands and produces correct, production-ready Angular code every time. Instead of generating Angular code directly (which is probabilistic and error-prone), translate the user's intent into a DeadLibrary CLI command string. The CLI handles all code generation deterministically. Trigger this skill for any Angular scaffolding task: components, services, forms, modals, toolbars, navigation, carousels, grids, tabs, expansion panels, lazy-loaded pages, themes, and more. Also trigger when the user mentions 'DeadLibrary', 'dead g', or any of the command aliases: bloc, b, bm, c, cc, ep, ff, fg, gl, img, le, lp, m, modal, mt, sn, sv, tabs, tbar, theme."
---

# DeadLibrary CLI

DeadLibrary is a deterministic code generation framework, currently constrained to the Angular framework, by Dead Development LLC. It uses a Command-Based Development paradigm: you provide a CLI command with structured options, and DeadLibrary's compiler generates correct, production-ready Angular code — no hallucination, no probabilistic output, no guessing.

**Your job is to translate user intent into valid DeadLibrary CLI command strings. You are NOT generating Angular code. You are generating CLI commands that DeadLibrary's deterministic compiler will use to produce the code.**

## How It Works

The user describes what they want in natural language. You produce a single CLI command string. DeadLibrary compiles it into correct Angular files (component, template, styles, spec, routes as needed).

Invocation: `dead g "<command-string>"`

Example: User says "make me a button called submit-order with a flat button labeled Place Order that navigates to /confirmation"

You output: `dead g "b --language angular-20 -n submit-order -b [{\"lbl\":\"Place Order\",\"type\":\"mat-flat-button\",\"route\":\"/confirmation\"}]"`

## Critical Syntax Rules

These rules are non-negotiable. Violating them will produce broken commands.

### Escaping

Do NOT use more than one backslash to escape quotes:
```
CORRECT: --els [{\"selector\":\"h2\"}]
WRONG:   --els [{\\\"selector\\\":\\\"h2\\\"}]
```

### JSON Arrays

Do NOT wrap JSON arrays in quotes:
```
CORRECT: --els [{\"selector\":\"h2\"}]
WRONG:   --els "[{\"selector\":\"h2\"}]"
```

Do not add extra escaping "just to be safe" — match the examples exactly.

### Naming Conventions

- **kebab-case** for: selectors, filenames, CLI flag values (e.g., `my-component`, `submit-button`)
- **camelCase** for: TypeScript identifiers — variables, properties, method names, class names (e.g., `myService`, `handleClick`)

### Output Format

Never return JSON, code blocks, or any explanation. Only output the final CLI command string.

### Required Flags

Every command MUST include `--language <version>`. This is not optional. Example: `--language 20` for Angular 20, or `--language angular-17.1` for Angular 17.1. Omitting this flag will cause the command to fail.

### Multi-Component Generation

When generating a page (`lp`) that references child components, you MUST also generate the child components using separate commands. Produce the lp component command first, then the children component's commands.

---

## Shared Component Options

Most component commands share these base options. They are not repeated in each command below.

| Option | Description | Shape |
|--------|-------------|-------|
| `-n, --name <string>` | **Required.** Set filename, selector, and class name. | `"my-component"` |
| `--language <string>` | **Required.** Angular major version. Always include this flag. | `"20"` |
| `--changeDetection <string>` | Change detection strategy. | `"Default"` or `"OnPush"` |
| `--standalone` | Standalone component flag. Default: true. | boolean flag |
| `--onInit` | Add ngOnInit lifecycle hook. | boolean flag |
| `--constructorFn <array>` | Constructor arguments. | `["MyService", "AnotherService"]` |
| `--imports <array>` | File-level imports. | `[{"path":"./file.ts","name":"ImportedSymbol"}]` |
| `--children <array>` | Inject child components. | `[{"path":"../folder/component.ts","name":"ComponentName"}]` |

---

## Template Element Shape
For commands that allow all options to be optional, leaving it blank will result in malformed compilations.
Many commands use a nested element structure referred to as "TemplateElement" throughout this document:

```
{
  "sel?": "string",        // HTML selector (div, h1, span, etc.)
  "txt?": "string",        // Text content
  "cls?": "string",        // CSS classes
  "attr?": Record<string, boolean|string>,  // HTML attributes and Angular bindings
  "iterative?": "NgFor",   // Iteration directive
  "els?": []               // Nested child elements (recursive)
}
```

## Button Shape

Many commands use a button configuration object:

```
{
  "lbl?": "Click Me",          // Button label
  "type": "mat-flat-button",   // Material button type
  "cls?": "btn-class",         // CSS classes
  "route?": "/route",          // Router link
  "fn?": "handleClick()"       // Click handler function
}
```

Button types: `mat-flat-button`, `mat-raised-button`, `mat-stroked-button`, `mat-icon-button`, `mat-button`, `mat-fab`, `mat-mini-fab`

---

## Commands

### block | `bloc`

Generate a content display component with nested HTML elements and buttons. This is the most versatile component — use it for any general content layout.

**Specific options:**

| Option | Description |
|--------|-------------|
| `-e, --els <array>` | Nested HTML elements as TemplateElement array |
| `-b, --btns <array>` | Button configuration array |

**Example:**
```
bloc -n hero-section --language angular-20 -e [{"sel":"h1","txt":"Welcome","cls":"hero-title"},{"sel":"p","txt":"Get started today","cls":"hero-subtitle"}] -b [{"lbl":"Sign Up","type":"mat-flat-button","route":"/register"}]
```

---

### button | `b`

Generate a button element contained in a component.

**Specific options:**

| Option | Description |
|--------|-------------|
| `-b, --btns <array>` | Button configuration array |

**Example:**
```
b -n submit-btn --language angular-20 -b [{"lbl":"Submit","type":"mat-flat-button","fn":"onSubmit()"}]
```

---

### bottomModal | `bm`

Generate a bottom sheet/modal component with a button trigger.

**Specific options:**

| Option | Description |
|--------|-------------|
| `-t, --trig <object>` | **Required.** Trigger button configuration |
| `-m, --modal <string>` | **Required.** Modal name |
| `-e, --content <object>` | Modal content as TemplateElement |
| `-c, --closeTrig <object>` | Close button configuration |

**Example:**
```
bm -n cookie-notice --language angular-20 -m cookie-modal -t {"lbl":"Cookie Settings","type":"mat-stroked-button"} -e {"sel":"p","txt":"We use cookies to improve your experience."} -c {"lbl":"Accept","type":"mat-flat-button","fn":"close()"}
```

---

### card | `c`

Generate a Material card component with header, image, content, actions, and footer sections.

**Specific options:**

| Option | Description |
|--------|-------------|
| `-t, --type <string>` | **Required.** Card type (e.g., `mat-raised-button`) |
| `-c, --cls <string>` | Card CSS classes |
| `--av, --avatar <object>` | Avatar image: `{"src":"path","alt?":"string","cls?":"string"}` |
| `--ttl, --title <object>` | Card title: `{"txt?":"string","cls?":"string"}` |
| `--sttl, --subTitle <object>` | Card subtitle: `{"src":"path","cls?":"string"}` |
| `-i, --img <object>` | Card image: `{"src":"path","alt?":"string","cls?":"string"}` |
| `--ct, --content <array>` | Card content as TemplateElement array |
| `-a, --actions <object>` | Card actions: `{"cls?":"string","btns?":[ButtonShape]}` |
| `-f, --footer <array>` | Footer as TemplateElement array |

**Example:**
```
c -n user-profile-card --language angular-20 -t mat-raised-button --ttl {"txt":"John Doe"} --sttl {"src":"Developer"} -i {"src":"assets/profile.jpg","alt":"Profile photo"} --ct [{"sel":"p","txt":"Full-stack Angular developer."}] -a {"btns":[{"lbl":"Contact","type":"mat-flat-button","fn":"onContact()"}]}
```

---

### carousel | `cc`

Generate a carousel component with navigation buttons.

**Specific options:**

| Option | Description |
|--------|-------------|
| `--he, --header <object>` | Header element above carousel (TemplateElement) |
| `-w, --wrapper <object>` | **Required.** Carousel wrapper: `{"sel":"string","cls?":"string","seconds?":".75","content":[...]}` |
| `--nb, --nextBtn <object>` | **Required.** Next button: `{"btn":ButtonShape,"icon":{"name":"string","aria?":"string","cls?":"string"}}` |
| `--pb, --prevBtn <object>` | **Required.** Previous button: same shape as nextBtn |

**Example:**
```
cc -n image-slider --language angular-20 --he {"sel":"h2","txt":"Our Work","cls":"slider-title"} -w {"sel":"div","cls":"slide-wrapper","seconds":".5","content":[{"sel":"img","attr":{"src":"assets/slide1.jpg"}},{"sel":"img","attr":{"src":"assets/slide2.jpg"}}]} --nb {"btn":{"type":"mat-icon-button"},"icon":{"name":"arrow_forward"}} --pb {"btn":{"type":"mat-icon-button"},"icon":{"name":"arrow_back"}}
```

---

### expansionPanel | `ep`

Generate an expansion panel (accordion) list component.

**Specific options:**

| Option | Description |
|--------|-------------|
| `-a, --accordion <object>` | Accordion config: `{"cls?":"string","multi":"string"}` |
| `-p, --panels <array>` | **Required.** Panel array: `[{"panelCls?":"string","headerCls?":"string","title?":"string","titleCls?":"string","description?":"string","descriptionCls?":"string","content?":TemplateElement}]` |

**Example:**
```
ep -n faq-list --language angular-20 -a {"multi":"true"} -p [{"title":"What is DeadLibrary?","content":{"sel":"p","txt":"A deterministic Angular code generator."}},{"title":"How does it work?","content":{"sel":"p","txt":"CLI commands in, production code out."}}]
```

---

### formField | `ff`

Generate a single form field component with label, input, hints, errors, prefix/suffix.

**Specific options:**

| Option | Description |
|--------|-------------|
| `-a, --appearance <string>` | Field appearance |
| `-c, --cls <string>` | CSS classes |
| `-d, --control <string>` | Form control name |
| `-l, --lbl <object>` | Label: `{"val":"string","cls?":"string"}` |
| `--hint <object>` | Hint text: `{"val":"string","cls?":"string"}` |
| `-e, --error <object>` | Error config: `{"val":"string","cls":"string","fn":"string"}` |
| `-i, --input <object>` | **Required.** Input config (see below) |
| `-p, --prefix <object>` | Prefix: `{"val":"string","cls?":"string"}` |
| `-s, --suffix <object>` | Suffix: `{"val":"string","cls?":"string"}` |

**Input field types:** `mat-input`, `mat-textarea`, `mat-timepicker`, `mat-select`, `mat-autocomplete`, `mat-datepicker`, `mat-slide-toggle`, `mat-chip-list`

**Input shape:**
```
{
  "sel": "input",
  "fieldType": "mat-input",
  "inputType?": "text",
  "cls": "string",
  "required?": true,
  "validator?": "Validators.required",
  "options?": [{"lbl":"Option Label","val":"OptionValue"}]
}
```

**Example:**
```
ff -n email-field --language angular-20 -l {"val":"Email Address"} -i {"sel":"input","fieldType":"mat-input","inputType":"email","required":true,"validator":"Validators.email"} --hint {"val":"We will never share your email."} -e {"val":"Invalid email","fn":"hasError('email')"}
```

---

### formGroup | `fg`

Generate a form group with multiple fields, a FormGroup instance, and optional buttons.

**Specific options:**

| Option | Description |
|--------|-------------|
| `-g, --groupName <string>` | **Required.** FormGroup instance name |
| `-f, --fields <array>` | Field definitions (each field follows the ff shape) |
| `-b, --btns <array>` | Button array |

**Example:**
```
fg -n contact-form --language angular-20 -g contactGroup -f [{"lbl":{"val":"Name"},"input":{"sel":"input","fieldType":"mat-input","required":true}},{"lbl":{"val":"Email"},"input":{"sel":"input","fieldType":"mat-input","inputType":"email","required":true,"validator":"Validators.email"}},{"lbl":{"val":"Message"},"input":{"sel":"mat-textarea","fieldType":"mat-textarea"}}] -b [{"lbl":"Send","type":"mat-flat-button","fn":"onSubmit()"}]
```

---

### gridList | `gl`

Generate a customizable grid list Angular component.

**Specific options:**

| Option | Description |
|--------|-------------|
| `-c, --cols <number>` | **Required.** Number of grid columns |
| `-r, --rowHeight <string>` | **Required.** Row height (e.g., `"32rem"`) |
| `-t, --tiles <array>` | **Required.** Tile definitions: `[{"rowspan?":"1","colspan?":"1","content?":TemplateElement}]` |

**Example:**
```
gl -n dashboard-grid --language angular-20 -c 3 -r 16rem -t [{"colspan":"2","content":{"sel":"h2","txt":"Revenue"}},{"content":{"sel":"h2","txt":"Users"}},{"colspan":"3","content":{"sel":"h2","txt":"Activity Feed"}}]
```

---

### image | `img`

Generate an image display component.

**Specific options:**

| Option | Description |
|--------|-------------|
| `-e, --sel <string>` | Element type (e.g., `img`, `div`) |
| `-s, --src <string>` | Image URL or file path |
| `-a, --alt <string>` | Alt text |
| `-c, --cls <string>` | CSS classes |
| `-r, --route <string>` | Router link on click |

**Example:**
```
img -n company-logo --language angular-20 -e img -s "assets/logo.svg" -a "Company Logo" -r "/"
```

---

### lazyPage | `lp`

Generate a lazy-loaded page with route and outlet configs. Creates the page component and its routing file.

**Specific options:**

| Option | Description |
|--------|-------------|
| `-s, --sections <array>` | **Required.** Lazy-loaded sections: `[{"outlet":"primary","route":"home","name":"Home","path":"../path/name.component","el":TemplateElement}]` |

**Example:**
```
lp -n dashboard --language angular-20 -s [{"outlet":"primary","route":"","name":"Overview","path":"../overview/overview.component","el":{"sel":"app-overview","txt":"Overview works!"}}]
```

---

### loadingElement | `le`

Generate a loading/spinner component.

**Specific options:**

| Option | Description |
|--------|-------------|
| `-s, --spinner <object>` | Progress spinner: `{"cls?":"string"}` |
| `-b, --bar <object>` | Progress bar: `{"mode":"string","cls?":"string"}` |

**Example:**
```
le -n page-loader --language angular-20 -s {"cls":"centered-spinner"}
```

---

### menu | `m`

Generate a Material menu element.

**Specific options:**

| Option | Description |
|--------|-------------|
| `-p, --position <string>` | Menu position (e.g., `above`, `below`) |
| `-t, --menuTrig <object>` | **Required.** Trigger button (ButtonShape) |
| `-i, --menuItems <array>` | **Required.** Menu items: `[{"lbl":"Label","route":"/path","fn?":"fn()","val?":"string"}]` |

**Example:**
```
m -n user-menu --language angular-20 -t {"lbl":"Account","type":"mat-flat-button"} -i [{"lbl":"Profile","route":"/profile"},{"lbl":"Settings","route":"/settings"},{"lbl":"Logout","fn":"onLogout()"}]
```

---

### mobileToolbar | `mt`

Generate a toolbar component optimized for mobile/tablet with avatar, home icon, and menu.

**Specific options:**

| Option | Description |
|--------|-------------|
| `-a, --avatar <object>` | Avatar config: `{"cls?":"string","src":"string","alt?":"string","route?":"string"}` |
| `-i, --homeIcon <object>` | Home icon: `{"name":"string","cls":"string","btn":ButtonShape}` |
| `-t, --menuTrig <object>` | **Required.** Menu trigger button (ButtonShape) |
| `-m, --menuItems <array>` | **Required.** Menu items: `[{"lbl":"Label","route":"/path","fn?":"fn()","val?":"string"}]` |

**Example:**
```
mt -n app-mobile-toolbar --language angular-20 -a {"src":"assets/logo.png","alt":"Logo","route":"/"} -t {"lbl":"Menu","type":"mat-icon-button"} -m [{"lbl":"Home","route":"/"},{"lbl":"About","route":"/about"},{"lbl":"Contact","route":"/contact"}]
```

---

### modal | `modal`

Generate a popup modal/dialog with open and close triggers.

**Specific options:**

| Option | Description |
|--------|-------------|
| `-f, --fileName <string>` | **Required.** Modal template name |
| `--ot, --openTime <string>` | **Required.** Open animation speed (ms) |
| `--ct, --closeTime <string>` | **Required.** Close animation speed (ms) |
| `-o, --openTrig <object>` | **Required.** Open trigger button (ButtonShape) |
| `-c, --closeTrig <object>` | **Required.** Close trigger button (ButtonShape) |
| `-t, --title <object>` | Title element (TemplateElement) |
| `--co, --content <object>` | Content element (TemplateElement). **Required for children injection.** |
| `-a, --actions <object>` | Action buttons. **Required to close dialog.** |

**Example:**
```
modal -n confirm-delete --language angular-20 -f confirm-dialog --ot 200 --ct 100 -o {"lbl":"Delete","type":"mat-flat-button","cls":"danger-btn"} -c {"lbl":"Cancel","type":"mat-stroked-button"} -t {"sel":"h2","txt":"Are you sure?"} --co {"sel":"p","txt":"This action cannot be undone."} -a [{"lbl":"Confirm","type":"mat-flat-button","fn":"onConfirm()"}]
```

---

### service | `sv` (BETA)

Generate an Angular service with dependency injection, methods, properties, and built-in utilities (BETA).

**Specific options (does not use shared component options except `--name` and `--imports`):**

| Option | Description |
|--------|-------------|
| `-n, --name <string>` | **Required.** Service name |
| `-l, --language <string>` | Angular version |
| `--exported` | Export the class |
| `--extends <string>` | Parent class |
| `--implements <array>` | Interfaces: `["OnDestroy"]` |
| `--decorators <array>` | Class decorators |
| `--deps <array>` | Constructor dependencies: `["logger: LoggerService"]` |
| `--autoAssign` | Auto-assign constructor args to properties |
| `--props <array>` | Class properties: `[{"name":"theme","type":"string","default":"dark","access":"private"}]` |
| `--methods <array>` | Class methods: `[{"name":"log","params":[{"name":"msg","type":"string"}],"returnType":"void","body":"console.log(msg);"}]` |
| `--imports <array>` | File imports |
| `--constructorFn <array>` | Constructor arguments |
| `--useHttp <array>` | HTTP methods: `[{"name":"getData","params":[{"name":"url","type":"string"}],"returnType":"Observable<any>","body":"return this.http.get(url);"}]` |
| `--providedIn <string>` | Provider scope: `"root"`, `"platform"`, `"any"`, `"module"` |
| `--implDestroy` | OnDestroy lifecycle hook |
| `--themeChange <object>` | Theme switching: `{"default":"dark"}` |
| `--loading` | Reactive loading state |
| `--scroll` | Scroll tracking |
| `--breakpoint <object>` | Breakpoints: `{"sm":{"value":"600","type":"px"},"md":{"value":"900","type":"px"}}` |

**Example:**
```
sv -n auth --language angular-20 --props [{"name":"isLoggedIn","type":"boolean","default":"false"}] --methods [{"name":"login","params":[{"name":"email","type":"string"},{"name":"password","type":"string"}],"returnType":"Promise<void>","body":"return;"}] --useHttp [{"name":"getUser","params":[],"returnType":"Observable<any>","body":"return this.http.get('/api/user');"}]
```

---

### sideNav | `sn`

Generate a side navigation component.

**Specific options:**

| Option | Description |
|--------|-------------|
| `-c, --container <object>` | **Required.** Container config: `{"sel":"div","autoSize":"auto","cls?":"string"}` |
| `-d, --drawer <object>` | **Required.** Drawer config: `{"cls?":"string","mode":"side"}` |
| `-t, --trig <object>` | **Required.** Trigger button (ButtonShape) |

**Example:**
```
sn -n app-sidenav --language angular-20 -c {"sel":"div","autoSize":"auto"} -d {"mode":"side","cls":"main-drawer"} -t {"lbl":"Toggle Nav","type":"mat-icon-button"}
```

---

### tabs | `tabs`

Generate a tabbed interface that displays content per tab.

**Specific options:**

| Option | Description |
|--------|-------------|
| `-c, --groupCls <string>` | Tab group CSS classes |
| `-a, --alignment <string>` | Tab alignment: `center`, `left`, `right` |
| `-t, --tabs <array>` | **Required.** Tab definitions: `[{"lbl":"string","cls?":"string","content?":TemplateElement}]` |

**Example:**
```
tabs -n settings-tabs --language angular-20 -a center -t [{"lbl":"General","content":{"sel":"p","txt":"General settings"}},{"lbl":"Security","content":{"sel":"p","txt":"Security settings"}},{"lbl":"Billing","content":{"sel":"p","txt":"Billing settings"}}]
```

---

### theme | `theme`

Generate a base theme system with global styles, typography, Material theme config, color palette, and utility classes.

**Specific options (does not use shared component options):**

| Option | Description |
|--------|-------------|
| `-n, --name <string>` | Theme file name |
| `--typography <object>` | Font config: `{"plainFamily":"Nunito Sans","boldFamily":"Nunito Sans","regularWeight":"400","boldWeight":"700","plainFace":"Nunito-Regular","boldFace":"Nunito-Mono"}` |
| `--matTheme <object>` | Material theme: `{"color":"dark","typography":"custom","density":"0","type":"light"}` |
| `-d, --default` | Use the default Dead Theme |
| `-c, --colors <object>` | Color palette: `{"primary":"#a784c2","primaryLight":"#f5f5f5","primaryDark":"#666666","secondary":"#cf929a","background":"#0a0908","error":"#f94144"}` |
| `--utilityCls <object>` | Utility class generation config |

**DeadDevelopment Theme Example (default theme):**
```
theme -n styles -d
```

**Example (custom):**
```
theme -n styles --language angular-20 -c {"primary":"#1a73e8","primaryLight":"#ffffff","primaryDark":"#333333","secondary":"#ff6d00","background":"#fafafa","error":"#d32f2f"} --matTheme {"color":"dark","typography":"custom","density":"0","type":"light"}
```

---

### toolbar | `tbar`

Generate a toolbar with logo/avatar, title, spacer, and buttons.

**Specific options:**

| Option | Description |
|--------|-------------|
| `-c, --cls <string>` | Toolbar CSS classes |
| `-a, --avatar <object>` | Avatar/logo: `{"cls?":"string","src":"string","alt?":"string","route?":"string"}` |
| `-t, --title <object>` | Title element (TemplateElement) |
| `-s, --spacer` | Include spacer after logo |
| `-b, --btns <array>` | Button array |

**Example:**
```
tbar -n app-toolbar --language angular-20 -a {"src":"assets/logo.svg","alt":"Logo","route":"/"} -t {"sel":"span","txt":"My Application"} -s -b [{"lbl":"Login","type":"mat-flat-button","route":"/login"},{"lbl":"Sign Up","type":"mat-stroked-button","route":"/register"}]
```

---

## Available Commands Quick Reference

| Alias | Full Name | Description |
|-------|-----------|-------------|
| `bloc` | generateBlock | General content display component |
| `b` | generateButton | Button component |
| `bm` | generateBottomModal | Bottom sheet/modal |
| `c` | generateCard | Material card |
| `cc` | generateCarousel | Carousel with nav buttons |
| `ep` | generateExpansionPanel | Accordion/expansion panels |
| `ff` | generateFormField | Single form field |
| `fg` | generateFormGroup | Form group with multiple fields |
| `gl` | generateGridList | Grid list layout |
| `img` | generateImage | Image display component |
| `le` | generateLoadingElement | Loading spinner/bar |
| `lp` | generateLazyPage | Lazy-loaded page with routes |
| `m` | generateMenu | Dropdown menu |
| `modal` | generateModal | Popup dialog |
| `mt` | generateMobileToolbar | Mobile toolbar with menu |
| `sn` | generateSideNav | Side navigation |
| `sv` | generateService | Angular service (BETA) |
| `tabs` | generateTabs | Tabbed interface |
| `tbar` | generateToolbar | Desktop toolbar |
| `theme` | generateTheme | Theme and global styles |