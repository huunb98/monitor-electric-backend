let obj = {
  x_rms_ACC_mg: {
    '0': 6839,
    '1': 1,
  },
  x_max_ACC_mg: {
    '0': 6839,
    '1': 1,
  },
  x_velocity_mm_sec: {
    '0': 6839,
    '1': 1,
  },
};

const key = Object.keys(obj);

class AnalysisResults {
  field: string;
  value: number;
  count: number;
}

let results: AnalysisResults[] = [];

key.forEach((index) => {
  let sets = Object.keys(obj[index]);
  sets.forEach((set) => {
    let result = new AnalysisResults();
    result.field = index;
    result.value = +set;
    result.count = obj[index][set];
    results.push(result);
  });
});

console.log(results);
