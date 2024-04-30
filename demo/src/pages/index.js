import Head from "next/head";
import styles from "@/styles/Home.module.css";

// export default function Home() {
//   return (
//     <>
//       <Head>
//         <title>Dunder Mifflin RNNfinity</title>
//         <meta name="description" content="A recurrent neural network for generating scripts for The Office" />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>
//       {/* <main className={`${styles.main}`}> */}
//        <h1>Hello, world!</h1>
//       {/* </main> */}
//     </>
//   );
// }

import React from 'react';
// import '../styles/App.css';

import Header from '../components/Header';
import Options from '../components/Options';
import Script from '../components/Script';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      script: [],
      loading: false
    };
  }

  // generate = async (options) => {
  //   this.setState({ loading: true});
  //   const result = await fetch(`/generate`, {
  //     method: "POST",
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(options)
  //   });

  //   const script = await result.json();
    

  //   this.setState({ script: script.script, loading: false });
  // }
  generate = async (options) => {
    this.setState({ loading: true });
  
    const result = await fetch(`/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(options),
    });
  
    const script = await result.json();
  
    this.setState({ script: script.script, loading: false });
  };
  

  render() {
    return (
      <div className="App">
        <Header />
        <Options callGenerate={this.generate} loading = {this.state.loading} />
        {
          this.state.script.length !== 0 && <Script script={this.state.script} />
        }
      </div>
    );
  }

}

export default App;

