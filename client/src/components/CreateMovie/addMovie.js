
/*eslint-disable*/
import React, {useState, Component} from 'react';
import axios from 'axios';
import styled from 'styled-components'

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`
class CreateMovie extends Component {
   constructor(props) {
        super(props)

        this.state = {
           title: '',
            rating: '',
            summary: '',
        }
    }



    
    handleChangeInputTitle = async event => {
        const title = event.target.value
        this.setState({ title })
    }

    handleChangeInputRating = async event => {
        const rating = event.target.value
            this.setState({ rating })
    }

    handleChangeInputTime = async event => {
        const summary = event.target.value
        this.setState({ summary })
    }
    
      handleIncludeMovie = async () => {
        const { title, rating, summary} = this.state
        
        const newMovie= {title, rating, summary }

        try{
                const config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                //Create the movie
            const body = JSON.stringify(newMovie)
            const res = await axios.post(
                'http://localhost:5000/api/movies',
                body,
                config
            );
            
         
        }catch (error) {
            console.error(`Error creating post: ${error.response.data}`);
        }
    }
    
            
    

    
 
  render (){
        const { title, rating, summary } = this.state
        return (
            <Wrapper>
                <Title>Create Movie</Title>

                <Label>Title: </Label>
                <InputText
                    name="title"
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={e => onChange(e)}
                />

                <Label>Rating: </Label>
                <InputText
                   name="rating"
                    type="text"
                    placeholder="Rating"
                    value={rating}
                    onChange={e => onChange(e)}
                />

                <Label>Summary </Label>
                <InputText
                 name="summary"
                 type="text"
                 placeholder="Summary"
                value={summary}
                onChange={e => onChange(e)}
                />

                <button onClick={() => create()}>Add Movie</button>
                <CancelButton href={'/movies/list'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}
 


export default CreateMovie;
