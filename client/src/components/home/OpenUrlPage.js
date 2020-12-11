import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { getStats } from "../../redux/actions/urlActions"

import { makeStyles } from "@material-ui/core/styles"
import {
  Button,
} from "@material-ui/core"

const useStyles = makeStyles(() => ({
  backBtn: {
    padding: "10px",
    background: "linear-gradient(45deg, #5a78a7 30%, #40c4ff 90%)",
  },
}))

function Loading() {
  return (
    <header className="auth-screen">
      <span style={{ display: "flex", justifyContent: "center" }}>
        Loading Stats Now. Please wait....
      </span>
    </header>
  )
}

function OpenUrlPage(props) {

  const classes = useStyles()

  const [prevUrlStats, setUrlStats] = useState(null)
  const { urlStats } = props.urls

  useEffect(() => {
    props.getStats(props.match.params.shortCode)
  }, [])

  useEffect(() => {
    setUrlStats(urlStats)
  }, [urlStats])

  const handleBack = (e) => {
    e.preventDefault()
    props.history.push("/")
  }

  return prevUrlStats ? (
    <header className="status-container">
      <Button size="small" className={classes.backBtn} onClick={handleBack}>
            Back
      </Button>
      <div className="code-status">
        <span style={{ display: "flex", justifyContent: "left" }}>
          Short Code : &nbsp; { prevUrlStats.short }
        </span>
        <br />
        <span style={{ display: "flex", justifyContent: "left" }}>
          Full URL : &nbsp; { prevUrlStats.full }
        </span>
        <br />
        <span style={{ display: "flex", justifyContent: "left" }}>
          Code Registered Date : &nbsp; { prevUrlStats.createdAt }
        </span>
        <br />
        <span style={{ display: "flex", justifyContent: "left" }}>
          Last Accessed Date : &nbsp; { prevUrlStats.updatedAt }
        </span>
        <br />
        <span style={{ display: "flex", justifyContent: "left" }}>
          Total Access Counts : &nbsp; { prevUrlStats.clicks }
        </span>
      </div>      
    </header>
  ) : (
    <Loading />
  )
}

OpenUrlPage.propTypes = {
  getStats: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  urls: state.urls, 
  urlStats: state.urlStats
})

const mapDispatchToProps = { getStats }

export default connect(mapStateToProps, mapDispatchToProps)(OpenUrlPage)
