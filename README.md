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

## Reducers


### Cache

Cache reducers store last post receives (500 by default) and keep it in order to merge data from multiple services.

Example: can merge data from `wall` and `geo` services to display location information in a wall widget.
