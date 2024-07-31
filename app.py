import gradio as gr
import tensorflow as tf
import numpy as np
import json
import math

# Vocabulary and mappings
vocab = ['\t', '\n', ' ', '!', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '-', '.', '/', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ':', ';', '=', '?', '@', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '[', ']', '_', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '{', '}']
char2idx = {char: i for i, char in enumerate(vocab)}
idx2char = {i: char for i, char in enumerate(vocab)}
characters = ["A.J", "ANDY", "ANDY'S FATHER", "ANDY'S MOTHER", "ANGELA", "ASIAN JIM", "ASTRID", "AUNT SHIRLEY", "BARTENDER", "BEN FRANKLIN", "BOB VANCE, VANCE REFRIGERATION", "BRANDON", "BRENDA", "BRIAN", "BROCCOLI ROB", "CPR TRAINER", "CAPTAIN JACK", "CARLA FERN", "CAROL", "CASEY DEAN", "CATHY", "CECE", "CHARLES MINER", "CHEF", "CHILD", "CHRISTIAN", "CHURCHGOER", "CINDY", "CLARK", "CLEANING LADY", "CLIENT", "COMPUTER", "COMPUTRON", "CONCIERGE MARIE", "COOKIE MONSTER", "CORPORATE", "CREED", "CREW", "DANNY CORDRAY", "DARRYL", "DARRYL'S SISTER", "DAVID BRENT", "DAVID WALLACE", "DEANGELO VICKERS", "DELIVERY MAN", "DEVON", "DOCTOR", "DONNA", "DRIVER", "DWIGHT", "DWIGHT'S BABYSITTER", "ED TRUCK", "EMPLOYEE", "ERIN", "ESTHER", "FAKE STANLEY", "FLIGHT ATTENDANT", "GABE", "GIL", "GLENN", "HANK", "HANNAH", "HIDE", "HOLLY", "HUNTER", "IT GUY", "INTERN", "IRENE", "ISABELLE", "JAN", "JESSICA", "JIM", "JIM'S BROTHER", "JIM'S FATHER", "JO BENNETT", "JOSH", "KAREN", "KATY", "KELLY", "KELLY'S FATHER", "KELLY'S MOTHER", "KEVIN", "LAWYER", "LONNY", "LUKE", "LYNN", "MADGE", "MAGICIAN", "MARTIN", "MATT", "MEREDITH", "MICHAEL", "MOSE", "MR. BROWN", "MR. FIGARO", "MR. O'MALLEY", "MR. RAMISH", "MR. ROMANKO", "MR. RUGER", "MR. SCHOFIELD", "MRS. DAVIS", "MRS. WALLACE", "NANA", "NATE", "NELLIE", "NURSE", "OSCAR", "PACKER", "PAM", "PAM'S FATHER", "PAM'S GRANDMOTHER", "PAM'S MOTHER", "PHILLIP", "PHYLLIS", "POLICE OFFICER", "PRINCE FAMILY PAPER", "RAVI", "REPORTER", "ROBERT CALIFORNIA", "ROLF", "ROY", "RYAN", "SALESMAN", "SCRANTON STRANGLER", "SECRETARY", "SECURITY", "SENATOR LIPTON", "SPEAKERPHONE", "STANLEY", "STRIPPER", "STUDENT", "TEACHER", "TOBY", "TROY", "VAL", "VIKRAM", "W.B. JONES", "WAITRESS", "WOLF", "ZEKE"]

# Load the model
def load_model(model_path):
    model = tf.keras.models.load_model(model_path)
    return model

# Helper functions
def string2index(input_string):
    return [char2idx[char] for char in input_string if char in char2idx]

def index2string(input_indices):
    return ''.join([idx2char[index] for index in input_indices if index in idx2char])

# Generate script based on options
def generate_script(model, options):
    type = options.get('type')
    num = options.get('num')
    prompts = options.get('prompts')
    start_string = ""

    if type == "random":
        start_string = f"{np.random.choice(characters)}:\n"
    elif type == "prompt":
        for prompt in prompts:
            character = prompt['character'].upper()
            line = prompt['line']
            start_string += f"{character}:\n{line}\n\n"

    input_eval = tf.expand_dims(string2index(start_string), 0)

    text_generated = []
    line_count = 0

    while line_count < num:
        predictions = model(input_eval)
        predictions = tf.squeeze(predictions, 0)
        temp = np.random.uniform(0.10, 0.50)
        predictions = predictions / temp

        predicted_id = tf.random.categorical(predictions, num_samples=1)[-1, 0].numpy()

        input_eval = tf.expand_dims([predicted_id], 0)
        text_generated.append(idx2char[predicted_id])
        line_count = math.floor((text_generated.count('\n') + 1) // 3)


    text_generated = ''.join(text_generated)
    return start_string + text_generated

def format_script(text):
    lines = text.split('\n')
    count = (len(lines) - 1) // 3
    script = [[lines[i * 3], lines[i * 3 + 1]] for i in range(count)]
    return script

def gradio_generate_script(type, num_lines, prompts):
    # Parse JSON string if type is 'prompt'
    if type == "prompt" and prompts:
        try:
            prompts_list = json.loads(prompts)
        except json.JSONDecodeError:
            return {"error": "Invalid JSON format"}
    else:
        prompts_list = []

    model = load_model('./model.h5')  # Update this path
    options = {
        "type": type,
        "num": num_lines,
        "prompts": prompts_list
    }
    script = generate_script(model, options)
    formatted_script = format_script(script)
    return formatted_script

# Define the Gradio UI
iface = gr.Interface(
    fn=gradio_generate_script,
    inputs=[
        gr.Dropdown(["random", "prompt"], value="prompt", label="Type"),
        gr.Number(value=3, label="Number of Lines"),
        gr.Textbox(
            placeholder='Enter JSON formatted prompts if "prompt" type is selected',
            lines=2,
            label="Prompts (for 'prompt' type)",
            value='[{"character": "PAM", "line": "It’s going to be a challenge to fit everything in here."}, {"character": "MICHAEL", "line": "That\'s what she said."}]'
        )
    ],
    outputs=gr.JSON(label="Formatted Script"),
    title="Dunder Mifflin RNNfinity",
    description="Generate new dialogues for The Office"
)

if __name__ == "__main__":
    iface.launch()
