import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

import withData from '../withData'

const query = gql`
  query listTodos {
    listTodos {
      items {
        id
        name
        completed
      }
    }
  }
`

class App extends React.Component {
  render () {
    console.log('Props:', this.props)
    return (
      <div>
        <p>Hello World</p>
        <ul>
          { this.props.todos.map((todo, index) => {
            <li key={index}>{ todo.name }</li>
          })}
        </ul>
      </div>
    )
  }
}

const AppWithTodos = graphql(query, {
  options: {
    fetchPolicy: 'cache-and-network'
  },
  props: props => ({
    todos: props.data.listTodos ? props.data.listTodos.items : []
  })
})(App)

export default withData(AppWithTodos)
