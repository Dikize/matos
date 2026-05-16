import { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

const MOCK_CATEGORIES = [
  { id: 'cat_1', name: 'Extincteurs EAU' },
  { id: 'cat_2', name: 'Extincteurs CO2' },
  { id: 'cat_3', name: 'Extincteurs ABC' },
  { id: 'cat_4', name: 'Extincteurs ROUES' },
  { id: 'cat_5', name: 'SIGNALÉTIQUES' },
  { id: 'cat_6', name: 'PIECES DETACHEES' },
];

const MOCK_PRODUCTS = [
  // Extincteurs EAU
  { id: 'p1', name: 'E615FF', categoryId: 'cat_1' },
  { id: 'p2', name: 'E915FF', categoryId: 'cat_1' },
  { id: 'p3', name: 'E615FFT', categoryId: 'cat_1' },
  { id: 'p4', name: 'E915FFT', categoryId: 'cat_1' },
  { id: 'p5', name: 'AL6T-30', categoryId: 'cat_1' },
  { id: 'p6', name: 'AL9T-30', categoryId: 'cat_1' },
  { id: 'p7', name: 'AL6F', categoryId: 'cat_1' },
  { id: 'p8', name: 'AL6 LI-ION', categoryId: 'cat_1' },
  { id: 'p9', name: 'AL9 LI-ION', categoryId: 'cat_1' },
  
  // Extincteurs CO2
  { id: 'p10', name: 'CO2 2KG', categoryId: 'cat_2' },
  { id: 'p11', name: 'CO2 5KG', categoryId: 'cat_2' },
  
  // Extincteurs ABC
  { id: 'p12', name: 'PP6P', categoryId: 'cat_3' },
  { id: 'p13', name: 'P9P', categoryId: 'cat_3' },
  { id: 'p14', name: 'PP2P', categoryId: 'cat_3' },
  { id: 'p15', name: 'PP1P', categoryId: 'cat_3' },
  { id: 'p16', name: 'P25P', categoryId: 'cat_3' },
  
  // Extincteurs ROUES
  { id: 'p17', name: 'E45A1FF', categoryId: 'cat_4' },
  { id: 'p18', name: 'E45A1FFT', categoryId: 'cat_4' },
  { id: 'p19', name: 'P50P', categoryId: 'cat_4' },
  { id: 'p20', name: 'P25P_R', name: 'P25P', categoryId: 'cat_4' },
  { id: 'p21', name: 'CO2 20KG', categoryId: 'cat_4' },
  { id: 'p22', name: 'CO2 45KG', categoryId: 'cat_4' },
  
  // SIGNALÉTIQUES
  { id: 'p23', name: 'PLAQUE EXTINCTEUR CO2', categoryId: 'cat_5' },
  { id: 'p24', name: 'PLAQUE EXTINCTEUR AB', categoryId: 'cat_5' },
  { id: 'p25', name: 'PLAQUE EXTINCTEUR ABC', categoryId: 'cat_5' },
  { id: 'p26', name: 'PLAQUE EXTINCTEUR BC', categoryId: 'cat_5' },
  { id: 'p27', name: 'PLAQUE EXTINCTEUR AF', categoryId: 'cat_5' },
  { id: 'p28', name: 'PLAQUE EXTINCTEUR D', categoryId: 'cat_5' },
  { id: 'p29', name: 'CHAUFFERIE GAZ', categoryId: 'cat_5' },
  { id: 'p30', name: 'SUR ROUE', categoryId: 'cat_5' },
  
  // PIECES DETACHEES
  { id: 'p31', name: 'SCELLE MILLESIME', categoryId: 'cat_6' },
  { id: 'p32', name: 'JOINT EXT P-E 6-9', categoryId: 'cat_6' },
  { id: 'p33', name: 'OPERCULE EXT', categoryId: 'cat_6' },
  { id: 'p34', name: 'PERCUTEUR', categoryId: 'cat_6' },
  { id: 'p35', name: 'SUPPORT MURAL CO2', categoryId: 'cat_6' },
  { id: 'p36', name: 'SUPPORT MURAL P-E', categoryId: 'cat_6' },
  { id: 'p37', name: 'VIGI’CLIP', categoryId: 'cat_6' },
  { id: 'p38', name: 'ETIQUETTE VÉRIF EXT', categoryId: 'cat_6' },
  { id: 'p39', name: 'ETIQUETTE VÉRIF BAES', categoryId: 'cat_6' },
  { id: 'p40', name: 'ETIQUETTE QUINQUENNAL', categoryId: 'cat_6' },
  { id: 'p41', name: 'ETIQUETTE VÉRIF TRANSPORT', categoryId: 'cat_6' },
  { id: 'p42', name: 'ETIQUETTE VÉRIF PETROLIER', categoryId: 'cat_6' },
  { id: 'p43', name: 'TAMIS', categoryId: 'cat_6' },
  { id: 'p44', name: 'MICRO-BIO', categoryId: 'cat_6' },
  { id: 'p45', name: 'TÊTE E6', categoryId: 'cat_6' },
  { id: 'p46', name: 'TÊTE E9', categoryId: 'cat_6' },
  { id: 'p47', name: 'TÊTE P6', categoryId: 'cat_6' },
  { id: 'p48', name: 'TÊTE P9', categoryId: 'cat_6' },
  { id: 'p49', name: 'LANCE PULVÉRISATRICE', categoryId: 'cat_6' },
  { id: 'p50', name: 'TUYAU', categoryId: 'cat_6' },
];

const MOCK_MATERIALS = [];

export const AppProvider = ({ children }) => {
  const [categories, setCategories] = useLocalStorage('app_categories_v2', MOCK_CATEGORIES);
  const [products, setProducts] = useLocalStorage('app_products_v2', MOCK_PRODUCTS);
  const [materials, setMaterials] = useLocalStorage('app_materials_v2', MOCK_MATERIALS);
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
