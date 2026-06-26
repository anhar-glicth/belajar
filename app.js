document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. ROUTER SPA (SINGLE PAGE APPLICATION)
  // ==========================================
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('.page-section');
  const navLinksList = document.getElementById('nav-links');
  const menuToggle = document.getElementById('menu-toggle');

  // Router logic using window hash
  function handleRoute() {
    const rawHash = window.location.hash;
    let pageId = rawHash.replace('#', '') || 'home';
    
    // Safety check if page container exists
    const targetSection = document.getElementById(`page-${pageId}`);
    if (!targetSection) {
      pageId = 'home';
    }

    // Update active nav-item and section
    sections.forEach(section => {
      section.classList.remove('active');
    });
    navItems.forEach(item => {
      item.classList.remove('active');
    });

    const activeSection = document.getElementById(`page-${pageId}`);
    if (activeSection) {
      activeSection.classList.add('active');
    }

    const activeNavItem = document.querySelector(`.nav-item[data-page="${pageId}"]`);
    if (activeNavItem) {
      activeNavItem.classList.add('active');
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Close mobile nav links if open
    navLinksList.classList.remove('active');
  }

  // Bind route trigger to hash change and load event
  window.addEventListener('hashchange', handleRoute);
  handleRoute(); // Run initially

  // Hero section buttons redirect
  const btnHeroStart = document.getElementById('btn-hero-start');
  const btnHeroPlay = document.getElementById('btn-hero-play');

  if (btnHeroStart) {
    btnHeroStart.addEventListener('click', () => {
      window.location.hash = 'materi';
    });
  }

  if (btnHeroPlay) {
    btnHeroPlay.addEventListener('click', () => {
      window.location.hash = 'playground';
    });
  }

  // Mobile menu toggle click event
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      navLinksList.classList.toggle('active');
    });
  }


  // ==========================================
  // 2. MATERI PAGE TAB NAVIGATION
  // ==========================================
  const tabButtons = document.querySelectorAll('.tab-btn');
  const materiPanes = document.querySelectorAll('.materi-pane');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      tabButtons.forEach(b => b.classList.remove('active'));
      materiPanes.forEach(pane => pane.classList.remove('active'));

      btn.classList.add('active');
      const activePane = document.getElementById(`pane-${targetTab}`);
      if (activePane) {
        activePane.classList.add('active');
      }
    });
  });

  // Predefined code snippets to load into playground when clicking "Coba Code"
  const codeSnippets = {
    html: [
      // Snippet 1
`<h1>Ini Judul Halaman</h1>
<p>Ini adalah sebuah paragraf teks pada halaman web Anda.</p>
<button style="padding: 8px 16px; background-color: #ff6b00; color: white; border: none; border-radius: 4px; cursor: pointer;">
  Tombol Oranye
</button>`,
      // Snippet 2
`<a href="https://google.com" target="_blank" style="color: #ff6b00; font-weight: bold; text-decoration: none;">
  Kunjungi Google (Membuka Tab Baru)
</a>
<br><br>
<img src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=300" alt="Gambar Gradasi" style="border-radius: 8px; width: 250px;">`,
      // Snippet 3
`<form onsubmit="alert('Form berhasil disubmit!'); return false;" style="background: #f8f9fa; padding: 20px; border-radius: 8px; border: 1px solid #dee2e6;">
  <div style="margin-bottom: 10px;">
    <label style="display: block; font-weight: bold; margin-bottom: 5px;">Nama Lengkap:</label>
    <input type="text" placeholder="Masukkan nama..." style="padding: 8px; width: 100%; border: 1px solid #ced4da; border-radius: 4px;">
  </div>
  <button type="submit" style="padding: 8px 16px; background: #ff6b00; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">
    Kirim Data
  </button>
</form>`
    ],
    css: [
      // Snippet 1
`/* HTML untuk dicoba: <h1>Halo Dunia</h1> */
h1 {
  color: #ff6b00;
  font-family: sans-serif;
  text-align: center;
  margin-top: 50px;
  text-shadow: 2px 2px 10px rgba(255, 107, 0, 0.2);
}`,
      // Snippet 2
`/* HTML untuk dicoba: <div class="card-box">Konten Box</div> */
.card-box {
  width: 250px;
  height: 150px;
  background-color: #151821;
  color: #ffffff;
  padding: 20px;
  border-left: 5px solid #ff6b00;
  margin: 40px auto;
  border-radius: 8px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.15);
  font-family: sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
}`,
      // Snippet 3
`/* HTML untuk dicoba:
<div class="flex-container">
  <div class="item">Item 1</div>
  <div class="item">Item 2</div>
  <div class="item">Item 3</div>
</div>
*/
.flex-container {
  display: flex;
  justify-content: space-around;
  background-color: #f1f3f5;
  padding: 20px;
  border-radius: 8px;
  font-family: sans-serif;
}
.item {
  background-color: #ff6b00;
  color: white;
  padding: 15px 25px;
  border-radius: 4px;
  font-weight: bold;
}`
    ],
    js: [
      // Snippet 1
`<h1 id="nama-siswa">Menunggu input...</h1>
<button onclick="ubahNama()" style="padding: 10px 20px; background: #ff6b00; color: white; border: none; border-radius: 5px; cursor: pointer;">
  Ubah Nama
</button>

<script>
function ubahNama() {
  const nama = prompt('Masukkan nama Anda:');
  if (nama) {
    document.getElementById('nama-siswa').innerText = 'Selamat Belajar, ' + nama + '!';
  }
}
</script>`,
      // Snippet 2
`<h1 id="title" style="font-family: sans-serif; color: #333; transition: 0.3s;">
  Hover teks ini atau klik tombol
</h1>
<button id="color-btn" style="padding: 10px; background: #333; color: white; border: none; border-radius: 4px; cursor: pointer;">
  Ubah Warna Teks
</button>

<script>
const title = document.getElementById('title');
const btn = document.getElementById('color-btn');

btn.addEventListener('click', () => {
  title.style.color = '#ff6b00';
  title.innerText = 'Warna Berubah ke Oranye!';
});
</script>`,
      // Snippet 3
`<div id="box" style="width: 100px; height: 100px; background: #ff6b00; border-radius: 8px; transition: transform 0.3s; margin: 50px auto; cursor: pointer;"></div>
<p style="text-align: center; font-family: sans-serif; color: #666;">Klik kotak di atas untuk memutarnya</p>

<script>
const box = document.getElementById('box');
let rotation = 0;

box.addEventListener('click', () => {
  rotation += 45;
  box.style.transform = 'rotate(' + rotation + 'deg)';
});
</script>`
    ]
  };

  // Bind Coba Code buttons
  const runButtons = document.querySelectorAll('.run-in-playground');
  runButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const codeType = btn.getAttribute('data-code-type');
      const codeIdx = parseInt(btn.getAttribute('data-code-index'));
      
      const snippet = codeSnippets[codeType][codeIdx];

      if (codeType === 'html' || codeType === 'js') {
        document.getElementById('editor-html').value = snippet;
        document.getElementById('editor-css').value = '/* Tulis CSS styling di sini jika diperlukan */';
      } else if (codeType === 'css') {
        // Set standard trial content for CSS in HTML editor
        let fallbackHtml = '<div class="card-box">Konten Box</div>';
        if (codeIdx === 0) {
          fallbackHtml = '<h1>Halo Dunia</h1>';
        } else if (codeIdx === 2) {
          fallbackHtml = `<div class="flex-container">\n  <div class="item">Item 1</div>\n  <div class="item">Item 2</div>\n  <div class="item">Item 3</div>\n</div>`;
        }
        document.getElementById('editor-html').value = fallbackHtml;
        document.getElementById('editor-css').value = snippet;
      }

      // Refresh editor panel tabs (make HTML active)
      editorTabBtns.forEach(t => t.classList.remove('active'));
      document.getElementById('tab-editor-html').classList.add('active');
      editorInputs.forEach(input => input.classList.remove('active'));
      document.getElementById('editor-html').classList.add('active');

      // Update the real preview frame
      updatePreview();

      // Go to playground page
      window.location.hash = 'playground';
    });
  });


  // ==========================================
  // 3. CODE PLAYGROUND LOGIC
  // ==========================================
  const editorTabBtns = document.querySelectorAll('.editor-tab-btn');
  const editorInputs = document.querySelectorAll('.code-input');
  const htmlEditor = document.getElementById('editor-html');
  const cssEditor = document.getElementById('editor-css');
  const previewFrame = document.getElementById('preview-frame');

  // Default Playground Content Setup
  const defaultHtml = `<div class="welcome-box">
  <h1>Selamat Datang di Playground!</h1>
  <p>Tulis HTML Anda di sini, dan hias dengan CSS di tab sebelah.</p>
  <button class="cool-button" onclick="alert('Hebat! JavaScript inline juga berjalan!')">Klik Saya</button>
</div>`;

  const defaultCss = `body {
  font-family: 'Outfit', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  background: #0f1115;
  color: white;
  text-align: center;
}
.welcome-box {
  padding: 40px;
  border-radius: 16px;
  background: #161920;
  box-shadow: 0 8px 32px rgba(255, 107, 0, 0.15);
  border: 1px solid rgba(255, 107, 0, 0.2);
  max-width: 400px;
}
h1 {
  color: #ff6b00;
  margin-top: 0;
  font-size: 1.8rem;
}
p {
  color: #9ba1b0;
  margin-bottom: 25px;
}
.cool-button {
  background: linear-gradient(135deg, #ff6b00 0%, #ff4500 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.95rem;
  box-shadow: 0 4px 15px rgba(255, 107, 0, 0.3);
  transition: transform 0.2s, box-shadow 0.2s;
}
.cool-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 107, 0, 0.4);
}`;

  if (htmlEditor && cssEditor) {
    htmlEditor.value = defaultHtml;
    cssEditor.value = defaultCss;
  }

  // Change editor tabs (HTML / CSS)
  editorTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetEditor = btn.getAttribute('data-editor');

      editorTabBtns.forEach(b => b.classList.remove('active'));
      editorInputs.forEach(input => input.classList.remove('active'));

      btn.classList.add('active');
      const activeTextarea = document.getElementById(`editor-${targetEditor}`);
      if (activeTextarea) {
        activeTextarea.classList.add('active');
        activeTextarea.focus();
      }
    });
  });

  // Compile editor values to render inside preview iframe
  function updatePreview() {
    if (!previewFrame) return;
    const htmlCode = htmlEditor.value;
    const cssCode = cssEditor.value;

    const iframeDoc = previewFrame.contentDocument || previewFrame.contentWindow.document;
    if (iframeDoc) {
      const finalCode = `
        <!DOCTYPE html>
        <html lang="id">
        <head>
          <meta charset="UTF-8">
          <style>
            ${cssCode}
          </style>
        </head>
        <body>
          ${htmlCode}
        </body>
        </html>
      `;
      iframeDoc.open();
      iframeDoc.write(finalCode);
      iframeDoc.close();
    }
  }

  // Setup event listeners on code inputs
  if (htmlEditor && cssEditor) {
    htmlEditor.addEventListener('input', updatePreview);
    cssEditor.addEventListener('input', updatePreview);
    updatePreview(); // Initial render on load
  }


  // ==========================================
  // 4. INTERACTIVE QUIZ ENGINE
  // ==========================================
  const quizData = [
    {
      question: "Apa kepanjangan dari HTML?",
      options: [
        "Hyper Text Markup Language",
        "Home Tool Markup Language",
        "Hyperlinks and Text Markup Language",
        "Hyper Tool Markup Language"
      ],
      correct: 0
    },
    {
      question: "Tag HTML mana yang digunakan untuk menghubungkan file CSS eksternal?",
      options: [
        "&lt;style&gt;",
        "&lt;link&gt;",
        "&lt;script&gt;",
        "&lt;css&gt;"
      ],
      correct: 1
    },
    {
      question: "Properti CSS mana yang digunakan untuk menebalkan teks?",
      options: [
        "font-style",
        "text-align",
        "font-weight",
        "text-style"
      ],
      correct: 2
    },
    {
      question: "Bagaimana cara menulis komentar di dalam file CSS?",
      options: [
        "// ini komentar //",
        "&lt;!-- ini komentar --&gt;",
        "/* ini komentar */",
        "# ini komentar"
      ],
      correct: 2
    },
    {
      question: "Manakah penulisan deklarasi variabel konstan yang benar di JavaScript?",
      options: [
        "const pi = 3.14;",
        "let pi = 3.14;",
        "var pi = 3.14;",
        "constant pi = 3.14;"
      ],
      correct: 0
    }
  ];

  let currentQuestionIndex = 0;
  let score = 0;
  let selectedOptionIdx = null;

  const quizActiveContainer = document.getElementById('quiz-active-container');
  const quizResultContainer = document.getElementById('quiz-result-container');
  const quizQNumText = document.getElementById('quiz-q-num');
  const quizQText = document.getElementById('quiz-q-text');
  const quizOptionsContainer = document.getElementById('quiz-options');
  const btnQuizNext = document.getElementById('btn-quiz-next');
  const quizProgressBar = document.getElementById('quiz-progress');
  const quizScoreBadge = document.getElementById('quiz-score-badge');
  const quizResultTitle = document.getElementById('quiz-result-title');
  const quizResultDesc = document.getElementById('quiz-result-desc');
  const quizResultIcon = document.getElementById('quiz-result-icon');
  const btnQuizRestart = document.getElementById('btn-quiz-restart');

  function loadQuestion() {
    selectedOptionIdx = null;
    btnQuizNext.disabled = true;

    // Load progress
    const totalQuestions = quizData.length;
    const progressPercent = (currentQuestionIndex / totalQuestions) * 100;
    quizProgressBar.style.width = `${progressPercent}%`;

    const currentQuiz = quizData[currentQuestionIndex];
    quizQNumText.innerText = `Pertanyaan ${currentQuestionIndex + 1} dari ${totalQuestions}`;
    quizQText.innerHTML = currentQuiz.question;

    // Load options
    quizOptionsContainer.innerHTML = '';
    currentQuiz.options.forEach((opt, idx) => {
      const optionEl = document.createElement('div');
      optionEl.className = 'quiz-option';
      optionEl.setAttribute('data-idx', idx);
      
      // Determine label letter
      const letter = String.fromCharCode(65 + idx); // A, B, C, D...
      optionEl.innerHTML = `<span style="color: #ff6b00; font-weight: 700; margin-right: 0.75rem;">${letter}.</span> ${opt}`;
      
      optionEl.addEventListener('click', () => {
        selectOption(idx, optionEl);
      });
      quizOptionsContainer.appendChild(optionEl);
    });
  }

  function selectOption(idx, optionEl) {
    // Remove selected state from all options
    const options = quizOptionsContainer.querySelectorAll('.quiz-option');
    options.forEach(opt => opt.classList.remove('selected'));

    // Highlight chosen option
    optionEl.classList.add('selected');
    selectedOptionIdx = idx;
    
    // Enable button
    btnQuizNext.disabled = false;
  }

  function handleQuizNext() {
    const currentQuiz = quizData[currentQuestionIndex];
    
    // Check score
    if (selectedOptionIdx === currentQuiz.correct) {
      score++;
    }

    currentQuestionIndex++;
    
    if (currentQuestionIndex < quizData.length) {
      loadQuestion();
    } else {
      showResults();
    }
  }

  function showResults() {
    quizProgressBar.style.width = '100%';
    quizActiveContainer.style.display = 'none';
    quizResultContainer.style.display = 'block';

    const maxScore = quizData.length;
    const scorePercent = Math.round((score / maxScore) * 100);
    
    quizScoreBadge.innerHTML = `${scorePercent}<span>/100</span>`;

    // Dynamic result based on score
    if (scorePercent === 100) {
      quizResultIcon.innerHTML = '<i class="fas fa-medal" style="color: #ffd700;"></i>';
      quizResultTitle.innerText = "Luar Biasa! Sempurna!";
      quizResultDesc.innerText = "Kamu menjawab semua pertanyaan dengan benar. Kembangkan terus bakat belajarmu!";
    } else if (scorePercent >= 60) {
      quizResultIcon.innerHTML = '<i class="fas fa-trophy" style="color: #ff6b00;"></i>';
      quizResultTitle.innerText = "Hebat! Kamu Lulus!";
      quizResultDesc.innerText = "Kamu sudah menguasai sebagian besar materi dasar. Tetap latihan dan tingkatkan terus!";
    } else {
      quizResultIcon.innerHTML = '<i class="fas fa-heart-broken" style="color: #ff5555;"></i>';
      quizResultTitle.innerText = "Jangan Menyerah!";
      quizResultDesc.innerText = "Nilaimu masih di bawah standar lulus. Baca kembali materi dan coba lagi!";
    }
  }

  function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    selectedOptionIdx = null;
    
    quizActiveContainer.style.display = 'block';
    quizResultContainer.style.display = 'none';
    
    loadQuestion();
  }

  if (btnQuizNext) {
    btnQuizNext.addEventListener('click', handleQuizNext);
  }

  if (btnQuizRestart) {
    btnQuizRestart.addEventListener('click', restartQuiz);
  }

  // Load first quiz question on DOM load
  if (quizQText) {
    loadQuestion();
  }


  // ==========================================
  // 5. CONTACT FORM SUBMISSION
  // ==========================================
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Show mock loading state
      const submitBtn = document.getElementById('btn-submit-form');
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';

      // Simulating network request
      setTimeout(() => {
        // Show success status
        formStatus.innerText = "Pesan Anda berhasil terkirim! Terima kasih telah menghubungi OrangeCode.";
        formStatus.className = "form-status success";
        
        // Reset form inputs
        contactForm.reset();
        
        // Reset button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;

        // Clear status alert after 5 seconds
        setTimeout(() => {
          formStatus.className = "form-status";
          formStatus.innerText = "";
        }, 5000);
      }, 1200);
    });
  }

});
