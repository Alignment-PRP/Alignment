
class App extends React.Component {
    render() {
        return (
            <div>
                Hello world!!
                <p>It's working! :D</p>
            </div>
        );
    }
}


ReactDOM.render(
    React.createElement(App, null),
    document.getElementById("application")
);