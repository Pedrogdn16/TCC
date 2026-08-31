/* =========================================================
   EXOESQUELETOS ROBÓTICOS — SCRIPT
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------- MOBILE MENU ---------------- */
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');

  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuToggle.classList.toggle('open', isOpen);
    menuToggle.setAttribute('aria-expanded', isOpen);
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      menuToggle.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------------- SCROLL SPY (active nav link) ---------------- */
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = Array.from(navLinks)
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = '#' + entry.target.id;
        navLinks.forEach(l => l.classList.toggle('active-link', l.getAttribute('href') === id));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  sections.forEach(sec => spyObserver.observe(sec));

  /* ---------------- FADE-IN ON SCROLL ---------------- */
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

  /* ---------------- BACK TO TOP ---------------- */
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('show', window.scrollY > 600);
  });
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* =========================================================
     TIMELINE — HISTÓRIA
     ========================================================= */
  const timelineData = [
    {
      year: '1965–1971',
      title: 'Hardiman (General Electric, EUA)',
      text: 'Considerado o primeiro exoesqueleto motorizado de corpo inteiro. Foi projetado para permitir que o usuário levantasse cargas de até 680 kg, mas o projeto enfrentou sérios problemas de controle e nunca foi totalmente testado com uma pessoa dentro.',
      importance: 'Marco fundador: provou o conceito de "amplificação" humana por máquina, mesmo sem sucesso prático completo.'
    },
    {
      year: 'Anos 1960–70',
      title: 'Primeiros exoesqueletos de marcha',
      text: 'Pesquisas iniciais sobre exoesqueletos voltados à assistência da marcha foram conduzidas no Instituto Mihajlo Pupin (Sérvia) no fim dos anos 1960 e na Universidade de Wisconsin-Madison (EUA) no início dos anos 1970.',
      importance: 'Ampliou o foco da tecnologia da força bruta industrial para a assistência à mobilidade humana.'
    },
    {
      year: '1997',
      title: 'Início do desenvolvimento do HAL',
      text: 'O professor Yoshiyuki Sankai, da Universidade de Tsukuba (Japão), começou a desenvolver o HAL (Hybrid Assistive Limb), um exoesqueleto voltado à reabilitação e ao suporte de mobilidade.',
      importance: 'Introduziu o uso de sinais bioelétricos (EMG) para detectar a intenção de movimento do usuário.'
    },
    {
      year: '2003–2004',
      title: 'BLEEX (UC Berkeley, EUA)',
      text: 'O Berkeley Lower Extremity Exoskeleton foi apresentado como o primeiro exoesqueleto de membros inferiores energeticamente autônomo, capaz de carregar cargas caminhando sem cabos externos de energia. O projeto foi financiado pela agência DARPA.',
      importance: 'Demonstrou viabilidade prática de exoesqueletos autônomos fora do laboratório.'
    },
    {
      year: '2004',
      title: 'Fundação da Cyberdyne',
      text: 'A empresa japonesa Cyberdyne foi fundada para comercializar o exoesqueleto HAL, iniciando a transição da tecnologia de exoesqueletos do ambiente acadêmico para o mercado.',
      importance: 'Início da comercialização em larga escala de exoesqueletos para uso médico.'
    },
    {
      year: '2013',
      title: 'Certificação global do HAL',
      text: 'O sistema HAL tornou-se o primeiro exoesqueleto motorizado a receber certificação global de segurança, e depois recebeu certificação da União Europeia como tratamento médico não cirúrgico.',
      importance: 'Validou os exoesqueletos como dispositivos médicos seguros e regulamentados.'
    },
    {
      year: '2014',
      title: 'ReWalk recebe aprovação da FDA',
      text: 'O exoesqueleto ReWalk, desenvolvido por Amit Goffer (Israel), tornou-se o primeiro exoesqueleto aprovado pela FDA (EUA) para uso pessoal domiciliar por pessoas com lesão medular.',
      importance: 'Levou os exoesqueletos da clínica para a vida cotidiana dos usuários.'
    },
    {
      year: 'Atualmente',
      title: 'Expansão para indústria e reabilitação',
      text: 'Exoesqueletos motorizados e passivos são hoje usados em hospitais, centros de reabilitação, fábricas e canteiros de obras ao redor do mundo, com empresas como Cyberdyne, Lifeward (ReWalk) e Ekso Bionics.',
      importance: 'Consolidação da tecnologia como ferramenta real de saúde e produtividade.'
    },
    {
      year: 'Futuro',
      title: 'Próxima geração',
      text: 'Pesquisas futuras buscam exoesqueletos mais leves, com inteligência artificial embarcada, sensores mais precisos e baterias de maior duração — tornando a tecnologia mais acessível.',
      importance: 'Direção que orienta a pesquisa e o desenvolvimento contemporâneo em robótica vestível.'
    }
  ];

  const timelinePointsEl = document.getElementById('timelinePoints');
  const timelineDetailEl = document.getElementById('timelineDetail');

  function renderTimelinePoints() {
    timelinePointsEl.innerHTML = timelineData.map((item, i) => `
      <button type="button" class="timeline-point${i === 0 ? ' active' : ''}" data-index="${i}">
        <span class="dot"></span>
        <span class="year">${item.year}</span>
      </button>
    `).join('');
  }

  function renderTimelineDetail(index) {
    const item = timelineData[index];
    timelineDetailEl.innerHTML = `
      <span class="td-year">${item.year}</span>
      <div>
        <h3>${item.title}</h3>
        <p>${item.text}</p>
        <div class="td-importance">${item.importance}</div>
      </div>
    `;
  }

  renderTimelinePoints();
  renderTimelineDetail(0);

  timelinePointsEl.addEventListener('click', (e) => {
    const btn = e.target.closest('.timeline-point');
    if (!btn) return;
    const index = Number(btn.dataset.index);
    document.querySelectorAll('.timeline-point').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    renderTimelineDetail(index);
  });

  /* =========================================================
     COMO FUNCIONA — HOTSPOTS
     ========================================================= */
  const howData = {
    sensor: {
      title: 'Sensor',
      text: 'Detecta movimentos, ângulos das articulações ou sinais elétricos musculares (EMG) do usuário, identificando a intenção de movimento antes ou durante sua execução.'
    },
    controlador: {
      title: 'Controlador',
      text: 'Processa as informações recebidas pelos sensores e decide quais comandos enviar aos motores, funcionando como o "cérebro" do exoesqueleto.'
    },
    bateria: {
      title: 'Bateria',
      text: 'Fornece a energia elétrica necessária para os motores, sensores e sistema de controle funcionarem, geralmente armazenada em um compartimento próximo ao tronco.'
    },
    motores: {
      title: 'Motores / Atuadores',
      text: 'Convertem energia elétrica (ou hidráulica) em força mecânica, auxiliando ativamente na realização dos movimentos das articulações.'
    },
    estrutura: {
      title: 'Estrutura Mecânica',
      text: 'É o "esqueleto" externo que acompanha o corpo do usuário, distribuindo forças e sustentando os demais componentes do sistema.'
    },
    software: {
      title: 'Software',
      text: 'Controla e coordena todo o funcionamento do sistema, interpretando dados dos sensores, ajustando parâmetros e garantindo a segurança dos movimentos.'
    }
  };

  const howTitle = document.getElementById('howTitle');
  const howText = document.getElementById('howText');

  document.querySelectorAll('.hotspot').forEach(spot => {
    spot.addEventListener('click', () => {
      document.querySelectorAll('.hotspot').forEach(s => s.classList.remove('active'));
      const part = spot.dataset.part;
      document.querySelectorAll(`.hotspot[data-part="${part}"]`).forEach(s => s.classList.add('active'));
      const data = howData[part];
      howTitle.textContent = data.title;
      howText.textContent = data.text;
    });
  });

  /* =========================================================
     COMPARAÇÃO — BARRAS ANIMADAS
     ========================================================= */
  const barFills = document.querySelectorAll('.bar-fill');
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.style.setProperty('--w-human', el.dataset.human + '%');
        el.style.setProperty('--w-exo', el.dataset.exo + '%');
        barObserver.unobserve(el);
      }
    });
  }, { threshold: 0.4 });
  barFills.forEach(el => barObserver.observe(el));

  /* =========================================================
     MONTE SEU EXOESQUELETO — BUILDER
     ========================================================= */
  const builderChoices = { objetivo: null, estrutura: null, alimentacao: null, sensores: [] };

  document.querySelectorAll('.builder-step').forEach(step => {
    const group = step.dataset.group;
    step.querySelectorAll('.option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const value = btn.dataset.value;
        if (group === 'sensores') {
          btn.classList.toggle('selected');
          if (builderChoices.sensores.includes(value)) {
            builderChoices.sensores = builderChoices.sensores.filter(v => v !== value);
          } else {
            builderChoices.sensores.push(value);
          }
        } else {
          step.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
          btn.classList.add('selected');
          builderChoices[group] = value;
        }
      });
    });
  });

  const builderResult = document.getElementById('builderResult');
  document.getElementById('builderSubmit').addEventListener('click', () => {
    if (!builderChoices.objetivo || !builderChoices.estrutura || !builderChoices.alimentacao || builderChoices.sensores.length === 0) {
      alert('Escolha ao menos uma opção em cada categoria antes de criar seu exoesqueleto.');
      return;
    }
    document.getElementById('resObjetivo').textContent = builderChoices.objetivo;
    document.getElementById('resEstrutura').textContent = builderChoices.estrutura;
    document.getElementById('resAlimentacao').textContent = builderChoices.alimentacao;
    document.getElementById('resSensores').textContent = builderChoices.sensores.join(' + ');
    builderResult.classList.remove('show');
    void builderResult.offsetWidth; /* restart animation */
    builderResult.classList.add('show');
    builderResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  /* =========================================================
     FORMULÁRIO — VALIDAÇÃO
     ========================================================= */
  const form = document.getElementById('opinionForm');
  const formSuccess = document.getElementById('formSuccess');

  function setError(fieldId, message) {
    const errEl = document.getElementById('err-' + fieldId);
    const group = errEl ? errEl.closest('.form-group') : null;
    if (errEl) errEl.textContent = message;
    if (group) group.classList.toggle('error', Boolean(message));
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const nome = form.nome.value.trim();
    if (nome.length < 2) { setError('nome', 'Informe seu nome.'); valid = false; }
    else setError('nome', '');

    const email = form.email.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) { setError('email', 'Informe um e-mail válido.'); valid = false; }
    else setError('email', '');

    const conhecia = form.querySelector('input[name="conhecia"]:checked');
    if (!conhecia) { setError('conhecia', 'Selecione uma opção.'); valid = false; }
    else setError('conhecia', '');

    const aplicacao = form.aplicacao.value;
    if (!aplicacao) { setError('aplicacao', 'Selecione uma aplicação.'); valid = false; }
    else setError('aplicacao', '');

    const opiniao = form.opiniao.value.trim();
    if (opiniao.length < 5) { setError('opiniao', 'Conte um pouco o que achou do projeto.'); valid = false; }
    else setError('opiniao', '');

    if (!valid) return;

    formSuccess.classList.add('show');
    form.reset();
    document.querySelectorAll('.option-btn.selected').forEach(b => {}); // no-op, unrelated form
    setTimeout(() => formSuccess.classList.remove('show'), 6000);
  });

  /* =========================================================
     EXOESQUELETOS NO MUNDO
     ========================================================= */
  const worldData = [
    {
      flag: '🇺🇸',
      country: 'Estados Unidos',
      project: 'Hardiman (General Electric) e BLEEX (UC Berkeley)',
      institution: 'General Electric · UC Berkeley · DARPA',
      text: 'Berço dos primeiros exoesqueletos motorizados. O Hardiman (1965) foi pioneiro na tentativa de amplificação de força humana, e décadas depois o BLEEX (2003–2004) demonstrou um exoesqueleto de pernas energeticamente autônomo, financiado pela agência de pesquisa militar DARPA.'
    },
    {
      flag: '🇯🇵',
      country: 'Japão',
      project: 'HAL — Hybrid Assistive Limb',
      institution: 'Universidade de Tsukuba · Cyberdyne',
      text: 'O Japão é referência mundial em exoesqueletos médicos com o HAL, desenvolvido pelo professor Yoshiyuki Sankai a partir de 1997 e comercializado pela empresa Cyberdyne desde 2004. O HAL foi um dos primeiros exoesqueletos a receber certificação internacional de segurança.'
    },
    {
      flag: '🇮🇱',
      country: 'Israel',
      project: 'ReWalk',
      institution: 'ReWalk Robotics (atual Lifeward)',
      text: 'O exoesqueleto ReWalk, criado pelo engenheiro israelense Amit Goffer, tornou-se em 2014 o primeiro exoesqueleto aprovado pela FDA dos Estados Unidos para uso pessoal domiciliar por pessoas com lesão medular.'
    }
  ];

  const worldCountriesEl = document.getElementById('worldCountries');
  const worldDetailEl = document.getElementById('worldDetail');

  worldCountriesEl.innerHTML = worldData.map((c, i) => `
    <button type="button" class="country-btn" data-index="${i}">
      <span class="country-flag">${c.flag}</span> ${c.country}
    </button>
  `).join('');

  worldCountriesEl.addEventListener('click', (e) => {
    const btn = e.target.closest('.country-btn');
    if (!btn) return;
    document.querySelectorAll('.country-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const data = worldData[Number(btn.dataset.index)];
    worldDetailEl.innerHTML = `
      <h3>${data.flag} ${data.country} — ${data.project}</h3>
      <span class="wd-inst">${data.institution}</span>
      <p>${data.text}</p>
    `;
  });

});
