
import express from 'express';
import connectDatabase from './config/db';
import { check, validationResult} from 'express-validator';
import cors from 'cors';
import Movies from './models/movie-model';

// Initialize express application
const app = express();

// Connect database
connectDatabase();

//Configure Middleware
app.use(express.json({extended: false}));
app.use(
  cors({
  origin: 'http://localhost:3000'
})
);

// API endpoints
/**
 * @route GET /
 * @desc Test endpoint
 * */

app.get('/', (req, res) =>
  res.send('http get request sent to root api endpoint')
);

/**
 * @route Post api/movies
 * @desc Add movies
 */
//Add a movie to the database
app.post(
  '/api/movies',
  [
    check('title', 'Please enter name of movie')
      .not()
      .isEmpty(),
    check('summary', 'Please enter a description').not().isEmpty(),
check('rating', 'Please enter a rating').not().isEmpty()
],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    } else {
      const { title, summary, rating } = req.body;
      try {
        // Check if movie exists
        let movie = await Movies.findOne({title: title});
        if (movie) {
          return res
            .status(400)
            .json({ errors: [{ msg: 'Movie already exists' }] });
        }

        // Create a new movie
        movie = new Movies({
          title: title,
          summary: summary,
          rating: rating
        });

       // Save to the db and return
        await movie.save();

        
      } catch (error) {
        res.status(500).send('Server error');
      }
    }
  }
);

//Get movies from the database
app.get('/api/movies', async (req, res) => {
try{
  const movies = await Movies.find().sort({ date: -1});

  res.json(movies);
}catch (error){
  console.error(error);
  res.status(500).send('Server error');
}
});

//Delete movie from database
app.delete('/api/movies/:id', async (req, res) => {
  try {
    const movie = await Movies.findById(req.params.id);

    // Make sure the movie was found
    if (!movie) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    await movie.remove();

    res.json({ msg: 'Movie removed' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

//Update a movie
app.put('/api/movies/:id',async (req, res) => {
  try {
    const { title, summary, rating } = req.body;
    const movie = await Movies.findById(req.params.id);

    // Make sure the movie was found
    if (!movie) {
      return res.status(404).json({ msg: 'Movie not found' });
    }

    // Update the movie and return
    movie.title = title || movie.title;
    movie.summary = summary || movie.summary;
    movie.rating = rating || movie.rating;

    await movie.save();

    res.json(movie);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});




// Connection listener
const port = 5000;
app.listen(port, () => console.log(`Express server running on port ${port}`));
                                                                //Insert variable into string
                                                                //${port}