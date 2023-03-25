import logo from './logo.svg';
import './App.css';
import InvoiceGenerator from './components/InvoiceGenerator';
import {Container} from 'react-bootstrap'
import InvoiceTemplate from './components/templates/InvoiceTemplate';


function App() {
    return (
        <div>
          <InvoiceGenerator/>
        </div>
    );
}

export default App;
