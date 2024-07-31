# Dunder Mifflin RNNfinity

**Dunder Mifflin RNNfinity** is a [recurrent neural network (RNN)](https://en.wikipedia.org/wiki/Recurrent_neural_network) designed to generate scripts for The Office. This project is one of my early experiments with natural language processing after finishing The Office and desperately wanting more episodes. The model was developed using TensorFlow and trained using the transcripts from every episode across all 9 seasons of the show — that's 74 hours of television! It can effectively generate new dialogues and similar sounding conversations between all your favourite characters. I deployed the model and created an interactive frontend using Next.js which can be accessed [**here**](https://dunder-mifflin-rnnfinity.vercel.app) :)

- [Source Code](https://github.com/tsaruggan/dunder-mifflin-RNNfinity/blob/master/Dunder%20Mifflin%20RNNfinity.ipynb) 🔨
- [Training Data](https://raw.githubusercontent.com/tsaruggan/dunder-mifflin-RNNfinity/master/the-office.txt) 📃
- [Pretrained Model](https://github.com/tsaruggan/dunder-mifflin-RNNfinity/blob/master/model.h5) 🗣
- [Model Architecture](https://user-images.githubusercontent.com/40643067/146662628-38fdc13a-1ee8-4faf-81c3-7f8955e81af9.png) 🕌
- [Live Demo](https://dunder-mifflin-rnnfinity.vercel.app) 🔮

---

### Hugging Face Spaces Configuration
```yaml
title: Dunder Mifflin RNNfinity
emoji: 🔥
colorFrom: blue
colorTo: indigo
sdk: gradio
sdk_version: 4.39.0
app_file: app.py
pinned: false
```