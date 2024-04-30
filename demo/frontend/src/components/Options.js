import React from 'react'
import PromptLine from './PromptLine';
import Select from 'react-select/creatable';
import Loading from './Loading';


const numLines = [
  {
    "value": 1,
    "label": 1
  },
  {
    "value": 2,
    "label": 2
  },
  {
    "value": 3,
    "label": 3
  },
  {
    "value": 4,
    "label": 4
  },
  {
    "value": 5,
    "label": 5
  },
  {
    "value": 6,
    "label": 6
  },
  {
    "value": 7,
    "label": 7
  },
  {
    "value": 8,
    "label": 8
  },
  {
    "value": 9,
    "label": 9
  }
];


class Options extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      type: "random",
      prompts: [{ character: "MICHAEL", line: "That's what she said." }],
      num: 1,
    };
  }

  changeInputType = (e) => {
    this.setState({
      type: e.target.value
    })
    if (e.target.value === "prompt") {
      this.setState({
        prompts: [{ character: "MICHAEL", line: "That's what she said." }]
      })
    }
  }

  onPromptChange = (index, prompt) => {
    let tempPrompts = this.state.prompts;
    tempPrompts[index] = prompt;
    this.setState({
      prompts: tempPrompts
    })
  }

  addPrompt = () => {
    let tempPrompts = this.state.prompts;
    tempPrompts.push({ character: "MICHAEL", line: "That's what she said." })
    this.setState({
      prompts: tempPrompts
    })
  }

  onNumLinesChange = (e) => {
    this.setState({
      num: e.value
    })
  }

  render() {
    return (<div className="options">

      <form id="type-form">
        <input type="radio" id="random" name="type" value="random" checked={this.state.type === 'random'} onChange={this.changeInputType} />
        <label htmlFor="random">Random</label><br />
        <input type="radio" id="prompt" name="type" value="prompt" checked={this.state.type === 'prompt'} onChange={this.changeInputType} />
        <label htmlFor="prompt">Start with a prompt</label>
      </form>
      {
        this.state.type === "prompt" && this.state.prompts.map((prompt, index) => {
          return (<PromptLine key={index} index={index} prompt={prompt} onChange={this.onPromptChange} />);
        })
      }
      {
        this.state.type === "prompt" && <><button id="add-prompt" onClick={this.addPrompt}>{`\u002b add`}</button><br /></>
      }




      <label htmlFor="num-lines">Select number of lines: </label>
      <Select className="num-lines-select" options={numLines} defaultValue={numLines[0]} isSearchable={false} onChange={this.onNumLinesChange} />

      <br />

      <button id="generate-button" onClick={() => this.props.callGenerate(this.state)}>Generate</button>
      <Loading loading={this.props.loading} />

    </div>);
  }

}

export default Options;