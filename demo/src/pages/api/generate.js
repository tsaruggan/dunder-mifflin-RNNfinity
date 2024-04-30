import * as tf from '@tensorflow/tfjs-node';

const VOCAB = ['\t', '\n', ' ', '!', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '-', '.', '/', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ':', ';', '=', '?', '@', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '[', ']', '_', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '{', '}'];

const CHAR2IDX = { '\t': 0, '\n': 1, ' ': 2, '!': 3, '#': 4, '$': 5, '%': 6, '&': 7, "'": 8, '(': 9, ')': 10, '*': 11, '+': 12, ',': 13, '-': 14, '.': 15, '/': 16, '0': 17, '1': 18, '2': 19, '3': 20, '4': 21, '5': 22, '6': 23, '7': 24, '8': 25, '9': 26, ':': 27, ';': 28, '=': 29, '?': 30, '@': 31, 'A': 32, 'B': 33, 'C': 34, 'D': 35, 'E': 36, 'F': 37, 'G': 38, 'H': 39, 'I': 40, 'J': 41, 'K': 42, 'L': 43, 'M': 44, 'N': 45, 'O': 46, 'P': 47, 'Q': 48, 'R': 49, 'S': 50, 'T': 51, 'U': 52, 'V': 53, 'W': 54, 'X': 55, 'Y': 56, 'Z': 57, '[': 58, ']': 59, '_': 60, 'a': 61, 'b': 62, 'c': 63, 'd': 64, 'e': 65, 'f': 66, 'g': 67, 'h': 68, 'i': 69, 'j': 70, 'k': 71, 'l': 72, 'm': 73, 'n': 74, 'o': 75, 'p': 76, 'q': 77, 'r': 78, 's': 79, 't': 80, 'u': 81, 'v': 82, 'w': 83, 'x': 84, 'y': 85, 'z': 86, '{': 87, '}': 88 };

const IDX2CHAR = tf.tensor1d(VOCAB).arraySync();

// Global variable to hold the model
let model = null;

// let modelURL = 'file://src/model/model.json';
let modelURL = "https://uwlgvovr0axond7s.public.blob.vercel-storage.com/model.json";

// Function to load the model if it's not already loaded
async function loadModel() {
  if (!model) {
    // Load the model only if it's not already loaded
    model = await tf.loadLayersModel(modelURL);
  }
  return model;
}

async function generateScript(options) {

  const type = options.type;
  let num = options.num;
  const prompts = options.prompts;
  let startString = "";

  if (type === "random") {
    startString = generateStartString();
  } else if (type === "prompt") {
      // num += prompts.length;
      prompts.map((prompt) => {
          let character = prompt.character;
          character = character.toUpperCase();
          startString += character + ':\n' + prompt.line + '\n\n';
      });
  }

  let inputEval = tf.tensor1d(string2index(startString));
  inputEval = tf.expandDims(inputEval, 0);

  let charsGenerated = [];
  let lineCount = 0;

  while (!model) {
      setInterval(function () { console.log("Model is loading..."); }, 1000);
  }
  model.resetStates();

  let predictions = null;
  while (lineCount < num) {
      predictions = model.predict(inputEval);
      predictions = tf.squeeze(predictions, 0);

      // temp = tf.scalar(0.25);
      let temp = tf.scalar(parseFloat((Math.random() * (0.50 - 0.10) + 0.10).toFixed(2)));
      predictions = predictions.div(temp);

      let predictedId = tf.multinomial(predictions, 1).dataSync()[-1, 0];

      inputEval = tf.expandDims([predictedId], 0);
      charsGenerated.push(index2string([predictedId]));
      lineCount = Math.floor((charsGenerated.filter(char => char == '\n').length + 1) / 3);
  }
  let textGenerated = charsGenerated.join("");
  return startString + textGenerated;
}

function string2index(input) {
  let output = [];
  [...input].forEach(char => output.push(CHAR2IDX[char]));
  return output;
}

