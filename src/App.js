import React, { Component } from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
class App extends Component {
  state = {
    isLoading: true,
    datas: [],
    error: null,
  };

  fetchData = () => {
    fetch(
      `https://newsapi.org/v2/everything?q=apple&sortBy=popularity&pageSize=100&apiKey=7a167ff42ac8481c8a7827f6802b7195`
    )
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Server responds with error!");
        }
        return response.json();
      })
      .then((data) =>
        this.setState({
          datas: data.articles,
          isLoading: false,
        })
      )
      .catch((error) => this.setState({ error, isLoading: false }));
  };

  componentDidMount() {
    this.fetchData();
  }

  columns = [
    {
      selector: "urlToImage",
      name: "Image",
      width: "10%",
      cell: (row) => (
        <img width="100px" height="100px" alt={row.name} src={row.urlToImage} />
      ),
    },
    {
      selector: "source",
      name: "Source",
      width: 130,
      cell: (row) => `${row.source.name || ""}`,
    },
    { selector: "author", name: "Author", width: 130 },
    { selector: "title", name: "Title", width: 130 },
    {
      selector: "publishedAt",
      sortable: true,
      name: "Date",
      width: 130,
      cell: (row) => `${row.publishedAt.substr(0, 10) || ""}`,
    },
    { selector: "url", name: "Url", width: 130 },
  ];

  render() {
    const tableData = {
      columns: this.columns,
      data: this.state.datas,
      print: false,
    };
    return (
      <>
        {this.state.error ? <p> {this.state.error} </p> : null}
        {!this.state.isLoading ? (
          <>
            <DataTableExtensions {...tableData}>
              <DataTable
                columns={this.columns}
                data={this.state.datas}
                noHeader
                // defaultSortField="emailId"
                defaultSortAsc={false}
                pagination
                striped
                highlightOnHover
              />
            </DataTableExtensions>
          </>
        ) : (
          <p>Loading.. </p>
        )}
      </>
    );
  }
}

export default App;
