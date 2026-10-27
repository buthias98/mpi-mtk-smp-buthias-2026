
document.addEventListener('DOMContentLoaded', function(){
  document.querySelectorAll('[data-tabs]').forEach(function(group){
    var btns = group.querySelectorAll('.tab-btn');
    var panels = group.querySelectorAll('.tab-panel');
    btns.forEach(function(btn, i){
      btn.addEventListener('click', function(){
        btns.forEach(function(b){ b.setAttribute('aria-selected','false'); });
        panels.forEach(function(p){ p.classList.remove('active'); });
        btn.setAttribute('aria-selected','true');
        panels[i].classList.add('active');
      });
    });
  });
  document.querySelectorAll('.quiz').forEach(function(q){
    var fb = q.querySelector('.quiz-feedback');
    q.querySelectorAll('.quiz-btn').forEach(function(b){
      b.addEventListener('click', function(){
        var ok = b.getAttribute('data-correct') === 'true';
        fb.textContent = ok ? 'Benar. Bagus!' : 'Belum tepat. Baca pembahasannya di bawah tombol, lalu coba soal berikutnya.';
        fb.style.color = ok ? '#0a6b4a' : '#9b2c2c';
        q.querySelectorAll('.quiz-btn').forEach(function(x){ x.disabled = true; });
        b.style.fontWeight = '800';
      });
    });
  });
  document.querySelectorAll('.check').forEach(function(c){
    var btn = c.querySelector('.check-btn');
    var inp = c.querySelector('input');
    var fb = c.querySelector('.check-feedback');
    function cek(){
      var got = (inp.value || '').trim().replace(/\./g, '').replace(',', '.');
      var want = (inp.getAttribute('data-answer') || '').trim();
      fb.textContent = (got === want) ? 'Benar!' : 'Belum tepat, coba hitung sekali lagi dengan langkah yang runtut.';
      fb.style.color = (got === want) ? '#0a6b4a' : '#9b2c2c';
    }
    btn.addEventListener('click', cek);
    inp.addEventListener('keydown', function(e){ if(e.key === 'Enter'){ cek(); } });
  });
  function fmt(n){ return Number.isInteger(n) ? String(n) : n.toFixed(2); }
  function piFor(r){ return (r % 7 === 0) ? (22/7) : 3.14; }
  document.querySelectorAll('.explorer').forEach(function(ex){
    var op = ex.getAttribute('data-op');
    var out = ex.querySelector('.explorer-output');
    var inputs = ex.querySelectorAll('input, select');
    function render(){
      var vals = []; var rangeIdx = 0;
      inputs.forEach(function(el){
        var s = ex.querySelector('.val-a'); var s2 = ex.querySelector('.val-b');
        if(el.type === 'range'){
          if(rangeIdx === 0 && s) s.textContent = el.value;
          if(rangeIdx === 1 && s2) s2.textContent = el.value;
          rangeIdx++;
          vals.push(Number(el.value));
        } else if(el.tagName === 'SELECT'){ vals.push(el.value); }
      });
      if(op === 'add'){ out.textContent = vals[0] + ' + ' + vals[1] + ' = ' + (vals[0] + vals[1]); }
      else if(op === 'money'){ out.textContent = 'Sisa uang = Rp' + (vals[0] - vals[1]).toLocaleString('id-ID'); }
      else if(op === 'pythag'){ var c = Math.sqrt(vals[0]*vals[0] + vals[1]*vals[1]); out.textContent = vals[0] + '² + ' + vals[1] + '² = ' + (vals[0]*vals[0] + vals[1]*vals[1]) + ', jadi c = ' + fmt(c); }
      else if(op === 'plsv'){ out.textContent = '2x + 7 = ' + (2*vals[0] + 7) + ' (target 19; x = 6 memberi 19)'; }
      else if(op === 'ptlsv'){ out.textContent = '3x = ' + (3*vals[0]) + '; 3x < 21 adalah ' + ((3*vals[0] < 21) ? 'BENAR' : 'SALAH') + ' untuk x = ' + vals[0]; }
      else if(op === 'spldv'){ out.textContent = 'x + y = ' + (vals[0] + vals[1]) + ' (target 10); x + 2y = ' + (vals[0] + 2*vals[1]) + ' (target 14). ' + (((vals[0] + vals[1] === 10) && (vals[0] + 2*vals[1] === 14)) ? 'Kedua persamaan terpenuhi!' : 'Belum memenuhi kedua persamaan.'); }
      else if(op === 'cube'){ out.textContent = 'Luas permukaan = 6 × ' + vals[0] + '² = ' + (6*vals[0]*vals[0]) + ' cm²; Volume = ' + vals[0] + '³ = ' + (vals[0]*vals[0]*vals[0]) + ' cm³'; }
      else if(op === 'net'){ var map = {kubus: 'Kubus: 6 persegi.', limas: 'Limas segiempat: 1 persegi (alas) dan 4 segitiga (sisi tegak).', prisma: 'Prisma segitiga: 2 segitiga (alas dan tutup) dan 3 persegi panjang (sisi tegak).'}; out.textContent = map[vals[0]] || ''; }
      else if(op === 'pow'){ out.textContent = vals[0] + ' pangkat ' + vals[1] + ' = ' + Math.pow(vals[0], vals[1]); }
      else if(op === 'sqrt'){ var n = vals[0]; var r = Math.sqrt(n); out.textContent = '√' + n + ' ≈ ' + fmt(r) + (Number.isInteger(r) ? ' (bilangan kuadrat sempurna)' : ''); }
      else if(op === 'sci'){ var map = {'45000': '45.000 = 4,5 × 10⁴', '72000': '72.000 = 7,2 × 10⁴', '3200': '3.200 = 3,2 × 10³', 'kecil': '0,00045 = 4,5 × 10⁻⁴'}; out.textContent = map[vals[0]] || ''; }
      else if(op === 'pola'){ out.textContent = 'U' + vals[0] + ' = 3 × ' + vals[0] + ' − 1 = ' + (3*vals[0] - 1); }
      else if(op === 'fungsi'){ out.textContent = 'f(' + vals[0] + ') = 2 × ' + vals[0] + ' + 3 = ' + (2*vals[0] + 3); }
      else if(op === 'garis'){ out.textContent = 'y = ' + vals[0] + 'x + 2; untuk x = ' + vals[1] + ', y = ' + (vals[0]*vals[1] + 2) + '. Gradien = ' + vals[0]; }
      else if(op === 'sample'){ var map = {kelas: 'Populasi: seluruh siswa Kelas 8. Sampel: 30 siswa yang diambil datanya.', sekolah: 'Populasi: seluruh siswa sekolah. Sampel: 2 kelas yang diambil datanya.', rt: 'Populasi: seluruh warga RT. Sampel: 20 kepala keluarga yang diambil datanya.'}; out.textContent = map[vals[0]] || ''; }
      else if(op === 'datamean'){ var arr = [5,7,9,vals[0]].slice().sort(function(a,b){return a-b;}); var mean = (5+7+9+vals[0])/4; var median = (arr[1]+arr[2])/2; out.textContent = 'Data terurut: ' + arr.join(', ') + '. Mean = ' + fmt(mean) + '; Median = ' + fmt(median); }
      else if(op === 'lingkaran'){ var pi = piFor(vals[0]); out.textContent = 'Keliling = 2 × π × ' + vals[0] + ' ≈ ' + fmt(2*pi*vals[0]) + ' cm; Luas = π × ' + vals[0] + '² ≈ ' + fmt(pi*vals[0]*vals[0]) + ' cm²'; }
      else if(op === 'brsl'){ var bangun = inputs[0].value; var r = vals[1]; var t = vals[2]; var pi = piFor(r); if(bangun === 'tabung'){ out.textContent = 'Volume tabung = π × ' + r + '² × ' + t + ' ≈ ' + fmt(pi*r*r*t) + ' cm³'; } else if(bangun === 'kerucut'){ out.textContent = 'Volume kerucut = ⅓ × π × ' + r + '² × ' + t + ' ≈ ' + fmt((1/3)*pi*r*r*t) + ' cm³'; } else { out.textContent = 'Volume bola = ⁴⁄₃ × π × ' + r + '³ ≈ ' + fmt((4/3)*pi*r*r*r) + ' cm³ (tinggi tidak dipakai)'; } }
      else if(op === 'trans'){ out.textContent = 'Titik (2,3) ditranslasi (' + vals[0] + ',' + vals[1] + ') menjadi (' + (2+vals[0]) + ',' + (3+vals[1]) + ')'; }
      else if(op === 'ruangsampel'){ var map = {koin1: 'Ruang sampel 1 koin: {Angka, Gambar}, banyak anggota = 2.', koin2: 'Ruang sampel 2 koin: {AA, AG, GA, GG}, banyak anggota = 4.', dadu1: 'Ruang sampel 1 dadu: {1, 2, 3, 4, 5, 6}, banyak anggota = 6.', dadukoin: 'Ruang sampel 1 dadu dan 1 koin: 6 × 2 = 12 anggota.'}; out.textContent = map[vals[0]] || ''; }
      else if(op === 'harapan'){ out.textContent = 'Frekuensi harapan mata 6 = ' + vals[0] + ' × 1/6 = ' + (vals[0]/6); }
    }
    inputs.forEach(function(el){ el.addEventListener('input', render); el.addEventListener('change', render); });
    render();
  });
});

