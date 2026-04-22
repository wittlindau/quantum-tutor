import { UNITS } from '../../data/units'
import UnitLearn from '../UnitLearn'
import PracticeMode from '../practice/PracticeMode'
import FlashcardMode from '../practice/FlashcardMode'
import './MainContent.css'

export default function MainContent({ activeUnit, activeSection, onSectionChange, mode }) {
  const unit = UNITS.find(u => u.id === activeUnit)

  if (mode === 'practice') return <div className="main-content"><PracticeMode unitId={activeUnit} /></div>
  if (mode === 'flashcard') return <div className="main-content"><FlashcardMode unitId={activeUnit} /></div>

  return (
    <div className="main-content">
      <UnitLearn unit={unit} sectionId={activeSection} onSectionChange={onSectionChange} />
    </div>
  )
}
