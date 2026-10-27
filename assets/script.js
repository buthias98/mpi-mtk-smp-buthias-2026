
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
      var ok = got === want;
      fb.textContent = ok ? 'Benar!' : 'Belum tepat, coba hitung sekali lagi dengan langkah yang runtut.';
      fb.style.color = ok ? '#0a6b4a' : '#9b2c2c';
    }
    btn.addEventListener('click', cek);
    inp.addEventListener('keydown', function(e){ if(e.key === 'Enter'){ cek(); } });
  });
  function fmt(n){ return Number.isInteger(n) ? String(n) : n.toFixed(2); }
  document.querySelectorAll('.explorer').forEach(function(ex){
    var op = ex.getAttribute('data-op');
    var out = ex.querySelector('.explorer-output');
    var inputs = ex.querySelectorAll('input, select');
    function render(){
      var vals = [];
      inputs.forEach(function(el){
        var s = ex.querySelector('.val-a'); var s2 = ex.querySelector('.val-b');
        if(el.type === 'range'){
          if(vals.length === 0 && s) s.textContent = el.value;
          if(vals.length === 1 && s2) s2.textContent = el.value;
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
      else if(op === 'net'){
        var map = {kubus: 'Kubus: 6 persegi.', limas: 'Limas segiempat: 1 persegi (alas) dan 4 segitiga (sisi tegak).', prisma: 'Prisma segitiga: 2 segitiga (alas dan tutup) dan 3 persegi panjang (sisi tegak).'};
        out.textContent = map[vals[0]] || '';
      }
    }
    inputs.forEach(function(el){ el.addEventListener('input', render); el.addEventListener('change', render); });
    render();
  });
});
