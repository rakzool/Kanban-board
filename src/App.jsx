import './styles/app.css';
import { Provider } from 'react-redux';
import store from './store/store';
import KanbanBoard from './pages/kanbanBoard'

function App() {


  return (
    <>
      <Provider store={store}>
        <KanbanBoard />
      </Provider>
    </>
  )
}

export default App
