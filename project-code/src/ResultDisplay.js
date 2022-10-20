
import { Fragment } from 'react';


function ResultDisplay({ evalResult }) {


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

  return (
    <div className="resultArea">
      {getRender()}
      {/* {
        evalResult.error ? (

        ) : {}
      }
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
      </div> */}
    </div>
  )
}


export default ResultDisplay;