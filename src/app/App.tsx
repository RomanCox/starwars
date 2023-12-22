import {Suspense} from 'react';
import {Typography} from '@mui/material';
import {AppRouter} from './providers/router';
import {classNames} from '../shared/lib/classNames/classNames.ts';
import './styles/App.module.css';
import './styles/reset.css';

export const App = () => {

  return (
      <div className={classNames('app', {}, [])}>
          <Suspense fallback="">
              <Typography variant="h1" textAlign="center">StarWars fan app</Typography>
              <AppRouter/>
          </Suspense>
      </div>
  )
}
