import { given, shouldEqual } from 'circumstance';
import * as counter from '../modules/counter';

describe('counter actions', () => {
  it('should start with 0', () => {
    given(counter.initialState)
    .then(counter.textToDisplay, shouldEqual(0))
  })
})
