// 1. Fungsi Kalender Otomatis
function generateCalendar() {
    const calendarGrid = document.getElementById('calendar-grid');
    const monthYearText = document.getElementById('month-year');
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const today = now.getDate();

    const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", 
                        "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    
    monthYearText.innerText = `${monthNames[currentMonth]} ${currentYear}`;

    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    calendarGrid.innerHTML = '';

    // Slot kosong sebelum tanggal 1
    for (let i = 0; i < firstDay; i++) {
        calendarGrid.appendChild(document.createElement('div'));
    }

    // Mengisi Tanggal
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.innerText = day;
        if (day === today) {
            dayElement.classList.add('today');
        }
        calendarGrid.appendChild(dayElement);
    }
}

// 2. Fungsi Ambil Data dari Backend Node.js
async function updateDashboardData() {
    try {
        const response = await fetch('/api/data-terakhir'); 
        const data = await response.json();

        // Update tampilan HTML
        document.getElementById('temp').innerText = data.suhu || '--';
        document.getElementById('hum').innerText = data.kelembaban || '--';
        document.getElementById('bpm').innerText = data.bpm || '--';
        document.getElementById('spo2').innerText = data.spo2 || '--';
    } catch (error) {
        console.log("Menghubungkan ke server...");
    }
}

// 3. Inisialisasi
window.onload = () => {
    generateCalendar();
    
    // Update data setiap 5 detik (sesuai instruksi tugas)
    setInterval(updateDashboardData, 5000);
    updateDashboardData();
    
    // Tambahan: Display Jam Real-time di Header
    setInterval(() => {
        const now = new Date();
        document.getElementById('current-time-display').innerText = now.toLocaleTimeString('id-ID');
    }, 1000);
};

// ================= FITUR HALAMAN NOTIFIKASI =================

// 1. Fungsi Menutup/Menghapus 1 Notifikasi
function tutupNotif(button) {
    const notifItem = button.closest('.notif-item');
    // Tambahkan class fade-out untuk memicu animasi CSS
    notifItem.classList.add('fade-out');
    
    // Hapus elemen dari HTML setelah animasi selesai (400ms)
    setTimeout(() => {
        notifItem.remove();
        cekNotifKosong();
    }, 400); 
}

// 2. Fungsi Bersihkan Semua Notifikasi
function clearAllNotifications() {
    const container = document.getElementById('tempat-notifikasi');
    if (!container) return; // Jika bukan di halaman notifikasi, abaikan

    const items = container.querySelectorAll('.notif-item');
    
    items.forEach(item => {
        item.classList.add('fade-out');
    });

    setTimeout(() => {
        container.innerHTML = '';
        cekNotifKosong();
    }, 400);
}

// 3. Fungsi Filter Kategori
function filterNotif(kategori) {
    // Ubah warna tombol filter yang aktif
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // Sembunyikan atau tampilkan notifikasi
    const items = document.querySelectorAll('.notif-item');
    items.forEach(item => {
        if (kategori === 'all' || item.dataset.type === kategori) {
            item.classList.remove('hide');
        } else {
            item.classList.add('hide');
        }
    });
}

// 4. Fungsi Cek Notifikasi Kosong (Menampilkan Ilustrasi Empty State)
function cekNotifKosong() {
    const container = document.getElementById('tempat-notifikasi');
    const sisaNotif = container.querySelectorAll('.notif-item').length;
    
    if (sisaNotif === 0) {
        container.innerHTML = `
            <div style="text-align:center; padding: 60px 20px; color: var(--text-muted);">
                <i class="fa-solid fa-bell-slash" style="font-size: 3.5rem; margin-bottom: 20px; opacity: 0.3;"></i>
                <h3 style="color: var(--dark-blue); margin-bottom: 10px;">Semua Bersih!</h3>
                <p>Tidak ada notifikasi baru untuk saat ini.</p>
            </div>
        `;
    }
}