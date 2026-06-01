export default function Logo({ size = 56 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background circle */}
      <circle cx="50" cy="50" r="48" fill="#0d2b1a" />
      <circle cx="50" cy="50" r="48" fill="url(#bgGrad)" opacity="0.6" />

      {/* Croc upper head */}
      <ellipse cx="50" cy="34" rx="28" ry="18" fill="#2d6a4f" />
      <ellipse cx="50" cy="30" rx="22" ry="12" fill="#40916c" />

      {/* Eyes */}
      <circle cx="34" cy="25" r="7.5" fill="#f0fdf4" />
      <circle cx="66" cy="25" r="7.5" fill="#f0fdf4" />
      <circle cx="35" cy="26" r="4.5" fill="#111827" />
      <circle cx="67" cy="26" r="4.5" fill="#111827" />
      {/* Eye glints */}
      <circle cx="36.5" cy="24.5" r="1.8" fill="white" />
      <circle cx="68.5" cy="24.5" r="1.8" fill="white" />

      {/* Nostrils */}
      <ellipse cx="44" cy="36" rx="3.5" ry="2.5" fill="#1a472a" />
      <ellipse cx="56" cy="36" rx="3.5" ry="2.5" fill="#1a472a" />

      {/* Croc teeth (upper jaw) */}
      <path d="M24 44 L27 50 L30 44" fill="white" />
      <path d="M34 44 L37 51 L40 44" fill="white" />
      <path d="M44 44 L47 51 L50 44" fill="white" />
      <path d="M54 44 L57 51 L60 44" fill="white" />
      <path d="M64 44 L67 50 L70 44" fill="white" />

      {/* Burger layers */}
      {/* Top bun */}
      <ellipse cx="50" cy="53" rx="22" ry="9" fill="#f97316" />
      <ellipse cx="50" cy="50" rx="22" ry="9" fill="#fb923c" />
      {/* Sesame seeds */}
      <ellipse cx="43" cy="47" rx="2.2" ry="1.2" fill="#fbbf24" transform="rotate(-20 43 47)" />
      <ellipse cx="50" cy="45.5" rx="2.2" ry="1.2" fill="#fbbf24" />
      <ellipse cx="57" cy="47" rx="2.2" ry="1.2" fill="#fbbf24" transform="rotate(20 57 47)" />

      {/* Lettuce */}
      <rect x="27" y="57" width="46" height="5" rx="2.5" fill="#4ade80" />
      {/* Cheese */}
      <rect x="29" y="61" width="42" height="3" rx="1.5" fill="#fbbf24" />
      {/* Patty */}
      <rect x="28" y="63" width="44" height="9" rx="4" fill="#78350f" />
      {/* Bottom bun */}
      <ellipse cx="50" cy="76" rx="22" ry="8" fill="#fbbf24" />
      <ellipse cx="50" cy="79" rx="22" ry="6" fill="#f59e0b" />

      <defs>
        <linearGradient id="bgGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#52b788" />
          <stop offset="100%" stopColor="#0d2b1a" />
        </linearGradient>
      </defs>
    </svg>
  )
}
