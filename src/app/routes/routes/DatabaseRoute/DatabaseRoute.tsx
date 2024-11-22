import { Button, FileInput, Intent } from '@blueprintjs/core'
import { useAppSelector, useAppDispatch } from './../../../hooks'
import { useState } from 'react';
import * as appStateReducer from '../../../store/appState/appState.reducer';

export default function AnalysisRoute() {

  const dispatch = useAppDispatch();

  return (
		<div id="DatabaseRoute">
        <div>Database</div>
        <Button id="selectDatabase" intent={Intent.PRIMARY} text="Select an existing database" fill onClick={() => selectDatabase()} />
        <div>or <Button id="createNewDatabase" intent={Intent.PRIMARY} icon="plus" text="Create a new database" fill onClick={() => createNewDatabase()} /></div>
    </div>
  )

  function selectDatabase() {
    window.API.selectFolder().then((result: any)=>{
      console.log(result)
      window.API.appState.saveDatabase(result)
      dispatch(appStateReducer.setDatabase(result))
      //dispatch(appStateReducer.setSelectedTab("assetsTab"))
    })
  }

  function createNewDatabase() {
    
  }
}