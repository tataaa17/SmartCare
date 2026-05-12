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