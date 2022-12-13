
import { Fragment } from 'react';


function ResultDisplay({ evalResult, exerciseId }) {

  const getRender = () => {
    if (exerciseId === 1) {
      return (
        <table>
          <tbody>
            <tr>
              <td>Result</td>
              <td>{evalResult.pass ? 'PASS' : 'fail'}</td>
            </tr>
            <tr>
              <td>Error</td>
              <td>{evalResult.error ? evalResult.message : 'N/A'}</td>
            </tr>
          </tbody>
        </table>
      )
    } else if (exerciseId === 2) {
      return (
        <table>
          <tbody>
            <tr>
              <td>Result</td>
              <td>{evalResult.error ? 'fail' : evalResult.pass ? 'PASS' : 'fail'}</td>
            </tr>
            <tr>
              <td>Error</td>
              <td>{evalResult.error ? evalResult.type + '\n' + evalResult.message : 'N/A'}</td>
            </tr>
            <tr>
              <td>Failed On Input</td>
              <td>{evalResult.failedInput ? evalResult.failedInput : 'N/A'}</td>
            </tr>
          </tbody>
        </table>
      )
    } else {
      if (evalResult.error) {
        return (
          <table>
            <tbody>
              <tr>
                <td>Result</td>
                <td>{'fail'}</td>
              </tr>
              <tr>
                <td>Error</td>
                <td>{evalResult.type + '\n' + evalResult.message}</td>
              </tr>
              <tr>
                <td>Coverage</td>
                <td>{'N/A'}</td>
              </tr>
              <tr>
                <td>Failed Assertions</td>
                <td>{'N/A'}</td>
              </tr>
            </tbody>
          </table>
        )
      }
      return (
        <table>
          <tbody>
            <tr>
              <td>Result</td>
              <td>{evalResult.pass ? 'PASS' : 'fail'}</td>
            </tr>
            <tr>
              <td>Error</td>
              <td>{'N/A'}</td>
            </tr>
            <tr>
              <td>Coverage</td>
              <td>{evalResult.coverageReport.coverage + '%'}</td>
            </tr>
            <tr>
              <td>Failed Assertions</td>
              <td>{evalResult.assertionReport.length}</td>
            </tr>
          </tbody>
        </table>
      )
    }
  }

  return (
    <div className="resultArea">
      {getRender()}
    </div>
  )
}

export default ResultDisplay;
