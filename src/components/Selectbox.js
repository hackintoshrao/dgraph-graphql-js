import React, { useState } from "react";

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

export default function SelectBox({ onChange }) {
  const [value, setValue] = useState("Select Author");

  const onSelectboxChange = e => {
    setValue(e.target.value);

    const selectedIndex = e.target.options.selectedIndex;
    const uidOfAuthor = e.target.options[selectedIndex].getAttribute("uid");
    const selectedAuthor = e.target.value;
    onChange(selectedAuthor, uidOfAuthor);
  };

  return (
    <Query query={GET_AUTHORS}>
      {({ loading, error, data }) => {
        if (loading) {
          return <div>Fetching Authors...</div>;
        }
        if (error) {
          return <div>Error: {error}</div>;
        }

        const authorToSelect = [{ id: "default", name: "Select an Author" }];
        data.queryAuthor.map(author => authorToSelect.push(author));

        return (
          <div className="form-group">
            <label htmlFor="select2"></label>
            <select
              value={value}
              onChange={onSelectboxChange}
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
