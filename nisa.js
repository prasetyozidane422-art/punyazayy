const $ = (id) => document.getElementById(id);
const lagu = $("lagu");

const halaman = [
  { judul: "HII KAK NISAAA🐹❤️", foto: "lucu.jpeg",   tombol: "hatinya zay" },
  { judul: "PUNYAKKKKK MEEEEEEE💞", foto: "cantik.jpeg"}
];

const alur = [
  { waktu: 0,    teks: "Beruntungnya aaakuuuu🐻",   foto: "cantik.jpeg" },
  { waktu: 5,    teks: "dimilikii nisaaaaaa❤️❤️", foto: "nisa1.jpeg" },
  { waktu: 11.5, teks: "NISA ADALAH BUKTIII✨", foto: "nisa2.jpeg" },
  { waktu: 15.7, teks: "DARI CANTIKKNYAAA PARASSSS DAN HATIIII🩷", foto: "COMEL.jpeg" },
  { waktu: 20.5, teks: "kau jadi harmoniii saat ku bernyanyii🎵🎶", foto: "nisanyanyi.jpeg" },
  { waktu: 26.5, teks: "tentang terang dan gelapnya hidup ini🌃🌟", foto: "nisa3.jpeg" },
  { waktu: 31.5, teks: "kau lah bentuk terindahhhhhh✨🐹", foto: "nisa5.jpeg" },
  { waktu: 36.5, teks: "dari baiknya tuhannnn pada ZAYYYYYY💞🐻", foto: "LUCUK.jpeg" },
  { waktu: 41.5, teks: "WAKTU ❤️", foto: "random1.jpeg" },
  { waktu: 42.0, teks: "WAKTU 🐹", foto: "random2.jpeg" },
  { waktu: 42.2, teks: "TAK✨", foto: "random3.jpeg" },
  { waktu: 42.6, teks: "MENGUSAIKAN💕💕", foto: "cantik.jpeg" },
  { waktu: 42.8, teks: "MENGUSAIKAN🤗", foto: "random5.jpeg" },
  { waktu: 43.1, teks: "MENGUSAIKAN😄", foto: "random6.jpeg" },
  { waktu: 43.4, teks: "MENGUSAIKAN✨", foto: "random15.jpeg" },
  { waktu: 43.7, teks: "MENGUSAIKAN🫶", foto: "random8.jpeg" },
  { waktu: 44.0, teks: "MENGUSAIKAN💞", foto: "random9.jpeg" },
  { waktu: 44.3, teks: "MENGUSAIKAN🌟", foto: "random11.jpeg" },
  { waktu: 44.6, teks: "CANTIKMUU🐹✨🌻", foto: "random7.jpeg" },
  { waktu: 46.9, teks: "kau wanita terhebat bagikuuu🌹", foto: "random13.jpeg" },
  { waktu: 51.0, teks: "tolong kamuuu camkannnn ituuu💕💕", foto: "random14.jpeg" }
];


// muat semua foto di awal supaya tidak kedip
[...halaman, ...alur].forEach(x => { new Image().src = x.foto; });

let i = 0, aktif = -1, geser = false
const f = (s) => Math.floor(s / 60) + ":" + String(Math.floor(s % 60)).padStart(2, "0");

function ganti(src) { $("foto").src = src; }

function tampil() {
  const h = halaman[i];
  $("judul").textContent = h.judul;
  ganti(h.foto);
  $("foto").classList.toggle("kotak", i >= 1);
  $("tombol").textContent = h.tombol;
  $("tombol").style.display = i >= 1 ? "none" : "block";
  $("pemutar").classList.toggle("tampil", i >= 1);
  $("lirik").textContent = "";
  aktif = -1;
}

$("tombol").addEventListener("click", () => {
  lagu.play();
  $("scene").classList.add("hilang");
  setTimeout(() => {
    i = (i + 1) % halaman.length;
    tampil();
    $("scene").classList.remove("hilang");
  }, 350);
});

lagu.addEventListener("timeupdate", () => {
  if (lagu.duration) {
    if (!geser) $("bar").value = lagu.currentTime / lagu.duration * 100;
    $("waktu").textContent = f(lagu.currentTime) + " / " + f(lagu.duration);
  }
  if (i < 1) return;
  let idx = -1;
  alur.forEach((a, n) => { if (lagu.currentTime >= a.waktu) idx = n; });
  if (idx === aktif || idx < 0) return;
  aktif = idx;
  ganti(alur[idx].foto);
  $("lirik").textContent = alur[idx].teks;
});

// geser durasi maju-mundur
$("bar").addEventListener("input", () => {
  geser = true;
  lagu.currentTime = $("bar").value / 100 * lagu.duration;
});
$("bar").addEventListener("change", () => { geser = false; });

$("jeda").addEventListener("click", () => lagu.paused ? lagu.play() : lagu.pause());
lagu.addEventListener("play",  () => $("jeda").textContent = "⏸");
lagu.addEventListener("pause", () => $("jeda").textContent = "▶");

tampil();
