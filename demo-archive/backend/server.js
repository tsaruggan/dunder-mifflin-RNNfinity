const express = require('express');
const app = express()
const tf = require('@tensorflow/tfjs-node');
const e = require('express');

// load the model
var model;
async function load_model(file) {
    model = await tf.loadLayersModel(file)
}
const MODEL_DIR = "file://model/model.json";
load_model(MODEL_DIR);

// host the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`listening at port ${PORT}`));
app.use(express.static('build'))
app.use(express.json())

const VOCAB = ['\t', '\n', ' ', '!', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '-', '.', '/', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ':', ';', '=', '?', '@', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '[', ']', '_', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '{', '}'];
const CHAR2IDX = { '\t': 0, '\n': 1, ' ': 2, '!': 3, '#': 4, '$': 5, '%': 6, '&': 7, "'": 8, '(': 9, ')': 10, '*': 11, '+': 12, ',': 13, '-': 14, '.': 15, '/': 16, '0': 17, '1': 18, '2': 19, '3': 20, '4': 21, '5': 22, '6': 23, '7': 24, '8': 25, '9': 26, ':': 27, ';': 28, '=': 29, '?': 30, '@': 31, 'A': 32, 'B': 33, 'C': 34, 'D': 35, 'E': 36, 'F': 37, 'G': 38, 'H': 39, 'I': 40, 'J': 41, 'K': 42, 'L': 43, 'M': 44, 'N': 45, 'O': 46, 'P': 47, 'Q': 48, 'R': 49, 'S': 50, 'T': 51, 'U': 52, 'V': 53, 'W': 54, 'X': 55, 'Y': 56, 'Z': 57, '[': 58, ']': 59, '_': 60, 'a': 61, 'b': 62, 'c': 63, 'd': 64, 'e': 65, 'f': 66, 'g': 67, 'h': 68, 'i': 69, 'j': 70, 'k': 71, 'l': 72, 'm': 73, 'n': 74, 'o': 75, 'p': 76, 'q': 77, 'r': 78, 's': 79, 't': 80, 'u': 81, 'v': 82, 'w': 83, 'x': 84, 'y': 85, 'z': 86, '{': 87, '}': 88 };
const IDX2CHAR = tf.tensor1d(VOCAB).arraySync();

async function generate_script(options) {

    const type = options.type;
    let num = options.num;
    const prompts = options.prompts;
    let start_string = "";

    if (type === "random") {
        start_string = gen_start_string();
    } else if (type === "prompt") {
        // num += prompts.length;
        prompts.map((prompt) => {
            let character = prompt.character;
            character = character.toUpperCase();
            start_string += character + ':\n' + prompt.line + '\n\n';
        });
    }

    input_eval = tf.tensor1d(string2index(start_string));
    input_eval = tf.expandDims(input_eval, 0);

    chars_generated = [];
    line_count = 0;

    while (!model) {
        setInterval(function () { console.log("Model is loading..."); }, 1000);
    }
    model.resetStates();

    while (line_count < num) {
        predictions = model.predict(input_eval);
        predictions = tf.squeeze(predictions, 0);

        // temp = tf.scalar(0.25);
        temp = tf.scalar(parseFloat((Math.random() * (0.50 - 0.10) + 0.10).toFixed(2)));
        predictions = predictions.div(temp);

        predicted_id = tf.multinomial(predictions, 1).dataSync()[-1, 0];

        input_eval = tf.expandDims([predicted_id], 0);
        chars_generated.push(index2string([predicted_id]));
        line_count = Math.floor((chars_generated.filter(char => char == '\n').length + 1) / 3);
    }
    text_generated = chars_generated.join("");
    return start_string + text_generated;
}

function string2index(input) {
    output = [];
    [...input].forEach(char => output.push(CHAR2IDX[char]));
    return output;
}

function index2string(input) {
    output = [];
    [...input].forEach(index => output.push(IDX2CHAR[index]));
    return output;
}

function format_script(text) {
    lines = text.split('\n');
    count = (lines.length - 1) / 3;
    script = [];
    for (var i = 0; i < count; i++) {
        script.push([lines[i * 3],lines[i * 3 + 1]])
    }
    return script;
}

function gen_start_string() {
    CHARACTERS = ["A.J", "ANDY", "ANDY'S FATHER", "ANDY'S MOTHER", "ANGELA", "ASIAN JIM", "ASTRID", "AUNT SHIRLEY", "BARTENDER", "BEN FRANKLIN", "BOB VANCE, VANCE REFRIGERATION", "BRANDON", "BRENDA", "BRIAN", "BROCCOLI ROB", "CPR TRAINER", "CAPTAIN JACK", "CARLA FERN", "CAROL", "CASEY DEAN", "CATHY", "CECE", "CHARLES MINER", "CHEF", "CHILD", "CHRISTIAN", "CHURCHGOER", "CINDY", "CLARK", "CLEANING LADY", "CLIENT", "COMPUTER", "COMPUTRON", "CONCIERGE MARIE", "COOKIE MONSTER", "CORPORATE", "CREED", "CREW", "DANNY CORDRAY", "DARRYL", "DARRYL'S SISTER", "DAVID BRENT", "DAVID WALLACE", "DEANGELO VICKERS", "DELIVERY MAN", "DEVON", "DOCTOR", "DONNA", "DRIVER", "DWIGHT", "DWIGHT'S BABYSITTER", "ED TRUCK", "EMPLOYEE", "ERIN", "ESTHER", "FAKE STANLEY", "FLIGHT ATTENDANT", "GABE", "GIL", "GLENN", "HANK", "HANNAH", "HIDE", "HOLLY", "HUNTER", "IT GUY", "INTERN", "IRENE", "ISABELLE", "JAN", "JESSICA", "JIM", "JIM'S BROTHER", "JIM'S FATHER", "JO BENNETT", "JOSH", "KAREN", "KATY", "KELLY", "KELLY'S FATHER", "KELLY'S MOTHER", "KEVIN", "LAWYER", "LONNY", "LUKE", "LYNN", "MADGE", "MAGICIAN", "MARTIN", "MATT", "MEREDITH", "MICHAEL", "MOSE", "MR. BROWN", "MR. FIGARO", "MR. O'MALLEY", "MR. RAMISH", "MR. ROMANKO", "MR. RUGER", "MR. SCHOFIELD", "MRS. DAVIS", "MRS. WALLACE", "NANA", "NATE", "NELLIE", "NURSE", "OSCAR", "PACKER", "PAM", "PAM'S FATHER", "PAM'S GRANDMOTHER", "PAM'S MOTHER", "PHILLIP", "PHYLLIS", "POLICE OFFICER", "PRINCE FAMILY PAPER", "RAVI", "REPORTER", "ROBERT CALIFORNIA", "ROLF", "ROY", "RYAN", "SALESMAN", "SCRANTON STRANGLER", "SECRETARY", "SECURITY", "SENATOR LIPTON", "SPEAKERPHONE", "STANLEY", "STRIPPER", "STUDENT", "TEACHER", "TOBY", "TROY", "VAL", "VIKRAM", "W.B. JONES", "WAITRESS", "WOLF", "ZEKE"];
    character = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
    return character + ':\n';
}

app.post('/generate', async (request, response) => {
    const options = request.body;
    console.log(options);
    text = await generate_script(options);
    script = format_script(text);
    response.send({ script: script });
});