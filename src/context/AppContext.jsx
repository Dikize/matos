import { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

const MOCK_CATEGORIES = [
  { id: '1', name: 'Extincteurs' },
  { id: '2', name: 'Détecteurs' },
];

const MOCK_PRODUCTS = [
  { id: '1', name: 'E6EVT', categoryId: '1' },
  { id: '2', name: 'E6FFF', categoryId: '1' },
  { id: '3', name: 'DAAF', categoryId: '2' },
];

const MOCK_MATERIALS = [
  {
    id: '1',
    productName: 'E6EVT',
    client: 'Agence Alpha',
    categoryId: '1',
    quantity: 5,
    status: 'A_RECUPERER',
    expectedRecoveryDate: '2026-05-20',
    receptionDate: ''
  },
  {
    id: '2',
    productName: 'DAAF',
    client: 'Client Beta',
    categoryId: '2',
    quantity: 10,
    status: 'VALIDE',
    expectedRecoveryDate: '',
    receptionDate: '2026-05-10'
  }
];

export const AppProvider = ({ children }) => {
  const [categories, setCategories] = useLocalStorage('app_categories', MOCK_CATEGORIES);
  const [products, setProducts] = useLocalStorage('app_products', MOCK_PRODUCTS);
  const [materials, setMaterials] = useLocalStorage('app_materials', MOCK_MATERIALS);
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, type = 'success') => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 3000);
  };

  // Categories
  const addCategory = (name) => {
    const newCategory = { id: Date.now().toString(), name };
    setCategories([...categories, newCategory]);
    addNotification('Catégorie ajoutée', 'success');
  };

  const deleteCategory = (id) => {
    setCategories(categories.filter(c => c.id !== id));
    // Also cleanup products and unset category from materials?
    addNotification('Catégorie supprimée', 'info');
  };

  // Products
  const addProduct = (name, categoryId) => {
    const newProduct = { id: Date.now().toString(), name, categoryId };
    setProducts([...products, newProduct]);
    addNotification('Produit ajouté', 'success');
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
    addNotification('Produit supprimé', 'info');
  };

  // Materials
  const addMaterial = (materialData) => {
    const newMaterial = { id: Date.now().toString(), ...materialData };
    setMaterials([...materials, newMaterial]);
    addNotification('Matériel ajouté', 'success');
  };

  const updateMaterial = (id, updatedData) => {
    setMaterials(materials.map(m => m.id === id ? { ...m, ...updatedData } : m));
    addNotification('Matériel modifié', 'success');
  };

  const deleteMaterial = (id) => {
    setMaterials(materials.filter(m => m.id !== id));
    addNotification('Matériel supprimé', 'info');
  };

  const updateMaterialStatus = (id, status, extraData = {}) => {
    setMaterials(materials.map(m => m.id === id ? { ...m, status, ...extraData } : m));
    addNotification('Statut mis à jour', 'success');
  };

  return (
    <AppContext.Provider value={{
      categories, addCategory, deleteCategory,
      products, addProduct, deleteProduct,
      materials, addMaterial, updateMaterial, deleteMaterial, updateMaterialStatus,
      notifications
    }}>
      {children}
    </AppContext.Provider>
  );
};
