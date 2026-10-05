const KEY = "tannn_fake_robux_v1";
const $ = (s) => document.querySelector(s);

let state = JSON.parse(localStorage.getItem(KEY) || "null") || {
  balance: 0,
  history: []
};

function save() {
  localStorage.setItem(KEY, JSON.stringify(state));
}

function formatNumber(n) {
  return new Intl.NumberFormat("id-ID").format(n);
}

function render() {
  $("#balance").textContent = formatNumber(state.balance);
  const box = $("#history");

  if (!state.history.length) {
    box.innerHTML = '<div class="history-empty">Belum ada transaksi simulasi.</div>';
    return;
  }

  box.innerHTML = state.history.map((item) => `
    <div class="history-item">
      <div class="history-main">
        <b>🎁 ${escapeHtml(item.username)}</b>
        <span>${escapeHtml(item.date)}</span>
      </div>
      <div class="history-amount">+${formatNumber(item.amount)} R$</div>
    </div>
  `).join("");
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (c) => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[c]));
}

function toast(message) {
  const t = $("#toast");
  t.textContent = message;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2200);
}

document.querySelectorAll(".quick").forEach(btn => {
  btn.addEventListener("click", () => {
    const amount = Number(btn.dataset.add);
    state.balance += amount;
    save();
    render();
    toast(`+${formatNumber(amount)} Fake Robux`);
  });
});

$("#giveForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const username = $("#username").value.trim();
  const amount = Number($("#amount").value);

  if (!username || !Number.isInteger(amount) || amount < 1 || amount > 999999999) {
    $("#formMessage").textContent = "Masukkan username dan jumlah yang valid.";
    return;
  }

  state.balance += amount;
  state.history.unshift({
    username,
    amount,
    date: new Date().toLocaleString("id-ID", {
      day:"2-digit", month:"short", year:"numeric",
      hour:"2-digit", minute:"2-digit"
    })
  });
  state.history = state.history.slice(0, 50);
  save();
  render();

  $("#giveForm").reset();
  $("#formMessage").textContent = `Berhasil mensimulasikan +${formatNumber(amount)} R$ untuk ${username}.`;
  toast("Transaksi simulasi berhasil");
});

$("#clearHistory").addEventListener("click", () => {
  if (!state.history.length) return;
  state.history = [];
  save();
  render();
  toast("Riwayat dihapus");
});

$("#resetBtn").addEventListener("click", () => {
  if (!confirm("Reset semua saldo dan riwayat simulator?")) return;
  state = { balance: 0, history: [] };
  save();
  render();
  toast("Simulator telah di-reset");
});

let deferredPrompt;
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  $("#installBtn").classList.remove("hidden");
});

$("#installBtn").addEventListener("click", async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  deferredPrompt = null;
  $("#installBtn").classList.add("hidden");
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(console.error));
}

render();
