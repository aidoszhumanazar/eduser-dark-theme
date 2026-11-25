// EDUSER Dark Theme — compatibility helper.
//
// Early versions of EDUSER Light Theme were set up by pasting colours straight into
// settings.json ("workbench.colorCustomizations" / "editor.tokenColorCustomizations").
// Those unscoped colours override EVERY theme, so EDUSER Dark Theme would show a white
// editor. When the dark theme is selected, this helper finds such EDUSER colours and
// scopes them to "[EDUSER Light Theme]" — the light theme keeps looking exactly the same,
// and the dark theme shows correctly. Settings that are not EDUSER's are never touched.

const vscode = require('vscode');

const DARK = 'EDUSER Dark Theme';
const LIGHT_SCOPE = '[EDUSER Light Theme]';

// Colours that only the EDUSER Light Theme setup uses together.
const EDUSER_UI_MARKERS = ['#070038', '#ff0033', '#fff2b3', '#c2e7ff'];
const EDUSER_TOKEN_MARKERS = ['#a626a4', '#0044ff', '#00a72a', '#a64000', '#00aaff'];

const isScopeKey = (k) => k.startsWith('[') && k.endsWith(']');

function splitUnscoped(obj) {
  const scoped = {};
  const unscoped = {};
  for (const [k, v] of Object.entries(obj || {})) (isScopeKey(k) ? scoped : unscoped)[k] = v;
  return { scoped, unscoped };
}

function countMarkers(value, markers) {
  const text = JSON.stringify(value || {}).toLowerCase();
  return markers.filter((m) => text.includes(m)).length;
}

function looksLikeEduserUi(unscoped) {
  return Object.keys(unscoped).length > 0 && countMarkers(unscoped, EDUSER_UI_MARKERS) >= 2;
}

function looksLikeEduserTokens(unscoped) {
  return Object.keys(unscoped).length > 0 && countMarkers(unscoped, EDUSER_TOKEN_MARKERS) >= 3;
}

function scopeToLight(obj, unscoped, scoped) {
  return { ...scoped, [LIGHT_SCOPE]: { ...(obj[LIGHT_SCOPE] || {}), ...unscoped } };
}

// Returns the new values for one settings level, or null when nothing should change.
function planMigration(colors, tokens) {
  const c = splitUnscoped(colors);
  const t = splitUnscoped(tokens);
  const uiIsEduser = looksLikeEduserUi(c.unscoped);
  const tokensAreEduser = looksLikeEduserTokens(t.unscoped);
  if (!uiIsEduser && !tokensAreEduser) return null;
  return {
    colors: uiIsEduser ? scopeToLight(colors, c.unscoped, c.scoped) : undefined,
    tokens: tokensAreEduser ? scopeToLight(tokens, t.unscoped, t.scoped) : undefined,
  };
}

async function migrate() {
  const config = vscode.workspace.getConfiguration();
  if (config.get('workbench.colorTheme') !== DARK) return;

  const levels = [
    ['globalValue', vscode.ConfigurationTarget.Global],
    ['workspaceValue', vscode.ConfigurationTarget.Workspace],
  ];
  let changed = false;
  for (const [level, target] of levels) {
    if (target === vscode.ConfigurationTarget.Workspace && !vscode.workspace.workspaceFolders) continue;
    const colors = config.inspect('workbench.colorCustomizations')?.[level];
    const tokens = config.inspect('editor.tokenColorCustomizations')?.[level];
    const plan = planMigration(colors, tokens);
    if (!plan) continue;
    if (plan.colors) await config.update('workbench.colorCustomizations', plan.colors, target);
    if (plan.tokens) await config.update('editor.tokenColorCustomizations', plan.tokens, target);
    changed = true;
  }
  if (changed) {
    vscode.window.showInformationMessage(
      'EDUSER Dark Theme: ақ тақырыптың ескі түстері тек EDUSER Light Theme-ге байланды. Қараңғы тақырып енді толық көрінеді.'
    );
  }
}

function activate(context) {
  const run = () => migrate().catch((err) => console.error('[EDUSER Dark Theme]', err));
  run();
  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration((e) => {
      if (e.affectsConfiguration('workbench.colorTheme')) run();
    })
  );
}

function deactivate() {}

module.exports = { activate, deactivate, _test: { planMigration } };
