import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  webApps: [
    {
      name: 'ABP news',
      link: 'https://bengali.abplive.com/',
    },
    { name: 'Times of India', link: 'https://timesofindia.indiatimes.com/' },
    {
      name: 'Github',
      link: 'https://github.com/',
    },
    {
      name: 'Medium',
      link: 'https://medium.com/',
    },
    {
      name: 'Pinterest',
      link: 'https://in.pinterest.com/',
    },
    { name: 'Goggle meet', link: 'https://meet.google.com/' },
    { name: 'Zoom Meet', link: 'https://zoom.us/' },
    {
      name: 'JISCE',
      link: 'https://jiscollege.ac.in/',
    },
  ],
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
  },
});

export const { AddWebApps, AddLinks, getAppsandLinks, deleteLink, deleteApp } =
  appLinksSlice.actions;
export default appLinksSlice.reducer;
