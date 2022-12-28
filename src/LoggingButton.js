import logo from './logo.svg';
import './LoggingButton.css';
import * as ReactDOM from 'react-dom/client';


class LoggingButton extends React.Component {
    handleClick() {
        console.log('this is:', this);
    }

    render() {
        // 이 문법은 `this`가 handleClick 내에서 바인딩되도록 합니다.
        return (
            <button onClick={() => this.handleClick()}>
                Click me
            </button>
        );
    }
}


export default LoggingButton;
