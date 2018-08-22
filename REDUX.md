# Create redux app

```bash
$ npx create-react-app redux-app
$ cd redux-app
$ npm i redux react-redux --save
$ npm i material-ui --save
$ npm i prop-types --save
```

## Redux - Predictable state container for JavaScript apps

### Store
```JS
import { createStore } from 'redux';

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ]
    case 'TOGGLE_TODO':
      return state.map(todo =>
        (todo.id === action.id)
          ? {...todo, completed: !todo.completed}
          : todo
      )
    default:
      return state
  }
};

const store = createStore(todos);
```

* Импортируется функция createStore, которая создает контейнер.
* Далее определяется, так называемый `reducer`. Функция, которая принимает на вход `state` и `action`. На выходе из функции возвращается новый `state`. Именно из-за сходства работы этой функции с тем как работает `reduce`, она имеет название `reducer`.
* Редьюсер передается в функцию `createStore` и на выходе мы имеем готовый к использованию контейнер состояния.


`Store` обладает следующими возможностями
* Хранит в себе состояние приложения
* Реализовывает доступ на чтение через метод `getState()`
* Реализовывает возможность обновления `state` через метод `dispatch(action)`
* Реализовывает управление подпиской на изменение состояния через методы `unsubscribe = subscribe(listener)`


#### `@@redux/INIT`

```JS
const store = createStore(reducer, initState);
```
Redux посылает этот Action (`@@redux/INIT`), который нельзя перехватывать. Если редьюсер реализован правильно и содержит default секцию в switch, то контейнер заполнится данными из initState.

В функцию `createStore` иногда передаются и три параметра:
```JS
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    applyMiddleware(logger)
  ),
  initState
)
```

### Provider

Провайдер исключительно утилитарная сущность. Во-первых это обычный компонент реакта. Во-вторых он хранит внутри себя Store и пробрасывает его нижележащим компонентам. Делается это посредством Context API реакта.

```JS
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App';
import store from './store';


render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('container'),
);
```

### Container

В связке React и Redux добавляется новый тип компонента - Контейнер. Они получают данные из `Store` и распространяют их дальше.

```JS
import { connect } from 'react-redux';
import { toggleTodo } from '../actions';
import TodoList from '../components/TodoList';
 
const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed);
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed);
    case 'SHOW_ALL':
    default:
      return todos;
  }
}
 
const mapStateToProps = state => ({
  todos: getVisibleTodos(state.todos, state.visibilityFilter)
});
 
const mapDispatchToProps = dispatch => ({
  toggleTodo: id => dispatch(toggleTodo(id))
});
 
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
```

Компонент-контейнер не совсем реален. То есть он существует, но мы его не создаем руками. Этот компонент не содержит виртуального дома и его единственная цель, это взять данные из Store и отдать их в обычный React-компонент. Создается он вот таким вызовом: `connect(mapStateToProps)(Tasks)`. Как видите это функция, которая сначала принимает на вход функцию `mapStateToProps` и возвращает функцию, в которую передается уже компонент реакта.

Самое главное в этой схеме - `mapStateToProps`. Эта функция принимает на вход состояние из `Store` и должна возвратить объект, свойства которого станут `props` в подключаемом компоненте. В тривиальном случае мы всегда можем реализовывать эту функцию так `state => state`. То есть берем и отдаем в компонент все состояние. Но делать так не стоит по многим причинам, начиная от полной просадки производительности, заканчивая тем что появляется сильная зависимость от структуры состояния и лишние данные там где их не ждут. Более того, всю предварительную обработку данных, подготовленных для вывода стоит делать именно здесь. В идеале в компоненты должны попадать уже готовые к выводу данные.

### dispatch

Любой компонент реакта обернутый в контейнерный компонент, в пропсы получает функцию `dispatch`. Эта функция работает точь в точь как и `store.dispatch`. Ей нужно передать `Action`, что в свою очередь запустит цепочку вызовов до перерисовки. Но это можно делать и удобнее, благодаря второму аргументу функции `connect` `mapDispatchToProps`.

### middlewares

Усилители встраиваются в хранилище при его создании. Затем, во время диспатчинга, данные проходят через них и только затем попадают в редьюсер. Такая организация библиотеки, позволяет ее крайне легко расширять новой функциональностью, по принципу паттерна Decorator.

Типичные примеры использования включают:
* Логирование
* Оповещение об ошибках
* Работа с асинхронным API
* Роутинг

```JS
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const store = createStore(
  reducer,
  /* preloadedState, */
  compose(
    applyMiddleware(thunk),
    applyMiddleware(logger)
  )
)
```

Сам по себе, усилитель это каррируемая функция вида:
```JS
const loggerMiddleware = store => next => action => {
    console.log('dispatch', action);
    next(action);
}

const fetchMiddleware = store => next => action => {
    if (action.fetch) {
        iFetch(action.fetch)
            .then(response => next({
                type: action.type,
                success: response
            }))
            .catch(response => next({
                type: action.type,
                error: response
            }));
    } else {
        next(action);
    }
}

const confirmMiddleware = store => next => action => {
    if (action.shouldConfirm) {
        if (confirm('Are you sure?')) {
            next(action);
        }
    } else {
        next(action);
    }
}
```

Обратите внимание на параметр `next`. Его надо вызвать, по окончанию действия усилителя, что бы передать управление действием следующему услителю или редьюсеру.
