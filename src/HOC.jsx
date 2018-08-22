// фунция высшего порядка
function() {
    return function() { ... }
}

// HOC (Компонент высшего порядка)
function() {
    return <Component/>;
}

// HOC (Компонент высшего порядка)
class HOCWrapper extends React.Component {
    render() {
        return <MyComponent/>;
    }
}
