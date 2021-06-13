interface LogoProps {
  size: number | string
  color: string
  style?: React.CSSProperties
  onClick?: () => void
}

const Logo = ({ size = 64, color = '#333', style, onClick }: LogoProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ isolation: 'isolate', ...style }}
      onClick={onClick}
      width={size}
      height={size}
      viewBox="0 0 64 64"
    >
      <defs>
        <clipPath id="_clipPath_1dWUucLdF6YXrq5ZQ9RhGm6B5j7lF63O">
          <path d="M0 0H64V64H0z" />
        </clipPath>
      </defs>
      <g clipPath="url(#_clipPath_1dWUucLdF6YXrq5ZQ9RhGm6B5j7lF63O)">
        <path
          fill={color}
          d="M56.586 10.327q.512.961.608 1.729.096.768.096 2.241v35.534q0 4.418-2.433 5.186-1.216.384-3.073.384t-2.945-.32q-1.089-.32-1.665-.768-.576-.448-.896-1.281-.321-1.088-.321-3.329V28.255q-1.6 1.984-4.673 6.306-3.074 4.322-3.906 5.41-.832 1.089-1.152 1.505-.32.416-1.569 1.152-1.248.736-2.689.736t-2.625-.672q-1.185-.672-1.697-1.312l-.512-.705q-1.28-1.6-5.058-6.818-3.777-5.218-4.098-5.602v21.576q0 1.473-.096 2.209t-.608 1.633q-.96 1.728-4.994 1.728-3.905 0-4.866-1.728-.512-.897-.608-1.665-.096-.768-.096-2.305V14.169q0-1.473.096-2.209t.608-1.697q.961-1.664 4.994-1.664 1.729 0 2.977.416 1.249.416 1.633.864l.384.384 14.534 19.08Q42.82 14.937 46.47 10.327q1.088-1.728 5.154-1.728 4.065 0 4.962 1.728z"
        />
      </g>
    </svg>
  )
}

export default Logo
