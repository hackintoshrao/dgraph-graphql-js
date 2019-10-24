import React from "react";

import gql from "graphql-tag";
import { Query } from "react-apollo";

const GET_AUTHORS = gql`
  {
    queryAuthor {
      id
      name
    }
  }
`;

class SelectBox extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = { value: "Select Author" };
  }

  onChange(event) {
    this.setState({
      value: event.target.value
    });
 
    const selectedIndex = event.target.options.selectedIndex;
    const uidOfAuthor = event.target.options[selectedIndex].getAttribute("uid");
    const selectedAuthor = event.target.value;
    this.props.onChange(selectedAuthor, uidOfAuthor);
  }

  render() {
    return (
      <Query query={GET_AUTHORS}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>;
          if (error) {
            return <div>error</div>;
          }

          const authorToSelect = [{ id: "default", name: "Select an Author" }];
          data.queryAuthor.map(author => authorToSelect.push(author));
         
          return (
            <div className="form-group">
              <label htmlFor="select2"></label>
              <select
                value={this.state.value}
                onChange={this.onChange}
                className="form-control"
              >
                {authorToSelect.map(option => {
                  return (
                    <option value={option.name} uid={option.id} key={option.id}>
                      {option.name}
                    </option>
                  );
                })}
              </select>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default SelectBox;
