// ==========================================================
// Pemantau Tugas Tim - Tugas Praktikum BAB 5
// HTML + Tailwind CSS + JavaScript murni
// ==========================================================

const API = "https://jsonplaceholder.typicode.com";

// ---------- Referensi elemen ----------
const statusAnggota = document.getElementById("status-anggota");
const errorAnggota = document.getElementById("error-anggota");
const daftarAnggota = document.getElementById("daftar-anggota");

const judulTugas = document.getElementById("judul-tugas");
const pesanAwal = document.getElementById("pesan-awal");
const statusTugas = document.getElementById("status-tugas");
const errorTugas = document.getElementById("error-tugas");
const kontenTugas = document.getElementById("konten-tugas");
const ringkasan = document.getElementById("ringkasan");
const inputCari = document.getElementById("input-cari");
const formTugas = document.getElementById("form-tugas");
const inputJudul = document.getElementById("input-judul");
const tombolSimpan = document.getElementById("tombol-simpan");
const errorForm = document.getElementById("error-form");
const notifikasi = document.getElementById("notifikasi");
const pesanKosong = document.getElementById("pesan-kosong");
const daftarTugas = document.getElementById("daftar-tugas");

// ---------- Class Tailwind ----------
const KELAS_ANGGOTA_AKTIF = ["bg-indigo-600", "text-white", "border-indigo-600"];
const KELAS_ANGGOTA_BIASA = ["bg-white", "text-slate-700", "border-slate-300", "hover:bg-indigo-50"];
const KELAS_SELESAI = ["line-through", "text-gray-400"];

// ---------- State ----------
let anggotaAktif = null;      // anggota yang sedang dipilih
let nomorPermintaan = 0;      // mencegah balapan data jika klik anggota cepat-cepat
let timerNotifikasi = null;

// ---------- Fungsi bantu ----------
function pesanDariError(error) {
  if (error instanceof TypeError) {
    return "Koneksi terputus atau server tidak dapat dijangkau.";
  }
  return error.message;
}

function tampilkanError(elemen, pesan) {
  elemen.textContent = pesan;
  elemen.classList.remove("hidden");
}

function sembunyikan(elemen) {
  elemen.classList.add("hidden");
}

function tampilkan(elemen) {
  elemen.classList.remove("hidden");
}

// ==========================================================
// F1. Menampilkan daftar anggota
// ==========================================================
function buatTombolAnggota(user) {
  const tombol = document.createElement("button");
  tombol.type = "button";
  tombol.textContent = user.name;
  tombol.classList.add("text-left", "border", "rounded-lg", "px-3", "py-2", "transition", ...KELAS_ANGGOTA_BIASA);
  tombol.addEventListener("click", function () {
    pilihAnggota(user, tombol);
  });
  daftarAnggota.appendChild(tombol);
}

async function muatAnggota() {
  statusAnggota.textContent = "Memuat anggota...";
  tampilkan(statusAnggota);
  sembunyikan(errorAnggota);

  try {
    const respons = await fetch(API + "/users");
    if (!respons.ok) {
      throw new Error("Server mengembalikan status " + respons.status + ".");
    }
    const data = await respons.json();
    data.forEach(buatTombolAnggota);
  } catch (error) {
    tampilkanError(errorAnggota, "Gagal memuat anggota. " + pesanDariError(error));
  } finally {
    statusAnggota.textContent = "";
    sembunyikan(statusAnggota);
  }
}

// ==========================================================
// F2. Menampilkan tugas anggota
// ==========================================================
function tandaiAnggota(tombolDipilih) {
  const semuaTombol = daftarAnggota.querySelectorAll("button");
  semuaTombol.forEach(function (tombol) {
    tombol.classList.remove(...KELAS_ANGGOTA_AKTIF);
    tombol.classList.add(...KELAS_ANGGOTA_BIASA);
  });
  tombolDipilih.classList.remove(...KELAS_ANGGOTA_BIASA);
  tombolDipilih.classList.add(...KELAS_ANGGOTA_AKTIF);
}

function hitungRingkasan() {
  const semuaItem = daftarTugas.querySelectorAll("li");
  let selesai = 0;
  semuaItem.forEach(function (item) {
    if (item.dataset.selesai === "true") {
      selesai++;
    }
  });
  ringkasan.textContent = selesai + " dari " + semuaItem.length + " tugas selesai";
}

function buatItemTugas(tugas) {
  const item = document.createElement("li");
  item.classList.add("flex", "items-center", "justify-between", "gap-3", "border", "border-slate-200", "rounded-lg", "px-3", "py-2");
  item.dataset.selesai = tugas.completed ? "true" : "false";

  const judul = document.createElement("span");
  judul.classList.add("judul", "flex-1");
  judul.textContent = tugas.title;
  if (tugas.completed) {
    judul.classList.add(...KELAS_SELESAI);
  }

  const aksi = document.createElement("div");
  aksi.classList.add("flex", "gap-2", "shrink-0");

  // F5: tombol Tandai selesai (hanya untuk tugas yang belum selesai)
  if (!tugas.completed) {
    const tombolSelesai = document.createElement("button");
    tombolSelesai.type = "button";
    tombolSelesai.textContent = "Tandai selesai";
    tombolSelesai.classList.add("text-xs", "bg-green-600", "text-white", "rounded", "px-2", "py-1", "hover:bg-green-700");
    tombolSelesai.addEventListener("click", function () {
      judul.classList.add(...KELAS_SELESAI);
      item.dataset.selesai = "true";
      tombolSelesai.remove();
      hitungRingkasan();
    });
    aksi.appendChild(tombolSelesai);
  }

  // F5: tombol Hapus
  const tombolHapus = document.createElement("button");
  tombolHapus.type = "button";
  tombolHapus.textContent = "Hapus";
  tombolHapus.classList.add("text-xs", "bg-red-600", "text-white", "rounded", "px-2", "py-1", "hover:bg-red-700");
  tombolHapus.addEventListener("click", function () {
    item.remove();
    hitungRingkasan();
    terapkanPencarian();
  });
  aksi.appendChild(tombolHapus);

  item.appendChild(judul);
  item.appendChild(aksi);
  return item;
}

