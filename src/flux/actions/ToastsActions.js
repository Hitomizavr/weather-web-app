import AppDispatcher from '../AppDispatcher';
import AppConstants from '../AppConstants';

const ToastsActions = {
  createToast(t) {
    AppDispatcher.dispatch({
      type: AppConstants.TOAST_CREATE,
      toast: t
    });
  }
};
export default ToastsActions;