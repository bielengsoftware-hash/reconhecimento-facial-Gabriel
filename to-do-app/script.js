/* ================================================================
   TaskFlow — script.js
   localStorage keys:
     tf_users        → Array<User>
     tf_todos        → Array<Todo>
     tf_currentUser  → User | null

   User  : { id, name, email, password, createdAt }
   Todo  : { id, userId, title, type, description, done, createdAt }
   ================================================================ */

// ── DB ────────────────────────────────────────────────────────
const DB = {
  getUsers()         { return JSON.parse(localStorage.getItem('tf_users') || '[]'); },
  saveUsers(arr)     { localStorage.setItem('tf_users', JSON.stringify(arr)); },
  getTodos()         { return JSON.parse(localStorage.getItem('tf_todos') || '[]'); },
  saveTodos(arr)     { localStorage.setItem('tf_todos', JSON.stringify(arr)); },
  getUser()          { return JSON.parse(localStorage.getItem('tf_currentUser') || 'null'); },
  setUser(u)         { localStorage.setItem('tf_currentUser', JSON.stringify(u)); },
  clearUser()        { localStorage.removeItem('tf_currentUser'); },
};

// ── Utility ───────────────────────────────────────────────────
const $ = id => document.getElementById(id);
const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

// ── Validation helpers ────────────────────────────────────────
function setErr(inputId, msgId, msg) {
  $(inputId).classList.add('err');
  $(msgId).textContent = msg;
  $(msgId).classList.remove('hidden');
}
function clearErr(inputId, msgId) {
  $(inputId).classList.remove('err');
  $(msgId).classList.add('hidden');
}
function showAlert(id, msg) { $(id).textContent = msg; $(id).classList.remove('hidden'); }
function hideAlert(id)      { $(id).classList.add('hidden'); }

// ── View switching ────────────────────────────────────────────
function showAuth(view = 'login') {
  $('app-screen').classList.add('hidden');
  $('auth-screen').classList.remove('hidden');
  if (view === 'login') {
    $('login-panel').classList.remove('hidden');
    $('register-panel').classList.add('hidden');
  } else {
    $('login-panel').classList.add('hidden');
    $('register-panel').classList.remove('hidden');
  }
}

function showApp() {
  $('auth-screen').classList.add('hidden');
  $('app-screen').classList.remove('hidden');
  const user = DB.getUser();
  $('hdr-greeting').textContent = `Olá, ${user.name.split(' ')[0]}!`;
  $('hdr-avatar').textContent   = user.name.charAt(0).toUpperCase();
  currentTab = 'all';
  applyTabStyles();
  renderTodos();
}

// ── LOGIN ─────────────────────────────────────────────────────
function handleLogin() {
  hideAlert('login-alert');
  const email = $('l-email').value.trim();
  const pass  = $('l-pass').value;
  let ok = true;

  if (!email) { setErr('l-email','l-email-err','Informe seu e-mail.'); ok = false; }
  else         { clearErr('l-email','l-email-err'); }

  if (!pass)  { setErr('l-pass','l-pass-err','Informe sua senha.'); ok = false; }
  else         { clearErr('l-pass','l-pass-err'); }

  if (!ok) return;

  const users = DB.getUsers();
  const user  = users.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (!user) { showAlert('login-alert','E-mail não cadastrado.'); return; }
  if (user.password !== pass) { showAlert('login-alert','Senha incorreta.'); return; }

  DB.setUser({ id: user.id, name: user.name, email: user.email });
  showApp();
}

