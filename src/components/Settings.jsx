import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Plus, Trash2, Folder, Package } from 'lucide-react';

export default function Settings() {
  const { categories, addCategory, deleteCategory, products, addProduct, deleteProduct } = useAppContext();
  
  const [newCategoryName, setNewCategoryName] = useState('');
  
  const [newProductName, setNewProductName] = useState('');
  const [newProductCategoryId, setNewProductCategoryId] = useState('');

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    addCategory(newCategoryName.trim());
    setNewCategoryName('');
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProductName.trim() || !newProductCategoryId) return;
    addProduct(newProductName.trim(), newProductCategoryId);
    setNewProductName('');
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '2rem' }}>Paramètres de l'application</h2>

      <div className="settings-section glass-panel">
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Folder size={20} /> Gestion des Catégories
        </h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '0.9rem' }}>
          Créez des catégories pour classer vos matériels.
        </p>

        <form onSubmit={handleAddCategory} style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Nouvelle catégorie..."
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
          <button type="submit" className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>
            <Plus size={18} /> Ajouter
          </button>
        </form>

        <div className="item-list">
          {categories.length === 0 ? (
            <p className="empty-state" style={{ padding: '1rem' }}>Aucune catégorie configurée.</p>
          ) : (
            categories.map(cat => (
              <div key={cat.id} className="item-row">
                <span>{cat.name}</span>
                <button 
                  className="btn-icon danger" 
                  onClick={() => deleteCategory(cat.id)}
                  title="Supprimer la catégorie"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="settings-section glass-panel">
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Package size={20} /> Gestion des Produits
        </h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '0.9rem' }}>
          Associez des produits réutilisables à des catégories pour faciliter la saisie.
        </p>

        <form onSubmit={handleAddProduct} style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <select 
            className="form-control" 
            style={{ flex: 1, minWidth: '150px' }}
            value={newProductCategoryId}
            onChange={(e) => setNewProductCategoryId(e.target.value)}
          >
            <option value="">Sélectionner une catégorie...</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <input 
            type="text" 
            className="form-control" 
            style={{ flex: 2, minWidth: '200px' }}
            placeholder="Nouveau produit..."
            value={newProductName}
            onChange={(e) => setNewProductName(e.target.value)}
          />
          <button type="submit" className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>
            <Plus size={18} /> Ajouter
          </button>
        </form>

        <div className="item-list">
          {products.length === 0 ? (
            <p className="empty-state" style={{ padding: '1rem' }}>Aucun produit configuré.</p>
          ) : (
            products.map(prod => {
              const catName = categories.find(c => c.id === prod.categoryId)?.name || 'Inconnue';
              return (
                <div key={prod.id} className="item-row">
                  <div>
                    <strong>{prod.name}</strong>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginLeft: '1rem' }}>
                      Catégorie: {catName}
                    </span>
                  </div>
                  <button 
                    className="btn-icon danger" 
                    onClick={() => deleteProduct(prod.id)}
                    title="Supprimer le produit"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
