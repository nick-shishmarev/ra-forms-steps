import "./List.css"
import type { Training } from "../../App"

interface ListProps {
  trainings: Training[]
  onDelete: (id: string) => void
}

interface RowProps extends Training{
  onDelete: (id: string) => void
}

export function List({trainings=[], onDelete}: ListProps) {

  return (
    <div className="data-table">
      <div className="table-header">
        <div className="col-date">Дата (ДД.ММ.ГГ)</div>
        <div className="col-distance">Пройдено км</div>
        <div className="col-actions">Действия</div>
      </div>

      <div className="table-body" id="tableBody">
        {trainings.length === 0 && <div className="empty-state">Нет данных о тренировках</div>}
        {trainings.map((training: Training) => <Row {...{...training, onDelete}} key={training.id}/>)}

      </div>
    </div>
  )
}

function Row({
  id,
  date,
  distance,
  onDelete
}: RowProps) {
 
  return (
    <div className="table-row">
      <div className="col-date">{date}</div>
      <div className="col-distance">{distance}</div>
      <div className="col-actions">
        <button 
          className="action-btn delete-btn" 
          data-id={id}
          title="Удалить" 
          onClick={({ target }) => {
            console.log(target);
            const element = target as HTMLElement;
            const id = element.dataset.id!;
            onDelete(id);
          }
        }>✕</button>
      </div>
    </div>
  )
}
