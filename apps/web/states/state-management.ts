import {create} from 'zustand';
import {devtools, persist} from 'zustand/middleware';

interface ISelectedMenuState {
  menuSelected: string;
  setSelectedMenu: (selected: string) => void;
}

export const useAppSelectedMenuState = create<ISelectedMenuState>()(
  devtools(
    persist(
      (setState, getState) => ({
        menuSelected: 'Dashboard',
        setSelectedMenu: (selectedMenu: string) => {
          setState(() => ({
            menuSelected: selectedMenu,
          }));
        },
      }),
      {name: 'appSelectedMenue'}
    )
  )
);
