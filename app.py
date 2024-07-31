import gradio as gr
import tensorflow as tf
import numpy as np

# Vocabulary and mappings
vocab = ['\t', '\n', ' ', '!', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '-', '.', '/', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ':', ';', '=', '?', '@', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '[', ']', '_', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '{', '}']
char2idx = {char: i for i, char in enumerate(vocab)}
idx2char = {i: char for i, char in enumerate(vocab)}


characters = ["A.J", "ANDY", "ANDY'S FATHER", "ANDY'S MOTHER", "ANGELA", "ASIAN JIM", "ASTRID", "AUNT SHIRLEY", "BARTENDER", "BEN FRANKLIN", "BOB VANCE, VANCE REFRIGERATION", "BRANDON", "BRENDA", "BRIAN", "BROCCOLI ROB", "CPR TRAINER", "CAPTAIN JACK", "CARLA FERN", "CAROL", "CASEY DEAN", "CATHY", "CECE", "CHARLES MINER", "CHEF", "CHILD", "CHRISTIAN", "CHURCHGOER", "CINDY", "CLARK", "CLEANING LADY", "CLIENT", "COMPUTER", "COMPUTRON", "CONCIERGE MARIE", "COOKIE MONSTER", "CORPORATE", "CREED", "CREW", "DANNY CORDRAY", "DARRYL", "DARRYL'S SISTER", "DAVID BRENT", "DAVID WALLACE", "DEANGELO VICKERS", "DELIVERY MAN", "DEVON", "DOCTOR", "DONNA", "DRIVER", "DWIGHT", "DWIGHT'S BABYSITTER", "ED TRUCK", "EMPLOYEE", "ERIN", "ESTHER", "FAKE STANLEY", "FLIGHT ATTENDANT", "GABE", "GIL", "GLENN", "HANK", "HANNAH", "HIDE", "HOLLY", "HUNTER", "IT GUY", "INTERN", "IRENE", "ISABELLE", "JAN", "JESSICA", "JIM", "JIM'S BROTHER", "JIM'S FATHER", "JO BENNETT", "JOSH", "KAREN", "KATY", "KELLY", "KELLY'S FATHER", "KELLY'S MOTHER", "KEVIN", "LAWYER", "LONNY", "LUKE", "LYNN", "MADGE", "MAGICIAN", "MARTIN", "MATT", "MEREDITH", "MICHAEL", "MOSE", "MR. BROWN", "MR. FIGARO", "MR. O'MALLEY", "MR. RAMISH", "MR. ROMANKO", "MR. RUGER", "MR. SCHOFIELD", "MRS. DAVIS", "MRS. WALLACE", "NANA", "NATE", "NELLIE", "NURSE", "OSCAR", "PACKER", "PAM", "PAM'S FATHER", "PAM'S GRANDMOTHER", "PAM'S MOTHER", "PHILLIP", "PHYLLIS", "POLICE OFFICER", "PRINCE FAMILY PAPER", "RAVI", "REPORTER", "ROBERT CALIFORNIA", "ROLF", "ROY", "RYAN", "SALESMAN", "SCRANTON STRANGLER", "SECRETARY", "SECURITY", "SENATOR LIPTON", "SPEAKERPHONE", "STANLEY", "STRIPPER", "STUDENT", "TEACHER", "TOBY", "TROY", "VAL", "VIKRAM", "W.B. JONES", "WAITRESS", "WOLF", "ZEKE"]

# Load the model
def load_model(model_path):
    model = tf.keras.models.load_model(model_path)
    return model

# Generate text
def generate_text(model, prompt, length):
    input_eval = [char2idx[s] for s in prompt]
    input_eval = tf.expand_dims(input_eval, 0)

    text_generated = []
    temperature = 1.0

    model.reset_states()
    for i in range(length):
        predictions = model(input_eval)
        predictions = tf.squeeze(predictions, 0)

        predictions = predictions / temperature
        predicted_id = tf.random.categorical(predictions, num_samples=1)[-1, 0].numpy()

        input_eval = tf.expand_dims([predicted_id], 0)
        text_generated.append(idx2char[predicted_id])

    return prompt + ''.join(text_generated)

# Helper functions
def string2index(input_string):
    return [char2idx[char] for char in input_string]

def index2string(input_indices):
    return ''.join([idx2char[index] for index in input_indices])

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
        line_count = (text_generated.count('\n') + 1) // 3

    text_generated = ''.join(text_generated)
    return start_string + text_generated

def format_script(text):
    lines = text.split('\n')
    count = (len(lines) - 1) // 3
    script = [[lines[i * 3], lines[i * 3 + 1]] for i in range(count)]
    return script

# Example usage
if __name__ == "__main__":
    model_path = './model.h5'  # Specify your model path here
    prompt = "The quick brown fox"
    length = 100  # Specify the length of text you want to generate

    model = load_model(model_path)
    generated_text = generate_text(model, prompt, length)
    print(generated_text)

    # Example of generating a script
    options = {
        "type": "prompt",
        "num": 10,
        "prompts": [{"character": "Michael", "line": "I am the boss."}]
    }
    script = generate_script(model, options)
    formatted_script = format_script(script)
    print(formatted_script)