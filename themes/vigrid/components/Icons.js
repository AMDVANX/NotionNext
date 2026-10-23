/** 极简线性图标，全部使用 currentColor，stroke 1.5 */

export const IconSearch = ({ className = '' }) => (
  <svg
    className={className}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='1.6'
    strokeLinecap='square'
    aria-hidden='true'>
    <circle cx='11' cy='11' r='6.5' />
    <path d='M16 16l4.5 4.5' />
  </svg>
)

export const IconHome = ({ className = '' }) => (
  <svg
    className={className}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='1.6'
    strokeLinecap='square'
    aria-hidden='true'>
    <path d='M3.5 10.5L12 3.5l8.5 7' />
    <path d='M5.5 9.5V20.5h13V9.5' />
  </svg>
)

export const IconArchive = ({ className = '' }) => (
  <svg
    className={className}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='1.6'
    strokeLinecap='square'
    aria-hidden='true'>
    <rect x='3.5' y='4.5' width='17' height='4' />
    <path d='M5 8.5v11h14v-11' />
    <path d='M9.5 12.5h5' />
  </svg>
)

export const IconGrid = ({ className = '' }) => (
  <svg
    className={className}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='1.6'
    strokeLinecap='square'
    aria-hidden='true'>
    <rect x='3.5' y='3.5' width='7' height='7' />
    <rect x='13.5' y='3.5' width='7' height='7' />
    <rect x='3.5' y='13.5' width='7' height='7' />
    <rect x='13.5' y='13.5' width='7' height='7' />
  </svg>
)

export const IconArrow = ({ className = '' }) => (
  <svg
    className={className}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='1.6'
    strokeLinecap='square'
    aria-hidden='true'>
    <path d='M4 12h15' />
    <path d='M13.5 6.5L19.5 12l-6 5.5' />
  </svg>
)