document.addEventListener('DOMContentLoaded', function(){
  function gcd(a,b){ return b === 0 ? a : gcd(b, a % b); }
  function fmt(n){ return Number.isInteger(n) ? String(n) : n.toFixed(2); }
  document.querySelectorAll('.explorer').forEach(function(ex){
    var op = ex.getAttribute('data-op');
    var news = ['rasional','rasio','aljabar','sudut','sebangun','kongruen','jenisdata','diagram'];
    if(news.indexOf(op) === -1) return;
    var out = ex.querySelector('.explorer-output');
    var inputs = ex.querySelectorAll('input, select');
    function render(){
      var vals = []; var rangeIdx = 0;
      inputs.forEach(function(el){
        var s = ex.querySelector('.val-a'); var s2 = ex.querySelector('.val-b');
        if(el.type === 'range'){
          if(rangeIdx === 0 && s) s.textContent = el.value;
          if(rangeIdx === 1 && s2) s2.textContent = el.value;
          rangeIdx++; vals.push(Number(el.value));
        } else if(el.tagName === 'SELECT'){ vals.push(el.value); }
      });
      if(op === 'rasional'){ var g = gcd(vals[0], vals[1]); out.textContent = vals[0] + '/' + vals[1] + ' = ' + fmt(vals[0]/vals[1]) + '; bentuk sederhana: ' + (vals[0]/g) + '/' + (vals[1]/g); }
      else if(op === 'rasio'){ var g2 = gcd(vals[0], vals[1]); out.textContent = 'Rasio ' + vals[0] + ' : ' + vals[1] + ' = ' + (vals[0]/g2) + ' : ' + (vals[1]/g2); }
      else if(op === 'aljabar'){ out.textContent = '3x + 2 untuk x = ' + vals[0] + ' adalah ' + (3*vals[0] + 2); }
      else if(op === 'sudut'){ var pel = 180 - vals[0]; var pen = vals[0] < 90 ? ('; penyikunya ' + (90 - vals[0]) + '°') : ' (tidak punya penyiku karena sudah 90° atau lebih)'; out.textContent = 'Pelurusnya ' + pel + '°' + pen; }
      else if(op === 'sebangun'){ out.textContent = 'Segitiga sebangun: 3 × ' + vals[0] + ' = ' + (3*vals[0]) + ', 4 × ' + vals[0] + ' = ' + (4*vals[0]) + ', 5 × ' + vals[0] + ' = ' + (5*vals[0]); }
      else if(op === 'kongruen'){ var map = {sss: 'SSS: ketiga sisi yang bersesuaian sama panjang, jadi segitiganya kongruen.', sas: 'SAS: dua sisi dan sudut apitnya sama, jadi segitiganya kongruen.', asa: 'ASA: dua sudut dan sisi apitnya sama, jadi segitiganya kongruen.', ssa: 'SSA: TIDAK cukup untuk menyatakan segitiga kongruen.'}; out.textContent = map[vals[0]] || ''; }
      else if(op === 'jenisdata'){ var map = {warna: 'Warna favorit: data kualitatif (kategori).', tinggi: 'Tinggi badan: data kuantitatif (hasil pengukuran).', jumlah: 'Jumlah saudara: data kuantitatif (hasil perhitungan).', hobi: 'Hobi: data kualitatif (kategori).'}; out.textContent = map[vals[0]] || ''; }
      else if(op === 'diagram'){ var pct = vals[0]/40*100; out.textContent = vals[0] + ' dari 40 siswa = ' + fmt(pct) + '%; sudut juringnya = ' + fmt(pct*3.6) + '°'; }
    }
    inputs.forEach(function(el){ el.addEventListener('input', render); el.addEventListener('change', render); });
    render();
  });
});

/* Perbaikan pembahasan kuis: sembunyikan dulu, tampilkan setelah menjawab */
document.addEventListener('DOMContentLoaded', function(){
  document.querySelectorAll('.quiz').forEach(function(q){
    var pemb = q.querySelector('.meta');
    if(pemb) pemb.style.display = 'none';
    q.querySelectorAll('.quiz-btn').forEach(function(b){
      b.addEventListener('click', function(){
        q.classList.add('answered');
        if(pemb) pemb.style.display = 'block';
      });
    });
  });
});
