import './App.css';
import { useState } from 'react';
import { Form } from './components/Form/Form';
import { List } from './components/List/List';
import { v4 } from 'uuid';
import { GetData } from './components/GetData/GetData';

export interface Training {
  id: string
  date: string
  distance: number
}

function App() {
  const data = GetData();
  const [trainings, setTraining] = useState(data);
  
  function onSubmit(training: Training) {
    const { date, distance } = training;
    const trainingsNew = [...trainings]
    const index = trainingsNew.findIndex(training => training.date === date);

    if (index > -1) {
      trainingsNew[index].distance += distance;
    } else {
      training.id = v4();
      trainingsNew.push(training);
    }

    setTraining(trainingsNew);
  }

  function onDelete(id: string) {
    const trainingsNew = trainings.filter(training => training.id !== id);
    setTraining(trainingsNew);
  }
  
  trainings.sort((a, b) => {
    const dateA = new Date(`${a.date.slice(6)}-${a.date.slice(3,5)}-${a.date.slice(0,2)}`);
    const dateB = new Date(`${b.date.slice(6)}-${b.date.slice(3,5)}-${b.date.slice(0,2)}`);
    return dateB.getTime() - dateA.getTime();
  });
  
  return (
    <div className="container">
      <Form onSubmit={onSubmit}/>
      <List {...{trainings, onDelete}} />
    </div>
  )
}
  

export default App

