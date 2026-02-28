const form = document.getElementById("contentForm");

const brandNameEl = document.getElementById("brandName");
const offerTypeEl = document.getElementById("offerType");
const offerNameEl = document.getElementById("offerName");
const audienceEl = document.getElementById("audience");
const resultEl = document.getElementById("result");
const locationEl = document.getElementById("location");
const uspEl = document.getElementById("usp");
const proofEl = document.getElementById("proof");
const itemsEl = document.getElementById("items");
const faqsEl = document.getElementById("faqs");

const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const outputEl = document.getElementById("output");

function safeValue(value, fallback) {
  const cleaned = value.trim();
  return cleaned.length ? cleaned : fallback;
}

function lines(value) {
  return value
    .split("\n")
    .map(s => s.trim())
    .filter(Boolean);
}

function bullets(list, fallbackList) {
  const finalList = list.length ? list : fallbackList;
  return finalList.map(item => `- ${item}`).join("\n");
}

function offerTypeLabel(type) {
  const map = {
    service: "service",
    product: "product",
    digital: "digital product",
    coaching: "coaching",
    subscription: "subscription",
    other: "offer"
  };
  return map[type] || "offer";
}

function buildDraft(data) {
  const typeLabel = offerTypeLabel(data.offerType);

  const defaultItems = [
    `Core ${typeLabel} / package`,
    `Premium ${typeLabel} / package`,
    `Support / follow-up`
  ];

  const defaultFaqs = [
    "How much does it cost?",
    "How do I get started?",
    "What’s included?",
    "How long does it take?"
  ];

  return `
WEBSITE DRAFT — ${data.brandName}

HOMEPAGE HERO
Headline: ${data.result} for ${data.audience}${data.location === "Online" ? "" : ` in ${data.location}`}
Subheading: ${data.usp}. ${data.proof ? `Trusted: ${data.proof}.` : "Clear communication. Reliable delivery."}
Primary CTA: Get started
Secondary CTA: View ${typeLabel}s

ONE-LINER (for header / footer)
${data.brandName} helps ${data.audience} get ${data.result}${data.location === "Online" ? " online" : ` in ${data.location}`}. ${data.usp}.

ABOUT (short)
At ${data.brandName}, we focus on outcomes — not fluff.
We work with ${data.audience} who want ${data.result}.
${data.usp}. ${data.proof ? `Proof: ${data.proof}.` : ""}

WHAT WE OFFER
Offer name: ${data.offerName}
Type: ${typeLabel}
Highlights:
- Designed for ${data.audience}
- Built to achieve: ${data.result}
- Simple process and clear next steps

SERVICES / PRODUCTS / PACKAGES
${bullets(data.items, defaultItems)}

WHY CHOOSE ${data.brandName.toUpperCase()}
- Clear communication and fast replies
- Professional, reliable delivery
- Simple onboarding process
- ${data.usp}

FAQ (draft questions)
${bullets(data.faqs, defaultFaqs)}

CALL TO ACTION (paste into your contact section)
Message us with:
1) What you need
2) Your timeline
3) Your location (or “Online”)
We’ll reply with next steps and a clear quote.

SEO META (starter)
Meta title: ${data.brandName} | ${data.offerName} for ${data.audience}
Meta description: ${data.brandName} helps ${data.audience} get ${data.result}. ${data.usp}. ${data.location === "Online" ? "Online services available." : `Serving ${data.location}.`} Contact us to get started.
`.trim();
}

generateBtn.addEventListener("click", () => {
  const data = {
    brandName: safeValue(brandNameEl.value, "Your Business"),
    offerType: offerTypeEl.value,
    offerName: safeValue(offerNameEl.value, "Your main offer"),
    audience: safeValue(audienceEl.value, "ideal customers"),
    result: safeValue(resultEl.value, "a clear result"),
    location: safeValue(locationEl.value, "Online"),
    usp: safeValue(uspEl.value, "quality work and great service"),
    proof: proofEl.value.trim(),
    items: lines(itemsEl.value),
    faqs: lines(faqsEl.value)
  };

  outputEl.textContent = buildDraft(data);
  copyBtn.disabled = false;
});

copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(outputEl.textContent);
    copyBtn.textContent = "Copied!";
    setTimeout(() => (copyBtn.textContent = "Copy Draft"), 900);
  } catch {
    alert("Copy failed. Try selecting the text and copying manually.");
  }
});

form.addEventListener("reset", () => {
  outputEl.textContent = "Click “Generate Draft” to create content…";
  copyBtn.disabled = true;
  copyBtn.textContent = "Copy Draft";
});
