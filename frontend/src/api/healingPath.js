// ─── AI API — calls your secure Node.js backend → OpenAI ─────────────────────
export async function generateHealingPath(answers) {
  const response = await fetch("http://localhost:3001/api/healing-path", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      answers: `You are a compassionate healing coach for people going through separation or divorce. Based on these questionnaire answers, provide a brief emotional assessment and personalized healing path.

Answers:
1. Time since separation: ${answers[0]}
2. Biggest challenge: ${answers[1]}
3. Support system: ${answers[2]}
4. Current emotional state: ${answers[3]}
5. Healing goals: ${answers[4]}
6. Self-care practices: ${answers[5]}

Respond ONLY in this exact JSON format (no markdown, no backticks):
{
  "summary": "2-3 warm, empathetic sentences about their situation",
  "phase": "one of: Stabilizing | Processing | Rebuilding | Thriving",
  "focusAreas": ["area1", "area2", "area3"],
  "recommendedEvent": "one specific event name from: Inner Peace Workshop | Co-Parenting with Grace | Rediscovering You | Moving Forward Together | Healing Through Grief",
  "insight": "one personalized encouraging insight sentence",
  "nextStep": "one concrete action they can take today"
}`
    })
  });
  const data = await response.json();
  const clean = data.content.replace(/```json|```/g, "").trim();
  return JSON.parse(clean);
}