// ── REGISTER ──────────────────────────────────────────────────
function handleRegister() {
  hideAlert('reg-alert');
  const name  = $('r-name').value.trim();
  const email = $('r-email').value.trim();
  const pass  = $('r-pass').value;
  let ok = true;

  if (!name)  { setErr('r-name','r-name-err','Informe seu nome.'); ok = false; }
  else         { clearErr('r-name','r-name-err'); }

  if (!email) {
    setErr('r-email','r-email-err','Informe seu e-mail.'); ok = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setErr('r-email','r-email-err','E-mail inválido.'); ok = false;
  } else { clearErr('r-email','r-email-err'); }

  if (!pass) {
    setErr('r-pass','r-pass-err','Informe uma senha.'); ok = false;
  } else if (pass.length < 6) {
    setErr('r-pass','r-pass-err','Mínimo 6 caracteres.'); ok = false;
  } else { clearErr('r-pass','r-pass-err'); }

  if (!ok) return;

  const users = DB.getUsers();
  if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
    showAlert('reg-alert','Este e-mail já está cadastrado.'); return;
  }

  const newUser = { id: Date.now().toString(), name, email, password: pass, createdAt: new Date().toISOString() };
  users.push(newUser);
  DB.saveUsers(users);
  DB.setUser({ id: newUser.id, name: newUser.name, email: newUser.email });
  showApp();
}

// ── LOGOUT ────────────────────────────────────────────────────
function handleLogout() {
  DB.clearUser();
  // Reset form fields
  ['l-email','l-pass','r-name','r-email','r-pass'].forEach(id => { $(id).value = ''; $(id).classList.remove('err'); });
  ['l-email-err','l-pass-err','r-name-err','r-email-err','r-pass-err'].forEach(id => $(id).classList.add('hidden'));
  hideAlert('login-alert');
  hideAlert('reg-alert');
  showAuth('login');
}

// ── ADD TODO ──────────────────────────────────────────────────
function handleAddTodo() {
  const title = $('f-title').value.trim();
  if (!title) {
    $('f-title').classList.add('err');
    $('f-title-err').classList.remove('hidden');
    $('f-title').focus();
    return;
  }
  $('f-title').classList.remove('err');
  $('f-title-err').classList.add('hidden');

  const user  = DB.getUser();
  const todos = DB.getTodos();
  todos.push({
    id:          Date.now().toString(),
    userId:      user.email,
    title,
    type:        $('f-type').value,
    description: $('f-desc').value.trim(),
    done:        false,
    createdAt:   new Date().toISOString(),
  });
  DB.saveTodos(todos);

  $('f-title').value = '';
  $('f-desc').value  = '';
  $('f-type').value  = 'Trabalho';
  renderTodos();
}

// ── TOGGLE DONE ───────────────────────────────────────────────
function toggleDone(id) {
  const todos = DB.getTodos();
  const t = todos.find(t => t.id === id);
  if (t) { t.done = !t.done; DB.saveTodos(todos); renderTodos(); }
}

// ── DELETE TODO ───────────────────────────────────────────────
function deleteTodo(id) {
  DB.saveTodos(DB.getTodos().filter(t => t.id !== id));
  renderTodos();
}

// ── TAB FILTER ────────────────────────────────────────────────
let currentTab = 'all';

function applyTabStyles() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    const active = btn.dataset.tab === currentTab;
    btn.style.background = active ? 'rgba(99,102,241,0.25)' : 'rgba(255,255,255,0.05)';
    btn.style.border     = active ? '1px solid rgba(99,102,241,0.35)' : '1px solid rgba(255,255,255,0.08)';
    btn.style.color      = active ? '#a5b4fc' : '#64748b';
  });
}

// ── TYPE → BADGE ──────────────────────────────────────────────
function typeBadge(type) {
  const map = { Trabalho: 'badge-trabalho', Pessoal: 'badge-pessoal', Estudos: 'badge-estudos' };
  const cls = map[type] || 'badge-trabalho';
  return `<span class="badge ${cls}">${esc(type)}</span>`;
}

