import React from 'react';
import Head from "next/head";
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
    const socialThumbnailUrl = "https://img.buzzfeed.com/buzzfeed-static/static/2016-07/22/15/asset/buzzfeed-prod-fastlane01/sub-buzz-32165-1469216684-6.jpg";
    return (
      <>
        <Head>
          <title>Dunder Mifflin RNNfinity</title>
          <meta name="description" content="A recurrent neural network that generates scripts for The Office" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
          <meta property="og:title" content="Dunder Mifflin RNNfinity" />
          <meta property="og:description" content="A recurrent neural network that generates scripts for The Office." />
          <meta property="og:image" content={socialThumbnailUrl} />
          <meta property="og:url" content="https://dunder-mifflin-rnnfinity.vercel.app/" /> {/* Replace with your site URL */}
          <meta property="og:type" content="website" />
        </Head>
        <div className="App">
          <Header />
          <Options callGenerate={this.generate} loading={this.state.loading} />
          {
            this.state.script.length !== 0 && <Script script={this.state.script} />
          }
        </div>
      </>
    );
  }
}

export default App;

