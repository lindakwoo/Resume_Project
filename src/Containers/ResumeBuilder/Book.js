import React, {Component} from "react"

class Book extends Component {
    render() {
      return (
        <div>
          {this.props.match.params.id}
        </div>
      );
    }
  }

  export default Book;