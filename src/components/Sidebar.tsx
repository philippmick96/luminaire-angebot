type Page = 'dashboard' | 'produkte' | 'wissen' | 'kurse' | 'angebot' | 'ziele' | 'verlauf'

interface SidebarProps {
  page: Page
  onNavigate: (p: Page) => void
  savedCount: number
  lightMode: boolean
  onToggleLight: () => void
}

const NAV_ITEMS: { id: Page; icon: string; label: string }[] = [
  { id: 'dashboard', icon: '⬡', label: 'Dashboard' },
  { id: 'produkte',  icon: '◈', label: 'Produkte' },
  { id: 'wissen',    icon: '◉', label: 'Wissensbasis' },
  { id: 'kurse',     icon: '▶', label: 'Kurse' },
  { id: 'angebot',   icon: '◻', label: 'Angebot / Rechnung' },
  { id: 'ziele',     icon: '◎', label: 'Jahresplan' },
  { id: 'verlauf',   icon: '▤', label: 'Verlauf' },
]

export default function Sidebar({ page, onNavigate, savedCount, lightMode, onToggleLight }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        lumin<span>AI</span>re
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            className={`sidebar-item${page === item.id ? ' active' : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
            {item.id === 'verlauf' && savedCount > 0 && (
              <span className="sidebar-badge">{savedCount}</span>
            )}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-company-info">
          <div className="sidebar-company-name">luminAIre</div>
          <div className="sidebar-company-sub">Saarbrücken</div>
        </div>
        <button
          className="sidebar-toggle"
          onClick={onToggleLight}
          title={lightMode ? 'Dunkelmodus' : 'Hellmodus'}
        >
          {lightMode ? '🌙' : '☀️'}
        </button>
      </div>
    </aside>
  )
}
