import { put, takeEvery } from 'redux-saga/effects';
import { ADD_TO_CART,INCREMENT,DECREMENT,DELETECART } from '../Redux/cartAction';

function* handleAddToCart(action) {
  yield put(ADD_TO_CART(action.payload));
}

function* handleINC(action) {
    yield put(INCREMENT(action.payload));
  }
  function* handleDEC(action) {
    yield put(DECREMENT(action.payload));
  }
  
  function* handleDelete(action) {
    yield put(DELETECART(action.payload));
  }

export default function* cartSaga() {
  yield takeEvery({ADD_TO_CART, handleAddToCart},{INCREMENT,handleINC},{DECREMENT,handleDEC},{DELETECART,handleDelete});
}
