import React from 'react';
import ReactDOM from 'react-dom';
import './app.scss';

class Hello extends React.Component {
    render() {
        return <h1 className="app">YTELddet</h1>
    }
}

ReactDOM.render(<Hello/>, document.getElementById('root'));