import React from 'react';
import Head from "next/head";
import Header from '../components/Header';
import Options from '../components/Options';
import Script from '../components/Script';
import Status from '@/components/Status';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      script: [],
      loading: false,
      status: 'SLEEPING'
    };
    this.intervalId = null;
  }

  componentDidMount() {
    this.fetchStatus();
    this.intervalId = setInterval(this.fetchStatus, 6000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  fetchStatus = async () => {
    try {
      const response = await fetch('/api/status');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      this.setState({ status: data.status });
    } catch (error) {
      console.error("Error fetching status:", error);
    }
  };

  generate = async (options) => {
    this.setState({ loading: true });
  
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
  
    try {
      const result = await fetch(`/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(options),
        signal: controller.signal,
      });
  
      clearTimeout(timeoutId);
      const data = await result.json();
      this.setState({ script: data.script[0], loading: false });
    } catch (error) {
      this.setState({ loading: false });
      // alert("Request timed out after 10 seconds due to limited resource constraints. Try again with a lesser input or check out the Hugging Face space directly.");

      if (confirm("Request timed out after 10 seconds due to limited resource constraints. Open the Hugging Face space directly?")) {
        const url = "https://huggingface.co/spaces/tsaruggan/dunder-mifflin-RNNfinity";
        const newTab = window.open(url, "_blank");

        if (!newTab) {
          window.location.href = url; // Fallback for mobile
        }
      }
    }
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
          <Options callGenerate={this.generate} loading={this.state.loading} disabled={!(this.state.status === "RUNNING") || this.state.loading} />
          <Status status={this.state.status} />
          {
            this.state.script.length !== 0 && <Script script={this.state.script} />
          }
        </div>
      </>
    );
  }
}

export default App;

