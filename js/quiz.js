const QUESTIONS = [
  {
    q: "How many bones are in the adult human body?",
    options: ["106", "206", "306", "406"],
    answer: 1,
    why: "Adults have 206 bones. Babies start with around 270, and many fuse as they grow."
  },
  {
    q: "Which chamber of the heart pumps blood to the whole body?",
    options: ["Right atrium", "Right ventricle", "Left atrium", "Left ventricle"],
    answer: 3,
    why: "The left ventricle has the thickest wall because it drives the systemic circuit."
  },
  {
    q: "Where does most nutrient absorption happen?",
    options: ["Stomach", "Small intestine", "Large intestine", "Oesophagus"],
    answer: 1,
    why: "Villi and microvilli in the small intestine give it roughly 30 m2 of absorbing surface."
  },
  {
    q: "What is the largest organ in the human body?",
    options: ["Liver", "Brain", "Skin", "Lungs"],
    answer: 2,
    why: "Skin covers about 1.5–2 m2 and is the heaviest single organ."
  },
  {
    q: "Which bone is the smallest in the body?",
    options: ["Stapes", "Patella", "Clavicle", "Mandible"],
    answer: 0,
    why: "The stapes in the middle ear is only about 3 mm long."
  },
  {
    q: "Roughly how many litres of blood does an adult have?",
    options: ["2", "5", "8", "12"],
    answer: 1,
    why: "An average adult holds about 4.5–5.5 litres of blood."
  },
  {
    q: "Which system produces hormones?",
    options: ["Lymphatic", "Endocrine", "Integumentary", "Skeletal"],
    answer: 1,
    why: "Endocrine glands such as the thyroid and adrenals release hormones into the blood."
  },
  {
    q: "What are the smallest blood vessels called?",
    options: ["Arteries", "Veins", "Capillaries", "Venules"],
    answer: 2,
    why: "Capillaries are one cell thick, which lets gases and nutrients pass into tissues."
  },
  {
    q: "Which structure filters blood to make urine?",
    options: ["Spleen", "Kidney", "Liver", "Pancreas"],
    answer: 1,
    why: "Each kidney contains about a million nephrons that filter roughly 180 litres a day."
  },
  {
    q: "What joins muscle to bone?",
    options: ["Ligament", "Tendon", "Cartilage", "Fascia"],
    answer: 1,
    why: "Tendons attach muscle to bone; ligaments attach bone to bone."
  }
];

const quizRoot = document.getElementById("quiz");

if (quizRoot) {
  let index = 0;
  let score = 0;

  function renderQuestion() {
    const item = QUESTIONS[index];
    const progress = (index / QUESTIONS.length) * 100;

    quizRoot.innerHTML = `
      <div class="quiz-top">
        <span>Question ${index + 1} of ${QUESTIONS.length}</span>
        <span>Score: ${score}</span>
      </div>
      <div class="bar"><span style="width:${progress}%"></span></div>
      <h2 class="quiz-q">${item.q}</h2>
      <div class="quiz-options">
        ${item.options.map((option, i) => `<button class="option" type="button" data-i="${i}">${option}</button>`).join("")}
      </div>
      <p class="quiz-feedback" id="feedback"></p>
      <button class="btn btn-primary" type="button" id="nextBtn" disabled>Next</button>
    `;

    const optionButtons = Array.from(quizRoot.querySelectorAll(".option"));
    const feedback = quizRoot.querySelector("#feedback");
    const nextBtn = quizRoot.querySelector("#nextBtn");

    optionButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const choice = Number(button.dataset.i);
        const isCorrect = choice === item.answer;
        if (isCorrect) score += 1;

        optionButtons.forEach((other) => {
          other.disabled = true;
          const otherIndex = Number(other.dataset.i);
          if (otherIndex === item.answer) other.classList.add("correct");
          else if (otherIndex === choice) other.classList.add("wrong");
        });

        feedback.innerHTML = `<strong>${isCorrect ? "Correct." : "Not quite."}</strong> ${item.why}`;
        const scoreLabel = quizRoot.querySelector(".quiz-top span:last-child");
        if (scoreLabel) scoreLabel.textContent = `Score: ${score}`;
        nextBtn.disabled = false;
        nextBtn.focus();
      });
    });

    nextBtn.addEventListener("click", () => {
      index += 1;
      if (index < QUESTIONS.length) renderQuestion();
      else renderResult();
    });
  }

  function renderResult() {
    const percent = Math.round((score / QUESTIONS.length) * 100);
    let verdict = "Keep reading — the pages are all there.";
    if (percent >= 90) verdict = "Outstanding. You know your anatomy.";
    else if (percent >= 70) verdict = "Strong result. A couple of details left.";
    else if (percent >= 50) verdict = "Solid start. Review the organ and skeleton pages.";

    quizRoot.innerHTML = `
      <div class="result">
        <p class="tag">Finished</p>
        <strong>${score} / ${QUESTIONS.length}</strong>
        <p class="lead" style="margin-inline:auto">${percent}% — ${verdict}</p>
        <button class="btn btn-primary" type="button" id="restartBtn">Try again</button>
        <p style="margin-top:1rem"><a class="btn btn-ghost" href="index.html">Back to home</a></p>
      </div>
    `;

    quizRoot.querySelector("#restartBtn").addEventListener("click", () => {
      index = 0;
      score = 0;
      renderQuestion();
    });
  }

  renderQuestion();
}