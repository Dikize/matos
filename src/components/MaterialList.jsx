import { useState } from 'react';
import { Edit2, Trash2, CheckCircle, Clock, AlertTriangle, Calendar } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function MaterialList({ onEdit }) {
  const { materials, categories, deleteMaterial, updateMaterialStatus } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const filteredMaterials = materials.filter(m => {
    const matchSearch = (m.productName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         m.client?.toLowerCase().includes(searchTerm.toLowerCase())) || false;
    const matchStatus = statusFilter ? m.status === statusFilter : true;
    const matchCategory = categoryFilter ? m.categoryId === categoryFilter : true;
    return matchSearch && matchStatus && matchCategory;
  });

  const handleDelete = (id) => {
    deleteMaterial(id);
    setDeleteConfirmId(null);
  };

  const getCategoryName = (id) => {
    const cat = categories.find(c => c.id === id);
    return cat ? cat.name : 'Non classé';
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    try {
      return format(parseISO(dateString), 'dd MMM yyyy', { locale: fr });
    } catch {
      return dateString;
    }
  };

  const getStatusLabel = (status) => {
    switch(status) {
      case 'A_RECUPERER': return 'À Récupérer';
      case 'VALIDE': return 'Validé';
      case 'STAND_BY': return 'Stand By';
      default: return status;
    }
  };

  return (
    <div>
      <div className="filters-bar">
        <input 
          type="text" 
          placeholder="Rechercher (Produit, Client)..." 
          className="form-control search-box"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select 
          className="form-control" 
          style={{width: 'auto'}}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Tous les statuts</option>
          <option value="A_RECUPERER">À Récupérer</option>
          <option value="VALIDE">Validé</option>
          <option value="STAND_BY">Stand By</option>
        </select>
        <select 
          className="form-control" 
          style={{width: 'auto'}}
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">Toutes les catégories</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      {filteredMaterials.length === 0 ? (
        <div className="empty-state">
          <PackageOpen size={48} opacity={0.5} style={{margin: '0 auto 1rem'}} />
          <h3>Aucun matériel trouvé</h3>
          <p>Essayez de modifier vos filtres ou ajoutez un nouveau matériel.</p>
        </div>
      ) : (
        <div className="materials-grid">
          {filteredMaterials.map(material => (
            <div key={material.id} className="glass-panel material-card">
              <div className="material-card-header">
                <div>
                  <div className="material-title">{material.productName || 'Sans nom'} (x{material.quantity})</div>
                  {material.client && <div className="material-client">Client: {material.client}</div>}
                </div>
                <div className={`status-badge ${material.status}`}>
                  {getStatusLabel(material.status)}
                </div>
              </div>

              <div className="material-details">
                <div className="detail-row">
                  <span className="detail-label">Catégorie:</span>
                  <span>{getCategoryName(material.categoryId)}</span>
                </div>
                {material.expectedRecoveryDate && (
                  <div className="detail-row">
                    <span className="detail-label"><Calendar size={14} style={{display:'inline', marginRight:4}}/>Date prévue:</span>
                    <span>{formatDate(material.expectedRecoveryDate)}</span>
                  </div>
                )}
                {material.receptionDate && (
                  <div className="detail-row">
                    <span className="detail-label"><Calendar size={14} style={{display:'inline', marginRight:4}}/>Reçu le:</span>
                    <span>{formatDate(material.receptionDate)}</span>
                  </div>
                )}
              </div>

              <div className="material-actions">
                {material.status === 'A_RECUPERER' && (
                  <button 
                    title="Valider" 
                    className="btn-icon" 
                    onClick={() => updateMaterialStatus(material.id, 'VALIDE')}
                  >
                    <CheckCircle size={18} />
                  </button>
                )}
                {material.status !== 'STAND_BY' && (
                  <button 
                    title="Stand By" 
                    className="btn-icon" 
                    onClick={() => updateMaterialStatus(material.id, 'STAND_BY')}
                  >
                    <Clock size={18} />
                  </button>
                )}
                <button 
                  title="Modifier" 
                  className="btn-icon" 
                  onClick={() => onEdit(material.id)}
                >
                  <Edit2 size={18} />
                </button>
                <button 
                  title="Supprimer" 
                  className="btn-icon danger" 
                  onClick={() => setDeleteConfirmId(material.id)}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="modal-overlay">
          <div className="glass-panel modal-content">
            <h3 style={{marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
              <AlertTriangle color="var(--warning-color)" /> Confirmation
            </h3>
            <p style={{marginBottom: '1.5rem', color: 'var(--text-secondary)'}}>
              Êtes-vous sûr de vouloir supprimer ce matériel ? Cette action est irréversible.
            </p>
            <div className="flex-between">
              <button className="btn" onClick={() => setDeleteConfirmId(null)}>Annuler</button>
              <button className="btn btn-danger" onClick={() => handleDelete(deleteConfirmId)}>Supprimer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Ensure PackageOpen is imported if we use empty state
import { PackageOpen } from 'lucide-react';
