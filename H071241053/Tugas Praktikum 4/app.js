const dataPraktikan = [
    { nama: "Budi", nilaiTugas: [80, 85, 90] },
    { nama: "Siti", nilaiTugas: [60, 60, 60] },
    { nama: "Andi", nilaiTugas: [90, 90, 90] },
    { nama: "Dewi", nilaiTugas: [75, 75, 75] },
    { nama: "Eko", nilaiTugas: [45, 45, 45] }
];

const namaAsisten = prompt("Masukkan Nama Asisten Lab yang Bertugas:");

if (!namaAsisten || namaAsisten.trim() === "") {
    document.write(`
        <div class="max-w-md mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center">
            <strong class="font-bold">Akses Ditolak!</strong>
            <p class="text-sm">Nama Asisten Lab wajib diisi untuk melihat laporan.</p>
        </div>
    `);
} else {
    function prosesDataPraktikan(data) {
        return data.map(praktikan => {
            // Menghitung total nilai menggunakan method reduce
            const total = praktikan.nilaiTugas.reduce((acc, curr) => acc + curr, 0);
            
            // Menghitung rata-rata
            const rataRata = total / praktikan.nilaiTugas.length;
            
            // Menentukan status kelulusan (Batas kelulusan = 75)
            const status = rataRata >= 75 ? "Lulus" : "Tidak Lulus";

            return {
                nama: praktikan.nama,
                nilaiTugas: praktikan.nilaiTugas,
                rataRata: Number(rataRata.toFixed(2)),
                status: status
            };
        });
    }

    const hasilEvaluasi = prosesDataPraktikan(dataPraktikan);

    document.write(`
        <div class="max-w-5xl mx-auto">
            <header class="mb-8 text-center bg-white p-6 rounded-xl shadow-md border-t-4 border-indigo-600">
                <h1 class="text-3xl font-bold text-gray-800">Sistem Laporan Evaluasi Praktikum</h1>
                <p class="text-gray-600 mt-2">Asisten Bertugas: <span class="font-semibold text-indigo-600">${namaAsisten}</span></p>
            </header>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    `);

    hasilEvaluasi.forEach(item => {
        const isLulus = item.status === "Lulus";
        const badgeColor = isLulus ? "bg-green-100 text-green-800 border-green-300" : "bg-red-100 text-red-800 border-red-300";
        const avatarColor = isLulus ? "bg-green-500" : "bg-red-500";

        document.write(`
            <div class="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition">
                <div class="p-6">
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center space-x-3">
                            <div class="${avatarColor} text-white font-bold rounded-full w-10 h-10 flex items-center justify-center text-lg">
                                ${item.nama.charAt(0)}
                            </div>
                            <h3 class="text-xl font-bold text-gray-800">${item.nama}</h3>
                        </div>
                        <span class="px-3 py-1 rounded-full text-xs font-semibold border ${badgeColor}">
                            ${item.status}
                        </span>
                    </div>

                    <div class="space-y-2 border-t pt-4 text-sm text-gray-600">
                        <p><span class="font-medium text-gray-700">Rincian Nilai:</span> ${item.nilaiTugas.join(", ")}</p>
                        <p class="text-base"><span class="font-semibold text-gray-800">Rata-rata:</span> <strong class="text-indigo-600">${item.rataRata}</strong></p>
                    </div>
                </div>
            </div>
        `);
    });

    document.write(`
            </div>
        </div>
    `);

    console.log("=== Hasil Akhir Evaluasi Praktikan ===");
    console.log(hasilEvaluasi);
}