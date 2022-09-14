import { useState, useEffect } from 'react';
import Topic from './components/topic/topic';
import ServerTest from './components/serverTest/serverTest';
import Exercise from './components/exercise/exercise';
import exerciseDescriptions from './exercise-utils/exerciseDescriptions';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { xcode } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import './App.css';


function App() {

  return (
    <div className="App">
      <SyntaxHighlighter language="python" style={xcode}>
      {exerciseDescriptions[0].code}
    </SyntaxHighlighter>
    <p>Descriptions: {exerciseDescriptions[0].description}</p>
    <Exercise></Exercise>
    </div>
  )
}

// function App() {

//   const [topicList, setTopicList] = useState([]);
//   const [currTopic, setCurrTopic] = useState('');

//   useEffect(() => {
//     fetch('/main')
//     .then((res) => res.json())
//     .then((res) => {
//       console.log(res.topic_list);
//       setTopicList(res.topic_list);
//     })
//   }, [])

//   useEffect(() => {
//     if (currTopic !== '') {
//       document.getElementById(currTopic).style.backgroundColor = 'aquamarine';
//     }
//   }, [currTopic])

//   const topicClickHandler = evt => {
//     if (currTopic !== '') {
//       document.getElementById(currTopic).style.backgroundColor = 'white';
//     }
//     setCurrTopic(evt.target.id);
//   }

//   return (
//     <div className='App'>
//       <ServerTest />
//       <div id='headerBar'>
//         <h1 id='appTitle'> Software Testing </h1>
//         <button className='homeOption hoverable' id='loginButton'> Login/Create Account </button>
//         <button className='homeOption hoverable' id='homeButton'> Home </button>
//       </div>
      
//       <div id='contentArea'>
//         <ul id='topicOptions'>
//           {topicList.map(
//             (x, i) => <li
//               className='topicOption hoverable'
//               id={x}
//               key={i}
//               onClick={topicClickHandler}
//               >{x}</li>
//           )}
//         </ul>
//         <>
//             {
//               currTopic !== '' ? (
//                 <Topic topic={currTopic}/>
//               ) : (
//                 <></>
//               )
//             }
//         </>
//       </div>
      
//     </div>
//   );
// }

export default App;
