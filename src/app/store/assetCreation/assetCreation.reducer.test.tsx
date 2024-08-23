import { act, screen, waitFor } from '@testing-library/react'
import reducer, * as assetCreationReducer from './assetCreation.reducer'
import { setupStore } from './../../store';

describe('AssetCreation reducer', () => {

	it('should return the initial state', () => {
		expect(reducer(undefined, { type: 'unknown' })).toEqual(assetCreationReducer.initialState)
	})

	it('should handle setNewID', () => {
		expect(reducer(assetCreationReducer.initialState, assetCreationReducer.setNewID('test_value'))).toEqual(
			Object.assign({}, assetCreationReducer.initialState, {
				newID: "test_value"
			})
		)
	})

	it('should handle setNameInput', () => {
		expect(reducer(assetCreationReducer.initialState, assetCreationReducer.setNameInput('test_value'))).toEqual(
			Object.assign({}, assetCreationReducer.initialState, {
				nameInput: "test_value"
			})
		)
	})

  it('should handle setNameInputGotTouched', () => {
		expect(reducer(assetCreationReducer.initialState, assetCreationReducer.setNameInputGotTouched('test_value'))).toEqual(
			Object.assign({}, assetCreationReducer.initialState, {
				nameInputGotTouched: "test_value"
			})
		)
	})

  it('should handle setSymbolInput', () => {
		expect(reducer(assetCreationReducer.initialState, assetCreationReducer.setSymbolInput('test_value'))).toEqual(
			Object.assign({}, assetCreationReducer.initialState, {
				symbolInput: "test_value"
			})
		)
	})

  it('should handle setISINInput', () => {
		expect(reducer(assetCreationReducer.initialState, assetCreationReducer.setISINInput('test_value'))).toEqual(
			Object.assign({}, assetCreationReducer.initialState, {
				isinInput: "test_value"
			})
		)
	})

  it('should handle setISINInputGotTouched', () => {
		expect(reducer(assetCreationReducer.initialState, assetCreationReducer.setISINInputGotTouched('test_value'))).toEqual(
			Object.assign({}, assetCreationReducer.initialState, {
				isinInputGotTouched: "test_value"
			})
		)
	})

  it('should handle setKGVInput', () => {
		expect(reducer(assetCreationReducer.initialState, assetCreationReducer.setKGVInput('test_value'))).toEqual(
			Object.assign({}, assetCreationReducer.initialState, {
				kgvInput: "test_value"
			})
		)
	})

  it('should handle setKGVInputGotTouched', () => {
		expect(reducer(assetCreationReducer.initialState, assetCreationReducer.setKGVInputGotTouched('test_value'))).toEqual(
			Object.assign({}, assetCreationReducer.initialState, {
				kgvInputGotTouched: "test_value"
			})
		)
	})

	describe('AppState Thunks', () => {

    it('should handle handleNameInputGotTouched', async() => {
			const store = setupStore();
      store.dispatch(assetCreationReducer.handleNameInputGotTouched())
      expect(store.getState().assetCreation).toEqual(
				Object.assign({}, assetCreationReducer.initialState, {
          nameInputGotTouched: true,
        })
			)
    })

    it('should handle handleSymbolInputGotTouched', async() => {
			const store = setupStore();
      store.dispatch(assetCreationReducer.handleSymbolInputGotTouched())
      expect(store.getState().assetCreation).toEqual(
				Object.assign({}, assetCreationReducer.initialState, {
          symbolInputGotTouched: true,
        })
			)
    })

    it('should handle handleISINInputGotTouched', async() => {
			const store = setupStore();
      store.dispatch(assetCreationReducer.handleISINInputGotTouched())
      expect(store.getState().assetCreation).toEqual(
				Object.assign({}, assetCreationReducer.initialState, {
          isinInputGotTouched: true,
        })
			)
    })

    it('should handle handleKGVInputGotTouched', async() => {
			const store = setupStore();
      store.dispatch(assetCreationReducer.handleKGVInputGotTouched())
      expect(store.getState().assetCreation).toEqual(
				Object.assign({}, assetCreationReducer.initialState, {
          kgvInputGotTouched: true,
        })
			)
    })

    it('should handle validate', async() => {
			const store = setupStore();
      store.dispatch(assetCreationReducer.setNameInputGotTouched(true))
      store.dispatch(assetCreationReducer.setNameInput('test'))
      let result1 = await store.dispatch(assetCreationReducer.validate())
      expect(result1.payload).toEqual(false)
      expect(store.getState().assetCreation).toEqual(
				Object.assign({}, assetCreationReducer.initialState, {
          nameInputGotTouched: true,
          nameInput: 'test'
        })
			)
    })

		it('should handle reset', async() => {
			const store = setupStore();
      store.dispatch(assetCreationReducer.setNameInputGotTouched(true))
      store.dispatch(assetCreationReducer.setNameInput('test'))
      store.dispatch(assetCreationReducer.setSymbolInputGotTouched(true))
      store.dispatch(assetCreationReducer.setSymbolInput('test'))
      store.dispatch(assetCreationReducer.setISINInputGotTouched(true))
      store.dispatch(assetCreationReducer.setISINInput('test'))
      store.dispatch(assetCreationReducer.setKGVInputGotTouched(true))
      store.dispatch(assetCreationReducer.setKGVInput('test'))
      expect(store.getState().assetCreation).toEqual(
				Object.assign({}, assetCreationReducer.initialState, {
          nameInputGotTouched: true,
          nameInput: 'test',
          symbolInputGotTouched: true,
          symbolInput: 'test',
          isinInputGotTouched: true,
		      isinInput: 'test',
          kgvInputGotTouched: true,
		      kgvInput: 'test'
        })
			)
      store.dispatch(assetCreationReducer.reset())
			expect(store.getState().assetCreation).toEqual(
				Object.assign({}, assetCreationReducer.initialState, {
          nameInputGotTouched: false,
          nameInput: '',
          symbolInputGotTouched: false,
          symbolInput: '',
          isinInputGotTouched: false,
		      isinInput: '',
          kgvInputGotTouched: false,
		      kgvInput: ''
        })
			)
		})

	})

})
