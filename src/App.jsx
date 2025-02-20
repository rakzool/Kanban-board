import './styles/app.css';
import { Provider } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import store from './store/store';
import KanbanBoard from './pages/kanbanBoard'
import WebSocketProvider from './components/WebSocketProvider';

function App() {


  return (
    <>
      <Provider store={store}>
        <DndProvider backend={HTML5Backend}>
          <WebSocketProvider>
            <KanbanBoard />
          </WebSocketProvider>
        </DndProvider>
      </Provider>
    </>
  )
}

export default App
