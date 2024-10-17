
import { create } from 'zustand';
import { Author } from '@/interfaces/author';

type ProfileState = {
  author: Author;
  accessToken: string;
  setAccessToken: (accessToken: string) => void;
};

const useProfileStore = create<ProfileState>((set: (partial: Partial<ProfileState>) => void) => ({
    author: { id: 0, name: "", bio: "", email: "" },
    accessToken: "",
    setAccessToken: (accessToken: string) => set({ accessToken })
}));

export default useProfileStore;