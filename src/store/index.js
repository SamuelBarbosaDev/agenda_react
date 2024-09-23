import { createStore } from 'redux';
import rootRoducer from './modules/rootRoducer';

const store = createStore(rootRoducer);

export default store;
