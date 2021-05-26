import React from 'react';
import PropTypes from 'prop-types';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
// core components
import styles from 'assets/jss/material-dashboard-react/components/tableStyle.js';
import classnames from 'classnames';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles(styles);

export default function CustomTable({
	tableHead,
	tableData,
	tableHeaderColor,
	count,
	onChangePage,
	page,
	rowsPerPage,
}) {
	const classes = useStyles();
	return (
		<div className={classes.tableResponsive}>
			<Table className={classes.table}>
				{tableHead !== undefined ? (
					<TableHead className={classes[tableHeaderColor + 'TableHeader']}>
						<TableRow className={classes.tableHeadRow}>
							{tableHead.map((prop, key) => {
								return (
									<TableCell
										className={classnames(
											classes.tableCell,
											classes.tableHeadCell
										)}
										key={key}
									>
										{prop}
									</TableCell>
								);
							})}
						</TableRow>
					</TableHead>
				) : null}
				<TableBody>
					{tableData.map((prop, key) => {
						return (
							<TableRow key={key} className={classes.tableBodyRow}>
								{prop.map((prop, key) => {
									return (
										<TableCell className={classes.tableCell} key={key}>
											{prop}
										</TableCell>
									);
								})}
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
			{page !== undefined && (
				<Pagination
					count={count}
					onChange={onChangePage}
					page={page}
					rowsPerPage={rowsPerPage}
				/>
			)}
		</div>
	);
}

CustomTable.defaultProps = {
	tableHeaderColor: 'gray',
};

CustomTable.propTypes = {
	tableHeaderColor: PropTypes.oneOf([
		'warning',
		'primary',
		'danger',
		'success',
		'info',
		'rose',
		'gray',
	]),
	tableHead: PropTypes.arrayOf(PropTypes.string),
	tableData: PropTypes.arrayOf(
		PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
	),
};
