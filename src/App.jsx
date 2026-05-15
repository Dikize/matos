import { useState } from 'react';
import { PackageOpen, LayoutDashboard, PlusCircle, Settings as SettingsIcon, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { useAppContext } from './context/AppContext';
import MaterialList from './components/MaterialList';
import MaterialForm from './components/MaterialForm';
import Settings from './components/Settings';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [editingMaterialId, setEditingMaterialId] = useState(null);
  const { materials, notifications } = useAppContext();

  const handleEdit = (id) => {
    setEditingMaterialId(id);
    setCurrentView('form');
  };

  const handleAddNew = () => {
    setEditingMaterialId(null);
    setCurrentView('form');
  };

  return (
    <div className="app-container">
      <header className="glass-panel header">
        <h1><PackageOpen size={28} /> Matos </h1>
        <nav className="nav-links">
          <button 
            className={`nav-btn ${currentView === 'dashboard' ? 'active' : ''}`}
            onClick={() => setCurrentView('dashboard')}
          >
            <LayoutDashboard size={20} /> Tableau de bord
          </button>
          <button 
            className={`nav-btn ${currentView === 'form' ? 'active' : ''}`}
            onClick={handleAddNew}
          >
            <PlusCircle size={20} /> Nouveau
          </button>
          <button 
            className={`nav-btn ${currentView === 'settings' ? 'active' : ''}`}
            onClick={() => setCurrentView('settings')}
          >
            <SettingsIcon size={20} /> Paramètres
          </button>
        </nav>
      </header>

      {currentView === 'dashboard' && (
        <>
          <div className="dashboard-counters">
            <div className="glass-panel counter-card">
              <PackageOpen className="icon" />
              <div className="counter-value">{materials.length}</div>
              <div className="counter-label">Total Matériels</div>
            </div>
            <div className="glass-panel counter-card status-a-recuperer">
              <Clock className="icon" />
              <div className="counter-value">
                {materials.filter(m => m.status === 'A_RECUPERER').length}
              </div>
              <div className="counter-label">À Récupérer</div>
            </div>
            <div className="glass-panel counter-card status-valide">
              <CheckCircle className="icon" />
              <div className="counter-value">
                {materials.filter(m => m.status === 'VALIDE').length}
              </div>
              <div className="counter-label">Validé</div>
            </div>
            <div className="glass-panel counter-card status-stand-by">
              <AlertTriangle className="icon" />
              <div className="counter-value">
                {materials.filter(m => m.status === 'STAND_BY').length}
              </div>
              <div className="counter-label">Stand By</div>
            </div>
          </div>

          <div className="glass-panel">
            <MaterialList onEdit={handleEdit} />
          </div>
        </>
      )}

      {currentView === 'form' && (
        <div className="glass-panel">
          <MaterialForm 
            materialId={editingMaterialId} 
            onSuccess={() => setCurrentView('dashboard')}
            onCancel={() => setCurrentView('dashboard')}
          />
        </div>
      )}

      {currentView === 'settings' && (
        <div className="glass-panel">
          <Settings />
        </div>
      )}

      <div className="notifications-container">
        {notifications.map((notif) => (
          <div key={notif.id} className={`notification ${notif.type}`}>
            {notif.type === 'success' && <CheckCircle size={20} />}
            {notif.type === 'error' && <AlertTriangle size={20} />}
            {notif.type === 'info' && <PackageOpen size={20} />}
            {notif.message}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
