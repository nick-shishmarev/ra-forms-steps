import './Form.css';
import { useState } from 'react';
import type { Training } from '../../App';
import { validateDate } from '../Lib/validatedate';

interface FormProps {
  onSubmit: (training: Training) => void
}

export function Form({ onSubmit }: FormProps) {
  const [dateToShow, setDate] = useState('');
  const [distanceToShow, setDistance] = useState('');
  const [error, setError] = useState('Введите дату дд.мм.гггг');
  
  const onChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setDate(date);

    if (date.length > 9) {
      const error = validateDate(date);
      setError(error);
    } else {
      setError('Введите дату дд.мм.гггг');
    }
  }
  
  const onChangeDistance = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDistance(e.target.value);
  }
  
  const submitHandler = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const date  = dateToShow;
    const distance  = Number(distanceToShow);
    const training: Training = { id: '', date, distance };
    setDate('');
    setDistance('');
    setError('Введите дату дд.мм.гггг');
    e.target.date.focus();

    onSubmit(training);
  }

  return (
    <div className="form-container">
      <form id="trainingForm" onSubmit={submitHandler}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="date">Дата (ДД.ММ.ГГГГ)</label> 
            <input type="text" 
              id="date" 
              name="date" 
              placeholder="01.04.2026" 
              value={dateToShow} 
              required
              onChange={onChangeDate} 
              autoFocus
            />
          </div>

          <div className="form-group">
            <label  htmlFor="date">Пройдено км</label>
            <input type="number"
              id="distance"
              name="distance"
              placeholder="5.7"
              step="0.1"
              min="0"
              value={distanceToShow}
              required
              onChange={onChangeDistance}
            />
          </div>

          <button type="submit" 
            className="submit-btn"
            disabled={error !== ''}
          >OK</button>
        </div>
      </form>
      <div className="error-box">
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  )
}
