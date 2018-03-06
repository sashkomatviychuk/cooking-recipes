import createBrowserHistory from 'history/createBrowserHistory'
import createMemoryHistory from 'history/createMemoryHistory'

let history;

try {
    history = createBrowserHistory();
} catch (err) {
    history = createMemoryHistory();
}

export default history