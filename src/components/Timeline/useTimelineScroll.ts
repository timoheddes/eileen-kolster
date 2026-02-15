import { create } from 'zustand';

type Section = {
  title: string;
  visible: boolean;
};

interface TimelineState {
  sections: Section[];
  updateSection: (section: Section) => void;
  resetSections: () => void;
}

const useTimelineScroll = create<TimelineState>((set) => ({
  sections: [],
  updateSection: (section) => {
    set((state) => {
      const sectionExists = state.sections.find(
        (s) => s.title === section.title
      );
      if (sectionExists) {
        return {
          sections: state.sections.map((s) =>
            s.title === section.title ? section : s
          ),
        };
      } else {
        return {
          sections: [...state.sections, section],
        };
      }
    });
  },
  resetSections: () => set({ sections: [] }),
}));

export default useTimelineScroll;
