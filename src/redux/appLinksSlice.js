import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  webApps: [],
  links: [],
};

export const appLinksSlice = createSlice({
  name: 'webapps',
  initialState,
  reducers: {
    AddWebApps: (state, action) => {
      state.webApps = [...state.webApps, action.payload];
    },
    AddLinks: (state, action) => {
      state.links = [...state.links, action.payload];
    },
    getAppsandLinks: (state, action) => {
      const { apps, links } = action.payload;
      state.webApps = apps;
      state.links = links;
    },
    deleteLink: (state, action) => {
      const { id } = action.payload;
      state.links = state.links.filter((link) => link.id !== id);
    },
    deleteApp: (state, action) => {
      const { id } = action.payload;
      state.webApps = state.webApps.filter((app) => app.id !== id);
    },
    resetAppsState: () => {
      return initialState;
    },
  },
});

export const {
  AddWebApps,
  AddLinks,
  getAppsandLinks,
  deleteLink,
  deleteApp,
  resetAppsState,
} = appLinksSlice.actions;
export default appLinksSlice.reducer;
