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
    LearningCycle: "A structured approach to lesson planning that includes stages such as recall, practice, and evaluation to support deep learning."
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
    background: #fff;
    color: #222;
    border: 1px solid #aaa;
    border-radius: 6px;
    padding: 10px;
    max-width: 300px;
    z-index: 9999;
    font-size: 0.9em;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    display: none;
  }
`;
document.head.appendChild(style);

// === Human-Readable Term Mapping ===
const readableTerms = {
    Gamification: "Gamification",
    Prompt: "Prompt",
    Algorithm: "Algorithm",
    Binary: "Binary",
    CanvaCode: "Canva Code",
    AIgenerated: "AI-generated",
    Tailwind: "Tailwind",
    Visualiser: "Visualiser",
    UnpluggedActivity: "Unplugged Activity",
    LearningCycle: "Learning Cycle"
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
