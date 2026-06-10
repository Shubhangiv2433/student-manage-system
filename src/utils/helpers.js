// Generic helper utilities used across the app

// Generate a new unique student ID
export const generateStudentId = (existing = []) => {
  const nums = existing
    .map((s) => parseInt(String(s.id).replace(/\D/g, ""), 10))
    .filter((n) => !isNaN(n));
  const next = (nums.length ? Math.max(...nums) : 1000) + 1;
  return `STU-${next}`;
};

// Initials from a full name for avatar circles
export const getInitials = (name = "") => {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() || "")
    .join("");
};

// Deterministic gradient color from a string (name)
export const colorFromString = (str = "") => {
  const palettes = [
    "from-indigo-500 to-purple-500",
    "from-pink-500 to-rose-500",
    "from-emerald-500 to-teal-500",
    "from-amber-500 to-orange-500",
    "from-sky-500 to-blue-500",
    "from-fuchsia-500 to-pink-500",
  ];
  let hash = 0;
  for (let i = 0; i < str.length; i++)
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  return palettes[hash % palettes.length];
};

// Simple email validator
export const isValidEmail = (email = "") =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Simple phone validator (digits, spaces, plus, dash, min 7 digits)
export const isValidPhone = (phone = "") =>
  /[\d\s+\-()]{7,}/.test(phone);

// Format date string to readable form
export const formatDate = (iso) => {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
};
