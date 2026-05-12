// 1. Data Dummy (Simulasi data yang seharusnya dari database)
const dataDummyPasien = {
    nama: "Yulianto",
    gender: "Laki-laki",
    usia: 78,
    tinggi: 175,
    berat: 78,
    gol_darah: "O"
};

// 2. Fungsi untuk menampilkan data ke form saat halaman dimuat
function loadProfileStatic() {
    console.log("Memuat data dummy ke form...");
    document.getElementById('edit-name').value = dataDummyPasien.nama;
    document.getElementById('edit-gender').value = dataDummyPasien.gender;
    document.getElementById('edit-age').value = dataDummyPasien.usia;
    document.getElementById('edit-height').value = dataDummyPasien.tinggi;
    document.getElementById('edit-weight').value = dataDummyPasien.berat;
    document.getElementById('edit-blood').value = dataDummyPasien.gol_darah;
}

// 3. Logika tombol Simpan (Hanya simulasi)
document.getElementById('profileForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simulasi mengambil data dari input
    const updatedData = {
        nama: document.getElementById('edit-name').value,
        usia: document.getElementById('edit-age').value
    };

    alert(`Simulasi Berhasil!\nData ${updatedData.nama} telah tersimpan di browser.`);
    
    // Kembali ke Dashboard
    window.location.href = 'index.html'; 
});

// Jalankan fungsi saat halaman dibuka
loadProfileStatic();