async function pilihAnggota(user, tombol) {
  anggotaAktif = user;
  nomorPermintaan++;
  const nomorIni = nomorPermintaan;

  tandaiAnggota(tombol);
  judulTugas.textContent = "Tugas " + user.name;

  // Bersihkan tampilan lama
  sembunyikan(pesanAwal);
  sembunyikan(kontenTugas);
  sembunyikan(errorTugas);
  sembunyikan(errorForm);
  sembunyikan(notifikasi);
  daftarTugas.innerHTML = "";
  inputCari.value = "";
  inputJudul.value = "";

  statusTugas.textContent = "Memuat tugas...";
  tampilkan(statusTugas);

  try {
    const respons = await fetch(API + "/todos?userId=" + user.id);
    if (!respons.ok) {
      throw new Error("Server mengembalikan status " + respons.status + ".");
    }
    const data = await respons.json();

    // Abaikan hasil lama jika pengguna sudah memilih anggota lain
    if (nomorIni !== nomorPermintaan) {
      return;
    }

    data.forEach(function (tugas) {
      daftarTugas.appendChild(buatItemTugas(tugas));
    });
    hitungRingkasan();
    terapkanPencarian();
    tampilkan(kontenTugas);
  } catch (error) {
    if (nomorIni === nomorPermintaan) {
      tampilkanError(errorTugas, "Gagal memuat tugas. " + pesanDariError(error));
    }
  } finally {
    if (nomorIni === nomorPermintaan) {
      statusTugas.textContent = "";
      sembunyikan(statusTugas);
    }
  }
}

// ==========================================================
// F3. Mencari tugas
// ==========================================================
function terapkanPencarian() {
  const kataKunci = inputCari.value.trim().toLowerCase();
  const semuaItem = daftarTugas.querySelectorAll("li");
  let jumlahTampil = 0;

  semuaItem.forEach(function (item) {
    const judul = item.querySelector(".judul").textContent.toLowerCase();
    if (judul.includes(kataKunci)) {
      item.classList.remove("hidden");
      jumlahTampil++;
    } else {
      item.classList.add("hidden");
    }
  });

  if (semuaItem.length === 0) {
    pesanKosong.textContent = "Belum ada tugas.";
    tampilkan(pesanKosong);
  } else if (jumlahTampil === 0) {
    pesanKosong.textContent = "Tidak ada tugas yang cocok";
    tampilkan(pesanKosong);
  } else {
    sembunyikan(pesanKosong);
  }
}

inputCari.addEventListener("input", terapkanPencarian);

// ==========================================================
// F4. Menambah tugas baru
// ==========================================================
function simpanTugas(judul) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      const daftarJudul = daftarTugas.querySelectorAll(".judul");
      const sudahAda = Array.from(daftarJudul).some(function (elemen) {
        return elemen.textContent.trim().toLowerCase() === judul.toLowerCase();
      });

      if (sudahAda) {
        reject(new Error('Tugas "' + judul + '" sudah ada di daftar.'));
      } else {
        resolve({ title: judul, completed: false });
      }
    }, 1000);
  });
}

function tampilkanNotifikasi(pesan) {
  notifikasi.textContent = pesan;
  tampilkan(notifikasi);
  clearTimeout(timerNotifikasi);
  timerNotifikasi = setTimeout(function () {
    sembunyikan(notifikasi);
  }, 3000);
}

formTugas.addEventListener("submit", async function (event) {
  event.preventDefault();
  sembunyikan(errorForm);

  const judul = inputJudul.value.trim();
  if (judul.length < 5) {
    tampilkanError(errorForm, "Judul tugas tidak boleh kosong dan minimal 5 karakter.");
    return;
  }

  const idSaatSimpan = anggotaAktif.id;
  tombolSimpan.disabled = true;
  tombolSimpan.textContent = "Menyimpan...";

  try {
    const tugasBaru = await simpanTugas(judul);

    // Jika anggota diganti saat menunggu, jangan masukkan ke daftar anggota lain
    if (anggotaAktif.id !== idSaatSimpan) {
      return;
    }

    daftarTugas.appendChild(buatItemTugas(tugasBaru));
    hitungRingkasan();
    terapkanPencarian();
    inputJudul.value = "";
    tampilkanNotifikasi("Tugas berhasil ditambahkan.");
  } catch (error) {
    tampilkanError(errorForm, error.message);
  } finally {
    tombolSimpan.disabled = false;
    tombolSimpan.textContent = "Simpan";
  }
});

inputJudul.addEventListener("input", function () {
  sembunyikan(errorForm);
});

// ==========================================================
// Jalankan saat halaman dibuka
// ==========================================================
muatAnggota();