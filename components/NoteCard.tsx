'use client'

import { Note } from '@/lib/store'
import styles from './NoteCard.module.css'

interface NoteCardProps {
  note: Note
  onEdit: (note: Note) => void
  onDelete: (id: string) => void
}

export default function NoteCard({ note, onEdit, onDelete }: NoteCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const stripHtml = (html: string) => {
    const tmp = document.createElement('div')
    tmp.innerHTML = html
    return tmp.textContent || tmp.innerText || ''
  }

  return (
    <div className={styles.noteCard} onClick={() => onEdit(note)}>
      <div className={styles.noteHeader}>
        <h3 className={styles.noteTitle}>{note.title}</h3>
        <button
          className={styles.deleteBtn}
          onClick={(e) => {
            e.stopPropagation()
            if (confirm('Bu notu silmek istediğinizden emin misiniz?')) {
              onDelete(note.id)
            }
          }}
        >
          <i className="fas fa-trash"></i>
        </button>
      </div>
      <div className={styles.noteContent}>
        {stripHtml(note.content).substring(0, 150)}
        {stripHtml(note.content).length > 150 && '...'}
      </div>
      <div className={styles.noteMeta}>
        <span>
          <i className="fas fa-calendar"></i> {formatDate(note.updatedAt)}
        </span>
      </div>
    </div>
  )
}
