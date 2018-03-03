export const SET_MESSAGES = 'SET_MESSAGES';
export const CLEAR_MESSAGES = 'CLEAR_MESSAGES';

const normalize = items => Array.isArray(items) ? items : [items];

export function setMessages(messages) {
    const messagesData = normalize(messages);

    return {
        type: SET_MESSAGES,
        messages: messagesData.map(e => e.toString()),
    };
}

export function clearMessages() {
    return {
        type: CLEAR_MESSAGES,
    };
}