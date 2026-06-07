import { create } from 'zustand';

const useStore = create((set) => ({
  user: null,
  searches: [],
  savedProperties: [],
  inquiries: [],
  
  setUser: (user) => set({ user }),
  setSearches: (searches) => set({ searches }),
  setSavedProperties: (properties) => set({ savedProperties: properties }),
  setInquiries: (inquiries) => set({ inquiries }),
  
  addSearch: (search) => set((state) => ({
    searches: [...state.searches, search],
  })),
  
  removeSearch: (id) => set((state) => ({
    searches: state.searches.filter(s => s.id !== id),
  })),
  
  addSavedProperty: (property) => set((state) => ({
    savedProperties: [...state.savedProperties, property],
  })),
  
  removeSavedProperty: (id) => set((state) => ({
    savedProperties: state.savedProperties.filter(p => p.id !== id),
  })),
}));

export default useStore;
