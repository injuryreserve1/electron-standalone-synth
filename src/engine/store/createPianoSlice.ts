import { StateCreator } from 'zustand';
import { AudioEngine } from '../core/AudioEngine';
import { Note } from '../core/types/types';

export interface PianoSlice {
    activeNotes: string[];
    handleNoteDown: (note: Note) => void;
    handleNoteUp: (note: Note) => void;
}

export const createPianoSlice = (engine: AudioEngine): StateCreator<PianoSlice> => (set) => ({
    activeNotes: [],
    handleNoteDown: (note: Note) => {
        engine.pressNote(note);
        set((state) => ({
            activeNotes: state.activeNotes.includes(note.note) 
                ? state.activeNotes 
                : [...state.activeNotes, note.note]
        }));
    },
    handleNoteUp: (note: Note) => {
        engine.unpressNote(note);
        set((state) => ({
            activeNotes: state.activeNotes.filter(n => n !== note.note)
        }));
    }
});