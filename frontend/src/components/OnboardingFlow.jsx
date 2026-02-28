import { useState } from "react";
import { generateHealingPath } from "../api/healingPath";

const QUESTIONS = [
  {
    text: "How long ago did your separation or divorce occur?",
    options: ["Less than 3 months ago", "3–6 months ago", "6–12 months ago", "1–2 years ago", "More than 2 years ago"],
  },
  {
    text: "What feels like your biggest challenge right now?",
    options: ["Managing overwhelming emotions", "Co-parenting and family dynamics", "Financial stress and uncertainty", "Loneliness and loss of identity", "Rebuilding my social life"],
  },
  {
    text: "How would you describe your current support system?",
    options: ["I feel very alone — limited support", "A few close people but not enough", "I have a decent support network", "I'm well-supported but need more", "I'm looking for professional guidance"],
  },
  {
    text: "In one word, how do you feel emotionally most days?",
    type: "text",
    placeholder: "e.g., anxious, hopeful, numb, exhausted...",
  },
  {
    text: "What's your main hope for your healing journey?",
    options: ["Find inner peace and calm", "Rebuild confidence and self-worth", "Learn healthy co-parenting", "Open to love again someday", "Rediscover purpose and joy"],
  },
  {
    text: "What self-care practices do you already use, if any?",
    options: ["Journaling or reflection", "Exercise or movement", "Therapy or counseling", "Spiritual practice", "Nothing yet — I'm just starting"],
  },
];

export default function OnboardingFlow({ onComplete, userName }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(Array(6).fill(""));
  const [generating, setGenerating] = useState(false);
  const [genStatus, setGenStatus] = useState("Reflecting on your answers...");

  const q = QUESTIONS[step];
  const progress = (step / QUESTIONS.length) * 100;
  const canNext = answers[step].trim().length > 0;

  const handleSelect = (val) => {
    const updated = [...answers];
    updated[step] = val;
    setAnswers(updated);
  };

  const handleNext = async () => {
    if (step < QUESTIONS.length - 1) { setStep(s => s + 1); return; }

    setGenerating(true);
    const statuses = ["Reflecting on your answers...", "Understanding your journey...", "Crafting your healing path...", "Almost ready..."];
    let i = 0;
    const interval = setInterval(() => { i = (i + 1) % statuses.length; setGenStatus(statuses[i]); }, 2000);

    try {
      const data = await generateHealingPath(answers);
      clearInterval(interval);
      onComplete(data);
    } catch (e) {
      clearInterval(interval);
      // Fallback if API fails
      onComplete({
        summary: `Thank you for sharing, ${userName || "friend"}. Your courage in taking this step is the beginning of everything. Based on your responses, it's clear you're carrying a lot — and you don't have to carry it alone.`,
        phase: "Processing",
        focusAreas: ["Emotional regulation", "Building support systems", "Rediscovering identity"],
        recommendedEvent: "Inner Peace Workshop",
        insight: "Healing is not linear, but every honest step forward — even a small one — counts deeply.",
        nextStep: "Set aside 10 minutes today for quiet reflection with a journal."
      });
    }
  };

  if (generating) {
    return (
      <div className="onboarding-overlay">
        <div className="onboarding-card generating">
          <div className="spinner" />
          <h2 className="gen-title">Creating your healing path</h2>
          <p className="gen-sub">{genStatus}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="onboarding-overlay">
      <div className="onboarding-card">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="q-step">Question {step + 1} of {QUESTIONS.length}</div>
        <h2 className="q-text">{q.text}</h2>

        {q.type === "text" ? (
          <textarea
            className="q-textarea"
            placeholder={q.placeholder}
            value={answers[step]}
            onChange={e => handleSelect(e.target.value)}
          />
        ) : (
          <div className="q-options">
            {q.options.map((opt, i) => (
              <div
                key={i}
                className={`q-option ${answers[step] === opt ? "selected" : ""}`}
                onClick={() => handleSelect(opt)}
              >
                {opt}
              </div>
            ))}
          </div>
        )}

        <div className="q-nav">
          <button
            className="q-back"
            onClick={() => setStep(s => Math.max(0, s - 1))}
            style={{ visibility: step === 0 ? "hidden" : "visible" }}
          >
            ← Back
          </button>
          <button className="q-next" onClick={handleNext} disabled={!canNext}>
            {step === QUESTIONS.length - 1 ? "Generate My Path ✨" : "Continue →"}
          </button>
        </div>
      </div>
    </div>
  );
}
