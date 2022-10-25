
import { Fragment } from 'react';


function ResultDisplay({ evalResult, exerciseId }) {


  const getRender = () => {
    if (evalResult.error) {
      return (
        <div>
          {evalResult.type}
          <br></br>
          {evalResult.message}
        </div>
      )
    } else {
      if (exerciseId === 2) {
        return (
          <Fragment>
            {
              evalResult && evalResult.pass ? (
                <p>
                  PASS!
                </p>
              ) : evalResult && (evalResult.pass === false) ? (
                <p>
                  Failed on input: {evalResult.failedInput}
                </p>
              ) : (null)
            }
          </Fragment>
        )
      } else {
        return (
          <Fragment>
            {
              evalResult.pass ? (
                <div className="resultRow" id="evalResult">
                  Result: Pass
                </div>
              ) : (
                <div className="resultRow" id="evalResult">
                  Result: Fail
                </div>
              )
            }
            <div className="resultRow" id="branchCoverage">
              Branch Coverage: {evalResult.coverageReport.coverage}%
            </div>
            <div className="resultRow" id="assertionResults">
              Failed Assertions: {evalResult.assertionReport.length}
            </div>
          </Fragment>
        )
      }
    }
  }

  return (
    <div className="resultArea">
      {getRender()}
    </div>
  )
}


export default ResultDisplay;