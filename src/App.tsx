import Landing from './components/UI/landing/Landing';
import Home from './components/UI/home/Home';
import Author from './components/auth/login/Auth'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthContextProvider from './contexts/AuthContext';
import MoviesCotextProvider from './contexts/MoviesContext'
import MoviesWatch from './components/UI/movies/MovieWatch';
import ProtectedRoute from './utils/ProtectedRoute';
import AddMovies from './components/UI/create/AddMovieAdmin';
import GlobalStateProvider from './contexts/GlobalState';
import './App.css';
import StoreAdmin from './components/UI/store/StoreAdmin';
import NotFoundPage from './components/UI/notFound/NotFoundPage';

function App() {
  return (
    <AuthContextProvider>
      <GlobalStateProvider>
        <MoviesCotextProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/create" component={AddMovies} />
            <ProtectedRoute exact path="/store" component={StoreAdmin} />
            <Route exact path="/login" render={props => <Author {...props} auth='login' />} />
            <Route exact path="/register" render={ props => <Author {...props} auth='register'/>} />
            <ProtectedRoute exact path="/home" component={Home} />
            <ProtectedRoute exact path="/watch" component={MoviesWatch} />                     
            <Route component={NotFoundPage} />
          </Switch>
        </Router>
      </MoviesCotextProvider>
      </GlobalStateProvider> 
    </AuthContextProvider>
  );
}

export default App;
