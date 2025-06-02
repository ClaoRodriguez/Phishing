/* ── Simple SPA nav ───────────────────────────── */
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    // Update active link
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    // Show target page
    const target = link.getAttribute('data-target');
    pages.forEach(p => p.classList.toggle('active', p.id === target));
  });
});

/* ── Synthetic data & dashboard charts ────────── */
function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function generateAlertSeries() { return Array.from({ length: 24 }, () => rand(5, 35)); }
// KPI update
function updateKPIs(totalAlerts) {
  document.getElementById('kpi-total').textContent = totalAlerts;
  document.getElementById('kpi-auto').textContent = `${rand(45,70)} %`;
}

// Charts init
const alertsCtx = document.getElementById('alertsChart').getContext('2d');
const severityCtx = document.getElementById('severityChart').getContext('2d');
let alertsChart, severityChart;
function drawDashboardCharts() {
  const alertData = generateAlertSeries();
  alertsChart && alertsChart.destroy();
  severityChart && severityChart.destroy();
  alertsChart = new Chart(alertsCtx, {
    type: 'line',
    data: { labels: Array.from({length:24},(_,i)=>`${i}h`), datasets: [{ data: alertData, fill:true, tension:0.4, backgroundColor:'rgba(47,84,235,0.15)', borderColor:'rgba(47,84,235,1)', borderWidth:2 }] },
    options: { scales:{ y:{ beginAtZero:true } }, plugins:{ legend:{display:false} } }
  });
  severityChart = new Chart(severityCtx, {
    type:'doughnut',
    data:{ labels:['Crítica','Alta','Media','Baja'], datasets:[{ data:[14,57,92,75], backgroundColor:['#d62f36','#ff7867','#ffd666','#8c8c8c'], borderWidth:0 }] },
    options:{ plugins:{legend:{position:'bottom'}}, cutout:'55%'}
  });
  updateKPIs(alertData.reduce((a,b)=>a+b,0));
}
drawDashboardCharts();
document.getElementById('refreshBtn').addEventListener('click', drawDashboardCharts);

/* ── Coverage chart on Coverage page ─────────── */
const coverageCtx = document.getElementById('coverageChart').getContext('2d');
new Chart(coverageCtx, {
  type:'bar',
  data:{ labels:['Correo','Web','Endpoint','Red'], datasets:[{ label:'Reglas', data:[36, 28, 42, 18], backgroundColor:'rgba(47,84,235,0.7)' }] },
  options:{ plugins:{legend:{display:false}}, scales:{ y:{ beginAtZero:true } } }
});
