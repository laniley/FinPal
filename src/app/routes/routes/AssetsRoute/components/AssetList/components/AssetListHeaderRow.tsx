import TableHeaderCell from '../../../../../../components/Table/TableHeaderCell/TableHeaderCell';

export default function AnalysisRoute(props: {columns: any[]}) {

	return (
    <thead>
      <tr>
        {
          props.columns.map((column, i) => (<TableHeaderCell key={"column-" + i} additionalClassNames={column.additionalClassNames}>{column.header}</TableHeaderCell>))
        }
      </tr>
    </thead>
	);
}