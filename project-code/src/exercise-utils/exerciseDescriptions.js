

{/* <link rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.0.3/styles/default.min.css"></link>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.0.3/highlight.min.js"></script>
  <script>hljs.initHighlightingOnLoad();</script> */}

const exerciseDescriptions = [
  {
    id: "1.1",
    description: "The below function should return the maximum value in an array. \
    Identify the edge case that is not handled, and provide an input that breaks \
    the function.",
    code: "def get_max(vals):\n  max_val = vals[0]\n  for i in range(1, len(vals)):\n    if vals[i] > max_val:\n      max_val = vals[i]\n  return max_val"
  }
];

export default exerciseDescriptions;