function index2string(input) {
  let output = [];
  [...input].forEach(index => output.push(IDX2CHAR[index]));
  return output;
}

function formatScript(text) {
  let lines = text.split('\n');
  let count = (lines.length - 1) / 3;
  let script = [];
  for (var i = 0; i < count; i++) {
      script.push([lines[i * 3],lines[i * 3 + 1]])
  }
  return script;
}

function generateStartString() {
  const CHARACTERS = ["A.J", "ANDY", "ANDY'S FATHER", "ANDY'S MOTHER", "ANGELA", "ASIAN JIM", "ASTRID", "AUNT SHIRLEY", "BARTENDER", "BEN FRANKLIN", "BOB VANCE, VANCE REFRIGERATION", "BRANDON", "BRENDA", "BRIAN", "BROCCOLI ROB", "CPR TRAINER", "CAPTAIN JACK", "CARLA FERN", "CAROL", "CASEY DEAN", "CATHY", "CECE", "CHARLES MINER", "CHEF", "CHILD", "CHRISTIAN", "CHURCHGOER", "CINDY", "CLARK", "CLEANING LADY", "CLIENT", "COMPUTER", "COMPUTRON", "CONCIERGE MARIE", "COOKIE MONSTER", "CORPORATE", "CREED", "CREW", "DANNY CORDRAY", "DARRYL", "DARRYL'S SISTER", "DAVID BRENT", "DAVID WALLACE", "DEANGELO VICKERS", "DELIVERY MAN", "DEVON", "DOCTOR", "DONNA", "DRIVER", "DWIGHT", "DWIGHT'S BABYSITTER", "ED TRUCK", "EMPLOYEE", "ERIN", "ESTHER", "FAKE STANLEY", "FLIGHT ATTENDANT", "GABE", "GIL", "GLENN", "HANK", "HANNAH", "HIDE", "HOLLY", "HUNTER", "IT GUY", "INTERN", "IRENE", "ISABELLE", "JAN", "JESSICA", "JIM", "JIM'S BROTHER", "JIM'S FATHER", "JO BENNETT", "JOSH", "KAREN", "KATY", "KELLY", "KELLY'S FATHER", "KELLY'S MOTHER", "KEVIN", "LAWYER", "LONNY", "LUKE", "LYNN", "MADGE", "MAGICIAN", "MARTIN", "MATT", "MEREDITH", "MICHAEL", "MOSE", "MR. BROWN", "MR. FIGARO", "MR. O'MALLEY", "MR. RAMISH", "MR. ROMANKO", "MR. RUGER", "MR. SCHOFIELD", "MRS. DAVIS", "MRS. WALLACE", "NANA", "NATE", "NELLIE", "NURSE", "OSCAR", "PACKER", "PAM", "PAM'S FATHER", "PAM'S GRANDMOTHER", "PAM'S MOTHER", "PHILLIP", "PHYLLIS", "POLICE OFFICER", "PRINCE FAMILY PAPER", "RAVI", "REPORTER", "ROBERT CALIFORNIA", "ROLF", "ROY", "RYAN", "SALESMAN", "SCRANTON STRANGLER", "SECRETARY", "SECURITY", "SENATOR LIPTON", "SPEAKERPHONE", "STANLEY", "STRIPPER", "STUDENT", "TEACHER", "TOBY", "TROY", "VAL", "VIKRAM", "W.B. JONES", "WAITRESS", "WOLF", "ZEKE"];
  let character = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
  return character + ':\n';
}

export default async (req, res) => {
  if (req.method === 'POST') {
    // Load the model (if necessary)
    await loadModel();

    const options = req.body;

    // Generate a script with the loaded model
    const text = await generateScript(options);
    const script = formatScript(text);

    res.status(200).json({ script }); // Return the generated script
  } else {
    // If it's not a POST request, respond with a 405 Method Not Allowed
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};
