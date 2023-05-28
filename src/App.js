import './App.css';
import MessageList from './components/MessageList';
import AddMessage from './components/AddMessage';

function App() {
  return (
    <div className="chatBackground">
      <div className='chatBox'>
        <div className='appTitleRow row'>
          <img src="/profilePhoto.png" alt="profilePhoto" className='profilePhoto' />
          <div className='textColumn'>
            <h1 className='appTitle'>Ethan Anderson</h1>
            <h2 className='userStatus'>Online</h2>
          </div>
        </div>
        <MessageList />
        <AddMessage />
      </div>
    </div>
  );
}

export default App;
