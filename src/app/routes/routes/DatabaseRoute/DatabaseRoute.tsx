import { useAppSelector, useAppDispatch } from './../../../hooks'

export default function AnalysisRoute() {

  const theme = useAppSelector(state => state.appState.theme)

  return (
		<div
			id="AssetsRoute"
			className={'absolute top-[0px] bottom-0 flex flex-col w-full p-3 ' + theme}>
        Database
      </div>
  )
}