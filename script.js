  const input = document.getElementById('taskInput');
  const addBtn = document.getElementById('addBtn');
  const list = document.getElementById('list');
  const empty = document.getElementById('empty');
  const pendingPill = document.getElementById('pendingPill');
  const donePill = document.getElementById('donePill');
  const progressBar = document.getElementById('progressBar');
  const clearDone = document.getElementById('clearDone');

  let tasks = JSON.parse(localStorage.getItem('tasks_v2') || '[]');

  function save() { localStorage.setItem('tasks_v2', JSON.stringify(tasks)); }

  function render() {
    list.innerHTML = '';
    tasks.forEach((t, i) => {
      const li = document.createElement('li');
      li.className = 'todo-item' + (t.done ? ' done' : '');

      const check = document.createElement('div');
      check.className = 'check';
      check.onclick = () => { tasks[i].done = !tasks[i].done; save(); render(); };

      const text = document.createElement('span');
      text.className = 'text';
      text.textContent = t.text;

      const del = document.createElement('button');
      del.className = 'del';
      del.innerHTML = '&times;';
      del.onclick = () => { tasks.splice(i, 1); save(); render(); };

      li.append(check, text, del);
      list.appendChild(li);
    });

    const total = tasks.length;
    const done = tasks.filter(t => t.done).length;
    const pending = total - done;

    pendingPill.textContent = pending + ' remaining';
    donePill.textContent = done + ' done';
    progressBar.style.width = total ? (done / total * 100) + '%' : '0%';
    empty.classList.toggle('show', total === 0);
  }

  function addTask() {
    const val = input.value.trim();
    if (!val) return;
    tasks.unshift({ text: val, done: false });
    save(); render();
    input.value = '';
    input.focus();
  }

  addBtn.addEventListener('click', addTask);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') addTask(); });
  clearDone.addEventListener('click', () => { tasks = tasks.filter(t => !t.done); save(); render(); });

  render();