// ── RENDER ────────────────────────────────────────────────────
function renderTodos() {
  const user  = DB.getUser();
  let todos   = DB.getTodos().filter(t => t.userId === user.email);

  // Stats
  const total   = todos.length;
  const doneN   = todos.filter(t => t.done).length;
  const pending = total - doneN;
  const pct     = total ? Math.round((doneN / total) * 100) : 0;

  $('stat-total').textContent   = total;
  $('stat-pending').textContent = pending;
  $('stat-done').textContent    = doneN;
  $('progress-bar').style.width = pct + '%';
  $('progress-pct').textContent = pct + '%';
  $('hdr-progress').textContent = `${doneN}/${total}`;

  // Filter by tab
  let filtered = todos;
  if (currentTab === 'pending') filtered = todos.filter(t => !t.done);
  if (currentTab === 'done')    filtered = todos.filter(t =>  t.done);

  // Sort: pending first, then by createdAt desc
  filtered.sort((a, b) => {
    if (a.done !== b.done) return a.done ? 1 : -1;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const list = $('todo-list');
  list.innerHTML = '';

  if (filtered.length === 0) {
    $('empty-state').classList.remove('hidden');
    $('empty-msg').textContent = todos.length === 0
      ? 'Nenhuma tarefa cadastrada ainda.'
      : currentTab === 'done' ? 'Nenhuma tarefa concluída.' : 'Nenhuma tarefa pendente.';
  } else {
    $('empty-state').classList.add('hidden');
    filtered.forEach(todo => list.appendChild(buildCard(todo)));
  }
}

function buildCard(todo) {
  const date = new Date(todo.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
  const div  = document.createElement('div');
  div.className = 'todo-card fade-in' + (todo.done ? ' done' : '');
  div.innerHTML = `
    <div class="flex items-start gap-3">
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2 flex-wrap mb-1">
          <span class="todo-title text-sm font-semibold text-white leading-snug">${esc(todo.title)}</span>
          ${typeBadge(todo.type)}
          ${todo.done ? '<span class="badge" style="background:rgba(34,197,94,.12);color:#4ade80;border:1px solid rgba(34,197,94,.22)">✓ Concluída</span>' : ''}
        </div>
        ${todo.description ? `<p class="text-xs text-slate-400 leading-relaxed mt-1">${esc(todo.description)}</p>` : ''}
        <p class="text-xs text-slate-600 mt-2">${date}</p>
      </div>
    </div>
    <div class="flex items-center gap-2 mt-4">
      ${!todo.done
        ? `<button class="btn-complete" data-id="${todo.id}">
             <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
             Concluir
           </button>`
        : `<button class="btn-ghost" style="font-size:12px;padding:6px 14px;" data-undo="${todo.id}">↩ Desfazer</button>`
      }
      <button class="btn-delete" data-del="${todo.id}">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
          <path d="M10 11v6"/><path d="M14 11v6"/>
        </svg>
        Excluir
      </button>
    </div>
  `;

  div.querySelector('[data-id]')?.addEventListener('click', e => toggleDone(e.currentTarget.dataset.id));
  div.querySelector('[data-undo]')?.addEventListener('click', e => toggleDone(e.currentTarget.dataset.undo));
  div.querySelector('[data-del]').addEventListener('click',  e => deleteTodo(e.currentTarget.dataset.del));
  return div;
}

// ── EVENT BINDINGS ────────────────────────────────────────────
$('btn-login').addEventListener('click', handleLogin);
$('btn-register').addEventListener('click', handleRegister);
$('btn-logout').addEventListener('click', handleLogout);
$('btn-add').addEventListener('click', handleAddTodo);

$('to-register').addEventListener('click', () => showAuth('register'));
$('to-login').addEventListener('click',    () => showAuth('login'));

$('l-pass').addEventListener('keydown', e => { if (e.key === 'Enter') handleLogin(); });
$('r-pass').addEventListener('keydown', e => { if (e.key === 'Enter') handleRegister(); });
$('f-title').addEventListener('keydown', e => { if (e.key === 'Enter') handleAddTodo(); });

document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    currentTab = btn.dataset.tab;
    applyTabStyles();
    renderTodos();
  });
});

// ── INIT ──────────────────────────────────────────────────────
(function init() {
  applyTabStyles();
  const user = DB.getUser();
  if (user) showApp();
  else      showAuth('login');
})();
