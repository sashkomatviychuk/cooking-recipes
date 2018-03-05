export const SHOW_MESSAGE = 'SHOW_MESSAGE';
export const HIDE_MESSAGE = 'HIDE_MESSAGE';

function showMessage(message, style) {
    return {
        message,
        style,
        type: SHOW_MESSAGE,
    };
}

export const showInfo = (message) => showMessage(message, 'info');
export const showError = (message) => showMessage(message, 'danger');

export const hideMessage = function hideMessage() {
    return {
        type: HIDE_MESSAGE,
    };
}