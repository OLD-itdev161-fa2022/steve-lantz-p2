import React, { Component } from 'react'
import ReactTable from 'react-table-6'
import axios from 'axios';
import styled from 'styled-components'
import 'react-table-6/react-table.css'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`
const Update = styled.div`
    color: #ef9b0f;
    cursor: pointer;
`

const Delete = styled.div`
    color: #ff0000;
    cursor: pointer;
`
class UpdateMovie extends Component {
    updateUser = event => {
        event.preventDefault()

        window.location.href = `/movies/update/${this.props.id}`
    }
    render() {
        return <Update onClick={this.updateUser}>Update</Update>
    }
}

class DeleteMovie extends Component {
    deleteMovie = event => {
        

        if (
            window.confirm(
                `Do you want to delete the movie ${this.props.id} permanently?`,
            )
        ) {
            axios
      .delete(`http://localhost:5000/api/movies/${this.props.id}`)
      .then(response => {
        const newMovies = this.state.movies.filter(p => p.id === this.props.id);
        this.setState({
          movies: [...newMovies]
        });
      })
      .catch(error => {
        console.error(`Error deleting movie: ${error}`);
      });
            window.location.reload()
        }
    }

    render() {
        return <Delete onClick={this.deleteMovie}>Delete</Delete>
    }
}

class MoviesList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movies: [],
            columns: [],
            
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })
        axios.get('http://localhost:5000/api/movies')  //Pass in api endpoint
        .then((response) => {
          this.setState({
           movies: response.data
          }); 
        })
        .catch(error => {
          console.error(`Error fetching data: ${error}`);
        });
        
    }

    render() {
        const { movies } = this.state
        console.log('TCL: MoviesList -> render -> movies', movies)

        const columns = [
            {
                Header: 'ID',
                accessor: '_id',
                filterable: true,
            },
            {
                Header: 'Title',
                accessor: 'title',
                filterable: true,
            },
            {
                Header: 'Rating',
                accessor: 'rating',
                filterable: true,
            },
            {
                Header: 'Summary',
                accessor: 'summary',
                
            },
             {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <DeleteMovie id={props.original._id} />
                        </span>
                    )
                },
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <UpdateMovie id={props.original._id} />
                        </span>
                    )
                },
            },
        ]

        let showTable = true
        if (!movies.length) {
            showTable = false
        }

        return (
            <Wrapper>
                {showTable && (
                    <ReactTable
                        data={movies}
                        columns={columns}
                        defaultPageSize={10}
                        showPageSizeOptions={true}
                        minRows={0}
                    />
                )}
            </Wrapper>
        )
    }
}

export default MoviesList