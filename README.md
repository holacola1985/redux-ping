# redux-ping
Reducers for Lightping and Tweetping interfaces


## Selectors

## Actions

### Wall


```js
import { setSize, loadHistory, aggregate } from 'redux-ping/lib/actions/wall'

store.dispatch(setSize(10)); //set wall size to 10
store.dispatch(loadHistory(42)); //load posts from stream 42

store.dispatch(aggregate(post)); //aggregate a new post manually
```
