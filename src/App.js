import React, { useState, useEffect } from 'react';
import Quiz from './components/Quiz.jsx';
import Week from './components/Week.jsx';
import week1 from './components/week1.json'; 
import week2 from './components/week2.json';
import week3 from './components/week3.json';
import week4 from './components/week4.json';
import week5 from './components/week5.json';
import week6 from './components/week6.json';
import week7 from './components/week7.json';
import week8 from './components/week8.json';


function App() {
  const [weekSelected, setWeekSelected] = useState(-2);
  const [jsonData, setJsonData] = useState(week1);

  useEffect(() => {
    const setData = () => {
      let selectedWeekData;
      switch (weekSelected) {
        case 1:
          selectedWeekData = week1;
          break;
        case 2:
          selectedWeekData = week2;
          break;
        case 3:
          selectedWeekData = week3;
          break;
        case 4:
          selectedWeekData = week4;
          break;
        case 5:
          selectedWeekData = week5;
          break;
        case 6:
          selectedWeekData = week6;
          break;
        case 7:
          selectedWeekData = week7;
          break;
        case 8:
          selectedWeekData = week8;
          break;
      
        default:
          selectedWeekData = week1;
      }
      for (let i = 0; i < selectedWeekData.length; i++) {
        selectedWeekData[i].options = shuffleArray(selectedWeekData[i].options);
      }
      setJsonData(shuffleArray(selectedWeekData));
    };

    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    setData();
  }, [weekSelected]);

  const updateSelected = (newValue) => {
    setWeekSelected(newValue);
  };

  const isNumber = (value) => {
    return value > 0;
  };

  return (
    <div className="App">
      {!isNumber(weekSelected) && <Week updateSelected={updateSelected} />}
      {isNumber(weekSelected) && <Quiz questions={jsonData} updateSelected={updateSelected} weekSelected={weekSelected} />}
    </div>
  );
}

export default App;