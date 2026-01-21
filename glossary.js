// === Glossary Data ===
const glossary = {
    Gamification: "Using game mechanics, such as competition and leaderboards, to improve pupil engagement.",
    Prompt: "A carefully written input or instruction given to an AI model to guide its response or output.",
    Algorithm: "A step-by-step set of instructions used to perform a specific task, especially by a computer.",
    Binary: "A number system using only 0s and 1s, fundamental to how computers represent and process data.",
    CanvaCode: "An AI-powered feature in Canva that allows users to generate interactive web apps through natural language prompts.",
    Tailwind: "A utility-first CSS framework used to quickly style web components and layouts.",
    Visualiser: "An interactive tool or widget that allows abstract concepts, such as sorting algorithms, to be seen in a visual, often animated, form.",
    UnpluggedActivity: "A teaching method that uses hands-on, offline activities to explain computing concepts without using a computer.",
    LearningCycle: "A structured approach to lesson planning that includes stages such as recall, practice, and evaluation to support deep learning.",
    LLM: "Large Language Model. A type of AI trained on vast amounts of text to generate human-like language (e.g., ChatGPT, Claude).",
    Hallucination: "When an AI model generates incorrect or nonsensical information confidently, often presenting it as fact.",
    CPD: "Continuing Professional Development. Learning activities that professionals engage in to develop their abilities and knowledge.",
    QTS: "Qualified Teacher Status. The accreditation required to teach in state-maintained schools in England and Wales.",
    Pedagogy: "The method and practice of teaching, especially as an academic subject or theoretical concept.",
    Scaffolding: "Instructional techniques used to move students progressively toward stronger understanding and ultimately greater independence in the learning process.",
    AdaptiveLearning: "A learning approach that uses technology to adjust the presentation of material based on a learner's performance in real-time.",
    ESL: "English as a Second Language. A program or method of teaching English to students whose primary language is not English.",
};

// === Style Injection ===
const style = document.createElement("style");
style.textContent = `
  .glossary-term {
    color: #7b3fe4;
    text-decoration: underline dotted;
    cursor: pointer;
    position: relative;
  }

  .glossary-popup {
    position: absolute;
    background: #ffffff;
    color: #222;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 12px 16px;
    max-width: 320px;
    z-index: 9999;
    font-size: 0.95em;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    line-height: 1.5;
    display: none;
    animation: fadeIn 0.2s ease-out;
    font-family: 'Segoe UI', sans-serif;
  }

  .glossary-popup::after {
    content: "";
    position: absolute;
    top: -8px;
    left: 20px;
    border-width: 8px;
    border-style: solid;
    border-color: transparent transparent #ffffff transparent;
    filter: drop-shadow(0 -1px 1px rgba(0,0,0,0.1));
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-5px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);

// === Human-Readable Term Mapping ===
const readableTerms = {
  Gamification: 'Gamification',
  Prompt: 'Prompt',
  Algorithm: 'Algorithm',
  Binary: 'Binary',
  CanvaCode: 'Canva Code',
  AIgenerated: 'AI-generated',
  Tailwind: 'Tailwind',
  Visualiser: 'Visualiser',
  UnpluggedActivity: 'Unplugged Activity',
  LearningCycle: 'Learning Cycle',
  // New terms added below
  LLM: 'LLM',
  Hallucination: 'Hallucination',
  CPD: 'CPD',
  QTS: 'QTS',
  Pedagogy: 'Pedagogy',
  Scaffolding: 'Scaffolding',
  AdaptiveLearning: 'Adaptive Learning',
  ESL: 'ESL',
};


// === Highlight Glossary Terms in <p> tags (excluding links) ===
function highlightGlossaryTerms() {
    const container = document.querySelector(".page_content");
    if (!container) return;

    const paragraphs = container.querySelectorAll("p");
    const regex = new RegExp("\\b(" + Object.values(readableTerms).join("|") + ")\\b", "gi");

    paragraphs.forEach(p => {
        const walker = document.createTreeWalker(p, NodeFilter.SHOW_TEXT, null, false);
        let node;
        const textNodes = [];

        while (node = walker.nextNode()) {
            // Skip text nodes that are inside <a> tags
            if (node.parentNode.closest('a')) continue;
            textNodes.push(node);
        }

        textNodes.forEach(textNode => {
            const match = textNode.nodeValue.match(regex);
            if (match) {
                const span = document.createElement("span");
                const html = textNode.nodeValue.replace(regex, matched => {
                    const termKey = Object.keys(readableTerms).find(
                        key => readableTerms[key].toLowerCase() === matched.toLowerCase()
                    );
                    return `<span class="glossary-term" data-term="${termKey}">${matched}</span>`;
                });
                span.innerHTML = html;
                textNode.parentNode.replaceChild(span, textNode);
            }
        });
    });
}

// === Popup Handling ===
const popup = document.createElement("div");
popup.className = "glossary-popup";
document.body.appendChild(popup);

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("glossary-term")) {
        const termKey = e.target.dataset.term;
        const definition = glossary[termKey];
        if (!definition) return;

        popup.textContent = definition;
        const rect = e.target.getBoundingClientRect();
        popup.style.left = `${rect.left + window.scrollX}px`;
        popup.style.top = `${rect.bottom + window.scrollY + 6}px`;
        popup.style.display = "block";
    } else {
        popup.style.display = "none";
    }
});

// === Initialize ===
document.addEventListener("DOMContentLoaded", highlightGlossaryTerms);
