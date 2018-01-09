import React from 'react';

export default class extends React.Component {
    constructor(props) {
        console.log(props);
        super(props);
    }

    state = {
        headers: this.props.model.headers,
        data: this.props.model.data,
        sortby: null,
        descending: false,
        edit: null, // {row: index, cell: index}
    }

    _sort=(e) => {
        var data = this.state.data;
        var column = e.target.cellIndex;
        var descending = this.state.sortby === column && !this.state.descending;
        data.sort((a,b) => {
            return descending
                ? a[column] < b[column]
                :a[column] > b[column];
        });

        this.setState({
            data: data,
            sortby: column,
            descending
        });
    }

    _showEditor = (e) => {
        this.setState({ 
            edit: {
                row: parseInt(e.target.dataset.row, 10),
                cell: e.target.cellIndex
            }
        });
    }

    render() {
        var {headers,data} = this.state;
        var headerView = headers.map((header, index) => {
            if (this.state.sortby === index) {
                header += this.state.descending ? '\u2191': '\u2193'
            }
            return (
                <th key={index}>
                    {header}
                </th>
            )
        });

        var contentView = data.map((row, rowIdx) => {
            var edit = this.state.edit;
            return <tr key={rowIdx}>
                {row.map((col, idx) => {
                    let content = col;
                    if (edit && edit.row === rowIdx && edit.cell===idx) {
                        content = <form>
                            <input type="text" defaultValue={content} />
                        </form>
                    }
                    return <td key={idx} 
                        data-row={rowIdx}>{content}</td>
                })}
            </tr>
        });
        return (
            <table border="1">
                <thead onClick={this._sort}>
                    <tr>
                        {headerView}
                    </tr>
                </thead>
                <tbody onDoubleClick={this._showEditor}>
                    {contentView}
                </tbody>
            </table>
        );
    }
}