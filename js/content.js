/* =====================================================================
   כל הטקסטים של האתר נמצאים כאן.
   ALL SITE COPY LIVES HERE — edit freely, no other file needs to change.

   • To change a challenge: edit its text in `challenges` below.
   • To add / remove challenges: just add / remove lines — the progress
     bar, counter and completion moment adapt automatically.
   ===================================================================== */

window.WEDDING = {
  couple: {
    bride: "ענבל",
    groom: "אלון",
    monogram: "I&A",
    date: "14.12.2026",
  },

  ticker: [
    "Official Notice",
    "Wedding Management",
    "Inbal & Alon",
    "14.12.2026",
    "Suspicious Scan Detected",
    "Please Return To The Dance Floor",
  ],

  letterhead: {
    org: "ההנהלה",
    sub: "חתונת ענבל ואלון · 14.12.2026",
    page1: "עמ׳ 1 / 2",
    page2: "עמ׳ 2 / 2",
  },

  /* ---------- Opening: official warning ---------- */
  notice: {
    label: "הודעה מההנהלה ⚠️",
    headline: "מה לעזאזל אתם עושים פה?! 🤨",
    body: "באמת עצרתם באמצע החתונה שלנו כדי לסרוק את החולצה של החתן?!",
    urgentTag: "דחוף",
    warning: "תחזרו לרחבה מיד! 🕺",
    twistLead: "רגע... בעצם מאוחר מדי.",
    twist: [
      "הסריקה שלכם כבר נרשמה במערכת, ונפתח לכם תיק בהנהלה.",
      "אבל אל דאגה, יש דרך לכפר על המעשים שלכם.",
    ],
    cta: "לדרכי הכפרה",
  },

  /* ---------- The case file ----------
     Special values: {caseNo} = random case number, {time} = scan time,
     {status} = live open/closed status.                                */
  caseFile: {
    tab: "תיק משמעתי",
    stampOpen: "תיק נפתח",
    stampClosed: "התיק נסגר",
    statusOpen: "פתוח",
    statusClosed: "נסגר ✓",
    fields: [
      { label: "מספר תיק", value: "{caseNo}" },
      { label: "החשוד/ה", value: "אורח/ת סקרן/ית מדי" },
      { label: "העבירה", value: "סריקת החולצה של החתן במקום לרקוד" },
      { label: "זירת האירוע", value: "בערך באמצע הרחבה" },
      { label: "שעת הסריקה", value: "{time}" },
      { label: "סטטוס", value: "{status}" },
    ],
  },

  /* ---------- Wedding Side Quest ---------- */
  quest: {
    emoji: "🎯",
    heading: "Wedding Side Quest",
    sub: "משימות צד לכפרה על העבירה",
    intro: [
      "לפניכם כמה משימות. סמנו ✓ על כל משימה שהצלחתם להשלים.",
      "אם תצליחו להשלים את כולן, אולי ההנהלה תסלח לכם והעבירה תימחק מהמערכת.",
    ],
    disclaimer: "בלי הבטחות. 😏",
    progressLabel: "מד כפרה",
    doneStamp: "בוצע",
    reset: "איפוס התיק ↺",
    resetConfirm: "בטוחים? לחצו שוב לאיפוס",
    closedBanner: "התיק שלכם נסגר ✓",
    closedButton: "להצגת צו החנינה",
  },

  /* ---------- The challenges (edit / add / remove freely) ---------- */
  challenges: [
    "צ׳ייסר עם החתן 🥃",
    "מגנט עם החתן והכלה 📸",
    "ריקוד מביך ברחבה.",
    "מצאו את ויקי והצליחו להוציא ממנו תמונה – בהצלחה.",
    "תמונה עם מישהו שהכרתם רק הערב.",
    "תמונה עם אביזר הרחבה הכי מטופש שמצאתם.",
    "סלפי עם החתן כשהוא כבר מזיע לגמרי.",
    "הרימו לחיים עם מישהו מהצד השני של המשפחה.",
    "לצעוק \"זה השיר שלי!\" – ולרקוד עד סוף השיר.",
    "להיכנס לתמונה קבוצתית ספונטנית – בלי להיות אלה שביקשו להצטלם.",
  ],

  /* ---------- Live verdict under the progress bar ----------
     Picked by how far along the guest is (first = nothing done yet). */
  verdicts: [
    "סטטוס: התיק פתוח. ההנהלה צופה בכם. 👀",
    "התחלה מבטיחה. ההנהלה עדיין חשדנית.",
    "נרשמה התקדמות בתיק. עורך הדין שלכם אופטימי.",
    "חצי דרך! ההנהלה שוקלת הקלה בעונש.",
    "השופטים מתחילים לחייך. אל תעצרו עכשיו.",
  ],
  verdictAlmost: "נשארה משימה אחת. כל הרחבה מסתכלת עליכם. 🥁",
  verdictDone: "כל המשימות הושלמו. ההנהלה מתכנסת לדיון...",

  /* ---------- Completion moment ---------- */
  pardon: {
    kicker: "צו חנינה רשמי",
    stamp: "בוטל",
    title: "🎉 התיק נסגר!",
    body: "לאחר בחינה מעמיקה של התנהגותכם ברחבה, ההנהלה החליטה למחוק את כל האישומים נגדכם.",
    free: "אתם רשאים להמשיך לחגוג עם ענבל ואלון!",
    brideRole: "הכלה",
    groomRole: "החתן",
    button: "חזרה לרחבה 🕺",
    note: "מומלץ לצלם מסך – למקרה שההנהלה תשכח. 📸",
  },

  footer: {
    joke: "ועכשיו באמת – תחזרו לרחבה. 🕺",
    madeWith: "Made with love & mild suspicion",
  },
};
