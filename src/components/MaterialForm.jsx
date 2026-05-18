import { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { Save, X } from 'lucide-react';

export default function MaterialForm({ materialId, onSuccess, onCancel }) {
  const { materials, addMaterial, updateMaterial, categories, products } = useAppContext();
  
  const isEditing = !!materialId;
  
  const [formData, setFormData] = useState({
    productName: '',
    client: '',
    categoryId: '',
    quantity: 1,
    status: 'A_RECUPERER',
    expectedRecoveryDate: '',
    receptionDate: ''
  });

  useEffect(() => {
    if (isEditing) {
      const materialToEdit = materials.find(m => m.id === materialId);
      if (materialToEdit) {
        setFormData(materialToEdit);
      }
    }
  }, [materialId, materials, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.productName) return;
    
    if (isEditing) {
      updateMaterial(materialId, formData);
      onSuccess();
    } else {
      addMaterial(formData);
      setFormData({
        productName: '',
        client: '',
        categoryId: '',
        quantity: 1,
        status: 'A_RECUPERER',
        expectedRecoveryDate: '',
        receptionDate: ''
      });
    }
  };

  // Filter products based on selected category
  const filteredProducts = formData.categoryId 
    ? products.filter(p => p.categoryId === formData.categoryId)
    : products;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '2rem' }}>
        {isEditing ? 'Modifier le matériel' : 'Ajouter un nouveau matériel'}
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="two-cols">
          <div className="form-group">
            <label>Catégorie (Optionnel)</label>
            <select 
              name="categoryId" 
              className="form-control" 
              value={formData.categoryId} 
              onChange={handleChange}
            >
              <option value="">Aucune catégorie</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label>Nom du produit *</label>
            {formData.categoryId && filteredProducts.length > 0 ? (
              <select
                name="productName"
                className="form-control"
                value={formData.productName}
                onChange={handleChange}
                required
              >
                <option value="">Sélectionnez un produit...</option>
                {filteredProducts.map(p => (
                  <option key={p.id} value={p.name}>{p.name}</option>
                ))}
              </select>
            ) : (
              <input 
                type="text" 
                name="productName" 
                className="form-control" 
                placeholder="Ex: Extincteur E6EVT"
                value={formData.productName}
                onChange={handleChange}
                required
                list="products-list"
              />
            )}
            <datalist id="products-list">
              {filteredProducts.map(p => (
                <option key={p.id} value={p.name} />
              ))}
            </datalist>
          </div>
        </div>

        <div className="two-cols">
          <div className="form-group">
            <label>Client (Optionnel)</label>
            <input 
              type="text" 
              name="client" 
              className="form-control" 
              placeholder="Nom du client ou agence"
              value={formData.client}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Quantité *</label>
            <input 
              type="number" 
              name="quantity" 
              className="form-control" 
              min="1"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Statut *</label>
          <select 
            name="status" 
            className="form-control" 
            value={formData.status} 
            onChange={handleChange}
            required
          >
            <option value="A_RECUPERER">À Récupérer</option>
            <option value="VALIDE">Validé</option>
            <option value="STAND_BY">Stand By</option>
          </select>
        </div>

        <div className="two-cols">
          <div className="form-group">
            <label>Date prévue de récupération (Optionnelle)</label>
            <input 
              type="date" 
              name="expectedRecoveryDate" 
              className="form-control" 
              value={formData.expectedRecoveryDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Date de réception à l'agence (Optionnelle)</label>
            <input 
              type="date" 
              name="receptionDate" 
              className="form-control" 
              value={formData.receptionDate}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex-between" style={{ marginTop: '2rem' }}>
          <button type="button" className="btn" onClick={onCancel}>
            <X size={18} /> Annuler
          </button>
          <button type="submit" className="btn btn-primary">
            <Save size={18} /> {isEditing ? 'Enregistrer les modifications' : 'Créer le matériel'}
          </button>
        </div>
      </form>
    </div>
  );
}
