import { NOTES, KEY_MAP } from './fixture';
import classes from './Piano.module.css'
import { useEffect, useRef } from 'react';
import { useSynthStore } from '@/engine/store/store';


const Piano = () => {
  const activeKeys = useRef<Set<string>>(new Set());
  const {handleNoteDown, handleNoteUp, activeNotes} = useSynthStore()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat || activeKeys.current.has(e.key)) return;
      
      const noteIndex = KEY_MAP[e.key.toLowerCase()];
      if (noteIndex !== undefined) {
        const note = NOTES[noteIndex];
        activeKeys.current.add(e.key);
        handleNoteDown(note);
        
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const noteIndex = KEY_MAP[e.key.toLowerCase()];
      if (noteIndex !== undefined) {
        const note = NOTES[noteIndex];
        activeKeys.current.delete(e.key);
        handleNoteUp(note);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleNoteDown, handleNoteUp]);

    return (
      <div className={classes.piano}>
        {NOTES.map((note, index) => {
          const isBlack = ~note.note.indexOf('#');
          const isActive = activeNotes.includes(note.note);
    
          return (
            <div 
              key={note.note}
              className={`
                ${classes.key} 
                ${isBlack ? classes.black : classes.white}
                ${isActive ? classes.active : ''}
              `}
              onMouseDown={() => handleNoteDown(note)}
              onMouseUp={() => handleNoteUp(note)}
              onMouseLeave={() => handleNoteUp(note)}
            >
              {note.note}
              <span className={classes.hint}>
                {Object.keys(KEY_MAP).find(k => NOTES[KEY_MAP[k]].note === note.note)}
              </span>
            </div>
          );
        })}
      </div>
    )
}

export default Piano;