/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { useUI } from '@/lib/state';

export default function Header() {
  const { toggleSidebar } = useUI();

  return (
    <header>
      <div className="header-left">
        <div className="logo">
          <span className="icon" style={{ fontSize: '28px', color: 'var(--accent-primary)' }}>
            graphic_eq
          </span>
          <h1>TTS Studio</h1>
        </div>
        <p>
          Craft lifelike voice experiences with Eburon's next-generation audio
          models.
        </p>
      </div>
      <div className="header-right">
        <button
          className="settings-button"
          onClick={toggleSidebar}
          aria-label="Settings"
        >
          <span className="icon">tune</span>
        </button>
      </div>
    </header>
  );
}