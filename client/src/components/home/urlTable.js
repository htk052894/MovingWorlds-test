import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import { clickShortCode } from "../../redux/actions/urlActions"

import LastPageIcon from "@material-ui/icons/LastPage"
import FirstPageIcon from "@material-ui/icons/FirstPage"
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft"
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight"
import SettingsIcon from '@material-ui/icons/Settings'
import {
  Container,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Paper,
  IconButton,
} from "@material-ui/core"

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}))

function TablePaginationActions(props) {
  const classes = useStyles1()
  const theme = useTheme()
  const { count, page, rowsPerPage, onChangePage } = props

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0)
  }

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1)
  }

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1)
  }

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
  }

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  )
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
}

function createData(full, short, clicks) {
  return { full, short, clicks }
}

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
  link: {
    color: "#2196f3",
    cursor: "pointer",
  },
})

export function UrlTable(props) {
  const classes = useStyles2()
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  const rows = props.urlObjs.map((obj) => createData(obj.full, obj.short, obj.clicks))

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleClick = (shortUrl) => {
    props.clickShortCode(shortUrl)
  }

  const handleStats = (shortUrl) => {
    window.location.href = "/" + shortUrl + "/stats";
  }

  return (
    <Container maxWidth="md">
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableCell}>Full URL</TableCell>
              <TableCell className={classes.tableCell}>Short Code</TableCell>
              <TableCell className={classes.tableCell} align="center">Stats</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              <TableRow key={row.short}>
                <TableCell component="th" scope="row">
                  {row.full}
                </TableCell>
                <TableCell align="left">
                  <span
                    role="button"
                    tabIndex="0"
                    className={classes.link}
                    onClick={() => handleClick(row.short)}
                    onKeyPress={() => {}}
                  >
                    {row.short}
                  </span>
                </TableCell>
                <TableCell style={{ width: 160 }} align="center">
                  <IconButton 
                    aria-label="stats"
                    onClick={() => handleStats(row.short)}
                    >
                    <SettingsIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Container>
  )
}

UrlTable.propTypes = {
  clickShortCode: PropTypes.func.isRequired
}

const mapDispatchToProps = { clickShortCode }

export default connect(null, mapDispatchToProps)(UrlTable)