import './styles/app.css';
import { Provider } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import store from './store/store';
import KanbanBoard from './pages/kanbanBoard'

function App() {


  return (
    <>
      <Provider store={store}>
        <DndProvider backend={HTML5Backend}>
        <KanbanBoard />
        </DndProvider>
      </Provider>
    </>
  )
}

export default App
